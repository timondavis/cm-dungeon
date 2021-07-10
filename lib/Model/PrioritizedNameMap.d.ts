import { NameMap } from "./NameMap";
import { NumberMap } from "./NumberMap";
import { ISerializableModel, SerializableModel } from "cm-domain-utilities";
export interface IPrioritizedNameMap<T> extends ISerializableModel {
    prioritizedNames: NumberMap<NameMap<T>>;
    namePriorityIndex: NameMap<number>;
}
export declare class PrioritizedNameMap<T> extends SerializableModel {
    protected state: IPrioritizedNameMap<T>;
    private readonly prioritizedNames;
    private readonly namePriorityIndex;
    private static DEFAULT_PRIORITY;
    constructor();
    /**
     * Add an item to the collection with the given key.
     *
     * @param {string} key
     * @param {T} value
     * @param {number} priority (defaults to 1000)
     * @returns {NameMap<T>}
     */
    add(key: string, value: T, priority?: number): PrioritizedNameMap<T>;
    /**
     * Add or replace an item in the collection with a given key.
     *
     * @param {string} key
     * @param {T} value
     * @returns {NameMap<T>}
     */
    set(key: string, value: T): PrioritizedNameMap<T>;
    /**
     * Replace an existing item in the collection with a given key.
     *
     * @param {string} key
     * @param {T} value
     * @returns {NameMap<T>}
     */
    replace(key: string, value: T): PrioritizedNameMap<T>;
    /**
     * Get a single item in the collection, referenced with the given key.
     *
     * @param {string} key?
     * @returns {T}
     */
    get(key: string): T;
    /**
     * Returns a NameMap with all items registered at the given priority level.
     *
     * @param {number} priority
     * @returns {NameMap<T>}
     */
    getMapForPriority(priority: number): NameMap<T>;
    /**
     * Get all items in the collection
     *
     * @returns {{[p: string]: T}}
     */
    getAll(): {
        [key: string]: T;
    };
    /**
     * Get all of the items in the collection, reported back as one NameMap.
     *
     * @returns {NameMap<T>}
     */
    getAllAsNameMap(): NameMap<T>;
    /**
     * Request information on whether or not an item with a given key exists
     *
     * @param {string} key
     * @returns {boolean}
     */
    has(key: string, priority?: number | null): boolean;
    /**
     * Remove the item with the given key from the collection.
     *
     * @param {string} key
     * @returns {NameMap<T>}
     */
    remove(key: string): PrioritizedNameMap<T>;
    /**
     * Get the keys belonging to the map as an array.
     * @returns {string[]}
     */
    getKeys(priority?: number | null): string[];
    /**
     * Provide a callback function - this function will be invoked for every item in the map.  Will deliver items
     * from priority tiers in ASCENDING order ( starting with 0, then 1, etc... ).  If a priority is specified, then only
     * items on that priority tier will be processed.
     *
     * @param {(key: string, index?: number, array?: string[]) => void} callback
     * @param {number} priority
     */
    forEachKey(callback: (key: string, index?: number, array?: string[]) => void, priority?: number | null): void;
    /**
     * Change the priority of the indicated item with the given key.
     *
     * @param {string} key
     * @param {number} newPriority
     */
    updatePriority(key: string, newPriority: number): void;
    /**
     * Get the number of items in the map.
     * @returns {number}
     */
    readonly length: number;
    /**
     * Get the priority for the item with the given key
     *
     * @param {string} key
     * @returns {number}
     */
    getKeyPriority(key: string): number;
    /**
     * Will search for the priority of the given key.  If no such key is found,
     * this function will return the DEFAULT PRIORITY value.  Handy for situations where
     * you just need a number to assign, and don't require the key to already have been registered
     * to take action.
     *
     * @param {string} key
     * @returns {number}
     */
    protected getPriorityOfKeyOrDefault(key: string): number;
}
