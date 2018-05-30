"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var NameMap_1 = require("./NameMap");
var Status = /** @class */ (function () {
    function Status() {
        this._attributeEffectFilters = new NameMap_1.NameMap();
        this._attributeReportFilters = new NameMap_1.NameMap();
        this._labelEffectFilters = new NameMap_1.NameMap();
        this._labelReportFilters = new NameMap_1.NameMap();
        this._flagEffectFilters = new NameMap_1.NameMap();
        this._flagReportFilters = new NameMap_1.NameMap();
        this._statusEffectFilters = new NameMap_1.NameMap();
        this._statusReportFilters = new NameMap_1.NameMap();
    }
    Object.defineProperty(Status.prototype, "owner", {
        get: function () { return this._owner; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Status.prototype, "attributeEffectFilters", {
        get: function () { return this._attributeEffectFilters; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Status.prototype, "attributeReportFilters", {
        get: function () { return this._attributeReportFilters; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Status.prototype, "labelEffectFilters", {
        get: function () { return this._labelEffectFilters; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Status.prototype, "labelReportFilters", {
        get: function () { return this._labelReportFilters; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Status.prototype, "flagEffectFilters", {
        get: function () { return this._flagEffectFilters; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Status.prototype, "flagReportFilters", {
        get: function () { return this._flagReportFilters; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Status.prototype, "statusEffectFilters", {
        get: function () { return this._statusEffectFilters; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Status.prototype, "statusReportFilters", {
        get: function () { return this._statusReportFilters; },
        enumerable: true,
        configurable: true
    });
    Status.prototype.setOwner = function (owner) { this._owner = owner; };
    Status.prototype.clone = function () {
        var tempStatus = new Status();
        tempStatus._owner = this.owner;
        tempStatus._attributeEffectFilters = this.attributeEffectFilters;
        tempStatus._labelEffectFilters = this.labelEffectFilters;
        tempStatus._flagEffectFilters = this.flagEffectFilters;
        tempStatus._statusEffectFilters = this.statusEffectFilters;
        return tempStatus;
    };
    return Status;
}());
exports.Status = Status;
//# sourceMappingURL=Status.js.map