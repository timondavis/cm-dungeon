"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("mocha");
var chai_1 = require("chai");
var Map_1 = require("../../Model/Map");
describe('Map', function () {
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
     * @type {Map<any>}
     */
    var map;
    var s1 = new Sample('s1');
    var s2 = new Sample('s2');
    var s3 = new Sample('s3');
    it('allows generic items to be added to a collection', function () {
        map = new Map_1.Map();
        map.add(s1.name, s1);
        map.add(s2.name, s2);
        map.add(s3.name, s3);
        chai_1.expect(Object.keys(map.getAll())).to.have.lengthOf(3);
    });
    it('facilitates strict addition of new items, throwing exceptions on override attempts', function () {
        map = new Map_1.Map();
        map.add(s1.name, s1);
        chai_1.expect(function () { return map.add(s1.name, s2); }).to.throw;
        map.add(s2.name, s2);
        chai_1.expect(Object.keys(map.getAll())).to.have.lengthOf(2);
    });
    it('');
});
//# sourceMappingURL=Map.js.map