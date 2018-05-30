import {NameMap} from "./NameMap";
import {Actor} from "./Actor";

export class Status {

    protected _owner : Actor;
    public get owner() { return this._owner; }

    protected _attributeEffectFilters : NameMap<( value : number ) => number>;
    public get attributeEffectFilters() { return this._attributeEffectFilters; }

    protected _attributeReportFilters : NameMap<( value : number ) => number>;
    public get attributeReportFilters() { return this._attributeReportFilters; }

    protected _labelEffectFilters     : NameMap<( value : string ) => string>;
    public get labelEffectFilters() { return this._labelEffectFilters; }

    protected _labelReportFilters     : NameMap<( value  :string ) => string>;
    public get labelReportFilters() { return this._labelReportFilters; }

    protected _flagEffectFilters      : NameMap<( value : string ) => boolean>;
    public get flagEffectFilters() { return this._flagEffectFilters; }

    protected _flagReportFilters      : NameMap<( value : string ) => boolean>;
    public get flagReportFilters() { return this._flagReportFilters; }

    protected _statusEffectFilters  : NameMap<(value : Status) => Status>;
    public get statusEffectFilters() { return this._statusEffectFilters; }

    protected _statusReportFilters  : NameMap<(value : Status) => Status>;
    public get statusReportFilters() { return this._statusReportFilters; }


    public setOwner( owner : Actor ) { this._owner = owner; }

    public clone() : Status {

        let tempStatus = new Status();
        tempStatus._owner = this.owner;
        tempStatus._attributeEffectFilters = this.attributeEffectFilters;
        tempStatus._labelEffectFilters     = this.labelEffectFilters;
        tempStatus._flagEffectFilters      = this.flagEffectFilters;
        tempStatus._statusEffectFilters    = this.statusEffectFilters;

        return tempStatus;
    }

    constructor() {
        this._attributeEffectFilters = new NameMap();
        this._attributeReportFilters = new NameMap();
        this._labelEffectFilters = new NameMap();
        this._labelReportFilters = new NameMap();
        this._flagEffectFilters = new NameMap();
        this._flagReportFilters = new NameMap();
        this._statusEffectFilters = new NameMap();
        this._statusReportFilters = new NameMap();
    }
}