/**
 * @class LogEntry
 *
 * A single message recorded to a log, as well as metadata describing aspects of the mesasage.
 */
export class LogEntry {

    private _message : string;
    public get message() { return this._message; }

    private _time : Date;
    public get time() { return this._time; }

    public constructor( message : string ) {

        this._message = message;
        this._time= new Date();
    }
}