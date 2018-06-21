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

    it( 'should report on whether any items in the collection have an indicated key', () => {

        resetTest();

        map.add( 'value1', 1, 57 );
        map.add( 'value2', 2, 1837 );
        map.add( 'value3', 3, 382 );
        map.add( 'value4', 4, 38299 );
        map.add( 'value5', 5, 1122 );

        expect( map.has( 'value1' )).to.be.true;
        expect( map.has( 'value2' )).to.be.true;
        expect( map.has( 'value3' )).to.be.true;
        expect( map.has( 'value4' )).to.be.true;
        expect( map.has( 'value5' )).to.be.true;
        expect( map.has( 'value6' )).to.be.false;
    });

    it( 'should facilitate removal of items with the given key', () => {
        resetTest();

        map.add( 'value1', 5, 101 );

        expect( map.has( 'value1' )).to.be.true;
        expect( map.get( 'value1' )).to.be.equal( 5 );

        map.remove( 'value1' );

        expect( map.has( 'value1' )).to.be.false;
        expect( () => map.get( 'value1' )).to.throw;
        expect( () => map.getKeyPriority( 'value1' )).to.throw;
    });

    it( 'should throw an exception when attempting to remove a non-existing item', () => {
        resetTest();

        expect( () => map.remove( 'non-existing-item-key' ));
    });

    it( 'should return the keys of the entire collection as a flat array', () => {

        resetTest();

        map.add( 'value1', 1, 57 );
        map.add( 'value2', 2, 1837 );
        map.add( 'value3', 3, 382 );
        map.add( 'value4', 4, 38299 );
        map.add( 'value5', 5, 1122 );

        let foundNames : any = {
            'value1' : false,
            'value2' : false,
            'value3' : false,
            'value4' : false,
            'value5' : false
        };

        let keys : string[] = map.getKeys();

        keys.forEach( ( value : string ) => {

            foundNames[value] = true;
        });

        expect( foundNames.value1 ).to.be.true;
        expect( foundNames.value2 ).to.be.true;
        expect( foundNames.value3 ).to.be.true;
        expect( foundNames.value4 ).to.be.true;
        expect( foundNames.value5 ).to.be.true;
    });

    it( 'should return the keys of a specified priority tier as a flat array', () => {

        resetTest();

        map.add( 'value1', 1, 1 );
        map.add( 'value2', 2, 2 );
        map.add( 'value3', 3, 1 );
        map.add( 'value4', 4, 2 );
        map.add( 'value5', 5, 1 );

        let keys1 : string[] = map.getKeys( 1 );
        let keys2 : string[] = map.getKeys( 2 );

        let foundNames : any = {
            'value1' : false,
            'value2' : false,
            'value3' : false,
            'value4' : false,
            'value5' : false
        };

        keys1.forEach( ( value : string ) => {

            foundNames[value] = true;
        });

        expect( foundNames.value1 ).to.be.true;
        expect( foundNames.value2 ).to.be.false;
        expect( foundNames.value3 ).to.be.true;
        expect( foundNames.value4 ).to.be.false;
        expect( foundNames.value5 ).to.be.true;

        keys2.forEach( ( value : string) => {

           foundNames[value] = true;
        });

        expect( foundNames.value2 ).to.be.true;
        expect( foundNames.value4 ).to.be.true;
    });

    it( 'should allow forEach traversal of all keys contained within the collection', () => {

        resetTest();

        let foundNames : any = {
            'value1' : false,
            'value2' : false,
            'value3' : false,
            'value4' : false,
            'value5' : false
        };

        map.add( 'value1', 1, 1 );
        map.add( 'value2', 2, 2 );
        map.add( 'value3', 3, 1 );
        map.add( 'value4', 4, 2 );
        map.add( 'value5', 5, 1 );

        map.forEachKey( ( key : string ) => {
            foundNames[key] = true;
        });

        expect( foundNames.value1 ).to.be.true;
        expect( foundNames.value2 ).to.be.true;
        expect( foundNames.value3 ).to.be.true;
        expect( foundNames.value4 ).to.be.true;
        expect( foundNames.value5 ).to.be.true;
        expect( () => foundNames.value6 ).to.throw;
    });

    it( 'should allow forEach traversal of all keys within an indicated priority tier', () => {
        resetTest();

        let foundNames : any = {
            'value1' : false,
            'value2' : false,
            'value3' : false,
            'value4' : false,
            'value5' : false
        };

        map.add( 'value1', 1, 1 );
        map.add( 'value2', 2, 2 );
        map.add( 'value3', 3, 1 );
        map.add( 'value4', 4, 2 );
        map.add( 'value5', 5, 1 );

        map.forEachKey( ( key : string ) => {

            foundNames[key] = true;
        }, 1);

        expect( foundNames.value1 ).to.be.true;
        expect( foundNames.value2 ).to.be.false;
        expect( foundNames.value3 ).to.be.true;
        expect( foundNames.value4 ).to.be.false;
        expect( foundNames.value5 ).to.be.true;
        expect( () => foundNames.value6 ).to.throw;
    });

    it( 'should allow items, indicated by key, to be moved to a different priority tier', () => {

        resetTest();

        map.add( 'value1', 64, 15 );

        expect( map.getKeyPriority( 'value1' )).to.be.equal( 15 );
        expect( map.get( 'value1' )).to.be.equal( 64 );
        expect( map.getMapForPriority( 15 ).has( 'value1')).to.be.true;

        map.updatePriority( 'value1', 6 );

        expect( map.getKeyPriority( 'value1' )).to.be.equal( 6 );
        expect( map.get( 'value1' )).to.be.equal( 64 );
        expect( () => map.getMapForPriority( 15 )).to.throw;
        expect( map.getMapForPriority( 6 ).has( 'value1' )).to.be.true;
    });

    // @ STILL TODO - Prioritized Names (starting with length() tests, then the Number Map - I think there's tests, but double check that ish!
    it( 'should accurately report the length (item count) of the collection', () => {

        resetTest();

        map.add( 'value1', 1, 1 );
        map.add( 'value2', 2, 2 );
        map.add( 'value3', 3, 3 );
        map.add( 'value4', 4, 4 );
        map.add( 'value5', 5, 5 );

        expect( map.length ).to.be.equal( 5 );

        map.remove( 'value2' );
        map.updatePriority( 'value1', 2 );
        map.set( 'value3', 7 );
        map.add( 'value6', 6 );
        map.remove( 'value4' );

        expect( map.length ).to.be.equal( 4 );
    });

    it( 'should report on the priority of a given key', () => {

        resetTest();

        map.add( 'value1', 1, 1 );
        map.add( 'value2', 2, 2 );
        map.add( 'value3', 3, 3 );
        map.add( 'value4', 4, 4 );
        map.add( 'value5', 5, 5 );

        expect( map.getKeyPriority( 'value1' )).to.be.equal( 1 );
        expect( map.getKeyPriority( 'value2' )).to.be.equal( 2 );
        expect( map.getKeyPriority( 'value3' )).to.be.equal( 3 );
        expect( map.getKeyPriority( 'value4' )).to.be.equal( 4 );
        expect( map.getKeyPriority( 'value5' )).to.be.equal( 5 );
    });
});