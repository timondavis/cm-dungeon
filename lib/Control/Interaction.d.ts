import { Actor } from "../Model/Actor";
import { Check } from "cm-check";
import { Effect } from "../Model/Effect";
import { List } from "../Model/List";
export declare class Interaction {
    private _source;
    get source(): Actor;
    private _target;
    get target(): Actor;
    private _resistanceCheck;
    get resistanceCheck(): any;
    private _effects;
    get effects(): List<Effect>;
    private _type;
    get type(): string;
    private _preCheckCallbacks;
    get preCheckCallbacks(): List<(source: Actor, target: Actor, check: any) => void>;
    private _postCheckCallbacks;
    get postCheckCallbacks(): List<(source: Actor, target: Actor, check: any) => void>;
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
