import { Actor } from "./Actor";
import { PrioritizedNameMap } from "./PrioritizedNameMap";
export declare class Status {
    id: string;
    protected _owner: Actor;
    readonly owner: Actor;
    protected _attributeAssignmentFilters: PrioritizedNameMap<(newValue: number, originalValue: number) => number>;
    readonly attributeAssignmentFilters: PrioritizedNameMap<(newValue: number, originalValue: number) => number>;
    protected _labelAssignmentFilters: PrioritizedNameMap<(newValue: string, originalValue: string) => string>;
    readonly labelAssignmentFilters: PrioritizedNameMap<(newValue: string, originalValue: string) => string>;
    protected _flagAssignmentFilters: PrioritizedNameMap<(newValue: boolean, originalValue: boolean) => boolean>;
    readonly flagAssignmentFilters: PrioritizedNameMap<(newValue: boolean, originalValue: boolean) => boolean>;
    protected _statusAssignmentFilters: PrioritizedNameMap<(newValue: boolean, status: Status) => Status | boolean>;
    readonly statusAssignmentFilters: PrioritizedNameMap<(newValue: boolean, status: Status) => boolean | Status>;
    protected _statusRemovalFilters: PrioritizedNameMap<(newValue: boolean, status: Status) => Status | boolean>;
    readonly statusRemovalFilters: PrioritizedNameMap<(newValue: boolean, status: Status) => boolean | Status>;
    setOwner(owner: Actor): void;
    clone(): Status;
    constructor();
}
