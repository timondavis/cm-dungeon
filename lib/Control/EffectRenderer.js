"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EffectRenderer = void 0;
/**
 * @class EffectRenderer
 * The EffectRenderer facilitates the application of Effects to Actors.
 */
var EffectRenderer = /** @class */ (function () {
    function EffectRenderer() {
    }
    /**
     * Render every effect in the effect list passed into the EffectRenderer.
     *
     * @param {Actor} owner
     * @param {List<Effect>} effects
     */
    EffectRenderer.renderEffects = function (owner, effects) {
        effects.forEachItem(function (effect) {
            EffectRenderer.setAttributes(owner, effect);
            EffectRenderer.setLabels(owner, effect);
            EffectRenderer.setFlags(owner, effect);
            EffectRenderer.setStatus(owner, effect);
            EffectRenderer.removeStatus(owner, effect);
        });
    };
    /**
     * Set the attribute from the effect.  Respects attribute assignment filters in priority order.
     *
     * @param {Actor} owner
     * @param {Effect} effect
     * @param {?Any} data - supplied at will
     */
    EffectRenderer.setAttributes = function (owner, effect, data) {
        var _this = this;
        if (!effect.attributeAssignments.length) {
            return;
        }
        var newValue;
        var originalValue;
        effect.attributeAssignments.forEachKey(function (attributeKey) {
            originalValue = owner.attributes.get(attributeKey);
            newValue = effect.attributeAssignments.get(attributeKey)(originalValue, data);
            owner.statuses.forEachKey(function (statusKey) {
                if (owner.statuses.get(statusKey).attributeAssignmentFilters.has(attributeKey)) {
                    newValue = owner.statuses.get(statusKey)
                        .attributeAssignmentFilters.get(attributeKey)
                        .call(_this, newValue, originalValue);
                }
            });
            owner.attributes.set(attributeKey, newValue);
        });
    };
    /**
     * Set the labels on the owning actor as defined in the effect.  Respects status filters in priority order.
     *
     * @param {Actor} owner
     * @param {Effect} effect
     * @param {Any?} data
     */
    EffectRenderer.setLabels = function (owner, effect, data) {
        var _this = this;
        if (!effect.labelAssignments.length) {
            return;
        }
        var originalValue;
        var newValue;
        effect.labelAssignments.forEachKey(function (labelKey) {
            originalValue = (owner.labels.has(labelKey)) ? owner.labels.get(labelKey) : "";
            newValue = effect.labelAssignments.get(labelKey)(originalValue, data);
            owner.statuses.forEachKey(function (statusKey) {
                if (owner.statuses.get(statusKey).labelAssignmentFilters.has(labelKey)) {
                    newValue = owner.statuses.get(statusKey)
                        .labelAssignmentFilters.get(labelKey)
                        .call(_this, newValue, originalValue);
                }
            });
            owner.labels.set(labelKey, newValue);
        });
    };
    /**
     * Set flags on the owning actors as defined in the effect. Respects status filters in priority order.
     *
     * @param {Actor} owner
     * @param {Effect} effect
     */
    EffectRenderer.setFlags = function (owner, effect, data) {
        var _this = this;
        if (!effect.flagAssignments.length) {
            return;
        }
        var originalValue;
        var newValue;
        effect.flagAssignments.forEachKey(function (flagKey) {
            originalValue = (owner.flags.has(flagKey)) ? owner.flags.get(flagKey) : false;
            newValue = effect.flagAssignments.get(flagKey)(originalValue, data);
            owner.statuses.forEachKey(function (statusKey) {
                if (owner.statuses.get(statusKey).flagAssignmentFilters.has(flagKey)) {
                    newValue = owner.statuses.get(statusKey)
                        .flagAssignmentFilters.get(flagKey)
                        .call(_this, newValue, originalValue);
                }
            });
            owner.flags.set(flagKey, newValue);
        });
    };
    /**
     * Set a status on the owner as defined in the effect.  Respects status filters in priority order.
     *
     * @param {Actor} owner
     * @param {Effect} effect
     */
    EffectRenderer.setStatus = function (owner, effect) {
        var _this = this;
        if (!effect.statusAssignments.length) {
            return;
        }
        var status;
        var updateStatus;
        effect.statusAssignments.forEachKey(function (statusInstanceKey) {
            status = effect.statusAssignments.get(statusInstanceKey);
            updateStatus = true;
            owner.statuses.forEachKey(function (statusKey) {
                if (owner.statuses.get(statusKey).statusAssignmentFilters.has(statusInstanceKey)) {
                    updateStatus = owner.statuses.get(statusKey)
                        .statusAssignmentFilters.get(statusInstanceKey)
                        .call(_this, updateStatus, status);
                }
            });
            if (updateStatus) {
                owner.statuses.set(statusInstanceKey, status);
            }
        });
    };
    /**
     * Remove a status from the owner as defined on the effect.  Respects status filters in priority order.
     * @param {Actor} owner
     * @param {Effect} effect
     */
    EffectRenderer.removeStatus = function (owner, effect) {
        var _this = this;
        if (!effect.statusRemovals.length) {
            return;
        }
        var status;
        var updateStatus;
        effect.statusRemovals.forEachItem(function (statusInstanceKey) {
            status = effect.statusAssignments.get(statusInstanceKey);
            updateStatus = true;
            owner.statuses.forEachKey(function (statusKey) {
                if (owner.statuses.get(statusKey).statusAssignmentFilters.has(statusInstanceKey)) {
                    updateStatus = owner.statuses.get(statusKey)
                        .statusAssignmentFilters.get(statusInstanceKey)
                        .call(_this, updateStatus, status);
                }
            });
            if (updateStatus) {
                owner.statuses.remove(statusInstanceKey);
            }
        });
    };
    return EffectRenderer;
}());
exports.EffectRenderer = EffectRenderer;
//# sourceMappingURL=EffectRenderer.js.map