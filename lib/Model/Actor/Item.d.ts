import { Actor } from "../Actor";
import { Character } from "../../../lib/Model/Character";
export declare class Item extends Actor {
    private _owner;
    owner: Character | null;
}
