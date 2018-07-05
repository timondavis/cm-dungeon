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
var Item = /** @class */ (function (_super) {
    __extends(Item, _super);
    function Item() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(Item.prototype, "owner", {
        get: function () { return this._owner; },
        enumerable: true,
        configurable: true
    });
    Item.prototype.setOwner = function (value) {
        this._owner = value;
    };
    Item.prototype.removeOwner = function () {
        this._owner = null;
    };
    return Item;
}(Actor_1.Actor));
exports.Item = Item;
//# sourceMappingURL=Item.js.map