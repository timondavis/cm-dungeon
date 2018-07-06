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
/**
 * @class Log
 *
 * Instance of a Log, which records all messages passed to it in an ordered queue.
 */
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
    /**
     * Write a message to the log.
     *
     * @param {string} message  The message to record in the log
     */
    Log.prototype.logMessage = function (message) {
        if (this.length + 1 > this.capacity) {
            this.dequeue();
        }
        this.queue(new LogEntry_1.LogEntry(message));
    };
    /**
     * Get the message residing at the indicated index
     *
     * @param {number} index  The key of the log entry desired for retrieval.
     * @returns {string}
     */
    Log.prototype.getMessage = function (index) {
        return this.get(index).message;
    };
    /**
     * Return the contents of the log as a flat data structure and clears the log.
     *
     * @returns {{[p: number]: LogEntry}}
     */
    Log.prototype.flush = function () {
        var queue = this.collection;
        this.clear();
        return queue;
    };
    return Log;
}(Queue_1.Queue));
exports.Log = Log;
//# sourceMappingURL=Log.js.map