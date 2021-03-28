"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.Weapon = void 0;
var Item_1 = require("./Item");
var CheckExecutor_1 = require("cm-check/lib/Check/CheckExecutor");
var List_1 = require("../List");
var Weapon = /** @class */ (function (_super) {
    __extends(Weapon, _super);
    function Weapon() {
        var _this = _super.call(this) || this;
        _this.state.damageRoll = CheckExecutor_1.CheckExecutor.getInstance().generateCheck();
        _this.state.checkModifiers = new List_1.List();
        return _this;
    }
    Object.defineProperty(Weapon.prototype, "damageRoll", {
        get: function () { return this.state.damageRoll; },
        enumerable: false,
        configurable: true
    });
    Weapon.prototype.checkModifiers = function () { return this.state.checkModifiers; };
    return Weapon;
}(Item_1.Item));
exports.Weapon = Weapon;
//# sourceMappingURL=Weapon.js.map