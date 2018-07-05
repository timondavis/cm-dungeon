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
var Item_1 = require("./Item");
var CheckExecutor_1 = require("cm-check/lib/Check/CheckExecutor");
var List_1 = require("../List");
var Weapon = /** @class */ (function (_super) {
    __extends(Weapon, _super);
    function Weapon() {
        var _this = _super.call(this) || this;
        _this._damageRoll = CheckExecutor_1.CheckExecutor.getInstance().generateCheck();
        _this._checkModifiers = new List_1.List();
        return _this;
    }
    Object.defineProperty(Weapon.prototype, "damageRoll", {
        get: function () { return this._damageRoll; },
        enumerable: true,
        configurable: true
    });
    Weapon.prototype.checkModifiers = function () { return this._checkModifiers; };
    return Weapon;
}(Item_1.Item));
exports.Weapon = Weapon;
//# sourceMappingURL=Weapon.js.map