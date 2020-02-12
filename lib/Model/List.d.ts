export declare class List<T> {
    private _collection;
    protected readonly collection: T[];
    constructor();
    add(item: T): void;
    remove(index: number): void;
    clear(): void;
    get(index: number): T;
    readonly length: number;
    forEachItem(callback: (item: T, index: number) => void): void;
}
