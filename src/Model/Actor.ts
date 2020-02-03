import {Ability} from "./Ability/Ability";
import {NameMap} from "./NameMap";
import {Status} from "./Status";
import {PrioritizedNameMap} from "./PrioritizedNameMap";
import {ActorProfile} from "./Actor/ActorProfile";

export class Actor {

	public id: string;
	public faction: string;
	public actionPointsAttribute: string;

    protected _attributes : NameMap<number>;
    public get attributes() : NameMap<number> { return this._attributes; }

    protected _abilities : NameMap<Ability>;
    public get abilities() : NameMap<Ability> { return this._abilities; }

    protected _labels : NameMap<string>;
    public get labels() : NameMap<string> { return this._labels; }

    protected _flags : NameMap<boolean>;
    public get flags() : NameMap<boolean> { return this._flags; }

    protected _statuses : PrioritizedNameMap<Status>;
    public get statuses() : PrioritizedNameMap<Status> { return this._statuses; }

    constructor(actorProfile?: ActorProfile) {

        this._attributes = new NameMap();
        this._abilities = new NameMap();
        this._labels = new NameMap();
        this._flags = new NameMap();
        this._statuses = new PrioritizedNameMap();

        if (actorProfile) {
        	if (actorProfile.hasOwnProperty('attributes') && actorProfile.attributes.length) {
        		for (let i = 0 ; i < actorProfile.attributes.length ; i++) {
        			this.attributes.add(actorProfile.attributes[i].key,
						(actorProfile.attributes[i].hasOwnProperty('default')) ? actorProfile.attributes[i].default : 0
					);
				}
			}

			if (actorProfile.hasOwnProperty('flags') && actorProfile.flags.length) {
				for (let i = 0 ; i < actorProfile.flags.length ; i++) {
					this.flags.add(actorProfile.flags[i].key,
						(actorProfile.flags[i].hasOwnProperty('default')) ? actorProfile.flags[i].default : false
					);
				}
			}

			if (actorProfile.hasOwnProperty('labels') && actorProfile.labels.length) {
				for (let i = 0 ; i < actorProfile.labels.length ; i++) {
					this.labels.add(actorProfile.labels[i].key,
						(actorProfile.labels[i].hasOwnProperty('default')) ? actorProfile.labels[i].default : ''
					);
				}
			}

			if (actorProfile.hasOwnProperty('actionPointsAttribute')) {
				this.actionPointsAttribute = actorProfile.actionPointsAttribute;
			}
		}
    }

    /**
     * Execute an ability belonging to the actor
     * @param {string} abilityName
     */
    public execute( abilityName : string, target : Actor, data? : any) : Ability {

        if ( ! this.abilities.has( abilityName )) {
            throw Error( "Ability with name " + abilityName + " could not be found on target actor.")
        }

        return this.abilities.get( abilityName ).execute( this, target, data );
    }
}