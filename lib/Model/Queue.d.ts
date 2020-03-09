import { IList, List } from "./List";
export interface IQueue<T> extends IList<T> {
}
export declare class Queue<T> extends List<T> {
    protected state: IQueue<T>;
    queue(item: T): void;
    dequeue(): T;
}
