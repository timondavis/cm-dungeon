import {Ability} from "./Ability/Ability";
import {NameMap} from "./NameMap";
import {Status} from "./Status";
import {PrioritizedNameMap} from "./PrioritizedNameMap";

export class Actor {

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

    constructor() {

        this._attributes = new NameMap();
        this._abilities = new NameMap();
        this._labels = new NameMap();
        this._flags = new NameMap();
        this._statuses = new PrioritizedNameMap();
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