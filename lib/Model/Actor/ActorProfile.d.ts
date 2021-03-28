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
}
export declare class ActorProfile extends SerializableModel {
    protected state: IActorProfile;
    get name(): string;
    get attributes(): {
        key: string;
        default?: number;
    }[];
    get flags(): {
        key: string;
        default?: boolean;
    }[];
    get labels(): {
        key: string;
        default?: string;
    }[];
    get actionPointsAttribute(): string;
    constructor(configs: any);
}
