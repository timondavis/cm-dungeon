import {NameMap} from "./NameMap";
import {Status} from "./Status";
import {List} from "./List";

export class Effect {

    private _attributeModifications : NameMap<number>;
    public get attributeModifications() { return this._attributeModifications; }

    private _attributeAssignments : NameMap<number>;
    public get attributeAssignments() { return this._attributeAssignments; }

    private _labelAssignments : NameMap<string>;
    public get labelAssignments() { return this._labelAssignments; }

    private _flagAssignments : NameMap<boolean>;
    public get flagAssignments() { return this._flagAssignments; }

    private _statusAssignments : NameMap<Status>;
    public get statusAssignments() { return this._statusAssignments; }

    private _statusRemovals : List<string>;
    public get statusRemovals() { return this._statusRemovals; }

    constructor() {

        this._attributeModifications = new NameMap();
        this._attributeAssignments = new NameMap();
        this._labelAssignments = new NameMap();
        this._flagAssignments = new NameMap();
        this._statusAssignments = new NameMap();
        this._statusRemovals = new List();
    }
}