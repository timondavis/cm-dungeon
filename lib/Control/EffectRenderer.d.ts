import { Effect } from "../Model/Effect";
import { Actor } from "../Model/Actor";
export declare class EffectRenderer {
    static renderEffects(owner: Actor, effect: Effect): void;
    protected static modifyAttributes(owner: Actor, effect: Effect): void;
    protected setAttributes(effect: Effect): void;
}
