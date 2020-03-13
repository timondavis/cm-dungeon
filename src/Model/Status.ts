import {Actor} from "./Entity/Actor";
import {PrioritizedNameMap} from "./PrioritizedNameMap";
import {DomainConverter, ISerializableModel, SerializableModel} from "cm-domain-utilities";

export interface IStatus extends ISerializableModel {
	id: string;
	owner: Actor;
	attributeAssignmentFilters: PrioritizedNameMap<( newValue : number, originalValue : number ) => number>;
	labelAssignmentFilters: PrioritizedNameMap<( newValue : string, originalValue : string ) => string>;
	flagAssignmentFilters: PrioritizedNameMap<( newValue : boolean, originalValue : boolean ) => boolean>;
	statusAssignmentFilters: PrioritizedNameMap<( newValue : boolean, status : Status ) => Status | boolean>;
	statusRemovalFilters: PrioritizedNameMap<( newValue : boolean, status : Status ) => Status|boolean>;
}

export class Status extends SerializableModel {

	protected state: IStatus;

    public get owner() { return this.state.owner; }
    public get attributeAssignmentFilters() { return this.state.attributeAssignmentFilters; }
    public get labelAssignmentFilters() { return this.state.labelAssignmentFilters; }
    public get flagAssignmentFilters() { return this.state.flagAssignmentFilters; }
	public get statusRemovalFilters() { return this.state.statusRemovalFilters; }


	// @todo Again with the explicit assign removes - should be the same as other types. Can they be updated
    // with null?  Or do the other attribute types also get a remove method?
    public get statusAssignmentFilters()  { return this.state.statusAssignmentFilters; }

	// @todo setter should be used here, not setX().
	public setOwner( owner : Actor ) { this.state.owner = owner; }

    public clone() : Status {
        let tempStatus: IStatus = {
			attributeAssignmentFilters: this.attributeAssignmentFilters,
			flagAssignmentFilters: this.flagAssignmentFilters,
			id: "",
			labelAssignmentFilters: this.labelAssignmentFilters,
			owner: this.owner,
			statusAssignmentFilters: this.statusAssignmentFilters,
			statusRemovalFilters: this.statusRemovalFilters
		};

        return DomainConverter.hydrateModelFromData(Status, tempStatus);
    }

    constructor() {
    	super();
    	this.state = {
			attributeAssignmentFilters: new PrioritizedNameMap(),
			flagAssignmentFilters: new PrioritizedNameMap(),
			id: "",
			labelAssignmentFilters: new PrioritizedNameMap(),
			owner: undefined,
			statusAssignmentFilters: new PrioritizedNameMap(),
			statusRemovalFilters: new PrioritizedNameMap()
		};
    }
}