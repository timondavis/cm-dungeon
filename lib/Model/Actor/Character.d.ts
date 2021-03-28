import { Actor, IActor } from "../Actor";
import { Item } from "./Item";
import { NameMap } from "../NameMap";
export interface ICharacter extends IActor {
    inventory: NameMap<Item>;
    equipped: NameMap<Item>;
}
export declare class Character extends Actor {
    protected state: ICharacter;
    get inventory(): NameMap<Item>;
    get equipped(): NameMap<Item>;
    constructor();
}
