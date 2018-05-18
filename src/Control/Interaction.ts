import {Actor} from "../Model/Actor";
import {Check} from "cm-check/lib/Check/Check";
import {Effect} from "../Model/Effect";
import {CheckExecutor} from "cm-check/lib/Check/CheckExecutor";
import {EffectRenderer} from "./EffectRenderer";

export class Interaction {

    private _source : Actor;
    public get source() { return this._source; }

    private _target : Actor;
    public get target() { return this._target; }

    private _resistanceCheck : Check;
    public get resistanceCheck() { return this._resistanceCheck }

    private _effects : Effect[];
    public get effects() { return this._effects; }

    public _type : string;
    public get type() { return this._type; }

    constructor( source : Actor, target: Actor, check : Check ) {

        this._source = source;
        this._target = target;
        this._resistanceCheck = check;
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

        CheckExecutor.getInstance().execute( this.resistanceCheck );
        return this.resistanceCheck.isPass();
    }
}