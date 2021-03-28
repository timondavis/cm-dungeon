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
    get owner(): Actor;
    get attributeAssignmentFilters(): PrioritizedNameMap<(newValue: number, originalValue: number) => number>;
    get labelAssignmentFilters(): PrioritizedNameMap<(newValue: string, originalValue: string) => string>;
    get flagAssignmentFilters(): PrioritizedNameMap<(newValue: boolean, originalValue: boolean) => boolean>;
    get statusRemovalFilters(): PrioritizedNameMap<(newValue: boolean, status: Status) => boolean | Status>;
    get statusAssignmentFilters(): PrioritizedNameMap<(newValue: boolean, status: Status) => boolean | Status>;
    setOwner(owner: Actor): void;
    clone(): Status;
    constructor();
}
