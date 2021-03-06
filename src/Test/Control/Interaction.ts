import {expect} from 'chai';
import 'mocha';

import {Actor} from "../../Model/Actor";
import {D20_Attack} from "../../Model/Ability/d20/D20_Attack";
import {Interaction} from "../../Control/Interaction";
import {CheckExecutor} from "cm-check/lib/Check/CheckExecutor";
import {Effect} from "../../Model/Effect";
import {Check} from "cm-check/lib/Check/Check";
import {Ability} from "../../Model/Ability/Ability";

describe( 'Interaction', () => {

    it( 'should be resolvable having, at a minimum, been generated by a source actor and aimed at a target actor', () => {

        let a = new Actor();
        let b = new Actor();

        a.attributes.add( 'HP', 10 );
        a.attributes.add( 'Strength', 14 );
        a.attributes.add( 'AC', 1 );

        b.attributes.add( 'HP', 10 );
        b.attributes.add( 'Strength', 14 );
        b.attributes.add( 'AC', 1 );

        let attack = new D20_Attack();

        expect (a.attributes.get( 'HP' )).to.be.equal(10);
        expect (b.attributes.get( 'HP' )).to.be.equal(10);

        a.abilities.add( 'attack', attack );
        b.abilities.add( 'attack', attack );

        a.execute( 'attack', b );

        expect( b.attributes.get( 'HP' )).to.be.lessThan(10);

        b.execute( 'attack', a );

        expect( a.attributes.get( 'HP' )).to.be.lessThan(10);
    });

    it( 'Is ready for use on instantiation', () => {
        let a = new Actor();
        let b = new Actor();

        a.attributes.add( 'HP', 10 );
        b.attributes.add( 'HP', 10 );

        let c = CheckExecutor.getInstance().generateCheck();
        c.addDie( 1, 6 );
        c.setTarget( 1 );

        let i = new Interaction(a, b, c);
        let e = new Effect();
        e.flagAssignments.add( 'hit', () => true );
        i.effects.add( e );
        expect( i.execute() ).to.be.true;
        expect( b.flags.get( 'hit' )).to.be.true;
        expect( () => a.flags.get( 'hit' )).to.throw;
    });

    it( 'employs pre-check callbacks', () => {
        let callbackTripped : boolean = false;
        let source : Actor = new Actor();
        let target : Actor = new Actor();
        let check  : Check = CheckExecutor.getInstance().generateCheck();

        source.labels.add( 'Name', 'Source' );
        target.labels.add( 'Name', 'Target' );
        check.setTarget(1000);
        check.addDie( 1, 2 );

        let i : Interaction = new Interaction( source, target, check );

        i.preCheckCallbacks.add( (s : Actor, t: Actor, c: Check) => {

            callbackTripped = true;

            expect( s.labels.get( 'Name' )).to.be.equal( 'Source' );
            expect( t.labels.get( 'Name' )).to.be.equal( 'Target' );
            expect( c.getTarget()).to.be.equal( 1000 );

            s.labels.replace( 'Name', 'Sam' );
            t.labels.replace( 'Name', 'Tom' );

            c.setTarget( 0 );
        });

        let ability : AppendNameAbility = new AppendNameAbility();
        ability.i = i;

        source.abilities.add( 'AppendName', ability );
        source.execute( 'AppendName', target );

        expect( source.labels.get( 'Name' )).to.be.equal( 'Sam' );
        expect( target.labels.get( 'Name' )).to.be.equal( 'Target-Updated' );
        expect( check.getTarget()).to.be.equal( 0 );
    });

    class AppendNameAbility extends Ability {

        public i : Interaction;

        execute( source : Actor, target : Actor, data? : any ): Ability {

            let e = new Effect();
            let name : string = target.labels.get( 'Name' );
            let newName : string = name + "-Updated";

            e.labelAssignments.add( 'Name', () => newName );
            this.i.effects.add(e);
            this.i.execute();

            return this;
        }
    }
});