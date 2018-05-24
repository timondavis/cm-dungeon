import { NameMap } from "./NameMap";
import { Status } from "./Status";
import { List } from "./List";
export declare class Effect {
    private _attributeModifications;
    readonly attributeModifications: NameMap<number>;
    private _attributeAssignments;
    readonly attributeAssignments: NameMap<number>;
    private _attributeRemovals;
    readonly attributeRemovals: List<string>;
    private _labelAssignments;
    readonly labelAssignments: NameMap<string>;
    private _labelRemovals;
    readonly labelRemovals: List<string>;
    private _flagAssignments;
    readonly flagAssignments: NameMap<boolean>;
    private _flagRemovals;
    readonly flagRemovals: List<string>;
    private _statusAssignments;
    readonly statusAssignments: NameMap<Status>;
    private _statusRemovals;
    readonly statusRemovals: List<string>;
    constructor();
}
