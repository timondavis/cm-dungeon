"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var EffectRenderer = /** @class */ (function () {
    function EffectRenderer() {
    }
    EffectRenderer.renderEffects = function (owner, effects) {
        effects.forEachItem(function (effect) {
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
        if (!effect.attributeModifications.length) {
            return;
        }
        effect.attributeModifications.forEachKey(function (attributeKey) {
            var attributeValue = owner.attributes.get(attributeKey);
            var modificationValue = effect.attributeModifications.get(attributeKey);
            owner.statuses.forEachKey(function (statusKey) {
                if (owner.statuses.has(statusKey)) {
                    modificationValue = owner.statuses.get(statusKey)
                        .attributeEffectFilters.get(attributeKey)
                        .call(modificationValue);
                }
            });
            attributeValue += effect.attributeModifications.get(attributeKey);
            owner.attributes.replace(attributeKey, attributeValue);
        });
    };
    EffectRenderer.setAttributes = function (owner, effect) {
        if (!effect.attributeAssignments.length) {
            return;
        }
        effect.attributeAssignments.forEachKey(function (key) {
            owner.attributes.set(key, effect.attributeAssignments.get(key));
        });
    };
    EffectRenderer.removeAttributes = function (owner, effect) {
        if (!effect.attributeRemovals.length) {
            return;
        }
        effect.attributeRemovals.forEachItem(function (item) {
            owner.attributes.remove(item);
        });
    };
    EffectRenderer.setLabels = function (owner, effect) {
        if (!effect.labelAssignments.length) {
            return;
        }
        effect.labelAssignments.forEachKey(function (key) {
            owner.labels.set(key, effect.labelAssignments.get(key));
        });
    };
    EffectRenderer.removeLabels = function (owner, effect) {
        if (!effect.labelRemovals.length) {
            return;
        }
        effect.labelRemovals.forEachItem(function (key) {
            owner.labels.remove(key);
        });
    };
    EffectRenderer.setFlags = function (owner, effect) {
        if (!effect.flagAssignments.length) {
            return;
        }
        effect.flagAssignments.forEachKey(function (key) {
            owner.flags.set(key, effect.flagAssignments.get(key));
        });
    };
    EffectRenderer.removeFlags = function (owner, effect) {
        if (!effect.flagRemovals.length) {
            return;
        }
        effect.flagRemovals.forEachItem(function (key) {
            owner.flags.remove(key);
        });
    };
    EffectRenderer.setStatus = function (owner, effect) {
        if (!effect.statusAssignments.length) {
            return;
        }
        effect.statusAssignments.forEachKey(function (key) {
            owner.statuses.set(key, effect.statusAssignments.get(key));
        });
    };
    EffectRenderer.removeStatus = function (owner, effect) {
        if (!effect.statusRemovals.length) {
            return;
        }
        effect.statusRemovals.forEachItem(function (key) {
            owner.statuses.remove(key);
        });
    };
    return EffectRenderer;
}());
exports.EffectRenderer = EffectRenderer;
//# sourceMappingURL=EffectRenderer.js.map