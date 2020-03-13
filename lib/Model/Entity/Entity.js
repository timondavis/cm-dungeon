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
var NameMap_1 = require("../NameMap");
var cm_domain_utilities_1 = require("cm-domain-utilities");
var Entity = /** @class */ (function (_super) {
    __extends(Entity, _super);
    function Entity(actorProfile) {
        var _this = _super.call(this) || this;
        _this.state = {
            actionPointsAttribute: "",
            actionPointsRemaining: 0,
            attributes: new NameMap_1.NameMap(),
            flags: new NameMap_1.NameMap(),
            id: "",
            labels: new NameMap_1.NameMap(),
            entityType: ""
        };
        if (actorProfile) {
            if (actorProfile.attributes.length) {
                for (var i = 0; i < actorProfile.attributes.length; i++) {
                    _this.attributes.add(actorProfile.attributes[i].key, (actorProfile.attributes[i].hasOwnProperty('default')) ? actorProfile.attributes[i].default : 0);
                }
            }
            if (actorProfile.flags.length) {
                for (var i = 0; i < actorProfile.flags.length; i++) {
                    _this.flags.add(actorProfile.flags[i].key, (actorProfile.flags[i].hasOwnProperty('default')) ? actorProfile.flags[i].default : false);
                }
            }
            if (actorProfile.labels.length) {
                for (var i = 0; i < actorProfile.labels.length; i++) {
                    _this.labels.add(actorProfile.labels[i].key, (actorProfile.labels[i].hasOwnProperty('default')) ? actorProfile.labels[i].default : '');
                }
            }
        }
        return _this;
    }
    Object.defineProperty(Entity.prototype, "id", {
        get: function () { return this.state.id; },
        set: function (id) { this.state.id = id; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Entity.prototype, "attributes", {
        get: function () { return this.state.attributes; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Entity.prototype, "labels", {
        get: function () { return this.state.labels; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Entity.prototype, "flags", {
        get: function () { return this.state.flags; },
        enumerable: true,
        configurable: true
    });
    return Entity;
}(cm_domain_utilities_1.SerializableModel));
exports.Entity = Entity;
//# sourceMappingURL=Entity.js.map