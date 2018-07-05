"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var LogEntry = /** @class */ (function () {
    function LogEntry(message) {
        this._message = message;
        this._time = new Date();
    }
    Object.defineProperty(LogEntry.prototype, "message", {
        get: function () { return this._message; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LogEntry.prototype, "time", {
        get: function () { return this._time; },
        enumerable: true,
        configurable: true
    });
    return LogEntry;
}());
exports.LogEntry = LogEntry;
//# sourceMappingURL=LogEntry.js.map