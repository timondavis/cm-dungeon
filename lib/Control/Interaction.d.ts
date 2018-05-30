import { Actor } from "../Model/Actor";
import { Check } from "cm-check/lib/Check/Check";
import { Effect } from "../Model/Effect";
import { List } from "../Model/List";
export declare class Interaction {
    private _source;
    readonly source: Actor;
    private _target;
    readonly target: Actor;
    private _resistanceCheck;
    readonly resistanceCheck: Check;
    private _effects;
    readonly effects: List<Effect>;
    _type: string;
    readonly type: string;
    constructor(source: Actor, target: Actor, check: Check);
    /**
     * Returns TRUE if interaction is successful.  Failure is not an indication of error - randomization is
     * a typical factor of determining success.
     *
     * @returns {boolean}
     */
    execute(): boolean;
    protected doResistanceCheck(): boolean;
}
