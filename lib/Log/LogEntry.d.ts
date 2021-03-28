/**
 * @class LogEntry
 *
 * A single message recorded to a log, as well as metadata describing aspects of the mesasage.
 */
export declare class LogEntry {
    private _message;
    get message(): string;
    private _time;
    get time(): Date;
    constructor(message: string);
}
