import { Actor } from "../Model/Entity/Actor";
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
    private _type;
    readonly type: string;
    private _preCheckCallbacks;
    readonly preCheckCallbacks: List<(source: Actor, target: Actor, check: Check) => void>;
    private _postCheckCallbacks;
    readonly postCheckCallbacks: List<(source: Actor, target: Actor, check: Check) => void>;
    constructor(source: Actor, target: Actor, check: Check);
    /**
     * Returns TRUE if interaction is successful.  Failure is not an indication of error - randomization is
     * a typical factor of determining success.
     *
     * @returns {boolean}
     */
    execute(): boolean;
    protected doResistanceCheck(): boolean;
    protected logCheck(check: Check): void;
}
