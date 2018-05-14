import { Actor } from "../Model/Actor";
import { Check } from "cm-check/lib/Check/Check";
import { Effect } from "../Model/Effect";
export declare class Interaction {
    source: Actor;
    target: Actor;
    resistanceCheck: Check;
    effects: {
        [key: string]: Effect;
    };
    type: string;
    constructor(source: Actor, target: Actor, check: Check);
    doResistanceCheck(): Interaction;
    isResistanceCheckPassed(): boolean;
}
