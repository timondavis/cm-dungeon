import 'mocha';
import {expect} from 'chai';
import {Actor} from "../../Model/Actor";
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
        effect.attributeModifications.add('HP', randomNumber);
        effects.add(effect);

        EffectRenderer.renderEffects(defender, effects);

        expect(defender.attributes.get('HP')).to.be.equal(10 + randomNumber);
    });

    it('will process attribute value assignments and overrides from events, and apply to target actor', () => {

        initTest();

        let randomNumber = rand(1, 10);

        let effect = new Effect();
        effect.attributeAssignments.add('HP', randomNumber);
        effects.add(effect);

        EffectRenderer.renderEffects(defender, effects);

        expect(defender.attributes.get('HP')).to.be.equal(randomNumber);
    });

    it('will set (new or override) new flags on the actor, based on directives from the effect', () => {

        initTest();

        let effect = new Effect();
        effect.flagAssignments.add('IsDaring', true);
        effect.flagAssignments.add('IsCowardly', false);
        effects.add(effect);

        EffectRenderer.renderEffects(defender, effects);

        expect(defender.flags.get('IsDaring')).to.be.true;
        expect(defender.flags.get('IsCowardly')).to.be.false;

        effects = new List<Effect>();

        effect = new Effect();
        effect.flagAssignments.add('IsDaring', false);
        effects.add(effect);

        EffectRenderer.renderEffects(defender, effects);

        expect(defender.flags.get('IsDaring')).to.be.false;
        expect(defender.flags.get('IsCowardly')).to.be.false;
    });

    it('will set (new or override) new labels on the actor, based on directives from the effect', () => {

        initTest();

        let effect = new Effect();
        effect.labelAssignments.add('Class', 'Paladin');
        effects.add(effect);

        EffectRenderer.renderEffects(defender, effects);

        expect(defender.labels.get('Class')).to.be.equal('Paladin');

        effect = new Effect();
        effect.labelAssignments.add('Class', 'Paladin/Ranger');
        effects.add(effect);

        EffectRenderer.renderEffects(defender, effects);

        expect(defender.labels.get('Class')).to.be.equal('Paladin/Ranger');
    });

    it('will set (new or override) new statuses on the actor, based on directives from the effect', () => {

        initTest();
        let s: Status = new Status();
        s.setOwner(defender);

        s.attributeEffectFilters.add('Intelligence', (value: number) => {
            return value - 2;
        });

        let effect = new Effect();
        effect.statusAssignments.add('Fear', s);
        effects.add(effect);

        EffectRenderer.renderEffects(defender, effects);

        let retrievedStatus = defender.statuses.get('Fear');

        expect(() => retrievedStatus.attributeEffectFilters.get('Bravery')).to.throw;
        expect(() => retrievedStatus.attributeEffectFilters.get('Fear')).not.to.throw;
    });

    it('will remove statuses from the actor, if they exist.  Order to remove non-existing statuses will be ignored.', () => {

        initTest();
        let s1: Status = new Status();
        let s2: Status = new Status();
        s1.setOwner(defender);
        s2.setOwner(defender);

        s1.attributeEffectFilters.add('Intelligence', (value: number) => {
            return value - 2;
        });
        s2.attributeEffectFilters.add('Wisdom', (value: number) => {
            return value - 4;
        });

        let effect = new Effect();
        effect.statusAssignments.add('Fear', s1);
        effect.statusAssignments.add('Wroth', s2);
        effects.add(effect);

        EffectRenderer.renderEffects(defender, effects);

        let retrievedStatus = defender.statuses.get('Fear');

        expect(() => retrievedStatus.attributeEffectFilters.get('Bravery')).to.throw;
        expect(() => retrievedStatus.attributeEffectFilters.get('Fear')).not.to.throw;
        expect(() => retrievedStatus.attributeEffectFilters.get('Wroth')).not.to.throw;

        effects = new List<Effect>();

        effect = new Effect();
        effect.statusRemovals.add('Fear');
        effect.statusRemovals.add('Potion of Strength');
        effects.add(effect);

        expect(() => retrievedStatus.attributeEffectFilters.get('Bravery')).to.throw;
        expect(() => retrievedStatus.attributeEffectFilters.get('Fear')).to.throw;
        expect(() => retrievedStatus.attributeEffectFilters.get('Wroth')).not.to.throw;
    });

    it('processes status effect filters for attributes', () => {

        initTest();

        let invincibilityStatus = new Status();

        // Always return a delta of 0 when affecting HP
        invincibilityStatus.attributeEffectFilters.add('HP', () => {
            return 0;
        });

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

        damageToZero.attributeEffectFilters.add('HP', ( modifierValue : number ) => {

            return 0;
        });

        addTwoToAllIncomingDamage.attributeEffectFilters.add('HP', (modifierValue: number) => {

            return modifierValue -2;
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

    class TestAssignAttributes extends Ability{

        execute(source: Actor, target: Actor, data?: any): Ability {

            const check : Check = CheckExecutor.getInstance().generateCheck().setTarget(0);
            let e : Effect = new Effect();
            e.attributeAssignments.add( 'HP', 10 );

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
            e.labelAssignments.add( 'Label Value', 'Replacement Value' );

            let i : Interaction = new Interaction( source, target, check );
            i.effects.add( e );
            i.execute();

            return this;
        }
    }
});
