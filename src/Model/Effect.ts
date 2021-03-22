import {NameMap} from "./NameMap";
import {Status} from "./Status";
import {List} from "./List";
import {ISerializableModel, SerializableModel} from "cm-domain-utilities";

export interface IEffect extends ISerializableModel {
	id: string;
	attributeAssignments: NameMap<(value: number, data?: any) => number>;
	labelAssignments: NameMap<(value: string, data?: any) => string>;
	flagAssignments: NameMap<(value: boolean, data?: any) => boolean>;
	statusAssignments: NameMap<Status>;
	statusRemovals: List<string>;
}

export class Effect extends SerializableModel {

	protected state: IEffect;

    public get attributeAssignments() { return this.state.attributeAssignments; }
    public get labelAssignments() { return this.state.labelAssignments; }
    public get flagAssignments() { return this.state.flagAssignments; }
	public get statusRemovals() { return this.state.statusRemovals; }

	// @todo - Kinda weird that there's an remove/assign paradigm for status, but not other attribute types.
    public get statusAssignments() { return this.state.statusAssignments; }

    constructor() {
    	super();
    	this.state = {
			attributeAssignments: new NameMap(),
			flagAssignments: new NameMap(),
			id: "",
			labelAssignments: new NameMap(),
			statusAssignments: new NameMap(),
			statusRemovals: new List()
		};
    }
}