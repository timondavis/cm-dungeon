import { Ability } from "./Ability";
import { Actor } from "../Actor";
export declare class Attack implements Ability {
    disabled: boolean;
    execute(source: Actor, target: Actor, data?: any): Ability;
    private generateCheck(source, target);
    private getDamage();
}