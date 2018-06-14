import {Interaction} from "../../Control/Interaction";
import {Actor} from "../Actor";
import {Modifier} from "cm-check/lib/Check/Modifier/Modifier";
import {PrioritizedNameMap} from "../PrioritizedNameMap";

export abstract class Ability {

    public disabled : boolean = false;
    public abstract execute(source: Actor, target: Actor, data? : any ): Ability;
    public checkModifiers : PrioritizedNameMap<Modifier>;
}
