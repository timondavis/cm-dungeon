import { ISerializableModel, SerializableModel } from "cm-domain-utilities";
export interface IActorProfile extends ISerializableModel {
    name: string;
    attributes: {
        key: string;
        default?: number;
    }[];
    flags: {
        key: string;
        default?: boolean;
    }[];
    labels: {
        key: string;
        default?: string;
    }[];
    actionPointsAttribute: string;
    faction: string;
}
export declare class ActorProfile extends SerializableModel {
    protected state: IActorProfile;
    readonly name: string;
    readonly attributes: {
        key: string;
        default?: number;
    }[];
    readonly flags: {
        key: string;
        default?: boolean;
    }[];
    readonly labels: {
        key: string;
        default?: string;
    }[];
    readonly actionPointsAttribute: string;
    readonly faction: string;
    constructor(configs: any);
}
