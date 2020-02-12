import { Status } from "./Status";
export declare class StatusLibrary {
    private _collection;
    private static _instance;
    private constructor();
    /**
     * Get the StatusLibrary instance.
     *
     * @returns {StatusLibrary}
     */
    static getInstance(): StatusLibrary;
    /**
     * Get the named status from the library.  Always returns a clone.
     *
     * @param {string} key
     * @returns {Status}
     */
    get(key: string): Status;
    /**
     * Set the named status in the library.  Existing items will be overwritten.  Always stores as a clone.
     * @param {string} key
     * @param {Status} status
     */
    set(key: string, status: Status): void;
    /**
     * Is there a status associated with the given key?
     *
     * @param {string} key
     * @returns {boolean}
     */
    has(key: string): boolean;
}
