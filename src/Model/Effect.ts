import {NameMap} from "./NameMap";
import {Status} from "./Status";
import {List} from "./List";

export class Effect {

    private _attributeAssignments : NameMap<(value : number, data? : any ) => number>;
    public get attributeAssignments() { return this._attributeAssignments; }

    private _labelAssignments : NameMap<(value : string, data? : any ) => string>;
    public get labelAssignments() { return this._labelAssignments; }

    private _flagAssignments : NameMap<(value : boolean, data? : any ) => boolean>;
    public get flagAssignments() { return this._flagAssignments; }

    // @todo - Kinda weird that there's an remove/assign paradigm for status, but not other attribute types.
    // Can that be straightened out?
    private _statusAssignments : NameMap<Status>;
    public get statusAssignments() { return this._statusAssignments; }

    private _statusRemovals : List<string>;
    public get statusRemovals() { return this._statusRemovals; }

    constructor() {

        this._attributeAssignments = new NameMap();
        this._labelAssignments = new NameMap();
        this._flagAssignments = new NameMap();
        this._statusAssignments = new NameMap();
        this._statusRemovals = new List();
    }
}