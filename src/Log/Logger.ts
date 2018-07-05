import {NumberMap} from "../Model/NumberMap";
import {Log} from "./Log";
import {LogType} from "./LogType";

/**
 * @class Logger
 *
 * Singleton instance of the logging interface, which facilitates logging and access to logs.
 * Stores multiple logs stored by type.
 */
export class Logger {

    private _logs : NumberMap<Log>
    private get logs() { return this._logs; }

    private static _instance : Logger;

    private constructor() {
        this._logs = new NumberMap<Log>();
        this.initializeLogType(LogType.DEFAULT);
    }

    public static getInstance() : Logger {

        if ( Logger._instance === undefined ) {
            Logger._instance = new Logger();
        }

        return Logger._instance;
    }

    /**
     * Log a message to the indicated log instance.
     *
     * @param {string} message  The message to be logged.
     * @param {LogType} type    The type of log to write to.  Defaults to LogType.DEFAULT
     */
    public log( message : string, type : LogType = LogType.DEFAULT ) : void {

        if (! this.hasLogType( type )) {
            this.initializeLogType( type );
        }

        this.logs.get(<number>type).logMessage(message);
    }

    /**
     * Get a specific Log instance by type
     *
     * @param {LogType} logType  The type of log to capture.
     * @returns {Log}  The Log instance found.
     */
    public getLog( logType : LogType = LogType.DEFAULT ) {

        return this.logs.get(<number>logType);
    }

    /**
     * Inquire whether or not the given log type is being tracked by the logger.
     *
     * @param {LogType} logType  The type of log which is the subject of inquiry.
     * @returns {boolean}  TRUE if log exists, FALSE if it doesn't.
     */
    public hasLogType( logType : LogType ) {

        return this.logs.has(<number> logType);
    }

    /**
     * Helper method to install a new Log for the given LogType.
     *
     * @param {LogType} logType  The type of log to instantiate.
     */
    private initializeLogType( logType : LogType ) {
        this.logs.add( <number> logType, new Log( logType ));
    }
}

