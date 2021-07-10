import { IItem, Item } from "./Item";
import { Check } from "cm-check/lib/Check/Check";
import { ResultModifier } from "cm-check/lib/Check/Modifier/ResultModifier";
import { List } from "../List";
export interface IWeapon extends IItem {
    damageRoll: Check;
    checkModifiers: List<ResultModifier>;
}
export declare class Weapon extends Item {
    protected state: IWeapon;
    readonly damageRoll: Check;
    checkModifiers(): List<ResultModifier>;
    constructor();
}
