import {Actor} from "../Actor";
import {Item} from "./Item";
import {NameMap} from "../../../lib/Model/NameMap";

export class Character extends Actor {

    private _inventory : NameMap<Item>;
    public get inventory() { return this._inventory; }

    private _equipped : NameMap<NameMap<Item>>;
    public get equipped() { return this._equipped; }
}
