"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Map = /** @class */ (function () {
    function Map() {
        this.collection = {};
    }
    /**
     * Add an item to the collection with the given key.
     *
     * @param {string} key
     * @param {T} value
     * @returns {Map<T>}
     */
    Map.prototype.add = function (key, value) {
        if (this.has(key)) {
            throw "Item with name " + key + " already exists.";
        }
        this.collection[key] = value;
        return this;
    };
    /**
     * Add or replace an item in the collection with a given key.
     *
     * @param {string} key
     * @param {T} value
     * @returns {Map<T>}
     */
    Map.prototype.set = function (key, value) {
        this.collection[key] = value;
        return this;
    };
    /**
     * Replace an existing item in the collection with a given key.
     *
     * @param {string} key
     * @param {T} value
     * @returns {Map<T>}
     */
    Map.prototype.replace = function (key, value) {
        if (this.has(key)) {
            throw "Cannot replace " + key + " item.  It does not exist on the NameMap";
        }
        this.collection[key] = value;
        return this;
    };
    /**
     * Get a single item in the collection, referenced with the given key.
     *
     * @param {string} key?
     * @returns {T}
     */
    Map.prototype.get = function (key) {
        if (this.has(key)) {
            return this.collection[key];
        }
        throw "Cannot find item with key " + key;
    };
    /**
     * Get all items in the collection
     *
     * @returns {{[p: string]: T}}
     */
    Map.prototype.getAll = function () {
        return this.collection;
    };
    /**
     * Request information on whether or not an item with a given key exists
     *
     * @param {string} key
     * @returns {boolean}
     */
    Map.prototype.has = function (key) {
        if (this.collection.hasOwnProperty(key)) {
            return true;
        }
        return false;
    };
    /**
     * Remove the item with the given key from the collection.
     *
     * @param {string} key
     * @returns {Map<T>}
     */
    Map.prototype.remove = function (key) {
        if (this.has(key)) {
            delete (this.collection[key]);
        }
        return this;
    };
    return Map;
}());
exports.Map = Map;
//# sourceMappingURL=NameMap.js.map