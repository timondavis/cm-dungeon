"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("mocha");
var chai_1 = require("chai");
var NameMap_1 = require("../../Model/NameMap");
describe('NameMap', function () {
    /**
     * Sample class used to fulfill generic tests.
     */
    var Sample = /** @class */ (function () {
        function Sample(name) {
            this.name = name;
        }
        return Sample;
    }());
    /**
     * Default map container, and sample instances;
     * @type {NameMap<any>}
     */
    var map;
    var s1 = new Sample('s1');
    var s2 = new Sample('s2');
    var s3 = new Sample('s3');
    it('facilitates strict addition of new items, throwing exceptions on override attempts', function () {
        map = new NameMap_1.NameMap();
        map.add(s1.name, s1);
        chai_1.expect(function () { return map.add(s1.name, s2); }).to.throw;
        map.add(s2.name, s2);
        chai_1.expect(Object.keys(map.getAll())).to.have.lengthOf(2);
    });
    it('facilitates lassiez-faire additions on keys that may or may not exist, if preferred,', function () {
        map = new NameMap_1.NameMap();
        map.set(s1.name, s1);
        map.set(s2.name, s2);
        map.set(s1.name, s3);
        chai_1.expect(map.get(s1.name).name).to.be.equal(s3.name);
        chai_1.expect(map.get(s2.name).name).to.be.equal(s2.name);
    });
    it('facilitates overwrite-only additions on existing keys, throwing an error if the key does not exist', function () {
        map = new NameMap_1.NameMap();
        map.add(s1.name, s1);
        map.replace(s1.name, s2);
        chai_1.expect((function () { return map.replace(s3.name, s3); })).to.throw;
        chai_1.expect(map.get(s1.name).name).to.be.equal(s2.name);
    });
    it('will report on whether an item with the given name exists in the collection or not', function () {
        map = new NameMap_1.NameMap();
        map.add(s1.name, s1);
        chai_1.expect(map.has(s1.name)).to.be.true;
        chai_1.expect(map.has(s2.name)).to.be.false;
    });
    it('will allow a single item to be removed by key', function () {
        map = new NameMap_1.NameMap();
        map.add(s1.name, s1);
        map.add(s2.name, s2);
        map.add(s3.name, s3);
        map.remove(s1.name);
        chai_1.expect(map.has(s1.name)).to.be.false;
        chai_1.expect(map.has(s2.name)).to.be.true;
        chai_1.expect(map.has(s3.name)).to.be.true;
    });
    it('will allow the retrieval of single items by key', function () {
        map = new NameMap_1.NameMap();
        map.add(s1.name, s1);
        map.add(s2.name, s2);
        map.add(s3.name, s3);
        chai_1.expect(map.get(s2.name).name).to.be.equal(s2.name);
    });
    it('will allow the retrieval of the entire map collection (as properties on an object)', function () {
        map = new NameMap_1.NameMap();
        map.add(s1.name, s1);
        map.add(s2.name, s2);
        map.add(s3.name, s3);
        var collection = map.getAll();
        chai_1.expect(collection[s1.name]).to.be.equal(s1);
        chai_1.expect(collection[s2.name]).to.be.equal(s2);
        chai_1.expect(collection[s3.name]).to.be.equal(s3);
    });
    it('will return the keys in the map as an array', function () {
        map = new NameMap_1.NameMap();
        map.add(s1.name, s1);
        map.add(s2.name, s2);
        map.add(s3.name, s3);
        var keys = map.getKeys();
        chai_1.expect(keys[0] == s1.name);
        chai_1.expect(keys[1] == s2.name);
        chai_1.expect(keys[2] == s3.name);
    });
    it('supplies an foreach function which takes a callback function, ' +
        'which can be used to process over the entire collection', function () {
        map = new NameMap_1.NameMap();
        map.add(s1.name, s1);
        map.add(s2.name, s2);
        map.add(s3.name, s3);
        map.forEachKey(function (key) {
            var s = map.get(key);
            chai_1.expect(s.name).to.be.equal(key);
        });
    });
});
//# sourceMappingURL=NameMap.js.map