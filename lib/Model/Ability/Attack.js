"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CheckExecutor_1 = require("cm-check/lib/Check/CheckExecutor");
var Effect_1 = require("../Effect");
var Attack = /** @class */ (function () {
    function Attack() {
    }
    Attack.prototype.execute = function (source, target, data) {
        var CE = CheckExecutor_1.CheckExecutor.getInstance();
        var strength = source.attributes.get('Strength');
        var strengthModifier = CE.generateModifier('Strength');
        strengthModifier.setValue(2);
        var AC = target.attributes.get('AC');
        var check = CE.generateCheck();
        check.addDie(1, 20);
        check.addModifier(strengthModifier);
        check.setTarget(AC);
        var effect = new Effect_1.Effect();
    };
    return Attack;
}());
exports.Attack = Attack;
//# sourceMappingURL=Attack.js.map