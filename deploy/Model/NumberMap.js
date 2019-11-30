"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var NumberMap = /** @class */ (function () {
    function NumberMap() {
        this._collection = {};
    }
    /**
     * Add an item to the collection with the given key.
     *
     * @param {number} key
     * @param {T} value
     * @returns {NumberMap<T>}
     */
    NumberMap.prototype.add = function (key, value) {
        if (this.has(key)) {
            throw Error("Item with name " + key + " already exists.");
        }
        this._collection[key] = value;
        return this;
    };
    /**
     * Add or replace an item in the collection with a given key.
     *
     * @param {number} key
     * @param {T} value
     * @returns {NumberMap<T>}
     */
    NumberMap.prototype.set = function (key, value) {
        this._collection[key] = value;
        return this;
    };
    /**
     * Replace an existing item in the collection with a given key.
     *
     * @param {number} key
     * @param {T} value
     * @returns {NumberMap<T>}
     */
    NumberMap.prototype.replace = function (key, value) {
        if (!this.has(key)) {
            throw Error("Cannot replace " + key + " item.  It does not exist on the NumberMap");
        }
        this._collection[key] = value;
        return this;
    };
    /**
     * Get a single item in the collection, referenced with the given key.
     *
     * @param {number} key?
     * @returns {T}
     */
    NumberMap.prototype.get = function (key) {
        if (this.has(key)) {
            return this._collection[key];
        }
        throw new Error('Cannot find item with key ' + key);
    };
    /**
     * Get all items in the collection
     *
     * @returns {{[p: number]: T}}
     */
    NumberMap.prototype.getAll = function () {
        return this._collection;
    };
    /**
     * Request information on whether or not an item with a given key exists
     *
     * @param {number} key
     * @returns {boolean}
     */
    NumberMap.prototype.has = function (key) {
        if (this._collection.hasOwnProperty(key.toString())) {
            return true;
        }
        return false;
    };
    /**
     * Remove the item with the given key from the collection.
     *
     * @param {number} key
     * @returns {NumberMap<T>}
     */
    NumberMap.prototype.remove = function (key) {
        if (this.has(key)) {
            delete (this._collection[key]);
        }
        return this;
    };
    /**
     * Get the keys belonging to the map as an array.
     * @returns {string[]}
     */
    NumberMap.prototype.getKeys = function () {
        var keys = Object.keys(this._collection);
        var convertedToNumberKeys = [];
        keys.forEach(function (key, index) {
            convertedToNumberKeys[index] = parseInt(key);
        });
        return convertedToNumberKeys;
    };
    /**
     * Provide a callback function - this function will be invoked for every item in the map.
     * @param {(key: number, index?: number, array?: number[]) => void} callback
     */
    NumberMap.prototype.forEachKey = function (callback) {
        var keys = this.getKeys();
        for (var i = 0; i < keys.length; i++) {
            if (keys[i] !== undefined) {
                callback(keys[i], i, keys);
            }
        }
    };
    Object.defineProperty(NumberMap.prototype, "length", {
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
    return NumberMap;
}());
exports.NumberMap = NumberMap;
//# sourceMappingURL=NumberMap.js.map