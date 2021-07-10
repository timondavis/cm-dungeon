import { Actor, IActor } from "../Actor";
import { Character } from "./Character";
export interface IItem extends IActor {
    owner: Character;
}
export declare class Item extends Actor {
    protected state: IItem;
    constructor();
    owner: Character;
}
