import {Interaction} from "../../Control/Interaction";
import {Actor} from "../Actor";

export abstract class Ability {
    public abstract execute(source: Actor, target: Actor, data? : any ): Interaction;
}
