"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var EffectRenderer = /** @class */ (function () {
    function EffectRenderer() {
    }
    EffectRenderer.renderEffects = function (owner, effects) {
        EffectRenderer.modifyAttributes(owner, effects);
    };
    EffectRenderer.modifyAttributes = function (owner, effects) {
        effects.forEach(function (effect) {
            if (!effect.modifyAttributes.length) {
                return;
            }
            effect.modifyAttributes.forEachKey(function (key) {
                var attributeValue = owner.attributes.get(key);
                attributeValue += effect.modifyAttributes.get(key);
                owner.attributes.replace(key, attributeValue);
            });
        });
    };
    EffectRenderer.prototype.setAttributes = function (owner, effects) {
        effects.forEach(function (effect) {
            if (!effect.setAttributes.length) {
                return;
            }
            effect.setAttributes.forEachKey(function (key) {
                owner.attributes.set(key, effect.setAttributes.get(key));
            });
        });
    };
    EffectRenderer.prototype.removeAttributes = function (owner, effects) {
        effects.forEach(function (effect) {
            if (!effect.removeAttributes.length) {
                return;
            }
            effect.removeAttributes.forEach(function (key) {
                owner.attributes.remove(key);
            });
        });
    };
    EffectRenderer.prototype.setLabels = function (owner, effects) {
        effects.forEach(function (effect) {
            if (!effect.setLabels.length) {
                return;
            }
            effect.setLabels.forEachKey(function (key) {
                owner.labels.set(key, effect.setLabels.get(key));
            });
        });
    };
    EffectRenderer.prototype.removeLabels = function (owner, effects) {
        effects.forEach(function (effect) {
            if (!effect.removeLabels.length) {
                return;
            }
            effect.removeLabels.forEach(function (key) {
                owner.labels.remove(key);
            });
        });
    };
    EffectRenderer.prototype.setFlags = function (owner, effects) {
        effects.forEach(function (effect) {
            if (!effect.setFlags.length) {
                return;
            }
            effect.setFlags.forEachKey(function (key) {
                owner.flags.set(key, effect.setFlags.get(key));
            });
        });
    };
    EffectRenderer.prototype.removeFlags = function (owner, effects) {
        effects.forEach(function (effect) {
            if (!effect.removeFlags.length) {
                return;
            }
            effect.removeFlags.forEach(function (key) {
                owner.flags.remove(key);
            });
        });
    };
    EffectRenderer.prototype.setStatus = function (owner, effects) {
        effects.forEach(function (effect) {
            if (!effect.setStatus.length) {
                return;
            }
            effect.setStatus.forEachKey(function (key) {
                owner.statusEffects.set(key, effect.setStatus.get(key));
            });
        });
    };
    EffectRenderer.prototype.removeStatus = function (owner, effects) {
        effects.forEach(function (effect) {
            if (!effect.removeStatus.length) {
                return;
            }
            effect.removeStatus.forEach(function (key) {
                owner.statusEffects.remove(key);
            });
        });
    };
    return EffectRenderer;
}());
exports.EffectRenderer = EffectRenderer;
//# sourceMappingURL=EffectRenderer.js.map