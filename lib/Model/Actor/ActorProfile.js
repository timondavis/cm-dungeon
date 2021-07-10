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
var ActorProfile = /** @class */ (function (_super) {
    __extends(ActorProfile, _super);
    function ActorProfile(configs) {
        var _this = _super.call(this) || this;
        _this.state = {
            actionPointsAttribute: "",
            attributes: [],
            flags: [],
            labels: [],
            name: configs.hasOwnProperty('name') ? configs.name : '',
            faction: configs.hasOwnProperty('faction') ? configs.faction : ''
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
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ActorProfile.prototype, "attributes", {
        get: function () { return this.state.attributes; },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(ActorProfile.prototype, "flags", {
        get: function () { return this.state.flags; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ActorProfile.prototype, "labels", {
        get: function () { return this.state.labels; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ActorProfile.prototype, "actionPointsAttribute", {
        get: function () { return this.state.actionPointsAttribute; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ActorProfile.prototype, "faction", {
        get: function () { return this.state.faction; },
        enumerable: true,
        configurable: true
    });
    return ActorProfile;
}(cm_domain_utilities_1.SerializableModel));
exports.ActorProfile = ActorProfile;
//# sourceMappingURL=ActorProfile.js.map