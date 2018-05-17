import 'mocha';
import {expect} from 'chai';

import {NameMap} from "../../Model/NameMap";
import {Actor} from "../../Model/Actor";

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

    it ( 'facilitates lassiez-faire additions on keys that may or may not exists, if preffered,', () => {

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
});