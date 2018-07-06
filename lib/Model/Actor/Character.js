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
var Actor_1 = require("../Actor");
var NameMap_1 = require("../../../lib/Model/NameMap");
var Character = /** @class */ (function (_super) {
    __extends(Character, _super);
    function Character() {
        var _this = _super.call(this) || this;
        _this._inventory = new NameMap_1.NameMap();
        _this._equipped = new NameMap_1.NameMap();
        return _this;
    }
    Object.defineProperty(Character.prototype, "inventory", {
        get: function () { return this._inventory; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Character.prototype, "equipped", {
        get: function () { return this._equipped; },
        enumerable: true,
        configurable: true
    });
    return Character;
}(Actor_1.Actor));
exports.Character = Character;
//# sourceMappingURL=Character.js.map