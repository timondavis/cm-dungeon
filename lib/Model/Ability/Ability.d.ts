import { Actor } from "../Actor";
export declare abstract class Ability {
    disabled: boolean;
    abstract execute(source: Actor, target: Actor, data?: any): Ability;
}
