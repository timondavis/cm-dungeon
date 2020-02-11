import {expect} from 'chai';
import 'mocha';
import {Ability} from "../../Model/Ability/Ability";
import {Character} from "../../Model/Actor/Character";
import {Actor} from "../../Model/Actor";
import {D20_Attack} from "../../Model/Ability/d20/D20_Attack";
import {ActorProfile} from "../..";

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

    it( 'can be instantiated with an ActorProfile to assign default values', () => {

    	reset();

    	let str = Math.floor(Math.random() * 10);
    	let dex = Math.floor( Math.random() * 10);
    	let isJolly = true;
    	let isMad = false;
    	let name = 'john';
    	let origin = 'Cincinatti';

    	let profile = new ActorProfile({
			attributes: [
				{ key: 'STR', default: str},
				{ key: 'DEX', default: dex}
			],
			flags: [
				{ key: 'jolly', default: isJolly },
				{ key: 'mad', default: isMad }
			],
			labels: [
				{ key: 'name', default: name },
				{ key: 'origin', default: origin }
			]
		});

    	let a = new Actor(profile);
    	expect(a.attributes.get('STR')).to.be.equal(str);
		expect(a.attributes.get('DEX')).to.be.equal(dex);
		expect(a.flags.get('jolly')).to.be.equal(isJolly);
		expect(a.flags.get('mad')).to.be.equal(isMad);
		expect(a.labels.get('name')).to.be.equal(name);
		expect(a.labels.get('origin')).to.be.equal(origin);
	});
});