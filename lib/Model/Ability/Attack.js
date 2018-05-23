"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Interaction_1 = require("../../Control/Interaction");
var CheckExecutor_1 = require("cm-check/lib/Check/CheckExecutor");
var Effect_1 = require("../Effect");
var DieBag_1 = require("cm-check/lib/Die/DieBag");
var Attack = /** @class */ (function () {
    function Attack() {
        this.disabled = false;
    }
    Attack.prototype.execute = function (source, target, data) {
        var effect = new Effect_1.Effect(target);
        var check = this.generateCheck(source, target);
        var damage = this.getDamage() * -1;
        effect.modifyAttributes.add('HP', damage);
        var attackInteraction = new Interaction_1.Interaction(source, target, check);
        attackInteraction.effects.push(effect);
        attackInteraction.execute();
        return this;
    };
    Attack.prototype.generateCheck = function (source, target) {
        var CE = CheckExecutor_1.CheckExecutor.getInstance();
        var strength = source.attributes.get('Strength');
        var strengthModifier = CE.generateModifier('Strength');
        strengthModifier.setValue(strength);
        var AC = target.attributes.get('AC');
        var check = CE.generateCheck('d20-attribute');
        check.addDie(1, 20);
        check.addModifier(strengthModifier);
        check.setTarget(AC);
        return check;
    };
    Attack.prototype.getDamage = function () {
        var damageRoll = new DieBag_1.DieBag();
        damageRoll.add(1, 8);
        damageRoll.roll();
        return damageRoll.getTotal();
    };
    return Attack;
}());
exports.Attack = Attack;
//# sourceMappingURL=Attack.js.map