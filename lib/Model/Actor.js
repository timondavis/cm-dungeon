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
    /**
     * Does the Actor have an ability with the given name?
     *
     * @param {string} name
     * @returns {boolean}
     */
    Actor.prototype.hasAbility = function (name) {
        return (this.abilities.hasOwnProperty(name));
    };
    /**
     * Add an Ability to this Actor.  Does not allow abilities to be overwritten.
     *
     * @param {string} name
     * @param {Ability} ability
     *
     * @throws Exception when attempting to overwrite an ability with the same name.
     *
     * @returns {Actor}
     */
    Actor.prototype.addAbility = function (name, ability) {
        if (this.hasAbility(name)) {
            throw "Ability " + name + " overwrite attempted with addAbility() method, which is illegal. " +
                "Use setAbility() to overwrite abilities.";
        }
        this.abilities[name] = ability;
        return this;
    };
    /**
     * Add or overwrite an Ability on this character.
     *
     * @param {string} name
     * @param {Ability} ability
     *
     * @returns {Actor}
     */
    Actor.prototype.setAbility = function (name, ability) {
        this.abilities[name] = ability;
        return this;
    };
    /**
     * Remove an ability from this character.  If ability with given name not found, flow of control will not be
     * interrupted.
     *
     * @param {string} name
     * @returns {Actor}
     */
    Actor.prototype.removeAbility = function (name) {
        delete (this.abilities[name]);
        return this;
    };
    /**
     * Execute the named Ability on this Actor.
     *
     * @param {string} name
     * @param {Actor} target
     * @returns {Actor}
     */
    Actor.prototype.doAbility = function (name, target) {
        return this;
    };
    /**
     * Get the list of abilities on this actor.
     *
     * @returns {{[p: string]: Ability}}
     */
    Actor.prototype.getAbilities = function () {
        return this.abilities;
    };
    /**
     * Receive and process an Interaction from another actor.
     *
     * @param {Interaction} interaction
     *
     * @returns {Actor}
     */
    Actor.prototype.receive = function (interaction) {
        return this;
    };
    return Actor;
}());
exports.Actor = Actor;
//# sourceMappingURL=Actor.js.map