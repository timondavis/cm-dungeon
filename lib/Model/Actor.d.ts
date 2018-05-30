import { Ability } from "./Ability/Ability";
import { NameMap } from "./NameMap";
import { Status } from "./Status";
export declare class Actor {
    protected _attributes: NameMap<number>;
    readonly attributes: NameMap<number>;
    protected _abilities: NameMap<Ability>;
    readonly abilities: NameMap<Ability>;
    protected _labels: NameMap<string>;
    readonly labels: NameMap<string>;
    protected _flags: NameMap<boolean>;
    readonly flags: NameMap<boolean>;
    protected _statusEffects: NameMap<Status>;
    readonly statusEffects: NameMap<Status>;
    constructor();
    /**
     * Execute an ability belonging to the actor
     * @param {string} abilityName
     */
    execute(abilityName: string, target: Actor, data?: any): Ability;
}
