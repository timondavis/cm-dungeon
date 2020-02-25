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
var PrioritizedNameMap_1 = require("./PrioritizedNameMap");
var cm_domain_utilities_1 = require("cm-domain-utilities");
var Status = /** @class */ (function (_super) {
    __extends(Status, _super);
    function Status() {
        var _this = _super.call(this) || this;
        _this.state = {
            attributeAssignmentFilters: new PrioritizedNameMap_1.PrioritizedNameMap(),
            flagAssignmentFilters: new PrioritizedNameMap_1.PrioritizedNameMap(),
            id: "",
            labelAssignmentFilters: new PrioritizedNameMap_1.PrioritizedNameMap(),
            owner: undefined,
            statusAssignmentFilters: new PrioritizedNameMap_1.PrioritizedNameMap(),
            statusRemovalFilters: new PrioritizedNameMap_1.PrioritizedNameMap()
        };
        return _this;
    }
    Object.defineProperty(Status.prototype, "owner", {
        get: function () { return this.state.owner; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Status.prototype, "attributeAssignmentFilters", {
        get: function () { return this.state.attributeAssignmentFilters; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Status.prototype, "labelAssignmentFilters", {
        get: function () { return this.state.labelAssignmentFilters; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Status.prototype, "flagAssignmentFilters", {
        get: function () { return this.state.flagAssignmentFilters; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Status.prototype, "statusRemovalFilters", {
        get: function () { return this.state.statusRemovalFilters; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Status.prototype, "statusAssignmentFilters", {
        // @todo Again with the explicit assign removes - should be the same as other types. Can they be updated
        // with null?  Or do the other attribute types also get a remove method?
        get: function () { return this.state.statusAssignmentFilters; },
        enumerable: true,
        configurable: true
    });
    // @todo setter should be used here, not setX().
    Status.prototype.setOwner = function (owner) { this.state.owner = owner; };
    Status.prototype.clone = function () {
        var tempStatus = {
            attributeAssignmentFilters: this.attributeAssignmentFilters,
            flagAssignmentFilters: this.flagAssignmentFilters,
            id: "",
            labelAssignmentFilters: this.labelAssignmentFilters,
            owner: this.owner,
            statusAssignmentFilters: this.statusAssignmentFilters,
            statusRemovalFilters: this.statusRemovalFilters
        };
        return cm_domain_utilities_1.DomainConverter.hydrateModelFromData(Status, tempStatus);
    };
    return Status;
}(cm_domain_utilities_1.SerializableModel));
exports.Status = Status;
//# sourceMappingURL=Status.js.map