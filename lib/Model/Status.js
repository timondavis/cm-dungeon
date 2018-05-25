"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var NameMap_1 = require("./NameMap");
var Status = /** @class */ (function () {
    function Status() {
        this._attributeFilters = new NameMap_1.NameMap();
        this._labelFilters = new NameMap_1.NameMap();
        this._flagFilters = new NameMap_1.NameMap();
        this._blockedStatusNames = [];
    }
    Object.defineProperty(Status.prototype, "owner", {
        get: function () { return this._owner; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Status.prototype, "attributeFilters", {
        get: function () { return this._attributeFilters; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Status.prototype, "labelFilters", {
        get: function () { return this._labelFilters; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Status.prototype, "flagFilters", {
        get: function () { return this._flagFilters; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Status.prototype, "blockedStatusNames", {
        get: function () { return this._blockedStatusNames; },
        enumerable: true,
        configurable: true
    });
    Status.prototype.setOwner = function (owner) { this._owner = owner; };
    return Status;
}());
exports.Status = Status;
//# sourceMappingURL=Status.js.map