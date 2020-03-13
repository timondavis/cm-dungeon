import { Ability } from "../Ability";
import { Actor } from "../../Entity/Actor";
export declare class D20_Attack extends Ability {
    execute(source: Actor, target: Actor): Ability;
    private generateCheck;
    private getDamage;
}
