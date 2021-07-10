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
var Ability_1 = require("../Ability");
var Interaction_1 = require("../../../Control/Interaction");
var CheckExecutor_1 = require("cm-check/lib/Check/CheckExecutor");
var Effect_1 = require("../../Effect");
var DieBag_1 = require("cm-check/lib/Die/DieBag");
var D20_Attack = /** @class */ (function (_super) {
    __extends(D20_Attack, _super);
    function D20_Attack() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    D20_Attack.prototype.execute = function (source, target) {
        var effect = new Effect_1.Effect();
        var check = this.generateCheck(source, target);
        var damage = this.getDamage() * -1;
        effect.attributeAssignments.add('HP', function (value) { return (value + damage); });
        var attackInteraction = new Interaction_1.Interaction(source, target, check);
        attackInteraction.effects.add(effect);
        attackInteraction.execute();
        return this;
    };
    D20_Attack.prototype.generateCheck = function (source, target) {
        var CE = CheckExecutor_1.CheckExecutor.getInstance();
        var strengthModifier = CE.generateModifier('result');
        strengthModifier.setValue(2);
        var AC = target.attributes.get('AC');
        var check = CE.generateCheck('d20-attribute');
        check.addDie(1, 20);
        check.addModifier(strengthModifier);
        check.setTarget(AC);
        return check;
    };
    D20_Attack.prototype.getDamage = function () {
        var damageRoll = new DieBag_1.DieBag();
        damageRoll.add(1, 8);
        damageRoll.roll();
        return damageRoll.getTotal();
    };
    return D20_Attack;
}(Ability_1.Ability));
exports.D20_Attack = D20_Attack;
//# sourceMappingURL=D20_Attack.js.map