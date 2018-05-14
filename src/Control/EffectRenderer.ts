import {Effect} from "../Model/Effect";

export class EffectRenderer {

    public attributeModifiers   : { [key:string] : ( attribute : number ) => number };
    public labelModifiers       : { [key:string] : ( label : string ) => string };
    public flagModifiers        : { [key:string] : ( flag : boolean ) => boolean };
    public statusModifiers      : { [key:string] : ( status : Effect ) => Effect };

    constructor() {}

    public addAttributeModifier( name: string, callback: ( attribute : number ) => number ) : EffectRenderer {
        return this;
    }
    public addLabelModifier( name : string, callback : ( label : string ) => string ) : EffectRenderer {
       return this;
    }
    public addFlagModifier( name : string, callback : ( flag : boolean ) => boolean ) : EffectRenderer {
       return this;
    }
    public addStatusModifier( name : string, callback : ( status : Effect ) => Effect ) : EffectRenderer {
        return this;
    }
}