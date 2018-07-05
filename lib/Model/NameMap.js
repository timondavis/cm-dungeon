"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var NameMap = /** @class */ (function () {
    function NameMap() {
        this._collection = {};
        this.capacity = 1000000;
    }
    Object.defineProperty(NameMap.prototype, "capacity", {
        get: function () { return this._capacity; },
        set: function (value) { this._capacity = value; },
        enumerable: true,
        configurable: true
    });
    /**
     * Add an item to the collection with the given key.
     *
     * @param {string} key
     * @param {T} value
     * @returns {NameMap<T>}
     */
    NameMap.prototype.add = function (key, value) {
        key = key.trim();
        if (this.)
            if (this.has(key)) {
                throw Error("Item with name " + key + " already exists.");
            }
        this._collection[key] = value;
        return this;
    };
    /**
     * Add or replace an item in the collection with a given key.
     *
     * @param {string} key
     * @param {T} value
     * @returns {NameMap<T>}
     */
    NameMap.prototype.set = function (key, value) {
        key = key.trim();
        this._collection[key] = value;
        return this;
    };
    /**
     * Replace an existing item in the collection with a given key.
     *
     * @param {string} key
     * @param {T} value
     * @returns {NameMap<T>}
     */
    NameMap.prototype.replace = function (key, value) {
        key = key.trim();
        if (!this.has(key)) {
            throw Error("Cannot replace " + key + " item.  It does not exist on the NameMap");
        }
        this._collection[key] = value;
        return this;
    };
    /**
     * Get a single item in the collection, referenced with the given key.
     *
     * @param {string} key?
     * @returns {T}
     */
    NameMap.prototype.get = function (key) {
        key = key.trim();
        if (this.has(key)) {
            return this._collection[key];
        }
        throw new Error('Cannot find item with key ' + key);
    };
    /**
     * Get all items in the collection
     *
     * @returns {{[p: string]: T}}
     */
    NameMap.prototype.getAll = function () {
        return this._collection;
    };
    /**
     * Request information on whether or not an item with a given key exists
     *
     * @param {string} key
     * @returns {boolean}
     */
    NameMap.prototype.has = function (key) {
        key = key.trim();
        if (this._collection.hasOwnProperty(key)) {
            return true;
        }
        return false;
    };
    /**
     * Remove the item with the given key from the collection.
     *
     * @param {string} key
     * @returns {NameMap<T>}
     */
    NameMap.prototype.remove = function (key) {
        key = key.trim();
        if (this.has(key)) {
            delete (this._collection[key]);
        }
        return this;
    };
    /**
     * Get the keys belonging to the map as an array.
     * @returns {string[]}
     */
    NameMap.prototype.getKeys = function () {
        return Object.keys(this._collection);
    };
    /**
     * Provide a callback function - this function will be invoked for every item in the map.
     * @param {(key: string, index?: number, array?: string[]) => void} callback
     */
    NameMap.prototype.forEachKey = function (callback) {
        this.getKeys().forEach(callback);
    };
    Object.defineProperty(NameMap.prototype, "length", {
        /**
         * Get the number of items in the map.
         * @returns {number}
         */
        get: function () {
            return Object.keys(this._collection).length;
        },
        enumerable: true,
        configurable: true
    });
    return NameMap;
}());
exports.NameMap = NameMap;
//# sourceMappingURL=NameMap.js.map