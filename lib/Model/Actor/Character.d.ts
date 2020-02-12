import { Actor } from "../Actor";
import { Item } from "./Item";
import { NameMap } from "../NameMap";
export declare class Character extends Actor {
    private _inventory;
    readonly inventory: NameMap<Item>;
    private _equipped;
    readonly equipped: NameMap<Item>;
    constructor();
}
