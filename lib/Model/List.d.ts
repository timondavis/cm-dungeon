export declare class List<T> {
    private _collection;
    constructor();
    add(item: T): void;
    push(item: T): void;
    remove(index: number): void;
    get(index: number): T;
    readonly length: number;
    forEachItem(callback: (item: T, index: number) => void): void;
}
