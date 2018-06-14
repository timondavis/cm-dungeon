import {Actor} from "./Actor";
import {PrioritizedNameMap} from "./PrioritizedNameMap";

export class Status {

    protected _owner : Actor;
    public get owner() { return this._owner; }

    protected _attributeEffectFilters : PrioritizedNameMap<( modifierValue : number, originalValue : number ) => number>;
    public get attributeEffectFilters() { return this._attributeEffectFilters; }

    protected _attributeAssignmentFilters : PrioritizedNameMap<( newValue : number, originalValue : number ) => number>;
    public get attributeAssignmentFilters() { return this._attributeAssignmentFilters; }

    protected _labelAssignmentFilters     : PrioritizedNameMap<( newValue : string, originalValue : number ) => string>;
    public get labelAssignmentFilters()   { return this._labelAssignmentFilters; }

    protected _flagAssignmentFilters      : PrioritizedNameMap<( newValue : string, originalValue : number ) => boolean>;
    public get flagAssignmentFilters()    { return this._flagAssignmentFilters; }

    protected _statusAssignmentFilters    : PrioritizedNameMap<( newValue : boolean, status : Status ) => Status|boolean>;
    public get statusAssignmentFilters()  { return this._statusAssignmentFilters; }

    protected _statusRemovalFilters     : PrioritizedNameMap<( newValue : boolean, status : Status ) => Status|boolean>;
    public get statusRemovalFilters()     { return this._statusRemovalFilters; }

    public setOwner( owner : Actor ) { this._owner = owner; }

    public clone() : Status {

        let tempStatus = new Status();
        tempStatus._owner = this.owner;
        tempStatus._attributeEffectFilters      = this.attributeEffectFilters;
        tempStatus._attributeAssignmentFilters  = this.attributeAssignmentFilters;
        tempStatus._labelAssignmentFilters      = this.labelAssignmentFilters;
        tempStatus._flagAssignmentFilters       = this.flagAssignmentFilters;
        tempStatus._statusAssignmentFilters     = this.statusAssignmentFilters;
        tempStatus._statusRemovalFilters        = this.statusRemovalFilters;

        return tempStatus;
    }

    constructor() {
        this._attributeEffectFilters     = new PrioritizedNameMap();
        this._attributeAssignmentFilters = new PrioritizedNameMap();
        this._labelAssignmentFilters     = new PrioritizedNameMap();
        this._flagAssignmentFilters      = new PrioritizedNameMap();
        this._statusAssignmentFilters    = new PrioritizedNameMap();
        this._statusRemovalFilters       = new PrioritizedNameMap();
    }
}