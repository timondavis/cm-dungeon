import {Ability} from "../Ability/Ability";
import {NameMap} from "../NameMap";
import {Status} from "../Status";
import {PrioritizedNameMap} from "../PrioritizedNameMap";
import {ActorProfile} from "./ActorProfile";
import {Entity, IEntity, EntitySchema} from "./Entity";

export const ActorSchema =
	EntitySchema.add({
		// @todo
	});

export interface IActor extends IEntity {
	faction: string;
	actionPointsAttribute: string;
	actionPointsRemaining: number;
	abilities: NameMap<Ability>;
	statuses: PrioritizedNameMap<Status>;
}

export class Actor extends Entity {

	protected state: IActor;

	public get faction(): string { return this.state.faction; }
	public set faction(faction: string) { this.state.faction = faction; }
    public get abilities(): NameMap<Ability> { return this.state.abilities; }
    public get statuses(): PrioritizedNameMap<Status> { return this.state.statuses; }
    public get actionPointsAttribute(): string { return this.state.actionPointsAttribute; }
    public set actionPointsAttribute(attr: string) { this.state.actionPointsAttribute = attr; }
    public get actionPointsRemaining(): number { return this.state.actionPointsRemaining; }
    public set actionPointsRemaining(pointsRemaining: number) { this.state.actionPointsRemaining = pointsRemaining; }

    constructor(actorProfile?: ActorProfile) {
		super(actorProfile);

		this.state.abilities = new NameMap();
		this.state.actionPointsAttribute = "";
		this.state.actionPointsRemaining = 0;
		this.state.faction = "";
		this.state.statuses = new PrioritizedNameMap();

        if (actorProfile) {
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