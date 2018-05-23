"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var EffectRenderer = /** @class */ (function () {
    function EffectRenderer() {
    }
    EffectRenderer.renderEffects = function (owner, effects) {
        effects.forEach(function (effect) {
            EffectRenderer.modifyAttributes(owner, effect);
            EffectRenderer.setAttributes(owner, effect);
            EffectRenderer.removeAttributes(owner, effect);
            EffectRenderer.setLabels(owner, effect);
            EffectRenderer.removeLabels(owner, effect);
            EffectRenderer.setFlags(owner, effect);
            EffectRenderer.removeFlags(owner, effect);
            EffectRenderer.setStatus(owner, effect);
            EffectRenderer.removeStatus(owner, effect);
        });
    };
    EffectRenderer.modifyAttributes = function (owner, effect) {
        if (!effect.modifyAttributes.length) {
            return;
        }
        effect.modifyAttributes.forEachKey(function (key) {
            var attributeValue = owner.attributes.get(key);
            attributeValue += effect.modifyAttributes.get(key);
            owner.attributes.replace(key, attributeValue);
        });
    };
    EffectRenderer.setAttributes = function (owner, effect) {
        if (!effect.setAttributes.length) {
            return;
        }
        effect.setAttributes.forEachKey(function (key) {
            owner.attributes.set(key, effect.setAttributes.get(key));
        });
    };
    EffectRenderer.removeAttributes = function (owner, effect) {
        if (!effect.removeAttributes.length) {
            return;
        }
        effect.removeAttributes.forEachItem(function (item) {
            owner.attributes.remove(item);
        });
    };
    EffectRenderer.setLabels = function (owner, effect) {
        if (!effect.setLabels.length) {
            return;
        }
        effect.setLabels.forEachKey(function (key) {
            owner.labels.set(key, effect.setLabels.get(key));
        });
    };
    EffectRenderer.removeLabels = function (owner, effect) {
        if (!effect.removeLabels.length) {
            return;
        }
        effect.removeLabels.forEachItem(function (key) {
            owner.labels.remove(key);
        });
    };
    EffectRenderer.setFlags = function (owner, effect) {
        if (!effect.setFlags.length) {
            return;
        }
        effect.setFlags.forEachKey(function (key) {
            owner.flags.set(key, effect.setFlags.get(key));
        });
    };
    EffectRenderer.removeFlags = function (owner, effect) {
        if (!effect.removeFlags.length) {
            return;
        }
        effect.removeFlags.forEachItem(function (key) {
            owner.flags.remove(key);
        });
    };
    EffectRenderer.setStatus = function (owner, effect) {
        if (!effect.setStatus.length) {
            return;
        }
        effect.setStatus.forEachKey(function (key) {
            owner.statusEffects.set(key, effect.setStatus.get(key));
        });
    };
    EffectRenderer.removeStatus = function (owner, effect) {
        if (!effect.removeStatus.length) {
            return;
        }
        effect.removeStatus.forEachItem(function (key) {
            owner.statusEffects.remove(key);
        });
    };
    return EffectRenderer;
}());
exports.EffectRenderer = EffectRenderer;
//# sourceMappingURL=EffectRenderer.js.map