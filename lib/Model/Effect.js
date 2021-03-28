"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.Effect = void 0;
var NameMap_1 = require("./NameMap");
var List_1 = require("./List");
var cm_domain_utilities_1 = require("cm-domain-utilities");
var Effect = /** @class */ (function (_super) {
    __extends(Effect, _super);
    function Effect() {
        var _this = _super.call(this) || this;
        _this.state = {
            attributeAssignments: new NameMap_1.NameMap(),
            flagAssignments: new NameMap_1.NameMap(),
            id: "",
            labelAssignments: new NameMap_1.NameMap(),
            statusAssignments: new NameMap_1.NameMap(),
            statusRemovals: new List_1.List()
        };
        return _this;
    }
    Object.defineProperty(Effect.prototype, "attributeAssignments", {
        get: function () { return this.state.attributeAssignments; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Effect.prototype, "labelAssignments", {
        get: function () { return this.state.labelAssignments; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Effect.prototype, "flagAssignments", {
        get: function () { return this.state.flagAssignments; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Effect.prototype, "statusRemovals", {
        get: function () { return this.state.statusRemovals; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Effect.prototype, "statusAssignments", {
        // @todo - Kinda weird that there's an remove/assign paradigm for status, but not other attribute types.
        get: function () { return this.state.statusAssignments; },
        enumerable: false,
        configurable: true
    });
    return Effect;
}(cm_domain_utilities_1.SerializableModel));
exports.Effect = Effect;
//# sourceMappingURL=Effect.js.map