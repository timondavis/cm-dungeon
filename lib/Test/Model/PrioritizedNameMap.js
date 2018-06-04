"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("mocha");
var chai_1 = require("chai");
var PrioritizedNameMap_1 = require("../../Model/PrioritizedNameMap");
describe('PrioritizedNameMap', function () {
    var map = new PrioritizedNameMap_1.PrioritizedNameMap();
    function resetTest() {
        map = new PrioritizedNameMap_1.PrioritizedNameMap();
    }
    it('should allow new items to be added with distinct priority assignment', function () {
        resetTest();
        map.add('one', 1, 101);
        chai_1.expect(map.get('one')).to.be.equal(1);
        chai_1.expect(map.getMapForPriority(101).get('one')).to.be.equal(1);
    });
    it('should automatically assign a priority of 1000 to items added without specifying priority', function () {
        resetTest();
        map.add('one', 1);
        chai_1.expect(map.getMapForPriority(1000).get('one')).to.be.equal(1);
    });
    it('should allow values to be added -or- overridden with the "set" method', function () {
        resetTest();
        map.set('ToasterSetting', 5);
        chai_1.expect(map.get('ToasterSetting')).to.be.equal(5);
        map.set('ToasterSetting', 1);
        chai_1.expect(map.get('ToasterSetting')).to.be.equal(1);
    });
    it('should allow priority to be changed with the set method', function () {
        resetTest();
        map.set('ToasterSetting', 5);
        chai_1.expect(map.get('ToasterSetting')).to.be.equal(5);
        chai_1.expect(map.getMapForPriority(1000).has('ToasterSetting')).to.be.true;
        chai_1.expect(map.getMapForPriority(1000).get('ToasterSetting')).to.be.equal(5);
        map.set('ToasterSetting', 7, 10);
        chai_1.expect(map.get('ToasterSetting')).to.be.equal(7);
        chai_1.expect(map.getMapForPriority(10).has('ToasterSetting'));
        chai_1.expect(map.getMapForPriority(10).get('ToasterSetting')).to.be.equal(7);
        chai_1.expect(map.getMapForPriority(1000).has('ToasterSetting')).to.be.false;
        chai_1.expect(function () { return map.getMapForPriority(1000).get('ToasterSetting'); }).to.throw;
    });
});
//# sourceMappingURL=PrioritizedNameMap.js.map