import {Actor, IActor} from "../Actor";
import {Character} from "./Character";

export interface IItem extends IActor {
	owner: 	Character;
}

export class Item extends Actor {

	protected state: IItem;

	public constructor() {
		super();
		this.state.owner = null;
	}

    public get owner() : Character { return this.state.owner }
    public set owner( value : Character | null ) { this.state.owner = value; }
}