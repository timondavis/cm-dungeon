import { DieBag } from "cm-check/lib/Die/DieBag";
import { Actor } from "../Model/Actor";
export declare class Attack {
    source: Actor;
    target: Actor;
    toHitTarget: number;
    damageDie: DieBag;
    damageModifier: number;
    execute(): boolean;
}
