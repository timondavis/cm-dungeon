import { Log } from "./Log";
import { LogType } from "./LogType";
/**
 * @class Logger
 *
 * Singleton instance of the logging interface, which facilitates logging and access to logs.
 * Stores multiple logs stored by type.
 */
export declare class Logger {
    private _logs;
    private readonly logs;
    private static _instance;
    private constructor();
    static getInstance(): Logger;
    /**
     * Log a message to the indicated log instance.
     *
     * @param {string} message  The message to be logged.
     * @param {LogType} type    The type of log to write to.  Defaults to LogType.DEFAULT
     */
    log(message: string, type?: LogType): void;
    /**
     * Get a specific Log instance by type
     *
     * @param {LogType} logType  The type of log to capture.
     * @returns {Log}  The Log instance found.
     */
    getLog(logType?: LogType): Log;
    /**
     * Inquire whether or not the given log type is being tracked by the logger.
     *
     * @param {LogType} logType  The type of log which is the subject of inquiry.
     * @returns {boolean}  TRUE if log exists, FALSE if it doesn't.
     */
    hasLogType(logType: LogType): boolean;
    printLogToConsole(logType?: LogType): void;
    /**
     * Helper method to install a new Log for the given LogType.
     *
     * @param {LogType} logType  The type of log to instantiate.
     */
    private initializeLogType(logType);
}
