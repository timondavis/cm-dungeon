import {LogType} from "./LogType";
import {LogEntry} from "./LogEntry";
import {Queue} from "../Model/Queue";

/**
 * @class Log
 *
 * Instance of a Log, which records all messages passed to it in an ordered queue.
 */
export class Log extends Queue<LogEntry>{

    private _type : LogType;
    public get type() { return this._type; }

    private _capacity : number;
    public get capacity() { return this._capacity; }
    public set capacity( value : number ) { this._capacity = value; }

    public constructor( type : LogType, capacity = 1000 ) {
        super();
        this._type = type;
        this.capacity = capacity;
    }

    /**
     * Write a message to the log.
     *
     * @param {string} message  The message to record in the log
     */
    public logMessage( message: string ) {

        if ( this.length + 1 > this.capacity ) {
            this.dequeue();
        }

        this.queue( new LogEntry( message ));
    }

    /**
     * Get the message residing at the indicated index
     *
     * @param {number} index  The key of the log entry desired for retrieval.
     * @returns {string}
     */
    public getMessage( index : number ) : string {

        return this.get( index ).message;
    }

    /**
     * Return the contents of the log as a flat data structure and clears the log.
     *
     * @returns {{[p: number]: LogEntry}}
     */
    public flush() : { [key:number] : LogEntry } {

        const queue = this.collection;
        this.clear();

        return queue;
    }
}
