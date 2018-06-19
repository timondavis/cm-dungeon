import {expect} from 'chai';
import 'mocha';
import {Ability} from "../../Model/Ability/Ability";
import {Character} from "../../Model/Character";
import {Actor} from "../../Model/Actor";
import {D20_Attack} from "../../Model/Ability/d20/D20_Attack";

describe( 'Actor', function() {

    let a : Actor = new Actor();
    let b : Actor = new Actor();

    function reset() {
        a = new Actor();
        a.attributes.add( 'AC', 0 );
        a.attributes.add( 'HP', 10 );

        b = new Actor();
        b.attributes.add( 'AC', 0 );
        b.attributes.add( 'HP', 10 );
    }

    it( 'stores numerically based attributes about the actor, referenced by name', () => {

        reset();

        a.attributes.add( 'Strength', 5 );
        expect(a.attributes.get( 'Strength' )).to.be.equal( 5 );
    });

    it( 'retains abilities, which can be used to interact with the world around the actor', () => {

        reset();

        let attackAbility : D20_Attack = new D20_Attack();
        a.abilities.add( 'Attack', attackAbility );
        a.abilities.get( 'Attack' ).execute( a, b );

        expect( b.attributes.get( 'HP' )).to.be.lessThan( 10 );
    });
});