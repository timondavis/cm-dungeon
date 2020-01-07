"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PrioritizedNameMap_1 = require("./PrioritizedNameMap");
var Status = /** @class */ (function () {
    function Status() {
        this._attributeAssignmentFilters = new PrioritizedNameMap_1.PrioritizedNameMap();
        this._labelAssignmentFilters = new PrioritizedNameMap_1.PrioritizedNameMap();
        this._flagAssignmentFilters = new PrioritizedNameMap_1.PrioritizedNameMap();
        this._statusAssignmentFilters = new PrioritizedNameMap_1.PrioritizedNameMap();
        this._statusRemovalFilters = new PrioritizedNameMap_1.PrioritizedNameMap();
    }
    Object.defineProperty(Status.prototype, "owner", {
        get: function () { return this._owner; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Status.prototype, "attributeAssignmentFilters", {
        get: function () { return this._attributeAssignmentFilters; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Status.prototype, "labelAssignmentFilters", {
        get: function () { return this._labelAssignmentFilters; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Status.prototype, "flagAssignmentFilters", {
        get: function () { return this._flagAssignmentFilters; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Status.prototype, "statusAssignmentFilters", {
        get: function () { return this._statusAssignmentFilters; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Status.prototype, "statusRemovalFilters", {
        get: function () { return this._statusRemovalFilters; },
        enumerable: true,
        configurable: true
    });
    Status.prototype.setOwner = function (owner) { this._owner = owner; };
    Status.prototype.clone = function () {
        var tempStatus = new Status();
        tempStatus._owner = this.owner;
        tempStatus._attributeAssignmentFilters = this.attributeAssignmentFilters;
        tempStatus._labelAssignmentFilters = this.labelAssignmentFilters;
        tempStatus._flagAssignmentFilters = this.flagAssignmentFilters;
        tempStatus._statusAssignmentFilters = this.statusAssignmentFilters;
        tempStatus._statusRemovalFilters = this.statusRemovalFilters;
        return tempStatus;
    };
    return Status;
}());
exports.Status = Status;
//# sourceMappingURL=Status.js.map