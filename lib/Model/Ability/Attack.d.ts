import { Ability } from "./Ability";
import { Interaction } from "../../Control/Interaction";
import { Actor } from "../Actor";
export declare class Attack implements Ability {
    execute(source: Actor, target: Actor, data?: any): Interaction;
}
