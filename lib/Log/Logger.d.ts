import { Log } from "./Log";
import { LogType } from "./LogType";
export declare class Logger {
    private _logs;
    private readonly logs;
    private static _instance;
    private constructor();
    static getInstance(): Logger;
    log(message: string, type?: LogType): void;
    getLog(logType?: LogType): Log;
    hasLogType(logType: LogType): boolean;
    private initializeLogType(logType);
}
