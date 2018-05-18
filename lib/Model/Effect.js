"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var NameMap_1 = require("./NameMap");
var Effect = /** @class */ (function () {
    function Effect() {
        this._modifyAttributes = new NameMap_1.NameMap();
        this._setAttributes = new NameMap_1.NameMap();
        this._removeAttributes = [];
        this._setLabels = new NameMap_1.NameMap();
        this._removeLabels = [];
        this._setFlags = new NameMap_1.NameMap();
        this._removeFlags = [];
        this._setStatus = new NameMap_1.NameMap();
        this._removeStatus = [];
    }
    Object.defineProperty(Effect.prototype, "modifyAttributes", {
        get: function () { return this._modifyAttributes; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Effect.prototype, "setAttributes", {
        get: function () { return this._setAttributes; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Effect.prototype, "removeAttributes", {
        get: function () { return this._removeAttributes; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Effect.prototype, "setLabels", {
        get: function () { return this._setLabels; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Effect.prototype, "removeLabels", {
        get: function () { return this._removeLabels; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Effect.prototype, "setFlags", {
        get: function () { return this._setFlags; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Effect.prototype, "removeFlags", {
        get: function () { return this._removeFlags; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Effect.prototype, "setStatus", {
        get: function () { return this._setStatus; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Effect.prototype, "removeStatus", {
        get: function () { return this._removeStatus; },
        enumerable: true,
        configurable: true
    });
    return Effect;
}());
exports.Effect = Effect;
//# sourceMappingURL=Effect.js.map