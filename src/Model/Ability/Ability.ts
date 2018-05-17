import {Interaction} from "../../Control/Interaction";
import {Actor} from "../Actor";

export abstract class Ability {

    public disabled : boolean = false;
    public abstract execute(source: Actor, target: Actor, data? : any ): Ability;
}
