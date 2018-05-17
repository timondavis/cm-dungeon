export declare class NameMap<T> {
    protected collection: {
        [key: string]: T;
    };
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
    getKeys(): string[];
    forEachKey(callback: (key: string, index?: number, array?: string[]) => void): void;
}
