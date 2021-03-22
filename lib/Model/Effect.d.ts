import { NameMap } from "./NameMap";
import { Status } from "./Status";
import { List } from "./List";
import { ISerializableModel, SerializableModel } from "cm-domain-utilities";
export interface IEffect extends ISerializableModel {
    id: string;
    attributeAssignments: NameMap<(value: number, data?: any) => number>;
    labelAssignments: NameMap<(value: string, data?: any) => string>;
    flagAssignments: NameMap<(value: boolean, data?: any) => boolean>;
    statusAssignments: NameMap<Status>;
    statusRemovals: List<string>;
}
export declare class Effect extends SerializableModel {
    protected state: IEffect;
    readonly attributeAssignments: NameMap<(value: number, data?: any) => number>;
    readonly labelAssignments: NameMap<(value: string, data?: any) => string>;
    readonly flagAssignments: NameMap<(value: boolean, data?: any) => boolean>;
    readonly statusRemovals: List<string>;
    readonly statusAssignments: NameMap<Status>;
    constructor();
}
