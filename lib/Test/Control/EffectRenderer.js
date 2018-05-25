"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("mocha");
var chai_1 = require("chai");
var Actor_1 = require("../../Model/Actor");
var Effect_1 = require("../../Model/Effect");
var EffectRenderer_1 = require("../../Control/EffectRenderer");
var Status_1 = require("../../Model/Status");
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
    it('will set (new or override) new flags on the actor, based on directives from the effect', function () {
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
    it('will remove flags from the actor, if they exist.  Orders to remove non-existing labels will be ignored', function () {
        initTest();
        defender.flags.add('RemoveMe!', true);
        chai_1.expect(function () { return defender.flags.get('RemoveMe!'); }).not.to.throw;
        var effect = new Effect_1.Effect();
        effect.flagRemovals.add('RemoveMe!');
        effects.push(effect);
        EffectRenderer_1.EffectRenderer.renderEffects(defender, effects);
        chai_1.expect(function () { return defender.flags.get('RemoveMe!'); }).to.throw;
    });
    it('will set (new or override) new labels on the actor, based on directives from the effect', function () {
        initTest();
        var effect = new Effect_1.Effect();
        effect.labelAssignments.add('Class', 'Paladin');
        effects.push(effect);
        EffectRenderer_1.EffectRenderer.renderEffects(defender, effects);
        chai_1.expect(defender.labels.get('Class')).to.be.equal('Paladin');
        effect = new Effect_1.Effect();
        effect.labelAssignments.add('Class', 'Paladin/Ranger');
        effects.push(effect);
        EffectRenderer_1.EffectRenderer.renderEffects(defender, effects);
        chai_1.expect(defender.labels.get('Class')).to.be.equal('Paladin/Ranger');
    });
    it('will remove labels from the actor, if they exist.  Order to remove non-existing flags will be ignored.', function () {
        initTest();
        defender.labels.add('First Name', 'Smith');
        chai_1.expect(function () { return defender.labels.get('First Name'); }).not.to.throw;
        chai_1.expect(function () { return defender.labels.get('Last Name'); }).to.throw;
        var effect = new Effect_1.Effect();
        effect.labelRemovals.add('First Name');
        effect.labelRemovals.add('Last Name');
        EffectRenderer_1.EffectRenderer.renderEffects(defender, effects);
        chai_1.expect(function () { return defender.labels.get('First Name'); }).to.throw;
        chai_1.expect(function () { return defender.labels.get('Last Name'); }).to.throw;
    });
    it('will set (new or override) new statuses on the actor, based on directives from the effect', function () {
        initTest();
        var s = new Status_1.Status();
        s.setOwner(defender);
        s.attributeFilters.add('Intelligence', function (value) {
            return value - 2;
        });
        var effect = new Effect_1.Effect();
        effect.statusAssignments.add('Fear', s);
        effects.push(effect);
        EffectRenderer_1.EffectRenderer.renderEffects(defender, effects);
        var retrievedStatus = defender.statusEffects.get('Fear');
        chai_1.expect(function () { return retrievedStatus.attributeFilters.get('Bravery'); }).to.throw;
        chai_1.expect(function () { return retrievedStatus.attributeFilters.get('Fear'); }).not.to.throw;
    });
    it('will remove statuses from the actor, if they exist.  Order to remove non-existing statuses will be ignored.', function () {
        initTest();
        var s1 = new Status_1.Status();
        var s2 = new Status_1.Status();
        s1.setOwner(defender);
        s2.setOwner(defender);
        s1.attributeFilters.add('Intelligence', function (value) {
            return value - 2;
        });
        s2.attributeFilters.add('Wisdom', function (value) {
            return value - 4;
        });
        var effect = new Effect_1.Effect();
        effect.statusAssignments.add('Fear', s1);
        effect.statusAssignments.add('Wroth', s2);
        effects.push(effect);
        EffectRenderer_1.EffectRenderer.renderEffects(defender, effects);
        var retrievedStatus = defender.statusEffects.get('Fear');
        chai_1.expect(function () { return retrievedStatus.attributeFilters.get('Bravery'); }).to.throw;
        chai_1.expect(function () { return retrievedStatus.attributeFilters.get('Fear'); }).not.to.throw;
        chai_1.expect(function () { return retrievedStatus.attributeFilters.get('Wroth'); }).not.to.throw;
        effects = [];
        effect = new Effect_1.Effect();
        effect.statusRemovals.add('Fear');
        effect.statusRemovals.add('Potion of Strength');
        effects.push(effect);
        chai_1.expect(function () { return retrievedStatus.attributeFilters.get('Bravery'); }).to.throw;
        chai_1.expect(function () { return retrievedStatus.attributeFilters.get('Fear'); }).to.throw;
        chai_1.expect(function () { return retrievedStatus.attributeFilters.get('Wroth'); }).not.to.throw;
    });
});
//# sourceMappingURL=EffectRenderer.js.map