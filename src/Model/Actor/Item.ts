import {Actor} from "../Actor";
import {Character} from "../../../lib/Model/Character";

export class Item extends Actor {

    private _owner : Character | null ;
    public get owner() { return this._owner }

    public setOwner( value : Character ) : void {
        this._owner = value
    }

    public removeOwner() : void {
        this._owner = null;
    }
}