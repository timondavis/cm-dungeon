import {Actor} from "../Actor";
import {Item} from "./Item";
import {NameMap} from "../NameMap";

export class Character extends Actor {

    private _inventory : NameMap<Item>;
    public get inventory() { return this._inventory; }

    private _equipped : NameMap<Item>;
    public get equipped() { return this._equipped; }

    public constructor() {
        super();

        this._inventory = new NameMap<Item>();
        this._equipped = new NameMap<Item>();
    }
}
