import { Ability } from "./Ability/Ability";
import { NameMap } from "./NameMap";
import { Status } from "./Status";
import { PrioritizedNameMap } from "./PrioritizedNameMap";
import { ActorProfile } from "./Actor/ActorProfile";
import { ISerializableModel, SerializableModel } from "cm-domain-utilities";
export interface IActor extends ISerializableModel {
    id: string;
    faction: string;
    actionPointsAttribute: string;
    actionPointsRemaining: number;
    attributes: NameMap<number>;
    abilities: NameMap<Ability>;
    labels: NameMap<string>;
    flags: NameMap<boolean>;
    statuses: PrioritizedNameMap<Status>;
}
export declare class Actor extends SerializableModel {
    protected state: IActor;
    id: string;
    faction: string;
    readonly attributes: NameMap<number>;
    readonly abilities: NameMap<Ability>;
    readonly labels: NameMap<string>;
    readonly flags: NameMap<boolean>;
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
