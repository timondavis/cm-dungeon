"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var StatusLibrary = /** @class */ (function () {
    function StatusLibrary() {
    }
    /**
     * Get the StatusLibrary instance.
     *
     * @returns {StatusLibrary}
     */
    StatusLibrary.getInstance = function () {
        if (StatusLibrary._instance === undefined) {
            StatusLibrary._instance = new StatusLibrary();
        }
        return this._instance;
    };
    /**
     * Get the named status from the library.  Always returns a clone.
     *
     * @param {string} key
     * @returns {Status}
     */
    StatusLibrary.prototype.get = function (key) {
        return this._collection.get(key).clone();
    };
    /**
     * Set the named status in the library.  Existing items will be overwritten.  Always stores as a clone.
     * @param {string} key
     * @param {Status} status
     */
    StatusLibrary.prototype.set = function (key, status) {
        this._collection.set(key, status.clone());
    };
    /**
     * Is there a status associated with the given key?
     *
     * @param {string} key
     * @returns {boolean}
     */
    StatusLibrary.prototype.has = function (key) {
        return this._collection.has(key);
    };
    return StatusLibrary;
}());
exports.StatusLibrary = StatusLibrary;
//# sourceMappingURL=StatusLibrary.js.map