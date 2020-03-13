import { NameMap } from "../NameMap";
import { ActorProfile } from "./ActorProfile";
import { ISerializableModel, SerializableModel } from "cm-domain-utilities";
export interface IEntity extends ISerializableModel {
    id: string;
    actionPointsAttribute: string;
    actionPointsRemaining: number;
    attributes: NameMap<number>;
    labels: NameMap<string>;
    flags: NameMap<boolean>;
    entityType: string;
}
export declare class Entity extends SerializableModel {
    protected state: IEntity;
    id: string;
    readonly attributes: NameMap<number>;
    readonly labels: NameMap<string>;
    readonly flags: NameMap<boolean>;
    constructor(actorProfile?: ActorProfile);
}
