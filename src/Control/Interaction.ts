import {Actor} from "../Model/Actor";
import {Check} from "cm-check/lib/Check/Check";
import {Effect} from "../Model/Effect";

export class Interaction {

    public source : Actor;
    public target : Actor;
    public resistanceCheck : Check;
    public effects : { [key:string] : Effect }
    public type : string;

    constructor( source : Actor, target: Actor, check : Check ) {

    }

    public doResistanceCheck() : Interaction {
        return new Interaction(null, null, null);
    }

    public isResistanceCheckPassed() : boolean {
        return false;
    }
}