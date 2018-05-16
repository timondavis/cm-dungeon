import { NameMap } from "./NameMap";
export declare class Effect {
    attributeFilters: NameMap<(input: number) => number>;
    labelFilters: NameMap<(input: string) => string>;
}
