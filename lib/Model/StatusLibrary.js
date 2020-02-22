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
var StatusLibrary = /** @class */ (function (_super) {
    __extends(StatusLibrary, _super);
    function StatusLibrary() {
        var _this = _super.call(this) || this;
        _this.state = {
            collection: undefined
        };
        return _this;
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
        return this.state.collection.get(key).clone();
    };
    /**
     * Set the named status in the library.  Existing items will be overwritten.  Always stores as a clone.
     * @param {string} key
     * @param {Status} status
     */
    StatusLibrary.prototype.set = function (key, status) {
        this.state.collection.set(key, status.clone());
    };
    /**
     * Is there a status associated with the given key?
     *
     * @param {string} key
     * @returns {boolean}
     */
    StatusLibrary.prototype.has = function (key) {
        return this.state.collection.has(key);
    };
    return StatusLibrary;
}(cm_domain_utilities_1.SerializableModel));
exports.StatusLibrary = StatusLibrary;
//# sourceMappingURL=StatusLibrary.js.map