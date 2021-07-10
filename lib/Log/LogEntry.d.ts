/**
 * @class LogEntry
 *
 * A single message recorded to a log, as well as metadata describing aspects of the mesasage.
 */
export declare class LogEntry {
    private _message;
    readonly message: string;
    private _time;
    readonly time: Date;
    constructor(message: string);
}
