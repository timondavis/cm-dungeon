import { Ability } from "../Ability/Ability";
import { NameMap } from "../NameMap";
import { Status } from "../Status";
import { PrioritizedNameMap } from "../PrioritizedNameMap";
import { ActorProfile } from "./ActorProfile";
import { Entity, IEntity } from "./Entity";
export declare const ActorSchema: void;
export interface IActor extends IEntity {
    faction: string;
    actionPointsAttribute: string;
    actionPointsRemaining: number;
    abilities: NameMap<Ability>;
    statuses: PrioritizedNameMap<Status>;
}
export declare class Actor extends Entity {
    protected state: IActor;
    faction: string;
    readonly abilities: NameMap<Ability>;
    readonly statuses: PrioritizedNameMap<Status>;
    actionPointsAttribute: string;
    actionPointsRemaining: number;
    constructor(actorProfile?: ActorProfile);
    /**
     * Execute an ability belonging to the actor
     * @param {string} abilityName
     */
    execute(abilityName: string, target: Actor, data?: any): Ability;
}
