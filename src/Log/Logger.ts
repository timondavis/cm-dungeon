import {NumberMap} from "../Model/NumberMap";
import {Log} from "./Log";
import {LogType} from "./LogType";

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

    public log( message : string, type : LogType = LogType.DEFAULT ) : void {

        if (! this.hasLogType( type )) {
            this.initializeLogType( type );
        }

        this.logs.get(<number>type).logMessage(message);
    }

    public getLog( logType : LogType = LogType.DEFAULT ) {

        return this.logs.get(<number>logType);
    }

    public hasLogType( logType : LogType ) {

        return this.logs.has(<number> logType);
    }

    private initializeLogType( logType : LogType ) {
        this.logs.add( <number> logType, new Log( logType ));
    }
}

