import { ISerializableModel, SerializableModel } from "cm-domain-utilities";
export interface INameMap<T> extends ISerializableModel {
    collection: {
        [key: string]: T;
    };
}
export declare class NameMap<T> extends SerializableModel {
    protected state: INameMap<T>;
    constructor();
    /**
     * Add an item to the collection with the given key.
     *
     * @param {string} key
     * @param {T} value
     * @returns {NameMap<T>}
     */
    add(key: string, value: T): NameMap<T>;
    /**
     * Add or replace an item in the collection with a given key.
     *
     * @param {string} key
     * @param {T} value
     * @returns {NameMap<T>}
     */
    set(key: string, value: T): NameMap<T>;
    /**
     * Replace an existing item in the collection with a given key.
     *
     * @param {string} key
     * @param {T} value
     * @returns {NameMap<T>}
     */
    replace(key: string, value: T): NameMap<T>;
    /**
     * Get a single item in the collection, referenced with the given key.
     *
     * @param {string} key?
     * @returns {T}
     */
    get(key: string): T;
    /**
     * Get all items in the collection
     *
     * @returns {{[p: string]: T}}
     */
    getAll(): {
        [key: string]: T;
    };
    /**
     * Request information on whether or not an item with a given key exists
     *
     * @param {string} key
     * @returns {boolean}
     */
    has(key: string): boolean;
    /**
     * Remove the item with the given key from the collection.
     *
     * @param {string} key
     * @returns {NameMap<T>}
     */
    remove(key: string): NameMap<T>;
    /**
     * Get the keys belonging to the map as an array.
     * @returns {string[]}
     */
    getKeys(): string[];
    /**
     * Provide a callback function - this function will be invoked for every item in the map.
     * @param {(key: string, index?: number, array?: string[]) => void} callback
     */
    forEachKey(callback: (key: string, index?: number, array?: string[]) => void): void;
    /**
     * Get the number of items in the map.
     * @returns {number}
     */
    readonly length: number;
    toArray(): T[];
    toMap(): Map<string, T>;
}
