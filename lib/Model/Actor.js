"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var NameMap_1 = require("./NameMap");
var Actor = /** @class */ (function () {
    function Actor() {
        this._attributes = new NameMap_1.NameMap();
        this._abilities = new NameMap_1.NameMap();
        this._labels = new NameMap_1.NameMap();
        this._flags = new NameMap_1.NameMap();
        this._statuses = new NameMap_1.NameMap();
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
    Object.defineProperty(Actor.prototype, "statuses", {
        get: function () { return this._statuses; },
        enumerable: true,
        configurable: true
    });
    /**
     * Execute an ability belonging to the actor
     * @param {string} abilityName
     */
    Actor.prototype.execute = function (abilityName, target, data) {
        if (!this.abilities.has(abilityName)) {
            throw Error("Ability with name " + abilityName + " could not be found on target actor.");
        }
        return this.abilities.get(abilityName).execute(this, target, data);
    };
    return Actor;
}());
exports.Actor = Actor;
//# sourceMappingURL=Actor.js.map