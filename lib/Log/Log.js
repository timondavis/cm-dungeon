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
var LogEntry_1 = require("./LogEntry");
var Queue_1 = require("../Model/Queue");
var Log = /** @class */ (function (_super) {
    __extends(Log, _super);
    function Log(type, capacity) {
        if (capacity === void 0) { capacity = 1000; }
        var _this = _super.call(this) || this;
        _this._type = type;
        _this.capacity = capacity;
        return _this;
    }
    Object.defineProperty(Log.prototype, "type", {
        get: function () { return this._type; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Log.prototype, "capacity", {
        get: function () { return this._capacity; },
        set: function (value) { this._capacity = value; },
        enumerable: true,
        configurable: true
    });
    Log.prototype.logMessage = function (message) {
        if (this.length + 1 > this.capacity) {
            this.dequeue();
        }
        this.queue(new LogEntry_1.LogEntry(message));
    };
    Log.prototype.getMessage = function (index) {
        return this.get(index).message;
    };
    return Log;
}(Queue_1.Queue));
exports.Log = Log;
//# sourceMappingURL=Log.js.map