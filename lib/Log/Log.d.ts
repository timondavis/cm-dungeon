import { LogType } from "./LogType";
import { LogEntry } from "./LogEntry";
import { Queue } from "../Model/Queue";
/**
 * @class Log
 *
 * Instance of a Log, which records all messages passed to it in an ordered queue.
 */
export declare class Log extends Queue<LogEntry> {
    private _type;
    readonly type: LogType;
    private _capacity;
    capacity: number;
    constructor(type: LogType, capacity?: number);
    /**
     * Write a message to the log.
     *
     * @param {string} message  The message to record in the log
     */
    logMessage(message: string): void;
    /**
     * Get the message residing at the indicated index
     *
     * @param {number} index  The key of the log entry desired for retrieval.
     * @returns {string}
     */
    getMessage(index: number): string;
    /**
     * Return the contents of the log as a flat data structure and clears the log.
     *
     * @returns {{[p: number]: LogEntry}}
     */
    flush(): {
        [key: number]: LogEntry;
    };
}
