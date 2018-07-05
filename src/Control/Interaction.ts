import {Actor} from "../Model/Actor";
import {Check} from "cm-check/lib/Check/Check";
import {Effect} from "../Model/Effect";
import {CheckExecutor} from "cm-check/lib/Check/CheckExecutor";
import {EffectRenderer} from "./EffectRenderer";
import {List} from "../Model/List";
import {ConsoleLog, Logger} from "../Log/Logger";
import {Modifier} from "cm-check/lib/Check/Modifier/Modifier";

export class Interaction {

    private _source : Actor;
    public get source() { return this._source; }

    private _target : Actor;
    public get target() { return this._target; }

    private _resistanceCheck : Check;
    public get resistanceCheck() { return this._resistanceCheck }

    private _effects : List<Effect>;
    public get effects() { return this._effects; }

    private _type : string;
    public get type() { return this._type; }

    private _preCheckCallbacks : List<(source : Actor, target : Actor, check : Check) => void>;
    public get preCheckCallbacks() { return this._preCheckCallbacks; }

    private _postCheckCallbacks : List<(source : Actor, target : Actor, check : Check) => void>;
    public get postCheckCallbacks() { return this._postCheckCallbacks; }

    constructor( source : Actor, target: Actor, check : Check ) {

        this._effects = new List();
        this._source = source;
        this._target = target;
        this._resistanceCheck = check;
        this._preCheckCallbacks = new List();
        this._postCheckCallbacks = new List();
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

            callback.call( this, this.source, this.target, this.resistanceCheck );
        });

        CheckExecutor.getInstance().execute( this.resistanceCheck );
        this.logCheck( this.resistanceCheck );

        this.postCheckCallbacks.forEachItem( (callback) => {

            callback.call( this, this.source, this.target, this.resistanceCheck );
        });

        return this.resistanceCheck.isPass();
    }

    protected logCheck( check : Check ) : void {

        let console = Logger.getInstance();


        console.log( 'Roll: ' + check.getDieBag().report() );
        console.log( 'Raw Result: ' + check.getRawRollResult().toString() );

        check.getModifiers().forEach( ( modifier ) => {
            let modifierString = "";
            modifierString += modifier.getName() + ": ";
            modifierString += ( modifier.getValue() >= 0 ) ? " +" +
                modifier.getValue().toString() :
                " " + modifier.getValue().toString();

            console.log( modifierString );
        });

        console.log( 'Final Result: ' + check.getResult() + " vs.");
        console.log( 'Target: ' + check.getTarget() );
        console.log( ( check.isPass() ) ? "Success" : "Failure" );
    }
}