import 'mocha';
import {expect} from 'chai';
import {Actor} from "../../Model/Actor";
import {Effect} from "../../Model/Effect";
import {EffectRenderer} from "../../Control/EffectRenderer";

describe( 'EffectRenderer', () => {

    let attacker = new Actor();
    let defender = new Actor();
    let effects : Effect[] = [];

    let rand = function( min : number, max : number ) {

        return Math.floor( Math.random() * max + min);
    };

    let initTest = () => {

        attacker = new Actor();
        defender = new Actor();
        effects = [];

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
        effects.push( effect );

        EffectRenderer.renderEffects( defender, effects );

        expect( defender.attributes.get('HP') ).to.be.equal( 10 + randomNumber );
    });

    it( 'will process attribute value assignments and overrides from events, and apply to target actor', () => {

        initTest();

        let randomNumber = rand( 1, 10 );

        let effect = new Effect();
        effect.attributeAssignments.add( 'HP', randomNumber );
        effects.push( effect );

        EffectRenderer.renderEffects( defender, effects );

        expect( defender.attributes.get( 'HP' ) ).to.be.equal( randomNumber );
    });

    it( 'will remove attributes from the actor, based on directives from the effect', () => {

        initTest();

        expect( () => defender.attributes.get( 'Strength' )).not.to.throw;

        let effect = new Effect();
        effect.attributeRemovals.add( 'Strength' );
        effects.push( effect );

        EffectRenderer.renderEffects( defender, effects );

        expect( () => defender.attributes.get( 'Strength' )).to.throw;
    });

    it( 'will set (new or override) new labels on the actor, based on directives from the effect', () => {

        initTest();

        let effect = new Effect();
        effect.flagAssignments.add( 'IsDaring', true );
        effect.flagAssignments.add( 'IsCowardly', false );
        effects.push( effect );

        EffectRenderer.renderEffects( defender, effects );

        expect( defender.flags.get( 'IsDaring' )).to.be.true;
        expect( defender.flags.get( 'IsCowardly' )).to.be.false;

        effects = [];

        effect = new Effect();
        effect.flagAssignments.add( 'IsDaring', false );
        effects.push( effect );

        EffectRenderer.renderEffects( defender, effects );

        expect( defender.flags.get( 'IsDaring' )).to.be.false;
        expect( defender.flags.get( 'IsCowardly' )).to.be.false;
    });

    it( 'will remove labels from the actor, if they exist.  Orders to remove non-existing labels will be ignored', () => {

        initTest();

        defender.flags.add( 'RemoveMe!', true );

        expect( defender.flags.get( 'RemoveMe!' )).to.be.true;

        let effect = new Effect();
        effect.flagRemovals.add( 'RemoveMe!' );
        effects.push( effect );

        EffectRenderer.renderEffects( defender, effects );

        expect( defender.flags.get( 'RemoveMe!' )).to.throw;
    });

    it( 'will set (new or override) new flags on the actor, based on directives from the effect' );
    it( 'will remove flags from the actor, if they exist.  Order to remove non-existing flags will be ignored.' );
    it( 'will set (new or override) new statuses on the actor, based on directives from the effect' );
    it( 'will remove statuses from the actor, if they exist.  Order to remove non-existing statuses will be ignored.' );
});