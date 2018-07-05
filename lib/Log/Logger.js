"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var NumberMap_1 = require("../Model/NumberMap");
var Log_1 = require("./Log");
var LogType_1 = require("./LogType");
var Logger = /** @class */ (function () {
    function Logger() {
        this._logs = new NumberMap_1.NumberMap();
        this.initializeLogType(LogType_1.LogType.DEFAULT);
    }
    Object.defineProperty(Logger.prototype, "logs", {
        get: function () { return this._logs; },
        enumerable: true,
        configurable: true
    });
    Logger.getInstance = function () {
        if (Logger._instance === undefined) {
            Logger._instance = new Logger();
        }
        return Logger._instance;
    };
    Logger.prototype.log = function (message, type) {
        if (type === void 0) { type = LogType_1.LogType.DEFAULT; }
        if (!this.hasLogType(type)) {
            this.initializeLogType(type);
        }
        this.logs.get(type).logMessage(message);
    };
    Logger.prototype.getLog = function (logType) {
        if (logType === void 0) { logType = LogType_1.LogType.DEFAULT; }
        return this.logs.get(logType);
    };
    Logger.prototype.hasLogType = function (logType) {
        return this.logs.has(logType);
    };
    Logger.prototype.initializeLogType = function (logType) {
        this.logs.add(logType, new Log_1.Log(logType));
    };
    return Logger;
}());
exports.Logger = Logger;
//# sourceMappingURL=Logger.js.map