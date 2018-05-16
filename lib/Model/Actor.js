"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var EffectRenderer_1 = require("../Control/EffectRenderer");
var NameMap_1 = require("./NameMap");
var Actor = /** @class */ (function () {
    function Actor() {
        this._attributes = new NameMap_1.NameMap();
        this._abilities = new NameMap_1.NameMap();
        this._labels = new NameMap_1.NameMap();
        this._flags = new NameMap_1.NameMap();
        this._statusEffects = new NameMap_1.NameMap();
        this.effectRendering = new EffectRenderer_1.EffectRenderer();
        this.attributes.add('Strength', 2);
        this.attributes.add('Dexterity', 0);
        this.attributes.add('Constitution', 0);
        this.attributes.add('Wisdom', 0);
        this.attributes.add('Intelligence', 0);
        this.attributes.add('Charisma', 0);
        this.attributes.add('HP', 10);
        this.attributes.add('MaxHP', 10);
        this.attributes.add('AC', 10);
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