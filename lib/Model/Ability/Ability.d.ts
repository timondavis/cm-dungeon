import { Actor } from "../Actor";
import { Modifier } from "../../../../cm-check/";
import { PrioritizedNameMap } from "../PrioritizedNameMap";
export declare abstract class Ability {
    disabled: boolean;
    abstract execute(source: Actor, target: Actor, data?: any): Ability;
    checkModifiers: PrioritizedNameMap<Modifier>;
}
