import {Actor} from "./Actor";
import {PrioritizedNameMap} from "./PrioritizedNameMap";

export interface

export class Status {

	public id: string;

    protected _owner : Actor;
    public get owner() { return this._owner; }

    protected _attributeAssignmentFilters : PrioritizedNameMap<( newValue : number, originalValue : number ) => number>;
    public get attributeAssignmentFilters() { return this._attributeAssignmentFilters; }

    protected _labelAssignmentFilters     : PrioritizedNameMap<( newValue : string, originalValue : string ) => string>;
    public get labelAssignmentFilters()   { return this._labelAssignmentFilters; }

    protected _flagAssignmentFilters      : PrioritizedNameMap<( newValue : boolean, originalValue : boolean ) => boolean>;
    public get flagAssignmentFilters()    { return this._flagAssignmentFilters; }


    // @todo Again with the explicit assign removes - should be the same as other types. Can they be updated
    // with null?  Or do the other attribute types also get a remove method?
    protected _statusAssignmentFilters    : PrioritizedNameMap<( newValue : boolean, status : Status ) => Status|boolean>;
    public get statusAssignmentFilters()  { return this._statusAssignmentFilters; }

    protected _statusRemovalFilters     : PrioritizedNameMap<( newValue : boolean, status : Status ) => Status|boolean>;
    public get statusRemovalFilters()     { return this._statusRemovalFilters; }

    public setOwner( owner : Actor ) { this._owner = owner; }

    public clone() : Status {

        let tempStatus = new Status();
        tempStatus._owner = this.owner;
        tempStatus._attributeAssignmentFilters  = this.attributeAssignmentFilters;
        tempStatus._labelAssignmentFilters      = this.labelAssignmentFilters;
        tempStatus._flagAssignmentFilters       = this.flagAssignmentFilters;
        tempStatus._statusAssignmentFilters     = this.statusAssignmentFilters;
        tempStatus._statusRemovalFilters        = this.statusRemovalFilters;

        return tempStatus;
    }

    constructor() {
        this._attributeAssignmentFilters = new PrioritizedNameMap();
        this._labelAssignmentFilters     = new PrioritizedNameMap();
        this._flagAssignmentFilters      = new PrioritizedNameMap();
        this._statusAssignmentFilters    = new PrioritizedNameMap();
        this._statusRemovalFilters       = new PrioritizedNameMap();
    }
}