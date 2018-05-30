import { NameMap } from "./NameMap";
import { Actor } from "./Actor";
export declare class Status {
    protected _owner: Actor;
    readonly owner: Actor;
    protected _attributeEffectFilters: NameMap<(value: number) => number>;
    readonly attributeEffectFilters: NameMap<(value: number) => number>;
    protected _attributeReportFilters: NameMap<(value: number) => number>;
    readonly attributeReportFilters: NameMap<(value: number) => number>;
    protected _labelEffectFilters: NameMap<(value: string) => string>;
    readonly labelEffectFilters: NameMap<(value: string) => string>;
    protected _labelReportFilters: NameMap<(value: string) => string>;
    readonly labelReportFilters: NameMap<(value: string) => string>;
    protected _flagEffectFilters: NameMap<(value: string) => boolean>;
    readonly flagEffectFilters: NameMap<(value: string) => boolean>;
    protected _flagReportFilters: NameMap<(value: string) => boolean>;
    readonly flagReportFilters: NameMap<(value: string) => boolean>;
    protected _statusEffectFilters: NameMap<(value: Status) => Status>;
    readonly statusEffectFilters: NameMap<(value: Status) => Status>;
    protected _statusReportFilters: NameMap<(value: Status) => Status>;
    readonly statusReportFilters: NameMap<(value: Status) => Status>;
    setOwner(owner: Actor): void;
    clone(): Status;
    constructor();
}
