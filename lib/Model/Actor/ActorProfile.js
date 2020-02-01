"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ActorProfile = /** @class */ (function () {
    function ActorProfile(configs) {
        var _this = this;
        this.name = '';
        this.attributes = [];
        this.flags = [];
        this.labels = [];
        this.name = configs.name;
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
    }
    return ActorProfile;
}());
exports.ActorProfile = ActorProfile;
//# sourceMappingURL=ActorProfile.js.map