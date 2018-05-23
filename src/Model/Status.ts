import {NameMap} from "./NameMap";
import {Actor} from "./Actor";

export class Status {

    public _owner : Actor;

    protected _attributeFilters : NameMap<(value : number) => number>;
    public get attributeFilters() { return this._attributeFilters; }

    protected _labelFilters     : NameMap<(value : string) => string>;
    public get labelFilters() { return this._labelFilters; }

    protected _flagFilters      : NameMap<(value : string) => string>;
    public get flagFilters() { return this._flagFilters; }

    protected _blockedStatusNames  : string[];
    public get blockedStatusNames() { return this._blockedStatusNames; }

    constructor( owner : Actor ) {

        this._owner = owner;
        this._attributeFilters = new NameMap();
        this._labelFilters = new NameMap();
        this._flagFilters = new NameMap();
        this._blockedStatusNames = [];
    }
}