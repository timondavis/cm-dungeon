import { Effect } from "../Model/Effect";
import { Actor } from "../Model/Entity/Actor";
import { List } from "../Model/List";
/**
 * @class EffectRenderer
 * The EffectRenderer facilitates the application of Effects to Actors.
 */
export declare class EffectRenderer {
    /**
     * Render every effect in the effect list passed into the EffectRenderer.
     *
     * @param {Actor} owner
     * @param {List<Effect>} effects
     */
    static renderEffects(owner: Actor, effects: List<Effect>): void;
    /**
     * Set the attribute from the effect.  Respects attribute assignment filters in priority order.
     *
     * @param {Actor} owner
     * @param {Effect} effect
     * @param {?Any} data - supplied at will
     */
    protected static setAttributes(owner: Actor, effect: Effect, data?: any): void;
    /**
     * Set the labels on the owning actor as defined in the effect.  Respects status filters in priority order.
     *
     * @param {Actor} owner
     * @param {Effect} effect
     * @param {Any?} data
     */
    protected static setLabels(owner: Actor, effect: Effect, data?: any): void;
    /**
     * Set flags on the owning actors as defined in the effect. Respects status filters in priority order.
     *
     * @param {Actor} owner
     * @param {Effect} effect
     */
    protected static setFlags(owner: Actor, effect: Effect, data?: any): void;
    /**
     * Set a status on the owner as defined in the effect.  Respects status filters in priority order.
     *
     * @param {Actor} owner
     * @param {Effect} effect
     */
    protected static setStatus(owner: Actor, effect: Effect): void;
    /**
     * Remove a status from the owner as defined on the effect.  Respects status filters in priority order.
     * @param {Actor} owner
     * @param {Effect} effect
     */
    protected static removeStatus(owner: Actor, effect: Effect): void;
}
