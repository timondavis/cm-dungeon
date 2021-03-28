"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Interaction = void 0;
var cm_check_1 = require("cm-check");
var EffectRenderer_1 = require("./EffectRenderer");
var List_1 = require("../Model/List");
var Logger_1 = require("../Log/Logger");
var Interaction = /** @class */ (function () {
    function Interaction(source, target, check) {
        this._effects = new List_1.List();
        this._source = source;
        this._target = target;
        this._resistanceCheck = check;
        this._preCheckCallbacks = new List_1.List();
        this._postCheckCallbacks = new List_1.List();
    }
    Object.defineProperty(Interaction.prototype, "source", {
        get: function () { return this._source; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Interaction.prototype, "target", {
        get: function () { return this._target; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Interaction.prototype, "resistanceCheck", {
        get: function () { return this._resistanceCheck; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Interaction.prototype, "effects", {
        get: function () { return this._effects; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Interaction.prototype, "type", {
        get: function () { return this._type; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Interaction.prototype, "preCheckCallbacks", {
        get: function () { return this._preCheckCallbacks; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Interaction.prototype, "postCheckCallbacks", {
        get: function () { return this._postCheckCallbacks; },
        enumerable: false,
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
            EffectRenderer_1.EffectRenderer.renderEffects(this.target, this.effects);
        }
        return this.resistanceCheck.isPass();
    };
    Interaction.prototype.doResistanceCheck = function () {
        var _this = this;
        this.preCheckCallbacks.forEachItem(function (callback) {
            callback.call(_this, _this.source, _this.target, _this.resistanceCheck);
        });
        cm_check_1.CheckExecutor.getInstance().execute(this.resistanceCheck);
        this.logCheck(this.resistanceCheck);
        this.postCheckCallbacks.forEachItem(function (callback) {
            callback.call(_this, _this.source, _this.target, _this.resistanceCheck);
        });
        return this.resistanceCheck.isPass();
    };
    Interaction.prototype.logCheck = function (check) {
        var console = Logger_1.Logger.getInstance();
        console.log('Raw Result: ' + check.getRawRollResult().toString());
        check.getModifiers().forEach(function (modifier) {
            var modifierString = "";
            modifierString += modifier.getName() + ": ";
            modifierString += (modifier.getValue() >= 0) ? " +" +
                modifier.getValue().toString() :
                " " + modifier.getValue().toString();
            console.log(modifierString);
        });
        console.log('Final Result: ' + check.getResult() + " vs " + check.getTarget());
        console.log((check.isPass()) ? "Success" : "Failure");
    };
    return Interaction;
}());
exports.Interaction = Interaction;
//# sourceMappingURL=Interaction.js.map