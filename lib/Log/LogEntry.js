"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogEntry = void 0;
/**
 * @class LogEntry
 *
 * A single message recorded to a log, as well as metadata describing aspects of the mesasage.
 */
var LogEntry = /** @class */ (function () {
    function LogEntry(message) {
        this._message = message;
        this._time = new Date();
    }
    Object.defineProperty(LogEntry.prototype, "message", {
        get: function () { return this._message; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(LogEntry.prototype, "time", {
        get: function () { return this._time; },
        enumerable: false,
        configurable: true
    });
    return LogEntry;
}());
exports.LogEntry = LogEntry;
//# sourceMappingURL=LogEntry.js.map