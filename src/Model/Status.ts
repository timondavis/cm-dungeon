import {Actor} from "./Actor";
import {PrioritizedNameMap} from "./PrioritizedNameMap";

export class Status {

    protected _owner : Actor;
    public get owner() { return this._owner; }

    protected _attributeEffectFilters : PrioritizedNameMap<( modifierValue : number ) => number>;
    public get attributeEffectFilters() { return this._attributeEffectFilters; }

    protected _attributeReportFilters : PrioritizedNameMap<( value : number ) => number>;
    public get attributeReportFilters() { return this._attributeReportFilters; }

    protected _labelEffectFilters     : PrioritizedNameMap<( newValue : string ) => string>;
    public get labelEffectFilters()   { return this._labelEffectFilters; }

    protected _labelReportFilters     : PrioritizedNameMap<( value  :string ) => string>;
    public get labelReportFilters()   { return this._labelReportFilters; }

    protected _flagEffectFilters      : PrioritizedNameMap<( newValue : string ) => boolean>;
    public get flagEffectFilters()    { return this._flagEffectFilters; }

    protected _flagReportFilters      : PrioritizedNameMap<( value : string ) => boolean>;
    public get flagReportFilters()    { return this._flagReportFilters; }

    protected _statusEffectFilters    : PrioritizedNameMap<( newValue : Status ) => Status>;
    public get statusEffectFilters()  { return this._statusEffectFilters; }

    protected _statusReportFilters    : PrioritizedNameMap<( value : Status ) => Status>;
    public get statusReportFilters()  { return this._statusReportFilters; }


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
        this._attributeEffectFilters = new PrioritizedNameMap();
        this._attributeReportFilters = new PrioritizedNameMap();
        this._labelEffectFilters     = new PrioritizedNameMap();
        this._labelReportFilters     = new PrioritizedNameMap();
        this._flagEffectFilters      = new PrioritizedNameMap();
        this._flagReportFilters      = new PrioritizedNameMap();
        this._statusEffectFilters    = new PrioritizedNameMap();
        this._statusReportFilters    = new PrioritizedNameMap();
    }
}