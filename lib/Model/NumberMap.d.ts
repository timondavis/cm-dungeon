import { ISerializableModel, SerializableModel } from "cm-domain-utilities";
export interface INumberMap<T> extends ISerializableModel {
    collection: {
        [key: number]: T;
    };
}
export declare class NumberMap<T> extends SerializableModel {
    protected state: INumberMap<T>;
    constructor();
    /**
     * Add an item to the collection with the given key.
     *
     * @param {number} key
     * @param {T} value
     * @returns {NumberMap<T>}
     */
    add(key: number, value: T): NumberMap<T>;
    /**
     * Add or replace an item in the collection with a given key.
     *
     * @param {number} key
     * @param {T} value
     * @returns {NumberMap<T>}
     */
    set(key: number, value: T): NumberMap<T>;
    /**
     * Replace an existing item in the collection with a given key.
     *
     * @param {number} key
     * @param {T} value
     * @returns {NumberMap<T>}
     */
    replace(key: number, value: T): NumberMap<T>;
    /**
     * Get a single item in the collection, referenced with the given key.
     *
     * @param {number} key?
     * @returns {T}
     */
    get(key: number): T;
    /**
     * Get all items in the collection
     *
     * @returns {{[p: number]: T}}
     */
    getAll(): {
        [key: number]: T;
    };
    /**
     * Request information on whether or not an item with a given key exists
     *
     * @param {number} key
     * @returns {boolean}
     */
    has(key: number): boolean;
    /**
     * Remove the item with the given key from the collection.
     *
     * @param {number} key
     * @returns {NumberMap<T>}
     */
    remove(key: number): NumberMap<T>;
    /**
     * Get the keys belonging to the map as an array.
     * @returns {string[]}
     */
    getKeys(): number[];
    /**
     * Provide a callback function - this function will be invoked for every item in the map.
     * @param {(key: number, index?: number, array?: number[]) => void} callback
     */
    forEachKey(callback: (key: number, index?: number, array?: number[]) => void): void;
    /**
     * Get the number of items in the map.
     * @returns {number}
     */
    readonly length: number;
}
