import { ISerializableModel, SerializableModel } from "cm-domain-utilities";
export interface IList<T> extends ISerializableModel {
    collection: T[];
}
export declare class List<T> extends SerializableModel {
    protected state: IList<T>;
    protected get collection(): T[];
    constructor();
    add(item: T): void;
    remove(index: number): void;
    clear(): void;
    get(index: number): T;
    get length(): number;
    forEachItem(callback: (item: T, index: number) => void): void;
}
