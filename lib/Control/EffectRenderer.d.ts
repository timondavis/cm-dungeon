import { Effect } from "../Model/Effect";
import { Actor } from "../Model/Actor";
export declare class EffectRenderer {
    static renderEffects(owner: Actor, effects: Effect[]): void;
    protected static modifyAttributes(owner: Actor, effects: Effect[]): void;
    protected setAttributes(owner: Actor, effects: Effect[]): void;
    protected removeAttributes(owner: Actor, effects: Effect[]): void;
    protected setLabels(owner: Actor, effects: Effect[]): void;
    protected removeLabels(owner: Actor, effects: Effect[]): void;
    protected setFlags(owner: Actor, effects: Effect[]): void;
    protected removeFlags(owner: Actor, effects: Effect[]): void;
    protected setStatus(owner: Actor, effects: Effect[]): void;
    protected removeStatus(owner: Actor, effects: Effect[]): void;
}
