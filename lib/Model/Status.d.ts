import { Actor } from "./Actor";
import { PrioritizedNameMap } from "./PrioritizedNameMap";
import { ISerializableModel, SerializableModel } from "cm-domain-utilities";
export interface IStatus extends ISerializableModel {
    id: string;
    owner: Actor;
    attributeAssignmentFilters: PrioritizedNameMap<(newValue: number, originalValue: number) => number>;
    labelAssignmentFilters: PrioritizedNameMap<(newValue: string, originalValue: string) => string>;
    flagAssignmentFilters: PrioritizedNameMap<(newValue: boolean, originalValue: boolean) => boolean>;
    statusAssignmentFilters: PrioritizedNameMap<(newValue: boolean, status: Status) => Status | boolean>;
    statusRemovalFilters: PrioritizedNameMap<(newValue: boolean, status: Status) => Status | boolean>;
}
export declare class Status extends SerializableModel {
    protected state: IStatus;
    readonly owner: Actor;
    readonly attributeAssignmentFilters: PrioritizedNameMap<(newValue: number, originalValue: number) => number>;
    readonly labelAssignmentFilters: PrioritizedNameMap<(newValue: string, originalValue: string) => string>;
    readonly flagAssignmentFilters: PrioritizedNameMap<(newValue: boolean, originalValue: boolean) => boolean>;
    readonly statusRemovalFilters: PrioritizedNameMap<(newValue: boolean, status: Status) => boolean | Status>;
    readonly statusAssignmentFilters: PrioritizedNameMap<(newValue: boolean, status: Status) => boolean | Status>;
    setOwner(owner: Actor): void;
    clone(): Status;
    constructor();
}
