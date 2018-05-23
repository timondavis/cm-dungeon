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
        effect.modifyAttributes.add( 'HP', randomNumber );
        effects.push( effect );

        EffectRenderer.renderEffects( defender, effects );

        expect( defender.attributes.get('HP') ).to.be.equal( 10 + randomNumber );
    });

    it( 'will process attribute value assignments and overrides from events, and apply to target actor', () => {

        initTest();

        let randomNumber = rand( 1, 10 );

        let effect = new Effect();
        effect.setAttributes.add( 'HP', randomNumber );
        effects.push( effect );

        EffectRenderer.renderEffects( defender, effects );

        expect( defender.attributes.get( 'HP' ) ).to.be.equal( randomNumber );
    });

    it ( 'will remove attributes from the actor, based on directives from the event', () => {

        initTest();

        let effect = new Effect();
        effect.removeAttributes.add( 'Strength' );
    });
});