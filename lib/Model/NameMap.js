"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var cm_domain_utilities_1 = require("cm-domain-utilities");
var NameMap = /** @class */ (function (_super) {
    __extends(NameMap, _super);
    function NameMap() {
        var _this = _super.call(this) || this;
        _this.state = {
            collection: {}
        };
        return _this;
    }
    /**
     * Add an item to the collection with the given key.
     *
     * @param {string} key
     * @param {T} value
     * @returns {NameMap<T>}
     */
    NameMap.prototype.add = function (key, value) {
        key = key.trim();
        if (this.has(key)) {
            throw Error("Item with name " + key + " already exists.");
        }
        this.state.collection[key] = value;
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
        this.state.collection[key] = value;
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
        this.state.collection[key] = value;
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
            return this.state.collection[key];
        }
        throw new Error('Cannot find item with key ' + key);
    };
    /**
     * Get all items in the collection
     *
     * @returns {{[p: string]: T}}
     */
    NameMap.prototype.getAll = function () {
        return this.state.collection;
    };
    /**
     * Request information on whether or not an item with a given key exists
     *
     * @param {string} key
     * @returns {boolean}
     */
    NameMap.prototype.has = function (key) {
        key = key.trim();
        if (this.state.collection.hasOwnProperty(key)) {
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
            delete (this.state.collection[key]);
        }
        return this;
    };
    /**
     * Get the keys belonging to the map as an array.
     * @returns {string[]}
     */
    NameMap.prototype.getKeys = function () {
        return Object.keys(this.state.collection);
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
            return Object.keys(this.state.collection).length;
        },
        enumerable: true,
        configurable: true
    });
    NameMap.prototype.toArray = function () {
        var _this = this;
        var result = [];
        Object.keys(this.state.collection).forEach(function (key) {
            result.push(_this.state.collection[key]);
        });
        return result;
    };
    return NameMap;
}(cm_domain_utilities_1.SerializableModel));
exports.NameMap = NameMap;
//# sourceMappingURL=NameMap.js.map