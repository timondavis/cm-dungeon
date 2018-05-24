import {List} from "../../Model/List";
import 'mocha';
import {expect} from 'chai';

describe ('List', () => {

    let numberList : List<number> = new List<number>();

    it( 'should retain the order of items entered into the list', () => {

        numberList.clear();

        numberList.add( 0 );
        numberList.add( 1 );
        numberList.add( 2 );

        for( let i = 0 ; i < 3 ; i++ ) {

            expect( numberList.get( i ) ).to.be.equal( i );
        }
    });

    it( 'should clear out the list on demand', () => {

        numberList.clear();

        numberList.add( 1 );
        numberList.add( 2 );
        numberList.add( 3 );

        numberList.clear();

        expect( numberList.length ).to.be.equal( 0 );
    });

    it( 'should facilitate removal of elements without disrupting the order of the list', () => {

        numberList.clear();

        numberList.add( 0 );
        numberList.add( 5 );
        numberList.add( 1 );
        numberList.add( 2 );

        numberList.remove( 1 );

        for( let i = 0 ; i < 3 ; i++ ) {
            expect( numberList.get( i )).to.be.equal( i );
        }
    });

    it( 'should return items in the list by index id', () => {

        numberList.clear();

        numberList.add( 7 );
        numberList.add( 6 );
        numberList.add( 5 );

        for ( let i = 0 ; i < 3 ; i++ ) {

            expect( numberList.get( i )).to.be.equal( 7 - i );
        }
    });

    it ( 'should report the proper length for the collection', () => {

        numberList.clear();

        expect( numberList.length ).to.be.equal( 0 );

        numberList.add( 8 );
        numberList.add( 14 );
        numberList.add( 7 );

        expect( numberList.length ).to.be.equal( 3 );

        numberList.remove( 2 );
        numberList.remove( 0 );

        expect( numberList.length ).to.be.equal( 1 );

        numberList.clear();

        expect( numberList.length ).to.be.equal( 0 );
    });
});
