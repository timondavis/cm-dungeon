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
    it('should retain an items priority when set() is invoked without specifying an ' +
        'explicit priority on an existing item', function () {
        resetTest();
        map.set('ToasterSetting', 5, 25);
        chai_1.expect(map.get('ToasterSetting')).to.be.equal(5);
        chai_1.expect(map.getMapForPriority(25).has('ToasterSetting')).to.be.true;
        chai_1.expect(map.getMapForPriority(25).get('ToasterSetting')).to.be.equal(5);
        map.set('ToasterSetting', 10);
        chai_1.expect(map.get('ToasterSetting')).to.be.equal(10);
        chai_1.expect(map.getMapForPriority(25).has('ToasterSetting')).to.be.true;
        chai_1.expect(map.getMapForPriority(25).get('ToasterSetting')).to.be.equal(10);
    });
    it('should allow for the explicit replacement of a value, automatically detecting priority', function () {
        resetTest();
        map.add('ToasterSetting', 5, 50);
        chai_1.expect(map.get('ToasterSetting')).to.be.equal(5);
        chai_1.expect(map.getMapForPriority(50).has('ToasterSetting')).to.be.true;
        chai_1.expect(map.getMapForPriority(50).get('ToasterSetting')).to.be.equal(5);
        map.replace('ToasterSetting', 10);
        chai_1.expect(map.get('ToasterSetting')).to.be.equal(10);
        chai_1.expect(map.getMapForPriority(50).has('ToasterSetting')).to.be.true;
        chai_1.expect(map.getMapForPriority(50).get('ToasterSetting')).to.be.equal(10);
    });
    it('should throw an exception when attempting to replace a non-existent value', function () {
        resetTest();
        chai_1.expect(function () { return map.replace('ToasterSetting', 5); }).to.throw;
    });
    it('should return values based on key, regardless of their priority', function () {
        map.add('FirstValue', 1, 103);
        map.add('SecondValue', 12, 150);
        map.add('ThirdValue', 106, 3000);
        chai_1.expect(map.get('FirstValue')).to.be.equal(1);
        chai_1.expect(map.get('SecondValue')).to.be.equal(12);
        chai_1.expect(map.get('ThirdValue')).to.be.equal(106);
    });
    it('should throw an exception when attempting to get an unregistered value', function () {
        resetTest();
        chai_1.expect(function () { return map.get('non-existing-key'); }).to.throw;
    });
    it('should return a map of key->value pairs for an indicated priority', function () {
        resetTest();
        map.add('ToasterSetting100', 5, 100);
        map.add('ToasterSetting1000', 7);
        chai_1.expect(map.getMapForPriority(100).get('ToasterSetting100')).to.be.equal(5);
        chai_1.expect(function () { return map.getMapForPriority(1000).get('ToasterSetting1000'); }).to.throw;
        chai_1.expect(function () { return map.getMapForPriority(100).get('ToasterSeting100'); }).to.throw;
        chai_1.expect(map.getMapForPriority(1000).get('ToasterSetting1000')).to.be.equal(7);
    });
    it('should throw an exception when attempting to access a priority map that does not exist', function () {
        resetTest();
        chai_1.expect(function () { return map.getMapForPriority(1000); }).to.throw;
    });
    it('should report back all values as a flat, generic collection on request', function () {
        resetTest();
        map.add('value1', 1, 57);
        map.add('value2', 2, 1837);
        map.add('value3', 3, 382);
        map.add('value4', 4, 38299);
        map.add('value5', 5, 1122);
        var collection = map.getAll();
        chai_1.expect(collection['value1']).to.be.equal(1);
        chai_1.expect(collection['value2']).to.be.equal(2);
        chai_1.expect(collection['value3']).to.be.equal(3);
        chai_1.expect(collection['value4']).to.be.equal(4);
        chai_1.expect(collection['value5']).to.be.equal(5);
    });
    it('should report back all values as a single NameMap on request', function () {
        resetTest();
        map.add('value1', 1, 57);
        map.add('value2', 2, 1837);
        map.add('value3', 3, 382);
        map.add('value4', 4, 38299);
        map.add('value5', 5, 1122);
        var nameMap = map.getAllAsNameMap();
        chai_1.expect(nameMap.get('value1')).to.be.equal(1);
        chai_1.expect(nameMap.get('value2')).to.be.equal(2);
        chai_1.expect(nameMap.get('value3')).to.be.equal(3);
        chai_1.expect(nameMap.get('value4')).to.be.equal(4);
        chai_1.expect(nameMap.get('value5')).to.be.equal(5);
    });
    it('should report on whether any items in the collection have an indicated key', function () {
        resetTest();
        map.add('value1', 1, 57);
        map.add('value2', 2, 1837);
        map.add('value3', 3, 382);
        map.add('value4', 4, 38299);
        map.add('value5', 5, 1122);
        chai_1.expect(map.has('value1')).to.be.true;
        chai_1.expect(map.has('value2')).to.be.true;
        chai_1.expect(map.has('value3')).to.be.true;
        chai_1.expect(map.has('value4')).to.be.true;
        chai_1.expect(map.has('value5')).to.be.true;
        chai_1.expect(map.has('value6')).to.be.false;
    });
    it('should facilitate removal of items with the given key', function () {
        resetTest();
        map.add('value1', 5, 101);
        chai_1.expect(map.has('value1')).to.be.true;
        chai_1.expect(map.get('value1')).to.be.equal(5);
        map.remove('value1');
        chai_1.expect(map.has('value1')).to.be.false;
        chai_1.expect(function () { return map.get('value1'); }).to.throw;
        chai_1.expect(function () { return map.getKeyPriority('value1'); }).to.throw;
    });
    it('should throw an exception when attempting to remove a non-existing item', function () {
        resetTest();
        chai_1.expect(function () { return map.remove('non-existing-item-key'); });
    });
    it('should return the keys of the entire collection as a flat array', function () {
        resetTest();
        map.add('value1', 1, 57);
        map.add('value2', 2, 1837);
        map.add('value3', 3, 382);
        map.add('value4', 4, 38299);
        map.add('value5', 5, 1122);
        var foundNames = {
            'value1': false,
            'value2': false,
            'value3': false,
            'value4': false,
            'value5': false
        };
        var keys = map.getKeys();
        keys.forEach(function (value) {
            foundNames[value] = true;
        });
        chai_1.expect(foundNames.value1).to.be.true;
        chai_1.expect(foundNames.value2).to.be.true;
        chai_1.expect(foundNames.value3).to.be.true;
        chai_1.expect(foundNames.value4).to.be.true;
        chai_1.expect(foundNames.value5).to.be.true;
    });
    it('should return the keys of a specified priority tier as a flat array', function () {
        resetTest();
        map.add('value1', 1, 1);
        map.add('value2', 2, 2);
        map.add('value3', 3, 1);
        map.add('value4', 4, 2);
        map.add('value5', 5, 1);
        var keys1 = map.getKeys(1);
        var keys2 = map.getKeys(2);
        var foundNames = {
            'value1': false,
            'value2': false,
            'value3': false,
            'value4': false,
            'value5': false
        };
        keys1.forEach(function (value) {
            foundNames[value] = true;
        });
        chai_1.expect(foundNames.value1).to.be.true;
        chai_1.expect(foundNames.value2).to.be.false;
        chai_1.expect(foundNames.value3).to.be.true;
        chai_1.expect(foundNames.value4).to.be.false;
        chai_1.expect(foundNames.value5).to.be.true;
        keys2.forEach(function (value) {
            foundNames[value] = true;
        });
        chai_1.expect(foundNames.value2).to.be.true;
        chai_1.expect(foundNames.value4).to.be.true;
    });
});
//# sourceMappingURL=PrioritizedNameMap.js.map