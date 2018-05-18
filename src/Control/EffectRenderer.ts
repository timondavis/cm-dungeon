import {Effect} from "../Model/Effect";
import {Actor} from "../Model/Actor";

export class EffectRenderer {

    public static renderEffects( owner: Actor, effects: Effect[] ) {

        EffectRenderer.modifyAttributes( owner, effects );
    }

    protected static modifyAttributes( owner: Actor, effects : Effect[] ) {

        effects.forEach( (effect : Effect) => {

            if ( ! effect.modifyAttributes.length ) { return; }

            effect.modifyAttributes.forEachKey( ( key : string ) => {
                let attributeValue : number = owner.attributes.get(key);
                attributeValue += effect.modifyAttributes.get(key);
                owner.attributes.replace( key, attributeValue );
            });
        }) ;
    }

    protected setAttributes( owner : Actor, effects : Effect[] ) {

        effects.forEach( (effect : Effect) => {

            if ( ! effect.setAttributes.length ) { return; }

            effect.setAttributes.forEachKey( ( key : string ) => {
                owner.attributes.set( key, effect.setAttributes.get(key));
            });
        });
    }

    protected removeAttributes( owner : Actor, effects : Effect[] ) {

        effects.forEach(( effect : Effect ) => {

            if ( ! effect.removeAttributes.length ) { return; }

            effect.removeAttributes.forEach( ( key : string) => {
                owner.attributes.remove( key );
            });
        });
    }

    protected setLabels( owner : Actor, effects : Effect[] ) {

        effects.forEach(( effect : Effect ) => {

            if ( ! effect.setLabels.length ) { return; }

            effect.setLabels.forEachKey( ( key : string ) => {
                owner.labels.set( key, effect.setLabels.get( key ));
            });
        });
    }

    protected removeLabels( owner : Actor, effects : Effect[] ) {

        effects.forEach( ( effect : Effect ) => {

            if ( ! effect.removeLabels.length ) { return; }

            effect.removeLabels.forEach( ( key : string ) => {
               owner.labels.remove( key );
            });
        });
    }

    protected setFlags( owner : Actor, effects : Effect[] ) {

        effects.forEach( ( effect : Effect ) => {

            if ( ! effect.setFlags.length ) { return; }

            effect.setFlags.forEachKey( ( key : string ) => {
               owner.flags.set( key, effect.setFlags.get( key ));
            });
        });
    }

    protected removeFlags( owner : Actor, effects : Effect[] ) {

        effects.forEach( ( effect : Effect ) => {

            if ( ! effect.removeFlags.length ) { return; }

            effect.removeFlags.forEach( (key : string) => {
                owner.flags.remove( key );
            });
        });
    }

    protected setStatus( owner : Actor, effects : Effect[] ) {

        effects.forEach( ( effect : Effect ) => {

            if ( ! effect.setStatus.length ) { return; }

            effect.setStatus.forEachKey( ( key : string ) => {
                owner.statusEffects.set( key, effect.setStatus.get( key ));
            });
        });
    }

    protected removeStatus( owner : Actor, effects : Effect[] ) {

        effects.forEach(( effect : Effect ) => {

            if ( ! effect.removeStatus.length ) { return; }

            effect.removeStatus.forEach(( key : string ) => {
               owner.statusEffects.remove( key );
            });
        });
    }
}