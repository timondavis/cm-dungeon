import { Effect } from "../Model/Effect";
import { Actor } from "../Model/Actor";
export declare class EffectRenderer {
    static renderEffects(owner: Actor, effects: Effect[]): void;
    protected static modifyAttributes(owner: Actor, effect: Effect): void;
    protected static setAttributes(owner: Actor, effect: Effect): void;
    protected static removeAttributes(owner: Actor, effect: Effect): void;
    protected static setLabels(owner: Actor, effect: Effect): void;
    protected static removeLabels(owner: Actor, effect: Effect): void;
    protected static setFlags(owner: Actor, effect: Effect): void;
    protected static removeFlags(owner: Actor, effect: Effect): void;
    protected static setStatus(owner: Actor, effect: Effect): void;
    protected static removeStatus(owner: Actor, effect: Effect): void;
}
