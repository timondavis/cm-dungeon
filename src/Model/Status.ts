import {NameMap} from "./NameMap";
import {Actor} from "./Actor";

export class Status {

    protected _owner : Actor;
    public get owner() { return this._owner; }

    protected _attributeFilters : NameMap<(value : number) => number>;
    public get attributeFilters() { return this._attributeFilters; }

    protected _labelFilters     : NameMap<(value : string) => string>;
    public get labelFilters() { return this._labelFilters; }

    protected _flagFilters      : NameMap<(value : string) => boolean>;
    public get flagFilters() { return this._flagFilters; }

    protected _statusFilters  : NameMap<(value : Status) => Status>;
    public get statusFilters() { return this._statusFilters; }

    public setOwner( owner : Actor ) { this._owner = owner; }

    public clone() : Status {

        let tempStatus = new Status();
        tempStatus._owner = this.owner;
        tempStatus._attributeFilters = this.attributeFilters;
        tempStatus._labelFilters = this.labelFilters;
        tempStatus._flagFilters = this.flagFilters;
        tempStatus._statusFilters = this.statusFilters;

        return tempStatus;
    }

    constructor() {
        this._attributeFilters = new NameMap();
        this._labelFilters = new NameMap();
        this._flagFilters = new NameMap();
        this._statusFilters = new NameMap();
    }
}