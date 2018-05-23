import { NameMap } from "./NameMap";
import { Status } from "./Status";
import { List } from "./List";
export declare class Effect {
    private _modifyAttributes;
    readonly modifyAttributes: NameMap<number>;
    private _setAttributes;
    readonly setAttributes: NameMap<number>;
    private _removeAttributes;
    readonly removeAttributes: List<string>;
    private _setLabels;
    readonly setLabels: NameMap<string>;
    private _removeLabels;
    readonly removeLabels: List<string>;
    private _setFlags;
    readonly setFlags: NameMap<boolean>;
    private _removeFlags;
    readonly removeFlags: List<string>;
    private _setStatus;
    readonly setStatus: NameMap<Status>;
    private _removeStatus;
    readonly removeStatus: List<string>;
    constructor();
}
