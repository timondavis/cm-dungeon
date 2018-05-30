import 'mocha';
import {expect} from 'chai';
import {Actor} from "../../Model/Actor";
import {Effect} from "../../Model/Effect";
import {EffectRenderer} from "../../Control/EffectRenderer";
import {Status} from "../../Model/Status";
import {List} from "../../Model/List";

describe( 'EffectRenderer', () => {

    let attacker = new Actor();
    let defender = new Actor();
    let effects : List<Effect> = new List<Effect>();

    let rand = function( min : number, max : number ) {

        return Math.floor( Math.random() * max + min);
    };

    let initTest = () => {

        attacker = new Actor();
        defender = new Actor();
        effects = new List<Effect>();

        attacker.attributes.add( 'Strength',        10 );
        attacker.attributes.add( 'Dexterity',       10 );
        attacker.attributes.add( 'Constitution',    10 );
        attacker.attributes.add( 'Wisdom',          10 );
        attacker.attributes.add( 'Intelligence',    10 );
        attacker.attributes.add( 'Charisma',        10 );
        attacker.attributes.add( 'HP',              10 );
        attacker.attributes.add( 'MaxHP',           10 );
        attacker.attributes.add( 'AC',              10 );

        defender.attributes.add( 'Strength',        10 );
        defender.attributes.add( 'Dexterity',       10 );
        defender.attributes.add( 'Constitution',    10 );
        defender.attributes.add( 'Wisdom',          10 );
        defender.attributes.add( 'Intelligence',    10 );
        defender.attributes.add( 'Charisma',        10 );
        defender.attributes.add( 'HP',              10 );
        defender.attributes.add( 'MaxHP',           10 );
        defender.attributes.add( 'AC',              10 );
    };

    it( 'will process the attribute modifiers on an event and apply them to the target actor', () => {

        initTest();

        let randomNumber = rand(1, 10) * -1;

        let effect = new Effect();
        effect.attributeModifications.add( 'HP', randomNumber );
        effects.add( effect );

        EffectRenderer.renderEffects( defender, effects );

        expect( defender.attributes.get('HP') ).to.be.equal( 10 + randomNumber );
    });

    it( 'will process attribute value assignments and overrides from events, and apply to target actor', () => {

        initTest();

        let randomNumber = rand( 1, 10 );

        let effect = new Effect();
        effect.attributeAssignments.add( 'HP', randomNumber );
        effects.add( effect );

        EffectRenderer.renderEffects( defender, effects );

        expect( defender.attributes.get( 'HP' ) ).to.be.equal( randomNumber );
    });

    it( 'will remove attributes from the actor, based on directives from the effect', () => {

        initTest();

        expect( () => defender.attributes.get( 'Strength' )).not.to.throw;

        let effect = new Effect();
        effect.attributeRemovals.add( 'Strength' );
        effects.add( effect );

        EffectRenderer.renderEffects( defender, effects );

        expect( () => defender.attributes.get( 'Strength' )).to.throw;
    });

    it( 'will set (new or override) new flags on the actor, based on directives from the effect', () => {

        initTest();

        let effect = new Effect();
        effect.flagAssignments.add( 'IsDaring', true );
        effect.flagAssignments.add( 'IsCowardly', false );
        effects.add( effect );

        EffectRenderer.renderEffects( defender, effects );

        expect( defender.flags.get( 'IsDaring' )).to.be.true;
        expect( defender.flags.get( 'IsCowardly' )).to.be.false;

        effects = new List<Effect>();

        effect = new Effect();
        effect.flagAssignments.add( 'IsDaring', false );
        effects.add( effect );

        EffectRenderer.renderEffects( defender, effects );

        expect( defender.flags.get( 'IsDaring' )).to.be.false;
        expect( defender.flags.get( 'IsCowardly' )).to.be.false;
    });

    it( 'will remove flags from the actor, if they exist.  Orders to remove non-existing labels will be ignored', () => {

        initTest();

        defender.flags.add( 'RemoveMe!', true );

        expect( () => defender.flags.get( 'RemoveMe!' )).not.to.throw;

        let effect = new Effect();
        effect.flagRemovals.add( 'RemoveMe!' );
        effects.add( effect );

        EffectRenderer.renderEffects( defender, effects );

        expect( () => defender.flags.get( 'RemoveMe!' )).to.throw;
    });

    it( 'will set (new or override) new labels on the actor, based on directives from the effect', () => {

        initTest();

        let effect = new Effect();
        effect.labelAssignments.add( 'Class', 'Paladin' );
        effects.add( effect );

        EffectRenderer.renderEffects( defender, effects );

        expect( defender.labels.get( 'Class' )).to.be.equal( 'Paladin' );

        effect = new Effect();
        effect.labelAssignments.add( 'Class', 'Paladin/Ranger' );
        effects.add( effect );

        EffectRenderer.renderEffects( defender, effects );

        expect( defender.labels.get( 'Class' )).to.be.equal( 'Paladin/Ranger' );
    });

    it( 'will remove labels from the actor, if they exist.  Order to remove non-existing flags will be ignored.', () => {

        initTest();
        defender.labels.add( 'First Name', 'Smith' );

        expect( () => defender.labels.get( 'First Name' )).not.to.throw;
        expect( () => defender.labels.get( 'Last Name' )).to.throw;

        let effect = new Effect();
        effect.labelRemovals.add( 'First Name' );
        effect.labelRemovals.add( 'Last Name' );

        EffectRenderer.renderEffects( defender, effects );

        expect( () => defender.labels.get( 'First Name' )).to.throw;
        expect( () => defender.labels.get( 'Last Name' )).to.throw;
    });

    it( 'will set (new or override) new statuses on the actor, based on directives from the effect', () => {

        initTest();
        let s : Status = new Status();
        s.setOwner( defender );

        s.attributeEffectFilters.add( 'Intelligence', (value : number) => {
            return value - 2;
        });

        let effect = new Effect();
        effect.statusAssignments.add( 'Fear', s );
        effects.add( effect );

        EffectRenderer.renderEffects( defender, effects );

        let retrievedStatus = defender.statuses.get( 'Fear' );

        expect( () => retrievedStatus.attributeEffectFilters.get( 'Bravery' )).to.throw;
        expect( () => retrievedStatus.attributeEffectFilters.get( 'Fear' )).not.to.throw;
    });

    it( 'will remove statuses from the actor, if they exist.  Order to remove non-existing statuses will be ignored.', () => {

        initTest();
        let s1 : Status = new Status();
        let s2 : Status = new Status();
        s1.setOwner( defender );
        s2.setOwner( defender );

        s1.attributeEffectFilters.add( 'Intelligence', (value : number) => {
            return value - 2;
        });
        s2.attributeEffectFilters.add( 'Wisdom', (value : number) => {
            return value - 4;
        });

        let effect = new Effect();
        effect.statusAssignments.add( 'Fear', s1 );
        effect.statusAssignments.add( 'Wroth', s2 );
        effects.add( effect );

        EffectRenderer.renderEffects( defender, effects );

        let retrievedStatus = defender.statuses.get( 'Fear' );

        expect( () => retrievedStatus.attributeEffectFilters.get( 'Bravery' )).to.throw;
        expect( () => retrievedStatus.attributeEffectFilters.get( 'Fear' )).not.to.throw;
        expect( () => retrievedStatus.attributeEffectFilters.get( 'Wroth' )).not.to.throw;

        effects = new List<Effect>();

        effect = new Effect();
        effect.statusRemovals.add( 'Fear' );
        effect.statusRemovals.add( 'Potion of Strength' );
        effects.add( effect );

        expect( () => retrievedStatus.attributeEffectFilters.get( 'Bravery' )).to.throw;
        expect( () => retrievedStatus.attributeEffectFilters.get( 'Fear' )).to.throw;
        expect( () => retrievedStatus.attributeEffectFilters.get( 'Wroth' )).not.to.throw;
    });

    it( 'processes status effect filters for attributes', () => {

        initTest();

        let s = new Status();

        // TODO PICKUP HERE
    });
});