"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.List = void 0;
var cm_domain_utilities_1 = require("cm-domain-utilities");
var List = /** @class */ (function (_super) {
    __extends(List, _super);
    function List() {
        var _this = _super.call(this) || this;
        _this.state = {
            collection: []
        };
        return _this;
    }
    Object.defineProperty(List.prototype, "collection", {
        get: function () { return this.state.collection; },
        enumerable: false,
        configurable: true
    });
    List.prototype.add = function (item) {
        this.collection.push(item);
    };
    List.prototype.remove = function (index) {
        this.collection.splice(index, 1);
    };
    List.prototype.clear = function () {
        this.state.collection = [];
    };
    List.prototype.get = function (index) {
        if (index >= 0 && index <= this.length) {
            return this.collection[index];
        }
        throw Error("Cannot find index " + index + " in List");
    };
    Object.defineProperty(List.prototype, "length", {
        get: function () {
            return this.collection.length;
        },
        enumerable: false,
        configurable: true
    });
    List.prototype.forEachItem = function (callback) {
        for (var i = 0; i < this.length; i++) {
            callback(this.collection[i], i);
        }
    };
    return List;
}(cm_domain_utilities_1.SerializableModel));
exports.List = List;
//# sourceMappingURL=List.js.map