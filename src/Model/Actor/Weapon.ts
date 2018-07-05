import {Item} from "./Item";
import {Check} from "cm-check/lib/Check/Check";
import {CheckExecutor} from "cm-check/lib/Check/CheckExecutor";
import {ResultModifier} from "cm-check/lib/Check/Modifier/ResultModifier";
import {List} from "../List";

export class Weapon extends Item {

    private _damageRoll : Check;
    public get damageRoll() { return this._damageRoll; }

    private _checkModifiers : List<ResultModifier>;
    public checkModifiers() : List<ResultModifier> { return this._checkModifiers; }

    public constructor() {
        super();
        this._damageRoll = CheckExecutor.getInstance().generateCheck();
        this._checkModifiers = new List<ResultModifier>();
    }
}