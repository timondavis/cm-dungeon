import { Actor } from "../Actor";
import { Character } from "../../../lib/Model/Character";
export declare class Item extends Actor {
    private _owner;
    readonly owner: Character | null;
    setOwner(value: Character): void;
    removeOwner(): void;
}
