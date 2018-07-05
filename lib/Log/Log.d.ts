import { LogType } from "./LogType";
import { LogEntry } from "./LogEntry";
import { Queue } from "../Model/Queue";
export declare class Log extends Queue<LogEntry> {
    private _type;
    readonly type: LogType;
    private _capacity;
    capacity: number;
    constructor(type: LogType, capacity?: number);
    logMessage(message: string): void;
    getMessage(index: number): string;
}
