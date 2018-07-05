import {List} from "./List";

export class Queue<T> extends List<T> {


    public queue( item : T ) : void {

        this.add( item );
    }

    public dequeue() : T {

        const item : T = this.get(0);
        this.remove(0);
        return item;
    }
}