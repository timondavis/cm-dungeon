"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Interaction = /** @class */ (function () {
    function Interaction(source, target, check) {
    }
    Interaction.prototype.doResistanceCheck = function () {
        return new Interaction(null, null, null);
    };
    Interaction.prototype.isResistanceCheckPassed = function () {
        return false;
    };
    return Interaction;
}());
exports.Interaction = Interaction;
