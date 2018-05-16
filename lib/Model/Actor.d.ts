import { Ability } from "./Ability";
import { EffectRenderer } from "../Control/EffectRenderer";
import { Interaction } from "../Control/Interaction";
import { Effect } from "./Effect";
export declare class Actor {
    attributes: {
        [key: string]: number;
    };
    abilities: {
        [key: string]: Ability;
    };
    labels: {
        [key: string]: string;
    };
    flags: {
        [key: string]: boolean;
    };
    activeStati: {
        [key: string]: Effect;
    };
    effectRendering: EffectRenderer;
    constructor();
    /**
     * Does the Actor have an ability with the given name?
     *
     * @param {string} name
     * @returns {boolean}
     */
    hasAbility(name: string): boolean;
    /**
     * Add an Ability to this Actor.  Does not allow abilities to be overwritten.
     *
     * @param {string} name
     * @param {Ability} ability
     *
     * @throws Exception when attempting to overwrite an ability with the same name.
     *
     * @returns {Actor}
     */
    addAbility(name: string, ability: Ability): Actor;
    /**
     * Add or overwrite an Ability on this character.
     *
     * @param {string} name
     * @param {Ability} ability
     *
     * @returns {Actor}
     */
    setAbility(name: string, ability: Ability): Actor;
    /**
     * Remove an ability from this character.  If ability with given name not found, flow of control will not be
     * interrupted.
     *
     * @param {string} name
     * @returns {Actor}
     */
    removeAbility(name: string): Actor;
    /**
     * Execute the named Ability on this Actor.
     *
     * @param {string} name
     * @param {Actor} target
     * @returns {Actor}
     */
    doAbility(name: string, target: Actor): Actor;
    /**
     * Get the list of abilities on this actor.
     *
     * @returns {{[p: string]: Ability}}
     */
    getAbilities(): {
        [key: string]: Ability;
    };
    /**
     * Receive and process an Interaction from another actor.
     *
     * @param {Interaction} interaction
     *
     * @returns {Actor}
     */
    receive(interaction: Interaction): Actor;
}
