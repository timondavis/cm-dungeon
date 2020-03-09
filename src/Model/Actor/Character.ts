import {Actor, IActor} from "../Actor";
import {Item} from "./Item";
import {NameMap} from "../NameMap";

export interface ICharacter extends IActor {
	inventory: NameMap<Item>;
	equipped: NameMap<Item>;
}

export class Character extends Actor {

	protected state: ICharacter;

    public get inventory() { return this.state.inventory; }
    public get equipped() { return this.state.equipped; }

    public constructor() {
        super();

        this.state.inventory = new NameMap<Item>();
        this.state.equipped = new NameMap<Item>();
    }
}
