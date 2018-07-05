import 'mocha';
import {expect} from 'chai';
import {Queue} from "../../Model/Queue";

describe( 'Queue', () => {

    it( 'maintains sequence through queue and dequeue (FIFO)', () => {

        let q : Queue<string> = new Queue<string>();

        q.queue( 'Item 1' );
        q.queue( 'Item 2' );
        q.queue( 'Item 3' );

        expect( q.dequeue() ).to.be.equal( 'Item 1' );
        expect( q.dequeue() ).to.be.equal( 'Item 2' );

        q.queue( 'Item 4' );
        q.queue( 'Item 5' );

        expect( q.dequeue() ).to.be.equal( 'Item 3' );
        expect( q.dequeue() ).to.be.equal( 'Item 4' );
        expect( q.dequeue() ).to.be.equal( 'Item 5' );
    })
});