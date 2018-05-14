export declare class Effect {
    attributeFilters: {
        [key: string]: (value: number) => number;
    };
    labelFilters: {
        [key: string]: (label: string) => string;
    };
}
