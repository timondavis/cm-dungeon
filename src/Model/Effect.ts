import {NameMap} from "./NameMap";
import {Status} from "./Status";
import {List} from "./List";

export class Effect {

    private _modifyAttributes : NameMap<number>;
    public get modifyAttributes() { return this._modifyAttributes; }

    private _setAttributes : NameMap<number>;
    public get setAttributes() { return this._setAttributes; }

    private _removeAttributes : List<string>;
    public get removeAttributes() { return this._removeAttributes; }

    private _setLabels : NameMap<string>;
    public get setLabels() { return this._setLabels; }

    private _removeLabels : List<string>;
    public get removeLabels() { return this._removeLabels; }

    private _setFlags : NameMap<boolean>;
    public get setFlags() { return this._setFlags; }

    private _removeFlags : List<string>;
    public get removeFlags() { return this._removeFlags; }

    private _setStatus : NameMap<Status>;
    public get setStatus() { return this._setStatus; }

    private _removeStatus : List<string>;
    public get removeStatus() { return this._removeStatus; }

    constructor() {

        this._modifyAttributes = new NameMap();
        this._setAttributes = new NameMap();
        this._removeAttributes = new List();
        this._setLabels = new NameMap();
        this._removeLabels = new List();
        this._setFlags = new NameMap();
        this._removeFlags = new List();
        this._setStatus = new NameMap();
        this._removeStatus = new List();
    }
}