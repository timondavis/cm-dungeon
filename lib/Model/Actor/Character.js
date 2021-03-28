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
exports.Character = void 0;
var Actor_1 = require("../Actor");
var NameMap_1 = require("../NameMap");
var Character = /** @class */ (function (_super) {
    __extends(Character, _super);
    function Character() {
        var _this = _super.call(this) || this;
        _this.state.inventory = new NameMap_1.NameMap();
        _this.state.equipped = new NameMap_1.NameMap();
        return _this;
    }
    Object.defineProperty(Character.prototype, "inventory", {
        get: function () { return this.state.inventory; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Character.prototype, "equipped", {
        get: function () { return this.state.equipped; },
        enumerable: false,
        configurable: true
    });
    return Character;
}(Actor_1.Actor));
exports.Character = Character;
//# sourceMappingURL=Character.js.map