import {NameMap} from "../NameMap";
import {ActorProfile} from "./ActorProfile";
import {ISerializableModel, SerializableModel} from "cm-domain-utilities";

export interface IEntity extends ISerializableModel {
	id: string;
	actionPointsAttribute: string;
	actionPointsRemaining: number;
	attributes: NameMap<number>;
	labels: NameMap<string>;
	flags: NameMap<boolean>;
	entityType: string;
}

export class Entity extends SerializableModel {

	protected state: IEntity;

	public get id(): string { return this.state.id; }
	public set id(id: string) { this.state.id = id; }
	public get attributes(): NameMap<number> { return this.state.attributes; }
	public get labels(): NameMap<string> { return this.state.labels; }
	public get flags(): NameMap<boolean> { return this.state.flags; }

	constructor(actorProfile?: ActorProfile) {
		super();

		this.state = {
			actionPointsAttribute: "",
			actionPointsRemaining: 0,
			attributes: new NameMap(),
			flags: new NameMap(),
			id: "",
			labels: new NameMap(),
			entityType: ""
		};

		if (actorProfile) {
			if (actorProfile.attributes.length) {
				for (let i = 0 ; i < actorProfile.attributes.length ; i++) {
					this.attributes.add(actorProfile.attributes[i].key,
						(actorProfile.attributes[i].hasOwnProperty('default')) ? actorProfile.attributes[i].default : 0
					);
				}
			}

			if (actorProfile.flags.length) {
				for (let i = 0 ; i < actorProfile.flags.length ; i++) {
					this.flags.add(actorProfile.flags[i].key,
						(actorProfile.flags[i].hasOwnProperty('default')) ? actorProfile.flags[i].default : false
					);
				}
			}

			if (actorProfile.labels.length) {
				for (let i = 0 ; i < actorProfile.labels.length ; i++) {
					this.labels.add(actorProfile.labels[i].key,
						(actorProfile.labels[i].hasOwnProperty('default')) ? actorProfile.labels[i].default : ''
					);
				}
			}
		}
	}
}