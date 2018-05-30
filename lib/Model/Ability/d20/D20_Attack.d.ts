import { Ability } from "../Ability";
import { Actor } from "../../Actor";
export declare class D20_Attack implements Ability {
    disabled: boolean;
    execute(source: Actor, target: Actor): Ability;
    private generateCheck(source, target);
    private getDamage();
}