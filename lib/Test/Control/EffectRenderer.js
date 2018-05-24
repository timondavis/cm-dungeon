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
        effect.attributeModifications.add('HP', randomNumber);
        effects.push(effect);
        EffectRenderer_1.EffectRenderer.renderEffects(defender, effects);
        chai_1.expect(defender.attributes.get('HP')).to.be.equal(10 + randomNumber);
    });
    it('will process attribute value assignments and overrides from events, and apply to target actor', function () {
        initTest();
        var randomNumber = rand(1, 10);
        var effect = new Effect_1.Effect();
        effect.attributeAssignments.add('HP', randomNumber);
        effects.push(effect);
        EffectRenderer_1.EffectRenderer.renderEffects(defender, effects);
        chai_1.expect(defender.attributes.get('HP')).to.be.equal(randomNumber);
    });
    it('will remove attributes from the actor, based on directives from the effect', function () {
        initTest();
        chai_1.expect(function () { return defender.attributes.get('Strength'); }).not.to.throw;
        var effect = new Effect_1.Effect();
        effect.attributeRemovals.add('Strength');
        effects.push(effect);
        EffectRenderer_1.EffectRenderer.renderEffects(defender, effects);
        chai_1.expect(function () { return defender.attributes.get('Strength'); }).to.throw;
    });
    it('will set (new or override) new labels on the actor, based on directives from the effect', function () {
        initTest();
        var effect = new Effect_1.Effect();
        effect.flagAssignments.add('IsDaring', true);
        effect.flagAssignments.add('IsCowardly', false);
        effects.push(effect);
        EffectRenderer_1.EffectRenderer.renderEffects(defender, effects);
        chai_1.expect(defender.flags.get('IsDaring')).to.be.true;
        chai_1.expect(defender.flags.get('IsCowardly')).to.be.false;
        effects = [];
        effect = new Effect_1.Effect();
        effect.flagAssignments.add('IsDaring', false);
        effects.push(effect);
        EffectRenderer_1.EffectRenderer.renderEffects(defender, effects);
        chai_1.expect(defender.flags.get('IsDaring')).to.be.false;
        chai_1.expect(defender.flags.get('IsCowardly')).to.be.false;
    });
    it('will remove labels from the actor, if they exist.  Orders to remove non-existing labels will be ignored', function () {
        initTest();
        defender.flags.add('RemoveMe!', true);
        chai_1.expect(defender.flags.get('RemoveMe!')).to.be.true;
        var effect = new Effect_1.Effect();
        effect.flagRemovals.add('RemoveMe!');
        effects.push(effect);
        EffectRenderer_1.EffectRenderer.renderEffects(defender, effects);
        chai_1.expect(defender.flags.get('RemoveMe!')).to.throw;
    });
    it('will set (new or override) new flags on the actor, based on directives from the effect');
    it('will remove flags from the actor, if they exist.  Order to remove non-existing flags will be ignored.');
    it('will set (new or override) new statuses on the actor, based on directives from the effect');
    it('will remove statuses from the actor, if they exist.  Order to remove non-existing statuses will be ignored.');
});
//# sourceMappingURL=EffectRenderer.js.map