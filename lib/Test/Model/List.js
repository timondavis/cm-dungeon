"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var List_1 = require("../../Model/List");
require("mocha");
var chai_1 = require("chai");
describe('List', function () {
    var numberList = new List_1.List();
    it('should retain the order of items entered into the list', function () {
        numberList.clear();
        numberList.add(0);
        numberList.add(1);
        numberList.add(2);
        for (var i = 0; i < 3; i++) {
            chai_1.expect(numberList.get(i)).to.be.equal(i);
        }
    });
    it('should clear out the list on demand', function () {
        numberList.clear();
        numberList.add(1);
        numberList.add(2);
        numberList.add(3);
        numberList.clear();
        chai_1.expect(numberList.length).to.be.equal(0);
    });
    it('should facilitate removal of elements without disrupting the order of the list', function () {
        numberList.clear();
        numberList.add(0);
        numberList.add(5);
        numberList.add(1);
        numberList.add(2);
        numberList.remove(1);
        for (var i = 0; i < 3; i++) {
            chai_1.expect(numberList.get(i)).to.be.equal(i);
        }
    });
    it('should return items in the list by index id', function () {
        numberList.clear();
        numberList.add(7);
        numberList.add(6);
        numberList.add(5);
        for (var i = 0; i < 3; i++) {
            chai_1.expect(numberList.get(i)).to.be.equal(7 - i);
        }
    });
    it('should report the proper length for the collection', function () {
        numberList.clear();
        chai_1.expect(numberList.length).to.be.equal(0);
        numberList.add(8);
        numberList.add(14);
        numberList.add(7);
        chai_1.expect(numberList.length).to.be.equal(3);
        numberList.remove(2);
        numberList.remove(0);
        chai_1.expect(numberList.length).to.be.equal(1);
        numberList.clear();
        chai_1.expect(numberList.length).to.be.equal(0);
    });
});
//# sourceMappingURL=List.js.map