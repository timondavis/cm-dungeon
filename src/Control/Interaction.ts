import {Actor} from "../Model/Actor";
import {Check} from "cm-check/lib/Check/Check";
import {Effect} from "../Model/Effect";
import {CheckExecutor} from "cm-check/lib/Check/CheckExecutor";
import {EffectRenderer} from "./EffectRenderer";
import {List} from "../Model/List";

export class Interaction {

    private _source : Actor;
    public get source() { return this._source; }

    private _target : Actor;
    public get target() { return this._target; }

    private _resistanceCheck : Check;
    public get resistanceCheck() { return this._resistanceCheck }

    private _effects : List<Effect>;
    public get effects() { return this._effects; }

    public _type : string;
    public get type() { return this._type; }

    public _preCheckCallbacks : List<(source : Actor, target : Actor, check : Check) => void>;
    public get preCheckCallbacks() { return this._preCheckCallbacks; }

    constructor( source : Actor, target: Actor, check : Check ) {

        this._effects = new List();
        this._source = source;
        this._target = target;
        this._resistanceCheck = check;
        this._preCheckCallbacks = new List();
    }

    /**
     * Returns TRUE if interaction is successful.  Failure is not an indication of error - randomization is
     * a typical factor of determining success.
     *
     * @returns {boolean}
     */
    public execute() : boolean {

        if( this.doResistanceCheck() ) {

            EffectRenderer.renderEffects( this.target, this.effects );
        }

        return this.resistanceCheck.isPass();
    }

    protected doResistanceCheck() : boolean {

        this.preCheckCallbacks.forEachItem( (callback) => {

            callback.call( this.source, this.target, this.resistanceCheck );
        });
        CheckExecutor.getInstance().execute( this.resistanceCheck );
        return this.resistanceCheck.isPass();
    }
}