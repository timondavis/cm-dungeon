"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var List = /** @class */ (function () {
    function List() {
        this._collection = [];
    }
    List.prototype.add = function (item) {
        this.push(item);
    };
    List.prototype.push = function (item) {
        this._collection.push(item);
    };
    List.prototype.remove = function (index) {
        this._collection.splice(index, 1);
    };
    List.prototype.get = function (index) {
        if (index >= 0 && index <= this.length) {
            return this._collection[index];
        }
        throw Error("Cannot find index " + index + " in List");
    };
    Object.defineProperty(List.prototype, "length", {
        get: function () {
            return this._collection.length;
        },
        enumerable: true,
        configurable: true
    });
    List.prototype.forEachItem = function (callback) {
        for (var i = 0; i < this.length; i++) {
            callback(this._collection[i], i);
        }
    };
    return List;
}());
exports.List = List;
//# sourceMappingURL=List.js.map