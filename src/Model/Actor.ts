import {Ability} from "./Ability/Ability";
import {NameMap} from "./NameMap";
import {Status} from "./Status";
import {PrioritizedNameMap} from "./PrioritizedNameMap";
import {ActorProfile} from "./Actor/ActorProfile";
import {ISerializableModel, SerializableModel} from "cm-domain-utilities";

export interface IActor extends ISerializableModel {

	id: string;
	faction: string;
	actionPointsAttribute: string;
	actionPointsRemaining: number;
	attributes: NameMap<number>;
	abilities: NameMap<Ability>;
	labels: NameMap<string>;
	flags: NameMap<boolean>;
	statuses: PrioritizedNameMap<Status>;
}

export class Actor extends SerializableModel {

	protected state: IActor;

    public get attributes(): NameMap<number> { return this.state.attributes; }
    public get abilities(): NameMap<Ability> { return this.state.abilities; }
    public get labels(): NameMap<string> { return this.state.labels; }
    public get flags(): NameMap<boolean> { return this.state.flags; }
    public get statuses(): PrioritizedNameMap<Status> { return this.state.statuses; }
    public get actionPointsAttribute(): string { return this.state.actionPointsAttribute; }
    public get actionPointsRemaining(): number { return this.state.actionPointsRemaining; }

    constructor(actorProfile?: ActorProfile) {
		super();

		this.state = {
			abilities: new NameMap(),
			actionPointsAttribute: "",
			actionPointsRemaining: 0,
			attributes: new NameMap(),
			faction: "",
			flags: new NameMap(),
			id: "",
			labels: new NameMap(),
			statuses: new PrioritizedNameMap()
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

			if (actorProfile.actionPointsAttribute) {
				this.state.actionPointsAttribute = actorProfile.actionPointsAttribute;
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