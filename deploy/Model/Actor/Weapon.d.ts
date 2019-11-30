import { Item } from "./Item";
import { Check } from "cm-check/lib/Check/Check";
import { ResultModifier } from "cm-check/lib/Check/Modifier/ResultModifier";
import { List } from "../List";
export declare class Weapon extends Item {
    private _damageRoll;
    readonly damageRoll: Check;
    private _checkModifiers;
    checkModifiers(): List<ResultModifier>;
    constructor();
}
