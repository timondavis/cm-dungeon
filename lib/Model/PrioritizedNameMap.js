"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var NameMap_1 = require("./NameMap");
var NumberMap_1 = require("./NumberMap");
var PrioritizedNameMap = /** @class */ (function () {
    function PrioritizedNameMap() {
        this._prioritizedNames = new NumberMap_1.NumberMap();
        this._namePriorityIndex = new NameMap_1.NameMap();
    }
    Object.defineProperty(PrioritizedNameMap.prototype, "prioritizedNames", {
        get: function () { return this._prioritizedNames; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PrioritizedNameMap.prototype, "namePriorityIndex", {
        get: function () { return this._namePriorityIndex; },
        enumerable: true,
        configurable: true
    });
    /**
     * Add an item to the collection with the given key.
     *
     * @param {string} key
     * @param {T} value
     * @param {number} priority (defaults to 1000)
     * @returns {NameMap<T>}
     */
    PrioritizedNameMap.prototype.add = function (key, value, priority) {
        if (priority === void 0) { priority = PrioritizedNameMap.DEFAULT_PRIORITY; }
        if (priority < 0) {
            throw new Error("Priority cannot be less than 0");
        }
        if (this.has(key)) {
            throw Error("Item with name " + key + " already exists.");
        }
        if (!this.prioritizedNames.has(priority)) {
            this.prioritizedNames.add(priority, new NameMap_1.NameMap());
        }
        this.prioritizedNames.get(priority).add(key, value);
        this.namePriorityIndex.add(key, priority);
        return this;
    };
    /**
     * Add or replace an item in the collection with a given key.
     *
     * @param {string} key
     * @param {T} value
     * @param {number|null} priority  Leave null to leave
     * @returns {NameMap<T>}
     */
    PrioritizedNameMap.prototype.set = function (key, value, priority) {
        if (priority === void 0) { priority = null; }
        if (priority == null) {
            priority = this.getPriorityOfKey(key);
        }
        if (!this.prioritizedNames.has(priority)) {
            this.prioritizedNames.add(priority, new NameMap_1.NameMap());
        }
        if (this.has(key)) {
            var existingKeyPriority = this.namePriorityIndex.get(key);
            if (priority == existingKeyPriority) {
                // Swap out the existing value at the same priority tier
                this.prioritizedNames.get(priority).set(key, value);
            }
            else {
                // Remove the registration at the existing priority tier, register new value at new tier.
                this.prioritizedNames.get(existingKeyPriority).remove(key);
                this.prioritizedNames.get(priority).add(key, value);
                this.namePriorityIndex.replace(key, priority);
            }
        }
        else {
            this.add(key, value, priority);
        }
        return this;
    };
    /**
     * Replace an existing item in the collection with a given key.
     *
     * @param {string} key
     * @param {T} value
     * @returns {NameMap<T>}
     */
    PrioritizedNameMap.prototype.replace = function (key, value) {
        if (!this.has(key)) {
            throw Error("Cannot replace " + key + " item.  It does not exist on the NameMap");
        }
        var existingKeyPriority = this.namePriorityIndex.get(key);
        this.prioritizedNames.get(existingKeyPriority).replace(key, value);
        return this;
    };
    /**
     * Get a single item in the collection, referenced with the given key.
     *
     * @param {string} key?
     * @returns {T}
     */
    PrioritizedNameMap.prototype.get = function (key) {
        if (!this.has(key)) {
            throw new Error('Cannot find item with key ' + key);
        }
        var existingKeyPriority = this.namePriorityIndex.get(key);
        return this.prioritizedNames.get(existingKeyPriority).get(key);
    };
    /**
     * Returns a NameMap with all items registered at the given priority level.
     *
     * @param {number} priority
     * @returns {NameMap<T>}
     */
    PrioritizedNameMap.prototype.getMapForPriority = function (priority) {
        if (!this.prioritizedNames.has(priority)) {
            throw new Error('Cannot find any items registered with priority ' + priority);
        }
        return this.prioritizedNames.get(priority);
    };
    /**
     * Get all items in the collection
     *
     * @returns {{[p: string]: T}}
     */
    PrioritizedNameMap.prototype.getAll = function () {
        var _this = this;
        var collection = {};
        var priorityMap;
        this.prioritizedNames.forEachKey(function (priorityKey) {
            priorityMap = _this.prioritizedNames.get(priorityKey);
            priorityMap.forEachKey(function (mapKey) {
                collection[mapKey] = priorityMap.get(mapKey);
            });
        });
        return collection;
    };
    /**
     * Request information on whether or not an item with a given key exists
     *
     * @param {string} key
     * @returns {boolean}
     */
    PrioritizedNameMap.prototype.has = function (key, priority) {
        var _this = this;
        if (priority === void 0) { priority = null; }
        var itemFound = false;
        // Loop through each priority tier's name map and check for the given key
        this.prioritizedNames.forEachKey(function (priorityKey) {
            if (_this.prioritizedNames.get(priorityKey).has(key)) {
                itemFound = true;
            }
        });
        return itemFound;
    };
    /**
     * Remove the item with the given key from the collection.
     *
     * @param {string} key
     * @returns {NameMap<T>}
     */
    PrioritizedNameMap.prototype.remove = function (key) {
        var _this = this;
        this.prioritizedNames.forEachKey(function (priorityKey) {
            if (_this.prioritizedNames.get(priorityKey).has(key)) {
                _this.prioritizedNames.get(priorityKey).remove(key);
            }
        });
        return this;
    };
    /**
     * Get the keys belonging to the map as an array.
     * @returns {string[]}
     */
    PrioritizedNameMap.prototype.getKeys = function (priority) {
        var _this = this;
        if (priority === void 0) { priority = null; }
        if (priority) {
            return Object.keys(this.prioritizedNames.get(priority));
        }
        else {
            var keys_1 = [];
            // Loop through each tier and collect the keys from the collection on that tier.
            this.prioritizedNames.forEachKey(function (priorityKey) {
                _this.prioritizedNames.get(priorityKey).forEachKey(function (itemKey) {
                    keys_1.push(itemKey);
                });
            });
            return keys_1;
        }
    };
    /**
     * Provide a callback function - this function will be invoked for every item in the map.  Will deliver items
     * from priority tiers in ASCENDING order ( starting with 0, then 1, etc... ).
     * @param {(key: string, index?: number, array?: string[]) => void} callback
     */
    PrioritizedNameMap.prototype.forEachKey = function (callback) {
        var keys = this.prioritizedNames.getKeys();
        keys.sort(function (a, b) {
            if (a < b)
                return -1;
            if (a == b)
                return 0;
            return 1;
        });
        for (var i = 0; i < keys.length; i++) {
            this.prioritizedNames.get(i).forEachKey(callback);
        }
    };
    /**
     * Change the priority of the indicated item with the given key.
     *
     * @param {string} key
     * @param {number} newPriority
     */
    PrioritizedNameMap.prototype.updatePriority = function (key, newPriority) {
        // Collect values
        var itemPriority = this.namePriorityIndex.get(key);
        var value = this.prioritizedNames.get(itemPriority).get(key);
        // Remove Values
        this.prioritizedNames.get(itemPriority).remove(key);
        this.namePriorityIndex.remove(key);
        // Add replacement value.
        this.add(key, value, newPriority);
    };
    Object.defineProperty(PrioritizedNameMap.prototype, "length", {
        /**
         * Get the number of items in the map.
         * @returns {number}
         */
        get: function () {
            var _this = this;
            var length = 0;
            this.prioritizedNames.forEachKey(function (key) {
                length += _this.prioritizedNames.get(key).length;
            });
            return length;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Will search for the priority of the given key.  If no such key is found,
     * this function will return the DEFAULT PRIORITY value.  Handy for situations where
     * you just need a number to assign, and don't require the key to already have been registered
     * to take action.
     *
     * @param {string} key
     * @returns {number}
     */
    PrioritizedNameMap.prototype.getPriorityOfKey = function (key) {
        try {
            return this.namePriorityIndex.get(key);
        }
        catch (ex) {
            return PrioritizedNameMap.DEFAULT_PRIORITY;
        }
    };
    PrioritizedNameMap.DEFAULT_PRIORITY = 1000;
    return PrioritizedNameMap;
}());
exports.PrioritizedNameMap = PrioritizedNameMap;
//# sourceMappingURL=PrioritizedNameMap.js.map