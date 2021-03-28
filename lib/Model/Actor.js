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
exports.Actor = void 0;
var NameMap_1 = require("./NameMap");
var PrioritizedNameMap_1 = require("./PrioritizedNameMap");
var cm_domain_utilities_1 = require("cm-domain-utilities");
var Actor = /** @class */ (function (_super) {
    __extends(Actor, _super);
    function Actor(actorProfile) {
        var _this = _super.call(this) || this;
        _this.state = {
            abilities: new NameMap_1.NameMap(),
            actionPointsAttribute: "",
            actionPointsRemaining: 0,
            attributes: new NameMap_1.NameMap(),
            faction: "",
            flags: new NameMap_1.NameMap(),
            id: "",
            labels: new NameMap_1.NameMap(),
            statuses: new PrioritizedNameMap_1.PrioritizedNameMap()
        };
        if (actorProfile) {
            if (actorProfile.attributes.length) {
                for (var i = 0; i < actorProfile.attributes.length; i++) {
                    _this.attributes.add(actorProfile.attributes[i].key, (actorProfile.attributes[i].hasOwnProperty('default')) ? actorProfile.attributes[i].default : 0);
                }
            }
            if (actorProfile.flags.length) {
                for (var i = 0; i < actorProfile.flags.length; i++) {
                    _this.flags.add(actorProfile.flags[i].key, (actorProfile.flags[i].hasOwnProperty('default')) ? actorProfile.flags[i].default : false);
                }
            }
            if (actorProfile.labels.length) {
                for (var i = 0; i < actorProfile.labels.length; i++) {
                    _this.labels.add(actorProfile.labels[i].key, (actorProfile.labels[i].hasOwnProperty('default')) ? actorProfile.labels[i].default : '');
                }
            }
            if (actorProfile.actionPointsAttribute) {
                _this.state.actionPointsAttribute = actorProfile.actionPointsAttribute;
            }
        }
        return _this;
    }
    Object.defineProperty(Actor.prototype, "id", {
        get: function () { return this.state.id; },
        set: function (id) { this.state.id = id; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Actor.prototype, "faction", {
        get: function () { return this.state.faction; },
        set: function (faction) { this.state.faction = faction; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Actor.prototype, "attributes", {
        get: function () { return this.state.attributes; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Actor.prototype, "abilities", {
        get: function () { return this.state.abilities; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Actor.prototype, "labels", {
        get: function () { return this.state.labels; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Actor.prototype, "flags", {
        get: function () { return this.state.flags; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Actor.prototype, "statuses", {
        get: function () { return this.state.statuses; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Actor.prototype, "actionPointsAttribute", {
        get: function () { return this.state.actionPointsAttribute; },
        set: function (attr) { this.state.actionPointsAttribute = attr; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Actor.prototype, "actionPointsRemaining", {
        get: function () { return this.state.actionPointsRemaining; },
        set: function (pointsRemaining) { this.state.actionPointsRemaining = pointsRemaining; },
        enumerable: false,
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
}(cm_domain_utilities_1.SerializableModel));
exports.Actor = Actor;
//# sourceMappingURL=Actor.js.map