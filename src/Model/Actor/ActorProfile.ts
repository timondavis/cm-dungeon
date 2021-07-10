import {ISerializableModel, SerializableModel} from "cm-domain-utilities";

export interface IActorProfile extends ISerializableModel {
	name: string;
	attributes: {key: string, default?: number}[];
	flags: {key: string, default?: boolean}[];
	labels: {key: string, default?: string}[];
	actionPointsAttribute: string;
	faction: string;
}

export class ActorProfile extends SerializableModel {
	protected state: IActorProfile;

	public get name(): string { return this.state.name; }
	public get attributes(): {key: string, default?: number}[] { return this.state.attributes };
	public get flags(): {key: string, default?: boolean}[] { return this.state.flags; }
	public get labels(): {key: string, default?: string}[] { return this.state.labels; }
	public get actionPointsAttribute(): string { return this.state.actionPointsAttribute; }
    public get faction(): string { return this.state.faction; }

	constructor(configs: any) {
		super();
		this.state = {
			actionPointsAttribute: "",
			attributes: [],
			flags: [],
			labels: [],
			name: configs.hasOwnProperty('name') ? configs.name : '',
            faction: configs.hasOwnProperty('faction') ? configs.faction : ''
		};

		if (configs.hasOwnProperty('attributes')) {
			configs.attributes.forEach((item) => {
				let defaultValue = (typeof(item) === 'object' && item.hasOwnProperty('default')) ?
					item.default : 0;
				this.attributes.push( {key: item.key, default: defaultValue} );
			});
		}

		if (configs.hasOwnProperty('flags')) {
			configs.flags.forEach((item) => {
				let defaultValue = (typeof(item) === 'object' && item.hasOwnProperty('default')) ?
					item.default: false;
				this.flags.push( {key: item.key, default: defaultValue} );
			})
		}

		if (configs.hasOwnProperty('labels')) {
			configs.labels.forEach((item) => {
				let defaultValue = (typeof(item) === 'object' && item.hasOwnProperty('default')) ?
					item.default: '';
				this.labels.push( {key: item.key, default: defaultValue});
			});
		}

		this.state.actionPointsAttribute  = (configs.hasOwnProperty('actionPointsAttribute')) ?
			configs.actionPointsAttribute : null;
	}
}
