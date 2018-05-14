import { Effect } from "../Model/Effect";
export declare class EffectRenderer {
    attributeModifiers: {
        [key: string]: (attribute: number) => number;
    };
    labelModifiers: {
        [key: string]: (label: string) => string;
    };
    flagModifiers: {
        [key: string]: (flag: boolean) => boolean;
    };
    statusModifiers: {
        [key: string]: (status: Effect) => Effect;
    };
    constructor();
    addAttributeModifier(name: string, callback: (attribute: number) => number): EffectRenderer;
    addLabelModifier(name: string, callback: (label: string) => string): EffectRenderer;
    addFlagModifier(name: string, callback: (flag: boolean) => boolean): EffectRenderer;
    addStatusModifier(name: string, callback: (status: Effect) => Effect): EffectRenderer;
}
