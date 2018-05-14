import { Ability } from "./Ability";
import { EffectRenderer } from "../Control/EffectRenderer";
import { Interaction } from "../Control/Interaction";
import { Effect } from "./Effect";
export declare class Actor {
    attributes: {
        [key: string]: number;
    };
    abilities: {
        [key: string]: Ability;
    };
    labels: {
        [key: string]: string;
    };
    flags: {
        [key: string]: boolean;
    };
    activeStati: {
        [key: string]: Effect;
    };
    effectRendering: EffectRenderer;
    constructor();
    doAbility(name: string, target: Actor): Actor;
    receive(interaction: Interaction): Actor;
}
