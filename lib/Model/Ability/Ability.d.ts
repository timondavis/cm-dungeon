import { Interaction } from "../../Control/Interaction";
import { Actor } from "../Actor";
export declare abstract class Ability {
    abstract execute(source: Actor, target: Actor, data?: any): Interaction;
}
