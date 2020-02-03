import { Ability } from "./Ability/Ability";
import { NameMap } from "./NameMap";
import { Status } from "./Status";
import { PrioritizedNameMap } from "./PrioritizedNameMap";
import { ActorProfile } from "./Actor/ActorProfile";
export declare class Actor {
    id: string;
    faction: string;
    actionPointsAttribute: string;
    protected _attributes: NameMap<number>;
    readonly attributes: NameMap<number>;
    protected _abilities: NameMap<Ability>;
    readonly abilities: NameMap<Ability>;
    protected _labels: NameMap<string>;
    readonly labels: NameMap<string>;
    protected _flags: NameMap<boolean>;
    readonly flags: NameMap<boolean>;
    protected _statuses: PrioritizedNameMap<Status>;
    readonly statuses: PrioritizedNameMap<Status>;
    constructor(actorProfile?: ActorProfile);
    /**
     * Execute an ability belonging to the actor
     * @param {string} abilityName
     */
    execute(abilityName: string, target: Actor, data?: any): Ability;
}
