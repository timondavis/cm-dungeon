export declare class ActorProfile {
    readonly name: string;
    readonly attributes: {
        key: string;
        default?: number;
    }[];
    readonly flags: {
        key: string;
        default?: boolean;
    }[];
    readonly labels: {
        key: string;
        default?: string;
    }[];
    readonly actionPointsAttribute: string;
    constructor(configs: any);
}
