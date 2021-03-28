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
    get id(): string;
    set id(id: string);
    get faction(): string;
    set faction(faction: string);
    get attributes(): NameMap<number>;
    get abilities(): NameMap<Ability>;
    get labels(): NameMap<string>;
    get flags(): NameMap<boolean>;
    get statuses(): PrioritizedNameMap<Status>;
    get actionPointsAttribute(): string;
    set actionPointsAttribute(attr: string);
    get actionPointsRemaining(): number;
    set actionPointsRemaining(pointsRemaining: number);
    constructor(actorProfile?: ActorProfile);
    /**
     * Execute an ability belonging to the actor
     * @param {string} abilityName
     */
    execute(abilityName: string, target: Actor, data?: any): Ability;
}
