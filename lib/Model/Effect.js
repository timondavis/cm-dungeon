"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var NameMap_1 = require("./NameMap");
var List_1 = require("./List");
var Effect = /** @class */ (function () {
    function Effect() {
        this._attributeModifications = new NameMap_1.NameMap();
        this._attributeAssignments = new NameMap_1.NameMap();
        this._attributeRemovals = new List_1.List();
        this._labelAssignments = new NameMap_1.NameMap();
        this._labelRemovals = new List_1.List();
        this._flagAssignments = new NameMap_1.NameMap();
        this._flagRemovals = new List_1.List();
        this._statusAssignments = new NameMap_1.NameMap();
        this._statusRemovals = new List_1.List();
    }
    Object.defineProperty(Effect.prototype, "attributeModifications", {
        get: function () { return this._attributeModifications; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Effect.prototype, "attributeAssignments", {
        get: function () { return this._attributeAssignments; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Effect.prototype, "attributeRemovals", {
        get: function () { return this._attributeRemovals; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Effect.prototype, "labelAssignments", {
        get: function () { return this._labelAssignments; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Effect.prototype, "labelRemovals", {
        get: function () { return this._labelRemovals; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Effect.prototype, "flagAssignments", {
        get: function () { return this._flagAssignments; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Effect.prototype, "flagRemovals", {
        get: function () { return this._flagRemovals; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Effect.prototype, "statusAssignments", {
        get: function () { return this._statusAssignments; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Effect.prototype, "statusRemovals", {
        get: function () { return this._statusRemovals; },
        enumerable: true,
        configurable: true
    });
    return Effect;
}());
exports.Effect = Effect;
//# sourceMappingURL=Effect.js.map