import { NameMap } from "./NameMap";
import { Actor } from "./Actor";
export declare class Status {
    _owner: Actor;
    protected _attributeFilters: NameMap<(value: number) => number>;
    readonly attributeFilters: NameMap<(value: number) => number>;
    protected _labelFilters: NameMap<(value: string) => string>;
    readonly labelFilters: NameMap<(value: string) => string>;
    protected _flagFilters: NameMap<(value: string) => string>;
    readonly flagFilters: NameMap<(value: string) => string>;
    protected _blockedStatusNames: string[];
    readonly blockedStatusNames: string[];
    constructor(owner: Actor);
}
