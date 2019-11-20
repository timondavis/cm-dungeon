import { NameMap } from "./NameMap";
import { Status } from "./Status";
import { List } from "./List";
export declare class Effect {
    private _attributeAssignments;
    readonly attributeAssignments: NameMap<(value: number, data?: any) => number>;
    private _labelAssignments;
    readonly labelAssignments: NameMap<(value: string, data?: any) => string>;
    private _flagAssignments;
    readonly flagAssignments: NameMap<(value: boolean, data?: any) => boolean>;
    private _statusAssignments;
    readonly statusAssignments: NameMap<Status>;
    private _statusRemovals;
    readonly statusRemovals: List<string>;
    constructor();
}
