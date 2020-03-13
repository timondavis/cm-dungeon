import 'mocha';
import {expect} from 'chai';

import {NameMap} from "../../Model/NameMap";
import {Actor} from "../../Model/Entity/Actor";

describe( 'NameMap', () => {

    /**
     * Sample class used to fulfill generic tests.
     */
    class Sample {
       public name : string;

       constructor( name : string ) {
           this.name = name;
       }
    }

    /**
     * Default map container, and sample instances;
     * @type {NameMap<any>}
     */
    let map : NameMap<Sample>;

    let s1 = new Sample( 's1' );
    let s2 = new Sample( 's2' );
    let s3 = new Sample( 's3' );

    it( 'facilitates strict addition of new items, throwing exceptions on override attempts', () => {

        map = new NameMap();

        map.add( s1.name, s1 );

        expect( () => map.add( s1.name, s2 ) ).to.throw;

        map.add( s2.name, s2 );

        expect( Object.keys(map.getAll())).to.have.lengthOf(2);
    });

    it ( 'facilitates lassiez-faire additions on keys that may or may not exist, if preferred,', () => {

        map = new NameMap();

        map.set( s1.name, s1 );
        map.set( s2.name, s2 );
        map.set( s1.name, s3 );

        expect( map.get(s1.name).name ).to.be.equal( s3.name );
        expect( map.get(s2.name).name ).to.be.equal( s2.name );
    });

    it( 'facilitates overwrite-only additions on existing keys, throwing an error if the key does not exist', () => {

        map = new NameMap();

        map.add( s1.name, s1 );
        map.replace( s1.name, s2 );

        expect((() => map.replace(s3.name, s3))).to.throw;
        expect(map.get(s1.name).name ).to.be.equal(s2.name);
    });

    it( 'will report on whether an item with the given name exists in the collection or not', () => {

        map = new NameMap();

        map.add( s1.name, s1 );

        expect( map.has(s1.name) ).to.be.true;
        expect( map.has(s2.name) ).to.be.false;
    });

    it ( 'will allow a single item to be removed by key', () => {

        map = new NameMap();

        map.add( s1.name, s1 );
        map.add( s2.name, s2 );
        map.add( s3.name, s3 );

        map.remove( s1.name );

        expect( map.has( s1.name )).to.be.false;
        expect( map.has( s2.name )).to.be.true;
        expect( map.has( s3.name )).to.be.true;
    });

    it( 'will allow the retrieval of single items by key', () => {

        map = new NameMap();

        map.add( s1.name, s1 );
        map.add( s2.name, s2 );
        map.add( s3.name, s3 );

        expect( map.get(s2.name).name ).to.be.equal(s2.name);
    });

    it( 'will allow the retrieval of the entire map collection (as properties on an object)', () => {

        map = new NameMap();

        map.add( s1.name, s1 );
        map.add( s2.name, s2 );
        map.add( s3.name, s3 );

        const collection = map.getAll();

        expect( collection[s1.name] ).to.be.equal(s1);
        expect( collection[s2.name] ).to.be.equal(s2);
        expect( collection[s3.name] ).to.be.equal(s3);
    });

    it( 'will return the keys in the map as an array', () => {

        map = new NameMap();

        map.add( s1.name, s1 );
        map.add( s2.name, s2 );
        map.add( s3.name, s3 );

        let keys : string[] = map.getKeys();

        expect( keys[0] == s1.name );
        expect( keys[1] == s2.name );
        expect( keys[2] == s3.name );
    });

    it( 'supplies an foreach function which takes a callback function, ' +
        'which can be used to process over the entire collection', () => {

        map = new NameMap();

        map.add(s1.name, s1);
        map.add(s2.name, s2);
        map.add(s3.name, s3);

        map.forEachKey((key : string) => {

            let s : Sample = map.get(key);
            expect( s.name ).to.be.equal( key );
        });
    })

    it ( 'will return contents as an array if asked', () => {

        map = new NameMap();

        map.add( s1.name, s1 );
        map.add( s2.name, s2 );
        map.add( s3.name, s3 );

        map.remove( s1.name );

        let mapArray= map.toArray();

        expect(mapArray.length).to.be.equal(2);
        expect(mapArray[0]).to.be.equal(s2);
        expect(mapArray[1]).to.be.equal(s3);
    });
});