import {Actor} from "../Actor";
import {Character} from "../../../lib/Model/Character";

export class Item extends Actor {

    private _owner : Character | null ;
    public get owner() : Character | null { return this._owner }
    public set owner( value : Character | null ) { this._owner = value; }
}