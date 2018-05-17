"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var NameMap_1 = require("./NameMap");
var Actor = /** @class */ (function () {
    function Actor() {
        this._attributes = new NameMap_1.NameMap();
        this._abilities = new NameMap_1.NameMap();
        this._labels = new NameMap_1.NameMap();
        this._flags = new NameMap_1.NameMap();
        this._statusEffects = new NameMap_1.NameMap();
    }
    Object.defineProperty(Actor.prototype, "attributes", {
        get: function () { return this._attributes; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Actor.prototype, "abilities", {
        get: function () { return this._abilities; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Actor.prototype, "labels", {
        get: function () { return this._labels; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Actor.prototype, "flags", {
        get: function () { return this._flags; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Actor.prototype, "statusEffects", {
        get: function () { return this._statusEffects; },
        enumerable: true,
        configurable: true
    });
    return Actor;
}());
exports.Actor = Actor;
//# sourceMappingURL=Actor.js.map