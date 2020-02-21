import {IList, List} from "./List";

export interface IQueue<T> extends IList<T> {}

export class Queue<T> extends List<T> {

	protected state: IQueue<T>;

    public queue( item : T ) : void {
        this.add( item );
    }

    public dequeue() : T {
        const item : T = this.get(0);
        this.remove(0);
        return item;
    }
}