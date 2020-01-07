import { List } from "./List";
export declare class Queue<T> extends List<T> {
    queue(item: T): void;
    dequeue(): T;
}
