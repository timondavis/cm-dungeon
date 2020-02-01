"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var NameMap_1 = require("./NameMap");
var PrioritizedNameMap_1 = require("./PrioritizedNameMap");
var Actor = /** @class */ (function () {
    function Actor(actorProfile) {
        this._attributes = new NameMap_1.NameMap();
        this._abilities = new NameMap_1.NameMap();
        this._labels = new NameMap_1.NameMap();
        this._flags = new NameMap_1.NameMap();
        this._statuses = new PrioritizedNameMap_1.PrioritizedNameMap();
        if (actorProfile) {
            if (actorProfile.hasOwnProperty('attributes') && actorProfile.attributes.length) {
                for (var i = 0; i < actorProfile.attributes.length; i++) {
                    this.attributes.add(actorProfile.attributes[i].key, (actorProfile.attributes[i].hasOwnProperty('default')) ? actorProfile.attributes[i].default : 0);
                }
            }
            if (actorProfile.hasOwnProperty('flags') && actorProfile.flags.length) {
                for (var i = 0; i < actorProfile.flags.length; i++) {
                    this.flags.add(actorProfile.flags[i].key, (actorProfile.flags[i].hasOwnProperty('default')) ? actorProfile.flags[i].default : false);
                }
            }
            if (actorProfile.hasOwnProperty('labels') && actorProfile.labels.length) {
                for (var i = 0; i < actorProfile.labels.length; i++) {
                    this.labels.add(actorProfile.labels[i].key, (actorProfile.labels[i].hasOwnProperty('default')) ? actorProfile.labels[i].default : '');
                }
            }
        }
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