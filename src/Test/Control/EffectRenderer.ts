import 'mocha';
import {expect} from 'chai';
import {Actor} from "../../Model/Entity/Actor";
import {Effect} from "../../Model/Effect";
import {EffectRenderer} from "../../Control/EffectRenderer";
import {Status} from "../../Model/Status";
import {List} from "../../Model/List";
import {D20_Attack} from "../../Model/Ability/d20/D20_Attack";
import {Ability} from "../../Model/Ability/Ability";
import {Interaction} from "../../Control/Interaction";
import {CheckExecutor} from "cm-check/lib/Check/CheckExecutor";
import {Check} from "cm-check/lib/Check/Check";

describe( 'EffectRenderer', () => {

    let attacker = new Actor();
    let defender = new Actor();
    let effects: List<Effect> = new List<Effect>();

    let rand = function (min: number, max: number) {

        return Math.floor(Math.random() * max + min);
    };

    let initTest = () => {

        attacker = new Actor();
        defender = new Actor();
        effects = new List<Effect>();

        attacker.attributes.add('Strength', 10);
        attacker.attributes.add('Dexterity', 10);
        attacker.attributes.add('Constitution', 10);
        attacker.attributes.add('Wisdom', 10);
        attacker.attributes.add('Intelligence', 10);
        attacker.attributes.add('Charisma', 10);
        attacker.attributes.add('HP', 10);
        attacker.attributes.add('MaxHP', 10);
        attacker.attributes.add('AC', 10);

        defender.attributes.add('Strength', 10);
        defender.attributes.add('Dexterity', 10);
        defender.attributes.add('Constitution', 10);
        defender.attributes.add('Wisdom', 10);
        defender.attributes.add('Intelligence', 10);
        defender.attributes.add('Charisma', 10);
        defender.attributes.add('HP', 10);
        defender.attributes.add('MaxHP', 10);
        defender.attributes.add('AC', 10);
    };

    it('will process the attribute modifiers on an event and apply them to the target actor', () => {

        initTest();

        let randomNumber = rand(1, 10) * -1;

        let effect = new Effect();
        effect.attributeAssignments.add('HP', (value) => value + randomNumber);
        effects.add(effect);

        EffectRenderer.renderEffects(defender, effects);

        expect(defender.attributes.get('HP')).to.be.equal(10 + randomNumber);
    });

    it('will process attribute value assignments and overrides from events, and apply to target actor', () => {

        initTest();

        let randomNumber = rand(1, 10);

        let effect = new Effect();
        effect.attributeAssignments.add('HP', () => randomNumber);
        effects.add(effect);

        EffectRenderer.renderEffects(defender, effects);

        expect(defender.attributes.get('HP')).to.be.equal(randomNumber);
    });

    it('will set (new or override) new flags on the actor, based on directives from the effect', () => {

        initTest();

        let effect = new Effect();
        effect.flagAssignments.add('IsDaring', () => true);
        effect.flagAssignments.add('IsCowardly', () => false);
        effects.add(effect);

        EffectRenderer.renderEffects(defender, effects);

        expect(defender.flags.get('IsDaring')).to.be.true;
        expect(defender.flags.get('IsCowardly')).to.be.false;

        effects = new List<Effect>();

        effect = new Effect();
        effect.flagAssignments.add('IsDaring', () => false);
        effects.add(effect);

        EffectRenderer.renderEffects(defender, effects);

        expect(defender.flags.get('IsDaring')).to.be.false;
        expect(defender.flags.get('IsCowardly')).to.be.false;
    });

    it('will set (new or override) new labels on the actor, based on directives from the effect', () => {

        initTest();

        let effect = new Effect();
        effect.labelAssignments.add('Class', () => 'Paladin');
        effects.add(effect);

        EffectRenderer.renderEffects(defender, effects);

        expect(defender.labels.get('Class')).to.be.equal('Paladin');

        effect = new Effect();
        effect.labelAssignments.add('Class', () => 'Paladin/Ranger');
        effects.add(effect);

        EffectRenderer.renderEffects(defender, effects);

        expect(defender.labels.get('Class')).to.be.equal('Paladin/Ranger');
    });

    it('will set (new or override) new statuses on the actor, based on directives from the effect', () => {

        initTest();
        let s: Status = new Status();
        s.setOwner(defender);

        s.attributeAssignmentFilters.add('Intelligence', (value: number) => {
            return value - 2;
        });

        let effect = new Effect();
        effect.statusAssignments.add('Fear', s);
        effects.add(effect);

        EffectRenderer.renderEffects(defender, effects);

        let retrievedStatus = defender.statuses.get('Fear');

        expect(() => retrievedStatus.attributeAssignmentFilters.get('Bravery')).to.throw;
        expect(() => retrievedStatus.attributeAssignmentFilters.get('Fear')).not.to.throw;
    });

    it('will remove statuses from the actor, if they exist.  Order to remove non-existing statuses will be ignored.', () => {

        initTest();
        let s1: Status = new Status();
        let s2: Status = new Status();
        s1.setOwner(defender);
        s2.setOwner(defender);

        s1.attributeAssignmentFilters.add('Intelligence', (value: number) => {
            return value - 2;
        });
        s2.attributeAssignmentFilters.add('Wisdom', (value: number) => {
            return value - 4;
        });

        let effect = new Effect();
        effect.statusAssignments.add('Fear', s1);
        effect.statusAssignments.add('Wroth', s2);
        effects.add(effect);

        EffectRenderer.renderEffects(defender, effects);

        let retrievedStatus = defender.statuses.get('Fear');

        expect(() => retrievedStatus.attributeAssignmentFilters.get('Bravery')).to.throw;
        expect(() => retrievedStatus.attributeAssignmentFilters.get('Fear')).not.to.throw;
        expect(() => retrievedStatus.attributeAssignmentFilters.get('Wroth')).not.to.throw;

        effects = new List<Effect>();

        effect = new Effect();
        effect.statusRemovals.add( 'Fear' );
        effect.statusRemovals.add( 'Potion of Strength' );
        effects.add(effect);

        expect(() => retrievedStatus.attributeAssignmentFilters.get('Bravery')).to.throw;
        expect(() => retrievedStatus.attributeAssignmentFilters.get('Fear')).to.throw;
        expect(() => retrievedStatus.attributeAssignmentFilters.get('Wroth')).not.to.throw;
    });

    it('processes status effect filters for attributes', () => {

        initTest();

        let invincibilityStatus = new Status();

        // Always return a delta of 0 when affecting HP
        invincibilityStatus.attributeAssignmentFilters.add('HP', (value, originalValue) => originalValue );

        defender.attributes.set('AC', 100);

        attacker.abilities.add('Attack', new D20_Attack());
        attacker.execute('Attack', defender);

        expect(defender.attributes.get('HP')).to.be.equal(10);

        defender.attributes.set('AC', 0);
        attacker.execute('Attack', defender);

        expect(defender.attributes.get('HP')).to.be.lessThan(10);

        defender.attributes.set('HP', 10);
        defender.statuses.add('Invincibility', invincibilityStatus);
        attacker.execute('Attack', defender);

        expect(defender.attributes.get('HP')).to.be.equal(10);
    });

    it('respects priority when applying statuses attribute filters', () => {

        initTest();

        let damageToZero: Status = new Status();
        let addTwoToAllIncomingDamage: Status = new Status();

        damageToZero.attributeAssignmentFilters.add('HP', (value, originalValue) => originalValue );

        addTwoToAllIncomingDamage.attributeAssignmentFilters.add('HP', ( value : number ) => {

            return value - 2;
        });

        defender.attributes.set('AC', 0);
        defender.attributes.set('HP', 10 );
        defender.statuses.add('Set Damage To Zero', damageToZero, 1);
        defender.statuses.add('Add +2 Damage', addTwoToAllIncomingDamage, 2);

        attacker.abilities.add( 'attack', new D20_Attack() );
        attacker.execute( 'attack', defender );

        expect( defender.attributes.get( 'HP' )).to.be.equal( 8 );

        defender.statuses.updatePriority( 'Set Damage To Zero', 3 );
        attacker.execute( 'attack', defender );

        expect( defender.attributes.get( 'HP' )).to.be.equal( 8 );

        defender.statuses.remove( 'Set Damage To Zero' );
        attacker.execute( 'attack', defender );

        expect( defender.attributes.get( 'HP' )).to.be.lessThan( 8 );
    });

    it( 'respects priority when applying statuses attribute setters', () => {

        initTest();

        let assignAttrs = new TestAssignAttributes();

        let setToFour : Status = new Status();
        let setToEight : Status = new Status();
        let doubleValue : Status = new Status();
        let setToZero : Status = new Status();

        setToZero.attributeAssignmentFilters.add( 'HP', () => { return 0; });
        setToFour.attributeAssignmentFilters.add( 'HP', () => { return 4; });
        setToEight.attributeAssignmentFilters.add( 'HP', () => { return 8; });
        doubleValue.attributeAssignmentFilters.add( 'HP', ( newValue ) => { return newValue * 2; });

        defender.attributes.set( 'HP', 1000 );
        defender.attributes.set( 'AC', 0 );
        defender.statuses.add( 'SetToZero', setToZero, 0 );
        defender.statuses.add( 'SetToFour', setToFour, 10 );
        defender.statuses.add( 'SetToEight', setToEight, 20 );
        defender.statuses.add( 'DoubleValue', doubleValue, 30 );

        attacker.abilities.add( 'assign', assignAttrs );
        attacker.execute( 'assign', defender );

        // 0 overwrites, then 4 overwrites, then 8 overwrites, then that value is doubled.
        expect( defender.attributes.get( 'HP' )).to.be.equal( 16 );

        defender.statuses.updatePriority( 'SetToZero', 40 );
        attacker.execute( 'assign', defender );

        // 0 moves to front of line, overwrites all
        expect( defender.attributes.get( 'HP' )).to.be.equal( 0 );

        defender.statuses.remove( 'SetToZero' );
        defender.statuses.updatePriority( 'SetToFour', 21 );
        attacker.execute( 'assign', defender );

        // 0 removed, eight overwrites, then four, then four is doubled.
        expect( defender.attributes.get( 'HP' )).to.be.equal( 8 );
    });

    it( 'respects priority when applying statuses with label setters', () => {

        initTest();

        let appendWithAnA : Status = new Status();
        let replaceWithWazzap : Status = new Status();
        let removeLastLetter : Status = new Status();
        let restoreOriginal : Status = new Status();

        appendWithAnA.labelAssignmentFilters.add( 'Label Value', (newValue : string, originalValue : string) => {

            return newValue + "A";
        });

        replaceWithWazzap.labelAssignmentFilters.add( 'Label Value', (newValue : string, originalValue : string) => {

            return "Wazzap";
        });

        removeLastLetter.labelAssignmentFilters.add( 'Label Value', (newValue : string, originalValue : string ) => {

            const strlen : number = newValue.length;
            return newValue.substr(0, strlen - 1);
        });

        restoreOriginal.labelAssignmentFilters.add( 'Label Value', ( newValue : string, originalValue : string ) => {

            return originalValue;
        });

        defender.statuses.add( 'appendWithAnA', appendWithAnA, 10 )
            .add( 'replaceWithWazzap', replaceWithWazzap, 20 )
            .add( 'removeLastLetter', removeLastLetter, 30 )
            .add( 'restoreOriginal', restoreOriginal, 40 );

        defender.labels.add( 'Label Value', 'Original Value' );
        defender.attributes.replace( 'AC', 0 );

        attacker.abilities.add( 'Label Replacement', new TestAssignLabels() );
        attacker.execute( 'Label Replacement', defender );
        expect( defender.labels.get( 'Label Value' )).to.be.equal( 'Original Value' );

        defender.statuses.remove( 'restoreOriginal' );
        attacker.execute( 'Label Replacement', defender );
        expect( defender.labels.get( 'Label Value' )).to.be.equal( 'Wazza' );

        defender.statuses.updatePriority( 'removeLastLetter', 5 );
        attacker.execute( 'Label Replacement', defender );
        expect( defender.labels.get( 'Label Value' )).to.be.equal( 'Wazzap' );

        defender.statuses.remove( 'replaceWithWazzap' );
        attacker.execute( 'Label Replacement', defender );
        expect( defender.labels.get( 'Label Value' )).to.be.equal ( 'Replacement ValuA' );
    });

    it( 'respects priority when applying statuses with flag setters', () => {

        let restoreOriginalValue : Status = new Status();
        let turnFlagOff : Status = new Status();
        let turnFlagOn : Status = new Status();
        let toggleFlag : Status = new Status();

        restoreOriginalValue.flagAssignmentFilters.add( 'IsGolden', (newValue : boolean, originalValue : boolean) => {
            return originalValue;
        });

        turnFlagOff.flagAssignmentFilters.add( 'IsGolden', () => false);
        turnFlagOn.flagAssignmentFilters.add( 'IsGolden', () => true );
        toggleFlag.flagAssignmentFilters.add( 'IsGolden', (newValue : boolean) => !newValue );

        defender.statuses.add( 'restoreOriginalValue', restoreOriginalValue, 50 );
        defender.statuses.add( 'turnFlagOff', turnFlagOff, 40 );
        defender.statuses.add( 'turnFlagOn', turnFlagOn, 30 );
        defender.statuses.add( 'toggleFlag', toggleFlag, 20 );

        attacker.abilities.add( 'Flag', new TestAssignFlags() );
        defender.attributes.set( 'AC', 0 );
        defender.flags.set( 'IsGolden', true );

        attacker.execute( 'Flag', defender );
        expect( defender.flags.get( 'IsGolden' )).to.be.true;

        defender.statuses.updatePriority( 'turnFlagOff', 60 );
        attacker.execute( 'Flag', defender );
        expect( defender.flags.get( 'IsGolden' )).to.be.false;

        defender.statuses.updatePriority( 'toggleFlag', 70 );
        attacker.execute( 'Flag', defender );
        expect( defender.flags.get( 'IsGolden' )).to.be.true;

        defender.statuses.remove( 'toggleFlag' );
        attacker.execute( 'Flag', defender );
        expect( defender.flags.get( 'IsGolden' )).to.be.false;
    });

    it( 'respects priority when applying statuses with status setters', () => {

        initTest();

        let removeThatStatus : Status = new Status();
        let applyThatStatus : Status = new Status();
        let toggleApplyStatus : Status = new Status();

        removeThatStatus.statusAssignmentFilters.add( 'FlatStrength', () => false );
        applyThatStatus.statusAssignmentFilters.add( 'FlatStrength', () => true );
        toggleApplyStatus.statusAssignmentFilters.add( 'FlatStrength', (value) => !value );

        defender.statuses.add( 'removeThatStatus', removeThatStatus, 100 );
        defender.statuses.add( 'applyThatStatus', applyThatStatus, 200 );
        defender.statuses.add( 'toggleApplyStatus', toggleApplyStatus, 300);

        attacker.abilities.add( 'AssignTestStatus', new AssignTestStatus());
        attacker.abilities.add( 'Sap Strength', new SapStrength() );
        attacker.execute( 'AssignTestStatus', defender );
        expect( defender.statuses.has( 'FlatStrength' )).to.be.false;

        attacker.execute( 'Sap Strength', defender );
        expect( defender.attributes.get( 'Strength' )).to.be.equal( 0 );

        defender.attributes.set( 'Strength', 10 );
        defender.statuses.remove( 'toggleApplyStatus' );
        attacker.execute( 'AssignTestStatus', defender );
        attacker.execute( 'Sap Strength' , defender );

        expect( defender.statuses.has( 'FlatStrength' )).to.be.true;
        expect( defender.attributes.get( 'Strength' )).to.be.equal( 5 );

        defender.statuses.remove( 'FlatStrength' );
        defender.attributes.set( 'Strength', 10 );
        defender.statuses.updatePriority( 'applyThatStatus', 1 );
        attacker.execute( 'AssignTestStatus' , defender );

        expect( defender.statuses.has( 'FlatStrength' )).to.be.false;

        attacker.execute( 'Sap Strength', defender );
        expect( defender.attributes.get( 'Strength' )).to.be.equal( 0 );
    });

    it( 'respects priority when removing statuses with status filters', () => {

        initTest();

        let removeThatStatus : Status = new Status();
        let applyThatStatus : Status = new Status();
        let toggleApplyStatus : Status = new Status();

        removeThatStatus.statusRemovalFilters.add( 'FlatStrength', () => true );
        applyThatStatus.statusRemovalFilters.add( 'FlatStrength', () => false );
        toggleApplyStatus.statusRemovalFilters.add( 'FlatStrength', (value) => !value );

        defender.statuses.add( 'removeThatStatus', removeThatStatus, 100 );
        defender.statuses.add( 'applyThatStatus', applyThatStatus, 200 );
        defender.statuses.add( 'toggleApplyStatus', toggleApplyStatus, 300);

        attacker.abilities.add( 'AssignTestStatus', new AssignTestStatus());
        attacker.abilities.add( 'Sap Strength', new SapStrength() );
        attacker.execute( 'AssignTestStatus', defender );
        expect( defender.statuses.has( 'FlatStrength' )).to.be.true;

        attacker.execute( 'Sap Strength', defender );
        expect( defender.attributes.get( 'Strength' )).to.be.equal( 5 );

        defender.attributes.set( 'Strength', 10 );
        defender.statuses.remove( 'toggleApplyStatus' );
        attacker.execute( 'AssignTestStatus', defender );
        attacker.execute( 'Sap Strength' , defender );

        expect( defender.statuses.has( 'FlatStrength' )).to.be.true;
        expect( defender.attributes.get( 'Strength' )).to.be.equal( 5 );

        defender.statuses.remove( 'FlatStrength' );
        defender.attributes.set( 'Strength', 10 );
        defender.statuses.updatePriority( 'applyThatStatus', 1 );
        attacker.execute( 'AssignTestStatus' , defender );

        expect( defender.statuses.has( 'FlatStrength' )).to.be.true;

        attacker.execute( 'Sap Strength', defender );
        expect( defender.attributes.get( 'Strength' )).to.be.equal( 5 );
    });

    class TestAssignAttributes extends Ability{

        execute(source: Actor, target: Actor, data?: any): Ability {

            const check : Check = CheckExecutor.getInstance().generateCheck().setTarget(0);
            let e : Effect = new Effect();
            e.attributeAssignments.add( 'HP', () => 10 );

            let i : Interaction = new Interaction(source, target, check);
            i.effects.add( e );
            i.execute();

            return this;
        }
    }

    class TestAssignLabels extends Ability {

        execute( source : Actor, target : Actor, data? : any ) : Ability {

            const check : Check = CheckExecutor.getInstance().generateCheck().setTarget(0);
            let e : Effect = new Effect();
            e.labelAssignments.add( 'Label Value', () => 'Replacement Value' );

            let i : Interaction = new Interaction( source, target, check );
            i.effects.add( e );
            i.execute();

            return this;
        }
    }

    class TestAssignFlags extends Ability {

        execute(source: Actor, target: Actor, data?: any): Ability {

            const check : Check = CheckExecutor.getInstance().generateCheck().setTarget(0);
            let e : Effect = new Effect();
            e.flagAssignments.add( 'IsGolden', () => false );

            let i : Interaction = new Interaction( source, target, check );
            i.effects.add( e );
            i.execute();

            return this;
        }
    }

    class AssignTestStatus extends Ability {
        execute( source : Actor, target : Actor, data?: any): Ability {

            const check : Check = CheckExecutor.getInstance().generateCheck().setTarget(0);
            let e : Effect = new Effect();
            let testStatus : Status = new Status();
            testStatus.attributeAssignmentFilters.add( 'Strength', () => 5 );
            e.statusAssignments.add( 'FlatStrength', testStatus );

            let i : Interaction = new Interaction( source, target, check );
            i.effects.add( e );
            i.execute();

            return this;
        }
    }

    class RevokeTestStatus extends Ability {
       execute( source : Actor, target: Actor, data? : any ) : Ability {

           const check : Check = CheckExecutor.getInstance().generateCheck().setTarget(0);
           let e : Effect = new Effect();
           e.statusRemovals.add( 'Protect Strength' );

           let i : Interaction = new Interaction( source, target, check );
           i.effects.add( e );
           i.execute();

           return this;
       }
    }

    class SapStrength extends Ability {

        execute( source : Actor, target : Actor, data? : any ): Ability {

            const check : Check = CheckExecutor.getInstance().generateCheck().setTarget(0);
            let e : Effect = new Effect();
            e.attributeAssignments.add( 'Strength', () => 0 );

            let i : Interaction = new Interaction( source, target, check );
            i.effects.add( e );
            i.execute();

            return this;
        }
    }
});
