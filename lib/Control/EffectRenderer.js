"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var EffectRenderer = /** @class */ (function () {
    function EffectRenderer() {
    }
    EffectRenderer.renderEffects = function (owner, effect) {
        EffectRenderer.modifyAttributes(owner, effect);
    };
    EffectRenderer.modifyAttributes = function (owner, effect) {
        effect.modifyAttributes.forEachKey(function (key) {
            var attributeValue = owner.attributes.get(key);
            attributeValue += effect.modifyAttributes.get(key);
            owner.attributes.replace(key, attributeValue);
        });
    };
    EffectRenderer.prototype.setAttributes = function (effect) {
    };
    return EffectRenderer;
}());
exports.EffectRenderer = EffectRenderer;
//# sourceMappingURL=EffectRenderer.js.map