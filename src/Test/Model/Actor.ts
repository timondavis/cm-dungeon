import {expect} from 'chai';
import 'mocha';
import {Ability} from "../../Model/Ability";
import {Character} from "../../Model/Character";

describe( 'Actor', function() {

    it( 'should allow attachment of new Abilities to the Actor', function() {

        let myAbility = new Ability();
        let linda = new Character();

        linda.addAbility( 'myAbility', myAbility );

        expect( linda.hasAbility( 'myAbility' )).to.be.true;
        expect( linda.hasAbility( 'notMyAbility' )).to.be.false;
    });

    it( 'should allow detachment of existing abilities to the actor.  Removal of non-existent abilities should throw no error', () => {

        let linda = new Character();
        let myAbility = new Ability();

        linda.addAbility( 'myAbility', myAbility ).removeAbility( 'myAbility' );

        expect( linda.hasAbility( 'myAbility' )).to.be.false;
    });

    it( 'should distinguish between Adding and Setting an ability (Add cannot replace, Set can)', () => {

        let linda = new Character();
        let ability1 = new Ability();
        let ability2 = new Ability();

        linda.addAbility( 'myAbility', ability1 ).removeAbility( 'myAbility' );

        expect(( () => linda.addAbility( 'myAbility', ability2 ))).to.throw;
        expect(( () => linda.setAbility( 'myAbility', ability2 ))).not.to.throw;
    });

    it( 'should deliver a list of abilities on the actor, on demand', () => {

        let linda = new Character();
        let ability1 = new Ability();
        let ability2 = new Ability();

        linda.addAbility( '1', ability1 ).addAbility( '2', ability2 );

        expect( linda.getAbilities() ).to.have.property( '1' );
        expect( linda.getAbilities() ).to.have.property( '2' );
    });
});