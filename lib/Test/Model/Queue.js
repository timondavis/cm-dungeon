"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("mocha");
var chai_1 = require("chai");
var Queue_1 = require("../../Model/Queue");
describe('Queue', function () {
    it('maintains sequence through queue and dequeue (FIFO)', function () {
        var q = new Queue_1.Queue();
        q.queue('Item 1');
        q.queue('Item 2');
        q.queue('Item 3');
        chai_1.expect(q.dequeue()).to.be.equal('Item 1');
        chai_1.expect(q.dequeue()).to.be.equal('Item 2');
        q.queue('Item 4');
        q.queue('Item 5');
        chai_1.expect(q.dequeue()).to.be.equal('Item 3');
        chai_1.expect(q.dequeue()).to.be.equal('Item 4');
        chai_1.expect(q.dequeue()).to.be.equal('Item 5');
    });
});
//# sourceMappingURL=Queue.js.map