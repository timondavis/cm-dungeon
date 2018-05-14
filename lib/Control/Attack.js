"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CheckExecutor_1 = require("cm-check/lib/Check/CheckExecutor");
var Attack = /** @class */ (function () {
    function Attack() {
    }
    Attack.prototype.execute = function () {
        var CE = new CheckExecutor_1.CheckExecutor();
        var attackCheck = CE.generateCheck('d20-attribute');
        attackCheck.setTarget(this.toHitTarget);
        if (attackCheck.roll().isPass()) {
            var newHP = this.target.Scores['HP'];
            this.damageDie.roll();
            newHP -= this.damageDie.getTotal();
            newHP += this.damageModifier;
            this.target.Scores['HP'] = newHP;
            return true;
        }
        return false;
    };
    return Attack;
}());
exports.Attack = Attack;
