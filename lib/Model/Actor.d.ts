import { Ability } from "./Ability/Ability";
import { Effect } from "./Effect";
import { NameMap } from "./NameMap";
export declare class Actor {
    protected _attributes: NameMap<number>;
    readonly attributes: NameMap<number>;
    protected _abilities: NameMap<Ability>;
    readonly abilities: NameMap<Ability>;
    protected _labels: NameMap<string>;
    readonly labels: NameMap<string>;
    protected _flags: NameMap<boolean>;
    readonly flags: NameMap<boolean>;
    protected _statusEffects: NameMap<Effect>;
    readonly statusEffects: NameMap<Effect>;
    constructor();
}
