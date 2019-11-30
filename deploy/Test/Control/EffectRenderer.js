"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
require("mocha");
var chai_1 = require("chai");
var Actor_1 = require("../../Model/Actor");
var Effect_1 = require("../../Model/Effect");
var EffectRenderer_1 = require("../../Control/EffectRenderer");
var Status_1 = require("../../Model/Status");
var List_1 = require("../../Model/List");
var D20_Attack_1 = require("../../Model/Ability/d20/D20_Attack");
var Ability_1 = require("../../Model/Ability/Ability");
var Interaction_1 = require("../../Control/Interaction");
var CheckExecutor_1 = require("cm-check/lib/Check/CheckExecutor");
describe('EffectRenderer', function () {
    var attacker = new Actor_1.Actor();
    var defender = new Actor_1.Actor();
    var effects = new List_1.List();
    var rand = function (min, max) {
        return Math.floor(Math.random() * max + min);
    };
    var initTest = function () {
        attacker = new Actor_1.Actor();
        defender = new Actor_1.Actor();
        effects = new List_1.List();
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
        effect.attributeAssignments.add('HP', function (value) { return value + randomNumber; });
        effects.add(effect);
        EffectRenderer_1.EffectRenderer.renderEffects(defender, effects);
        chai_1.expect(defender.attributes.get('HP')).to.be.equal(10 + randomNumber);
    });
    it('will process attribute value assignments and overrides from events, and apply to target actor', function () {
        initTest();
        var randomNumber = rand(1, 10);
        var effect = new Effect_1.Effect();
        effect.attributeAssignments.add('HP', function () { return randomNumber; });
        effects.add(effect);
        EffectRenderer_1.EffectRenderer.renderEffects(defender, effects);
        chai_1.expect(defender.attributes.get('HP')).to.be.equal(randomNumber);
    });
    it('will set (new or override) new flags on the actor, based on directives from the effect', function () {
        initTest();
        var effect = new Effect_1.Effect();
        effect.flagAssignments.add('IsDaring', function () { return true; });
        effect.flagAssignments.add('IsCowardly', function () { return false; });
        effects.add(effect);
        EffectRenderer_1.EffectRenderer.renderEffects(defender, effects);
        chai_1.expect(defender.flags.get('IsDaring')).to.be.true;
        chai_1.expect(defender.flags.get('IsCowardly')).to.be.false;
        effects = new List_1.List();
        effect = new Effect_1.Effect();
        effect.flagAssignments.add('IsDaring', function () { return false; });
        effects.add(effect);
        EffectRenderer_1.EffectRenderer.renderEffects(defender, effects);
        chai_1.expect(defender.flags.get('IsDaring')).to.be.false;
        chai_1.expect(defender.flags.get('IsCowardly')).to.be.false;
    });
    it('will set (new or override) new labels on the actor, based on directives from the effect', function () {
        initTest();
        var effect = new Effect_1.Effect();
        effect.labelAssignments.add('Class', function () { return 'Paladin'; });
        effects.add(effect);
        EffectRenderer_1.EffectRenderer.renderEffects(defender, effects);
        chai_1.expect(defender.labels.get('Class')).to.be.equal('Paladin');
        effect = new Effect_1.Effect();
        effect.labelAssignments.add('Class', function () { return 'Paladin/Ranger'; });
        effects.add(effect);
        EffectRenderer_1.EffectRenderer.renderEffects(defender, effects);
        chai_1.expect(defender.labels.get('Class')).to.be.equal('Paladin/Ranger');
    });
    it('will set (new or override) new statuses on the actor, based on directives from the effect', function () {
        initTest();
        var s = new Status_1.Status();
        s.setOwner(defender);
        s.attributeAssignmentFilters.add('Intelligence', function (value) {
            return value - 2;
        });
        var effect = new Effect_1.Effect();
        effect.statusAssignments.add('Fear', s);
        effects.add(effect);
        EffectRenderer_1.EffectRenderer.renderEffects(defender, effects);
        var retrievedStatus = defender.statuses.get('Fear');
        chai_1.expect(function () { return retrievedStatus.attributeAssignmentFilters.get('Bravery'); }).to.throw;
        chai_1.expect(function () { return retrievedStatus.attributeAssignmentFilters.get('Fear'); }).not.to.throw;
    });
    it('will remove statuses from the actor, if they exist.  Order to remove non-existing statuses will be ignored.', function () {
        initTest();
        var s1 = new Status_1.Status();
        var s2 = new Status_1.Status();
        s1.setOwner(defender);
        s2.setOwner(defender);
        s1.attributeAssignmentFilters.add('Intelligence', function (value) {
            return value - 2;
        });
        s2.attributeAssignmentFilters.add('Wisdom', function (value) {
            return value - 4;
        });
        var effect = new Effect_1.Effect();
        effect.statusAssignments.add('Fear', s1);
        effect.statusAssignments.add('Wroth', s2);
        effects.add(effect);
        EffectRenderer_1.EffectRenderer.renderEffects(defender, effects);
        var retrievedStatus = defender.statuses.get('Fear');
        chai_1.expect(function () { return retrievedStatus.attributeAssignmentFilters.get('Bravery'); }).to.throw;
        chai_1.expect(function () { return retrievedStatus.attributeAssignmentFilters.get('Fear'); }).not.to.throw;
        chai_1.expect(function () { return retrievedStatus.attributeAssignmentFilters.get('Wroth'); }).not.to.throw;
        effects = new List_1.List();
        effect = new Effect_1.Effect();
        effect.statusRemovals.add('Fear');
        effect.statusRemovals.add('Potion of Strength');
        effects.add(effect);
        chai_1.expect(function () { return retrievedStatus.attributeAssignmentFilters.get('Bravery'); }).to.throw;
        chai_1.expect(function () { return retrievedStatus.attributeAssignmentFilters.get('Fear'); }).to.throw;
        chai_1.expect(function () { return retrievedStatus.attributeAssignmentFilters.get('Wroth'); }).not.to.throw;
    });
    it('processes status effect filters for attributes', function () {
        initTest();
        var invincibilityStatus = new Status_1.Status();
        // Always return a delta of 0 when affecting HP
        invincibilityStatus.attributeAssignmentFilters.add('HP', function (value, originalValue) { return originalValue; });
        defender.attributes.set('AC', 100);
        attacker.abilities.add('Attack', new D20_Attack_1.D20_Attack());
        attacker.execute('Attack', defender);
        chai_1.expect(defender.attributes.get('HP')).to.be.equal(10);
        defender.attributes.set('AC', 0);
        attacker.execute('Attack', defender);
        chai_1.expect(defender.attributes.get('HP')).to.be.lessThan(10);
        defender.attributes.set('HP', 10);
        defender.statuses.add('Invincibility', invincibilityStatus);
        attacker.execute('Attack', defender);
        chai_1.expect(defender.attributes.get('HP')).to.be.equal(10);
    });
    it('respects priority when applying statuses attribute filters', function () {
        initTest();
        var damageToZero = new Status_1.Status();
        var addTwoToAllIncomingDamage = new Status_1.Status();
        damageToZero.attributeAssignmentFilters.add('HP', function (value, originalValue) { return originalValue; });
        addTwoToAllIncomingDamage.attributeAssignmentFilters.add('HP', function (value) {
            return value - 2;
        });
        defender.attributes.set('AC', 0);
        defender.attributes.set('HP', 10);
        defender.statuses.add('Set Damage To Zero', damageToZero, 1);
        defender.statuses.add('Add +2 Damage', addTwoToAllIncomingDamage, 2);
        attacker.abilities.add('attack', new D20_Attack_1.D20_Attack());
        attacker.execute('attack', defender);
        chai_1.expect(defender.attributes.get('HP')).to.be.equal(8);
        defender.statuses.updatePriority('Set Damage To Zero', 3);
        attacker.execute('attack', defender);
        chai_1.expect(defender.attributes.get('HP')).to.be.equal(8);
        defender.statuses.remove('Set Damage To Zero');
        attacker.execute('attack', defender);
        chai_1.expect(defender.attributes.get('HP')).to.be.lessThan(8);
    });
    it('respects priority when applying statuses attribute setters', function () {
        initTest();
        var assignAttrs = new TestAssignAttributes();
        var setToFour = new Status_1.Status();
        var setToEight = new Status_1.Status();
        var doubleValue = new Status_1.Status();
        var setToZero = new Status_1.Status();
        setToZero.attributeAssignmentFilters.add('HP', function () { return 0; });
        setToFour.attributeAssignmentFilters.add('HP', function () { return 4; });
        setToEight.attributeAssignmentFilters.add('HP', function () { return 8; });
        doubleValue.attributeAssignmentFilters.add('HP', function (newValue) { return newValue * 2; });
        defender.attributes.set('HP', 1000);
        defender.attributes.set('AC', 0);
        defender.statuses.add('SetToZero', setToZero, 0);
        defender.statuses.add('SetToFour', setToFour, 10);
        defender.statuses.add('SetToEight', setToEight, 20);
        defender.statuses.add('DoubleValue', doubleValue, 30);
        attacker.abilities.add('assign', assignAttrs);
        attacker.execute('assign', defender);
        // 0 overwrites, then 4 overwrites, then 8 overwrites, then that value is doubled.
        chai_1.expect(defender.attributes.get('HP')).to.be.equal(16);
        defender.statuses.updatePriority('SetToZero', 40);
        attacker.execute('assign', defender);
        // 0 moves to front of line, overwrites all
        chai_1.expect(defender.attributes.get('HP')).to.be.equal(0);
        defender.statuses.remove('SetToZero');
        defender.statuses.updatePriority('SetToFour', 21);
        attacker.execute('assign', defender);
        // 0 removed, eight overwrites, then four, then four is doubled.
        chai_1.expect(defender.attributes.get('HP')).to.be.equal(8);
    });
    it('respects priority when applying statuses with label setters', function () {
        initTest();
        var appendWithAnA = new Status_1.Status();
        var replaceWithWazzap = new Status_1.Status();
        var removeLastLetter = new Status_1.Status();
        var restoreOriginal = new Status_1.Status();
        appendWithAnA.labelAssignmentFilters.add('Label Value', function (newValue, originalValue) {
            return newValue + "A";
        });
        replaceWithWazzap.labelAssignmentFilters.add('Label Value', function (newValue, originalValue) {
            return "Wazzap";
        });
        removeLastLetter.labelAssignmentFilters.add('Label Value', function (newValue, originalValue) {
            var strlen = newValue.length;
            return newValue.substr(0, strlen - 1);
        });
        restoreOriginal.labelAssignmentFilters.add('Label Value', function (newValue, originalValue) {
            return originalValue;
        });
        defender.statuses.add('appendWithAnA', appendWithAnA, 10)
            .add('replaceWithWazzap', replaceWithWazzap, 20)
            .add('removeLastLetter', removeLastLetter, 30)
            .add('restoreOriginal', restoreOriginal, 40);
        defender.labels.add('Label Value', 'Original Value');
        defender.attributes.replace('AC', 0);
        attacker.abilities.add('Label Replacement', new TestAssignLabels());
        attacker.execute('Label Replacement', defender);
        chai_1.expect(defender.labels.get('Label Value')).to.be.equal('Original Value');
        defender.statuses.remove('restoreOriginal');
        attacker.execute('Label Replacement', defender);
        chai_1.expect(defender.labels.get('Label Value')).to.be.equal('Wazza');
        defender.statuses.updatePriority('removeLastLetter', 5);
        attacker.execute('Label Replacement', defender);
        chai_1.expect(defender.labels.get('Label Value')).to.be.equal('Wazzap');
        defender.statuses.remove('replaceWithWazzap');
        attacker.execute('Label Replacement', defender);
        chai_1.expect(defender.labels.get('Label Value')).to.be.equal('Replacement ValuA');
    });
    it('respects priority when applying statuses with flag setters', function () {
        var restoreOriginalValue = new Status_1.Status();
        var turnFlagOff = new Status_1.Status();
        var turnFlagOn = new Status_1.Status();
        var toggleFlag = new Status_1.Status();
        restoreOriginalValue.flagAssignmentFilters.add('IsGolden', function (newValue, originalValue) {
            return originalValue;
        });
        turnFlagOff.flagAssignmentFilters.add('IsGolden', function () { return false; });
        turnFlagOn.flagAssignmentFilters.add('IsGolden', function () { return true; });
        toggleFlag.flagAssignmentFilters.add('IsGolden', function (newValue) { return !newValue; });
        defender.statuses.add('restoreOriginalValue', restoreOriginalValue, 50);
        defender.statuses.add('turnFlagOff', turnFlagOff, 40);
        defender.statuses.add('turnFlagOn', turnFlagOn, 30);
        defender.statuses.add('toggleFlag', toggleFlag, 20);
        attacker.abilities.add('Flag', new TestAssignFlags());
        defender.attributes.set('AC', 0);
        defender.flags.set('IsGolden', true);
        attacker.execute('Flag', defender);
        chai_1.expect(defender.flags.get('IsGolden')).to.be.true;
        defender.statuses.updatePriority('turnFlagOff', 60);
        attacker.execute('Flag', defender);
        chai_1.expect(defender.flags.get('IsGolden')).to.be.false;
        defender.statuses.updatePriority('toggleFlag', 70);
        attacker.execute('Flag', defender);
        chai_1.expect(defender.flags.get('IsGolden')).to.be.true;
        defender.statuses.remove('toggleFlag');
        attacker.execute('Flag', defender);
        chai_1.expect(defender.flags.get('IsGolden')).to.be.false;
    });
    it('respects priority when applying statuses with status setters', function () {
        initTest();
        var removeThatStatus = new Status_1.Status();
        var applyThatStatus = new Status_1.Status();
        var toggleApplyStatus = new Status_1.Status();
        removeThatStatus.statusAssignmentFilters.add('FlatStrength', function () { return false; });
        applyThatStatus.statusAssignmentFilters.add('FlatStrength', function () { return true; });
        toggleApplyStatus.statusAssignmentFilters.add('FlatStrength', function (value) { return !value; });
        defender.statuses.add('removeThatStatus', removeThatStatus, 100);
        defender.statuses.add('applyThatStatus', applyThatStatus, 200);
        defender.statuses.add('toggleApplyStatus', toggleApplyStatus, 300);
        attacker.abilities.add('AssignTestStatus', new AssignTestStatus());
        attacker.abilities.add('Sap Strength', new SapStrength());
        attacker.execute('AssignTestStatus', defender);
        chai_1.expect(defender.statuses.has('FlatStrength')).to.be.false;
        attacker.execute('Sap Strength', defender);
        chai_1.expect(defender.attributes.get('Strength')).to.be.equal(0);
        defender.attributes.set('Strength', 10);
        defender.statuses.remove('toggleApplyStatus');
        attacker.execute('AssignTestStatus', defender);
        attacker.execute('Sap Strength', defender);
        chai_1.expect(defender.statuses.has('FlatStrength')).to.be.true;
        chai_1.expect(defender.attributes.get('Strength')).to.be.equal(5);
        defender.statuses.remove('FlatStrength');
        defender.attributes.set('Strength', 10);
        defender.statuses.updatePriority('applyThatStatus', 1);
        attacker.execute('AssignTestStatus', defender);
        chai_1.expect(defender.statuses.has('FlatStrength')).to.be.false;
        attacker.execute('Sap Strength', defender);
        chai_1.expect(defender.attributes.get('Strength')).to.be.equal(0);
    });
    it('respects priority when removing statuses with status filters', function () {
        initTest();
        var removeThatStatus = new Status_1.Status();
        var applyThatStatus = new Status_1.Status();
        var toggleApplyStatus = new Status_1.Status();
        removeThatStatus.statusRemovalFilters.add('FlatStrength', function () { return true; });
        applyThatStatus.statusRemovalFilters.add('FlatStrength', function () { return false; });
        toggleApplyStatus.statusRemovalFilters.add('FlatStrength', function (value) { return !value; });
        defender.statuses.add('removeThatStatus', removeThatStatus, 100);
        defender.statuses.add('applyThatStatus', applyThatStatus, 200);
        defender.statuses.add('toggleApplyStatus', toggleApplyStatus, 300);
        attacker.abilities.add('AssignTestStatus', new AssignTestStatus());
        attacker.abilities.add('Sap Strength', new SapStrength());
        attacker.execute('AssignTestStatus', defender);
        chai_1.expect(defender.statuses.has('FlatStrength')).to.be.true;
        attacker.execute('Sap Strength', defender);
        chai_1.expect(defender.attributes.get('Strength')).to.be.equal(5);
        defender.attributes.set('Strength', 10);
        defender.statuses.remove('toggleApplyStatus');
        attacker.execute('AssignTestStatus', defender);
        attacker.execute('Sap Strength', defender);
        chai_1.expect(defender.statuses.has('FlatStrength')).to.be.true;
        chai_1.expect(defender.attributes.get('Strength')).to.be.equal(5);
        defender.statuses.remove('FlatStrength');
        defender.attributes.set('Strength', 10);
        defender.statuses.updatePriority('applyThatStatus', 1);
        attacker.execute('AssignTestStatus', defender);
        chai_1.expect(defender.statuses.has('FlatStrength')).to.be.true;
        attacker.execute('Sap Strength', defender);
        chai_1.expect(defender.attributes.get('Strength')).to.be.equal(5);
    });
    var TestAssignAttributes = /** @class */ (function (_super) {
        __extends(TestAssignAttributes, _super);
        function TestAssignAttributes() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        TestAssignAttributes.prototype.execute = function (source, target, data) {
            var check = CheckExecutor_1.CheckExecutor.getInstance().generateCheck().setTarget(0);
            var e = new Effect_1.Effect();
            e.attributeAssignments.add('HP', function () { return 10; });
            var i = new Interaction_1.Interaction(source, target, check);
            i.effects.add(e);
            i.execute();
            return this;
        };
        return TestAssignAttributes;
    }(Ability_1.Ability));
    var TestAssignLabels = /** @class */ (function (_super) {
        __extends(TestAssignLabels, _super);
        function TestAssignLabels() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        TestAssignLabels.prototype.execute = function (source, target, data) {
            var check = CheckExecutor_1.CheckExecutor.getInstance().generateCheck().setTarget(0);
            var e = new Effect_1.Effect();
            e.labelAssignments.add('Label Value', function () { return 'Replacement Value'; });
            var i = new Interaction_1.Interaction(source, target, check);
            i.effects.add(e);
            i.execute();
            return this;
        };
        return TestAssignLabels;
    }(Ability_1.Ability));
    var TestAssignFlags = /** @class */ (function (_super) {
        __extends(TestAssignFlags, _super);
        function TestAssignFlags() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        TestAssignFlags.prototype.execute = function (source, target, data) {
            var check = CheckExecutor_1.CheckExecutor.getInstance().generateCheck().setTarget(0);
            var e = new Effect_1.Effect();
            e.flagAssignments.add('IsGolden', function () { return false; });
            var i = new Interaction_1.Interaction(source, target, check);
            i.effects.add(e);
            i.execute();
            return this;
        };
        return TestAssignFlags;
    }(Ability_1.Ability));
    var AssignTestStatus = /** @class */ (function (_super) {
        __extends(AssignTestStatus, _super);
        function AssignTestStatus() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        AssignTestStatus.prototype.execute = function (source, target, data) {
            var check = CheckExecutor_1.CheckExecutor.getInstance().generateCheck().setTarget(0);
            var e = new Effect_1.Effect();
            var testStatus = new Status_1.Status();
            testStatus.attributeAssignmentFilters.add('Strength', function () { return 5; });
            e.statusAssignments.add('FlatStrength', testStatus);
            var i = new Interaction_1.Interaction(source, target, check);
            i.effects.add(e);
            i.execute();
            return this;
        };
        return AssignTestStatus;
    }(Ability_1.Ability));
    var RevokeTestStatus = /** @class */ (function (_super) {
        __extends(RevokeTestStatus, _super);
        function RevokeTestStatus() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        RevokeTestStatus.prototype.execute = function (source, target, data) {
            var check = CheckExecutor_1.CheckExecutor.getInstance().generateCheck().setTarget(0);
            var e = new Effect_1.Effect();
            e.statusRemovals.add('Protect Strength');
            var i = new Interaction_1.Interaction(source, target, check);
            i.effects.add(e);
            i.execute();
            return this;
        };
        return RevokeTestStatus;
    }(Ability_1.Ability));
    var SapStrength = /** @class */ (function (_super) {
        __extends(SapStrength, _super);
        function SapStrength() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        SapStrength.prototype.execute = function (source, target, data) {
            var check = CheckExecutor_1.CheckExecutor.getInstance().generateCheck().setTarget(0);
            var e = new Effect_1.Effect();
            e.attributeAssignments.add('Strength', function () { return 0; });
            var i = new Interaction_1.Interaction(source, target, check);
            i.effects.add(e);
            i.execute();
            return this;
        };
        return SapStrength;
    }(Ability_1.Ability));
});
//# sourceMappingURL=EffectRenderer.js.map