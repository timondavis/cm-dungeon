"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("mocha");
var chai_1 = require("chai");
var Logger_1 = require("../../Log/Logger");
var LogType_1 = require("../../Log/LogType");
describe('ConsoleLog', function () {
    it('respects defined capacity and maintains queue order', function () {
        var logger = Logger_1.Logger.getInstance();
        logger.getLog().capacity = 3;
        logger.log('Line 1');
        logger.log('Line 2');
        logger.log('Line 3');
        chai_1.expect(logger.getLog().getMessage(0)).to.be.equal('Line 1');
        chai_1.expect(logger.getLog().getMessage(1)).to.be.equal('Line 2');
        chai_1.expect(logger.getLog().getMessage(2)).to.be.equal('Line 3');
        logger.log('Line 4');
        logger.log('Line 5');
        chai_1.expect(logger.getLog().getMessage(0)).to.be.equal('Line 3');
        chai_1.expect(logger.getLog().getMessage(1)).to.be.equal('Line 4');
        chai_1.expect(logger.getLog().getMessage(2)).to.be.equal('Line 5');
    });
    it('tracks multiple log types', function () {
        var logger = Logger_1.Logger.getInstance();
        logger.log('Default Line 1');
        logger.log('Check Line 1', LogType_1.LogType.CHECK);
        logger.log('Default Line 2');
        logger.log('Check Line 2', LogType_1.LogType.CHECK);
        chai_1.expect(logger.getLog().getMessage(0)).to.be.equal('Default Line 1');
        chai_1.expect(logger.getLog().getMessage(1)).to.be.equal('Default Line 2');
        chai_1.expect(logger.getLog(LogType_1.LogType.CHECK).getMessage(0)).to.be.equal('Check Line 1');
        chai_1.expect(logger.getLog(LogType_1.LogType.CHECK).getMessage(1)).to.be.equal('Check Line 2');
    });
});
//# sourceMappingURL=ConsoleLog.js.map