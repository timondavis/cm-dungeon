import { Actor } from "../Actor";
import { Character } from "./Character";
export declare class Item extends Actor {
    private _owner;
    owner: Character | null;
}
