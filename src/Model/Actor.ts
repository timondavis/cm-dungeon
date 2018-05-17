import {Ability} from "./Ability/Ability";
import {EffectRenderer} from "../Control/EffectRenderer";
import {Effect} from "./Effect";
import {NameMap} from "./NameMap";

export class Actor {

    protected _attributes : NameMap<number>;
    public get attributes() : NameMap<number> { return this._attributes; }

    protected _abilities : NameMap<Ability>;
    public get abilities() : NameMap<Ability> { return this._abilities; }

    protected _labels : NameMap<string>;
    public get labels() : NameMap<string> { return this._labels; }

    protected _flags : NameMap<boolean>;
    public get flags() : NameMap<boolean> { return this._flags; }

    protected _statusEffects : NameMap<Effect>;
    public get statusEffects() : NameMap<Effect> { return this._statusEffects; }

    constructor() {

        this._attributes = new NameMap();
        this._abilities = new NameMap();
        this._labels = new NameMap();
        this._flags = new NameMap();
        this._statusEffects = new NameMap();
    }
}