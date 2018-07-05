import 'mocha';
import {expect} from 'chai';
import {Queue} from "../../Model/Queue";
import {Logger} from "../../Log/Logger";
import {LogType} from "../../Log/LogType";

describe( 'ConsoleLog', () => {

    it( 'respects defined capacity and maintains queue order', () => {

        let logger = Logger.getInstance();
        logger.getLog().capacity = 3;
        logger.getLog().clear();

        logger.log( 'Line 1' );
        logger.log( 'Line 2' );
        logger.log( 'Line 3' );

        expect( logger.getLog().getMessage(0 )).to.be.equal( 'Line 1' );
        expect( logger.getLog().getMessage(1 )).to.be.equal( 'Line 2' );
        expect( logger.getLog().getMessage(2 )).to.be.equal( 'Line 3' );

        logger.log( 'Line 4' );
        logger.log( 'Line 5' );

        expect( logger.getLog().getMessage( 0 )).to.be.equal( 'Line 3' );
        expect( logger.getLog().getMessage( 1 )).to.be.equal( 'Line 4' );
        expect( logger.getLog().getMessage( 2 )).to.be.equal( 'Line 5' );
    });

    it( 'tracks multiple log types', () => {

        let logger = Logger.getInstance();

        logger.getLog().clear();
        logger.log( 'Check Line 1', LogType.CHECK );
        logger.getLog( LogType.CHECK ).clear();

        logger.log( 'Default Line 1' );
        logger.log( 'Check Line 1', LogType.CHECK );
        logger.log( 'Default Line 2' );
        logger.log( 'Check Line 2', LogType.CHECK );

        expect( logger.getLog().getMessage(0)).to.be.equal( 'Default Line 1' );
        expect( logger.getLog().getMessage(1)).to.be.equal( 'Default Line 2' );

        expect( logger.getLog( LogType.CHECK ).getMessage( 0 )).to.be.equal( 'Check Line 1' );
        expect( logger.getLog( LogType.CHECK ).getMessage( 1 )).to.be.equal( 'Check Line 2' );

    });
});