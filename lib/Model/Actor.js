"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var EffectRenderer_1 = require("../Control/EffectRenderer");
var Actor = /** @class */ (function () {
    function Actor() {
        this.attributes = {};
        this.abilities = {};
        this.labels = {};
        this.flags = {};
        this.activeStati = {};
        this.effectRendering = new EffectRenderer_1.EffectRenderer();
        this.attributes['Strength'] = 0;
        this.attributes['Dexterity'] = 0;
        this.attributes['Constitution'] = 0;
        this.attributes['Wisdom'] = 0;
        this.attributes['Intelligence'] = 0;
        this.attributes['Charisma'] = 0;
        this.attributes['HP'] = 0;
        this.attributes['MaxHP'] = 0;
    }
    Actor.prototype.doAbility = function (name, target) {
        return this;
    };
    Actor.prototype.receive = function (interaction) {
        return this;
    };
    return Actor;
}());
exports.Actor = Actor;
