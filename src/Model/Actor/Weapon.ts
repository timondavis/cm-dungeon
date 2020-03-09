import {IItem, Item} from "./Item";
import {Check} from "cm-check/lib/Check/Check";
import {CheckExecutor} from "cm-check/lib/Check/CheckExecutor";
import {ResultModifier} from "cm-check/lib/Check/Modifier/ResultModifier";
import {List} from "../List";

export interface IWeapon extends IItem {
	damageRoll: Check;
	checkModifiers: List<ResultModifier>;
}

export class Weapon extends Item {

	protected state: IWeapon;

    public get damageRoll() { return this.state.damageRoll; }
    public checkModifiers() : List<ResultModifier> { return this.state.checkModifiers; }

    public constructor() {
        super();

        this.state.damageRoll = CheckExecutor.getInstance().generateCheck();
        this.state.checkModifiers = new List<ResultModifier>();
    }
}