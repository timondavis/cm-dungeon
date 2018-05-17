"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CheckExecutor_1 = require("cm-check/lib/Check/CheckExecutor");
var EffectRenderer_1 = require("./EffectRenderer");
var Interaction = /** @class */ (function () {
    function Interaction(source, target, check) {
        this._source = source;
        this._target = target;
        this._resistanceCheck = check;
    }
    Object.defineProperty(Interaction.prototype, "source", {
        get: function () { return this._source; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Interaction.prototype, "target", {
        get: function () { return this._target; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Interaction.prototype, "resistanceCheck", {
        get: function () { return this._resistanceCheck; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Interaction.prototype, "effects", {
        get: function () { return this._effects; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Interaction.prototype, "type", {
        get: function () { return this._type; },
        enumerable: true,
        configurable: true
    });
    /**
     * Returns TRUE if interaction is successful.  Failure is not an indication of error - randomization is
     * a typical factor of determining success.
     *
     * @returns {boolean}
     */
    Interaction.prototype.execute = function () {
        if (this.doResistanceCheck()) {
        }
    };
    Interaction.prototype.doResistanceCheck = function () {
        var _this = this;
        CheckExecutor_1.CheckExecutor.getInstance().execute(this.resistanceCheck);
        if (this.resistanceCheck.isPass()) {
            this.effects.forEach(function (value, index) {
                EffectRenderer_1.EffectRenderer.renderEffects(_this.target, value);
            });
            return true;
        }
        else {
            return false;
        }
    };
    return Interaction;
}());
exports.Interaction = Interaction;
//# sourceMappingURL=Interaction.js.map