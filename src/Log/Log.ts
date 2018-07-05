import {LogType} from "./LogType";
import {LogEntry} from "./LogEntry";
import {Queue} from "../Model/Queue";

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

    public logMessage( message: string ) {

        if ( this.length + 1 > this.capacity ) {
            this.dequeue();
        }

        this.queue( new LogEntry( message ));
    }

    public getMessage( index : number ) : string {

        return this.get( index ).message;
    }

    public flush() : { [key:number] : LogEntry } {

        const queue = this.collection;
        this.clear();

        return queue;
    }
}
