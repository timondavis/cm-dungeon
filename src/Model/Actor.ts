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

    public doAbility( name : string, target : Actor ) : Actor {
        return this;
    }

    public receive( interaction : Interaction ) : Actor {
        return this;
    }
}