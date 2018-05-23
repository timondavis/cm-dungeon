"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("mocha");
var chai_1 = require("chai");
var Actor_1 = require("../../Model/Actor");
var Effect_1 = require("../../Model/Effect");
var EffectRenderer_1 = require("../../Control/EffectRenderer");
describe('EffectRenderer', function () {
    var attacker = new Actor_1.Actor();
    var defender = new Actor_1.Actor();
    var effects = [];
    var rand = function (min, max) {
        return Math.floor(Math.random() * max + min);
    };
    var initTest = function () {
        attacker = new Actor_1.Actor();
        defender = new Actor_1.Actor();
        effects = [];
        attacker.attributes.add('Strength', 10);
        attacker.attributes.add('Dexterity', 10);
        attacker.attributes.add('Constitution', 10);
        attacker.attributes.add('Wisdom', 10);
        attacker.attributes.add('Intelligence', 10);
        attacker.attributes.add('Charisma', 10);
        attacker.attributes.add('HP', 10);
        attacker.attributes.add('MaxHP', 10);
        attacker.attributes.add('AC', 10);
        defender.attributes.add('Strength', 10);
        defender.attributes.add('Dexterity', 10);
        defender.attributes.add('Constitution', 10);
        defender.attributes.add('Wisdom', 10);
        defender.attributes.add('Intelligence', 10);
        defender.attributes.add('Charisma', 10);
        defender.attributes.add('HP', 10);
        defender.attributes.add('MaxHP', 10);
        defender.attributes.add('AC', 10);
    };
    it('will process the attribute modifiers on an event and apply them to the target actor', function () {
        initTest();
        var randomNumber = rand(1, 10) * -1;
        var effect = new Effect_1.Effect();
        effect.modifyAttributes.add('HP', randomNumber);
        effects.push(effect);
        EffectRenderer_1.EffectRenderer.renderEffects(defender, effects);
        chai_1.expect(defender.attributes.get('HP')).to.be.equal(10 + randomNumber);
    });
    it('will process attribute value assignments and overrides from events, and apply to target actor', function () {
        initTest();
        var randomNumber = rand(1, 10);
        var effect = new Effect_1.Effect();
        effect.setAttributes.add('HP', randomNumber);
        effects.push(effect);
        EffectRenderer_1.EffectRenderer.renderEffects(defender, effects);
        chai_1.expect(defender.attributes.get('HP')).to.be.equal(randomNumber);
    });
    it('will remove attributes from the actor, based on directives from the event', function () {
        initTest();
        var effect = new Effect_1.Effect();
        effect.removeAttributes.add('Strength');
    });
});
//# sourceMappingURL=EffectRenderer.js.map