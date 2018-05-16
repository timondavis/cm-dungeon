import {Ability} from "./Ability";
import {EffectRenderer} from "../Control/EffectRenderer";
import {Interaction} from "../Control/Interaction";
import {Effect} from "./Effect";

export class Actor {

    public attributes : { [key:string] : number } = {};
    public abilities : { [key:string] : Ability } = {};
    public labels : { [key:string] : string } = {};
    public flags : { [key:string] : boolean } = {};
    public activeStati : { [key:string] : Effect } = {};
    public effectRendering : EffectRenderer;

    constructor() {

        this.effectRendering = new EffectRenderer();


        this.attributes['Strength'] = 0;
        this.attributes['Dexterity'] = 0;
        this.attributes['Constitution'] = 0;
        this.attributes['Wisdom'] = 0;
        this.attributes['Intelligence'] = 0;
        this.attributes['Charisma'] = 0;
        this.attributes['HP'] = 0;
        this.attributes['MaxHP'] = 0;
    }

    /**
     * Does the Actor have an ability with the given name?
     *
     * @param {string} name
     * @returns {boolean}
     */
    public hasAbility( name : string ) : boolean {

        return ( this.abilities.hasOwnProperty( name ) );
    }


    /**
     * Add an Ability to this Actor.  Does not allow abilities to be overwritten.
     *
     * @param {string} name
     * @param {Ability} ability
     *
     * @throws Exception when attempting to overwrite an ability with the same name.
     *
     * @returns {Actor}
     */
    public addAbility( name : string, ability : Ability ) : Actor {

        if ( this.hasAbility( name ) ) {
            throw "Ability " + name + " overwrite attempted with addAbility() method, which is illegal. " +
            "Use setAbility() to overwrite abilities.";
        }

        this.abilities[name] = ability;
        return this;
    }

    /**
     * Add or overwrite an Ability on this character.
     *
     * @param {string} name
     * @param {Ability} ability
     *
     * @returns {Actor}
     */
    public setAbility( name : string, ability : Ability ) : Actor {

        this.abilities[name] = ability;
        return this;
    }

    /**
     * Remove an ability from this character.  If ability with given name not found, flow of control will not be
     * interrupted.
     *
     * @param {string} name
     * @returns {Actor}
     */
    public removeAbility( name : string ) : Actor {

        delete(this.abilities[name]);
        return this;
    }

    /**
     * Execute the named Ability on this Actor.
     *
     * @param {string} name
     * @param {Actor} target
     * @returns {Actor}
     */
    public doAbility( name : string, target : Actor ) : Actor {
        return this;
    }

    /**
     * Get the list of abilities on this actor.
     *
     * @returns {{[p: string]: Ability}}
     */
    public getAbilities() : { [key:string] : Ability } {
        return this.abilities;
    }

    /**
     * Receive and process an Interaction from another actor.
     *
     * @param {Interaction} interaction
     *
     * @returns {Actor}
     */
    public receive( interaction : Interaction ) : Actor {
        return this;
    }
}