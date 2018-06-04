import 'mocha';
import {expect} from 'chai';
import {PrioritizedNameMap} from "../../Model/PrioritizedNameMap";

describe( 'PrioritizedNameMap', () => {

    let map : PrioritizedNameMap<number> = new PrioritizedNameMap<number>();

    function resetTest() {

        map = new PrioritizedNameMap<number>();
    }


    it( 'should allow new items to be added with distinct priority assignment', () => {

        resetTest();

        map.add( 'one', 1, 101 );

        expect( map.get( 'one' ) ).to.be.equal( 1 );
        expect( map.getMapForPriority( 101 ).get( 'one' )).to.be.equal( 1 );

    });

    it( 'should automatically assign a priority of 1000 to items added without specifying priority', () => {

        resetTest();

        map.add( 'one', 1 );
        expect( map.getMapForPriority( 1000 ).get( 'one' )).to.be.equal( 1 );
    });

    it( 'should allow values to be added -or- overridden with the "set" method', () => {

        resetTest();

        map.set( 'ToasterSetting', 5 );
        expect( map.get( 'ToasterSetting' )).to.be.equal( 5 );

        map.set( 'ToasterSetting', 1 );
        expect( map.get( 'ToasterSetting' )).to.be.equal( 1 );
    });

    it( 'should allow priority to be changed with the set method', () => {

        resetTest();

        map.set( 'ToasterSetting', 5 );
        expect( map.get( 'ToasterSetting' )).to.be.equal( 5 );
        expect( map.getMapForPriority( 1000 ).has( 'ToasterSetting' )).to.be.true;
        expect( map.getMapForPriority( 1000 ).get( 'ToasterSetting' )).to.be.equal( 5 );

        map.set( 'ToasterSetting', 7, 10 );
        expect( map.get( 'ToasterSetting' )).to.be.equal( 7 );

        expect( map.getMapForPriority( 10 ).has( 'ToasterSetting' ));
        expect( map.getMapForPriority( 10 ).get( 'ToasterSetting' )).to.be.equal( 7 );

        expect( map.getMapForPriority( 1000 ).has( 'ToasterSetting' )).to.be.false;
        expect( () => map.getMapForPriority( 1000 ).get( 'ToasterSetting' )).to.throw;
    });
});