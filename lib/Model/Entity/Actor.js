"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var NameMap_1 = require("../NameMap");
var PrioritizedNameMap_1 = require("../PrioritizedNameMap");
var Entity_1 = require("./Entity");
var Actor = /** @class */ (function (_super) {
    __extends(Actor, _super);
    function Actor(actorProfile) {
        var _this = _super.call(this, actorProfile) || this;
        _this.state.abilities = new NameMap_1.NameMap();
        _this.state.actionPointsAttribute = "";
        _this.state.actionPointsRemaining = 0;
        _this.state.faction = "";
        _this.state.statuses = new PrioritizedNameMap_1.PrioritizedNameMap();
        if (actorProfile) {
            if (actorProfile.actionPointsAttribute) {
                _this.state.actionPointsAttribute = actorProfile.actionPointsAttribute;
            }
        }
        return _this;
    }
    Object.defineProperty(Actor.prototype, "faction", {
        get: function () { return this.state.faction; },
        set: function (faction) { this.state.faction = faction; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Actor.prototype, "abilities", {
        get: function () { return this.state.abilities; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Actor.prototype, "statuses", {
        get: function () { return this.state.statuses; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Actor.prototype, "actionPointsAttribute", {
        get: function () { return this.state.actionPointsAttribute; },
        set: function (attr) { this.state.actionPointsAttribute = attr; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Actor.prototype, "actionPointsRemaining", {
        get: function () { return this.state.actionPointsRemaining; },
        set: function (pointsRemaining) { this.state.actionPointsRemaining = pointsRemaining; },
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
}(Entity_1.Entity));
exports.Actor = Actor;
//# sourceMappingURL=Actor.js.map