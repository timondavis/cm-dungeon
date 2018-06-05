import 'mocha';
import {expect} from 'chai';
import {PrioritizedNameMap} from "../../Model/PrioritizedNameMap";
import {NameMap} from "../../Model/NameMap";

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

    it( 'should retain an items priority when set() is invoked without specifying an ' +
        'explicit priority on an existing item', () => {

        resetTest();

        map.set( 'ToasterSetting', 5, 25 );
        expect( map.get( 'ToasterSetting' )).to.be.equal( 5 );
        expect( map.getMapForPriority( 25 ).has( 'ToasterSetting' )).to.be.true;
        expect( map.getMapForPriority( 25 ).get( 'ToasterSetting' )).to.be.equal( 5 );

        map.set( 'ToasterSetting', 10 );
        expect( map.get( 'ToasterSetting' )).to.be.equal( 10 );
        expect( map.getMapForPriority( 25 ).has( 'ToasterSetting' )).to.be.true;
        expect( map.getMapForPriority( 25 ).get( 'ToasterSetting' )).to.be.equal( 10 );
    });

    it( 'should allow for the explicit replacement of a value, automatically detecting priority', () => {

        resetTest();

        map.add( 'ToasterSetting', 5, 50 );
        expect( map.get( 'ToasterSetting' )).to.be.equal( 5 );
        expect( map.getMapForPriority( 50 ).has( 'ToasterSetting' )).to.be.true;
        expect( map.getMapForPriority( 50 ).get( 'ToasterSetting' )).to.be.equal( 5 );

        map.replace( 'ToasterSetting', 10 );
        expect( map.get( 'ToasterSetting' )).to.be.equal( 10 );
        expect( map.getMapForPriority( 50 ).has( 'ToasterSetting' )).to.be.true;
        expect( map.getMapForPriority( 50 ).get( 'ToasterSetting' )).to.be.equal( 10 );
    });

    it( 'should throw an exception when attempting to replace a non-existent value', () => {

        resetTest();

        expect( () => map.replace( 'ToasterSetting', 5 )).to.throw;
    });

    it( 'should return values based on key, regardless of their priority', () => {

        map.add( 'FirstValue', 1, 103 );
        map.add( 'SecondValue', 12, 150 );
        map.add( 'ThirdValue', 106, 3000 );

        expect( map.get( 'FirstValue' )).to.be.equal( 1 );
        expect( map.get( 'SecondValue' )).to.be.equal( 12 );
        expect( map.get( 'ThirdValue' )).to.be.equal( 106 );
    });

    it( 'should throw an exception when attempting to get an unregistered value', () => {

        resetTest();

        expect( () => map.get( 'non-existing-key' )).to.throw;
    });

    it( 'should return a map of key->value pairs for an indicated priority', () => {

        resetTest();

        map.add( 'ToasterSetting100', 5, 100 );
        map.add( 'ToasterSetting1000', 7 );

        expect( map.getMapForPriority( 100 ).get( 'ToasterSetting100')).to.be.equal( 5 );
        expect( () => map.getMapForPriority( 1000 ).get( 'ToasterSetting1000' )).to.throw;

        expect( () => map.getMapForPriority( 100 ).get( 'ToasterSeting100' )).to.throw;
        expect( map.getMapForPriority( 1000 ).get( 'ToasterSetting1000' )).to.be.equal( 7 );
    });

    it( 'should throw an exception when attempting to access a priority map that does not exist', () => {

        resetTest();

        expect( () => map.getMapForPriority( 1000 )).to.throw;
    });

    it( 'should report back all values as a flat, generic collection on request', () => {

        resetTest();

        map.add( 'value1', 1, 57 );
        map.add( 'value2', 2, 1837 );
        map.add( 'value3', 3, 382 );
        map.add( 'value4', 4, 38299 );
        map.add( 'value5', 5, 1122 );

        let collection : { [key:string] : number } = map.getAll();

        expect( collection['value1'] ).to.be.equal( 1 );
        expect( collection['value2'] ).to.be.equal( 2 );
        expect( collection['value3'] ).to.be.equal( 3 );
        expect( collection['value4'] ).to.be.equal( 4 );
        expect( collection['value5'] ).to.be.equal( 5 );
    });

    it( 'should report back all values as a single NameMap on request', () => {

        resetTest();

        map.add( 'value1', 1, 57 );
        map.add( 'value2', 2, 1837 );
        map.add( 'value3', 3, 382 );
        map.add( 'value4', 4, 38299 );
        map.add( 'value5', 5, 1122 );

        let nameMap : NameMap<number> = map.getAllAsNameMap();

        expect( nameMap.get( 'value1' )).to.be.equal( 1 );
        expect( nameMap.get( 'value2' )).to.be.equal( 2 );
        expect( nameMap.get( 'value3' )).to.be.equal( 3 );
        expect( nameMap.get( 'value4' )).to.be.equal( 4 );
        expect( nameMap.get( 'value5' )).to.be.equal( 5 );
    });

});