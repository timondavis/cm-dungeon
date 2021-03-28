"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = void 0;
var NumberMap_1 = require("../Model/NumberMap");
var Log_1 = require("./Log");
var LogType_1 = require("./LogType");
/**
 * @class Logger
 *
 * Singleton instance of the logging interface, which facilitates logging and access to logs.
 * Stores multiple logs stored by type.
 */
var Logger = /** @class */ (function () {
    function Logger() {
        this._logs = new NumberMap_1.NumberMap();
        this.initializeLogType(LogType_1.LogType.DEFAULT);
    }
    Object.defineProperty(Logger.prototype, "logs", {
        get: function () { return this._logs; },
        enumerable: false,
        configurable: true
    });
    Logger.getInstance = function () {
        if (Logger._instance === undefined) {
            Logger._instance = new Logger();
        }
        return Logger._instance;
    };
    /**
     * Log a message to the indicated log instance.
     *
     * @param {string} message  The message to be logged.
     * @param {LogType} type    The type of log to write to.  Defaults to LogType.DEFAULT
     */
    Logger.prototype.log = function (message, type) {
        if (type === void 0) { type = LogType_1.LogType.DEFAULT; }
        if (!this.hasLogType(type)) {
            this.initializeLogType(type);
        }
        this.logs.get(type).logMessage(message);
    };
    /**
     * Get a specific Log instance by type
     *
     * @param {LogType} logType  The type of log to capture.
     * @returns {Log}  The Log instance found.
     */
    Logger.prototype.getLog = function (logType) {
        if (logType === void 0) { logType = LogType_1.LogType.DEFAULT; }
        return this.logs.get(logType);
    };
    /**
     * Inquire whether or not the given log type is being tracked by the logger.
     *
     * @param {LogType} logType  The type of log which is the subject of inquiry.
     * @returns {boolean}  TRUE if log exists, FALSE if it doesn't.
     */
    Logger.prototype.hasLogType = function (logType) {
        return this.logs.has(logType);
    };
    Logger.prototype.printLogToConsole = function (logType) {
        if (logType === void 0) { logType = LogType_1.LogType.DEFAULT; }
        var log = this.getLog(logType);
        log.forEachItem(function (entry) {
            console.log(entry.message);
        });
    };
    /**
     * Helper method to install a new Log for the given LogType.
     *
     * @param {LogType} logType  The type of log to instantiate.
     */
    Logger.prototype.initializeLogType = function (logType) {
        this.logs.add(logType, new Log_1.Log(logType));
    };
    return Logger;
}());
exports.Logger = Logger;
//# sourceMappingURL=Logger.js.map