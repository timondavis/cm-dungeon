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
exports.ActorProfile = void 0;
var cm_domain_utilities_1 = require("cm-domain-utilities");
var ActorProfile = /** @class */ (function (_super) {
    __extends(ActorProfile, _super);
    function ActorProfile(configs) {
        var _this = _super.call(this) || this;
        _this.state = {
            actionPointsAttribute: "",
            attributes: [],
            flags: [],
            labels: [],
            name: configs.hasOwnProperty('name') ? configs.name : ""
        };
        if (configs.hasOwnProperty('attributes')) {
            configs.attributes.forEach(function (item) {
                var defaultValue = (typeof (item) === 'object' && item.hasOwnProperty('default')) ?
                    item.default : 0;
                _this.attributes.push({ key: item.key, default: defaultValue });
            });
        }
        if (configs.hasOwnProperty('flags')) {
            configs.flags.forEach(function (item) {
                var defaultValue = (typeof (item) === 'object' && item.hasOwnProperty('default')) ?
                    item.default : false;
                _this.flags.push({ key: item.key, default: defaultValue });
            });
        }
        if (configs.hasOwnProperty('labels')) {
            configs.labels.forEach(function (item) {
                var defaultValue = (typeof (item) === 'object' && item.hasOwnProperty('default')) ?
                    item.default : '';
                _this.labels.push({ key: item.key, default: defaultValue });
            });
        }
        _this.state.actionPointsAttribute = (configs.hasOwnProperty('actionPointsAttribute')) ?
            configs.actionPointsAttribute : null;
        return _this;
    }
    Object.defineProperty(ActorProfile.prototype, "name", {
        get: function () { return this.state.name; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ActorProfile.prototype, "attributes", {
        get: function () { return this.state.attributes; },
        enumerable: false,
        configurable: true
    });
    ;
    Object.defineProperty(ActorProfile.prototype, "flags", {
        get: function () { return this.state.flags; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ActorProfile.prototype, "labels", {
        get: function () { return this.state.labels; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ActorProfile.prototype, "actionPointsAttribute", {
        get: function () { return this.state.actionPointsAttribute; },
        enumerable: false,
        configurable: true
    });
    return ActorProfile;
}(cm_domain_utilities_1.SerializableModel));
exports.ActorProfile = ActorProfile;
//# sourceMappingURL=ActorProfile.js.map