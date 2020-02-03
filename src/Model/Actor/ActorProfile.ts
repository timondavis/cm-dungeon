export class ActorProfile {
	public readonly name: string = '';
	public readonly attributes: {key: string, default?: number}[] = [];
	public readonly flags: {key: string, default?: boolean}[] = [];
	public readonly labels: {key: string, default?: string}[] = [];
	public readonly actionPointsAttribute: string;

	constructor(configs: any) {
		this.name = configs.name;

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

		this.actionPointsAttribute  = (configs.hasOwnProperty('actionPointsAttribute')) ?
			configs.actionPointsAttribute : null;
	}
}
