import {Effect} from "../Model/Effect";
import {Actor} from "../Model/Actor";

export class EffectRenderer {

    public static renderEffects( owner: Actor, effects: Effect[] ) {

        effects.forEach(( effect : Effect ) => {

            EffectRenderer.modifyAttributes( owner, effect );
            EffectRenderer.setAttributes( owner, effect );
            EffectRenderer.removeAttributes( owner, effect );
            EffectRenderer.setLabels( owner, effect );
            EffectRenderer.removeLabels( owner, effect );
            EffectRenderer.setFlags( owner, effect );
            EffectRenderer.removeFlags( owner, effect );
            EffectRenderer.setStatus( owner, effect );
            EffectRenderer.removeStatus( owner, effect );
        });
    }

    protected static modifyAttributes( owner: Actor, effect : Effect ) {

        if ( ! effect.modifyAttributes.length ) { return; }

        effect.modifyAttributes.forEachKey( ( key : string ) => {
            let attributeValue : number = owner.attributes.get(key);
            attributeValue += effect.modifyAttributes.get(key);
            owner.attributes.replace( key, attributeValue );
        });
    }

    protected static setAttributes( owner : Actor, effect : Effect ) {

        if ( ! effect.setAttributes.length ) { return; }

        effect.setAttributes.forEachKey( ( key : string ) => {
            owner.attributes.set( key, effect.setAttributes.get(key));
        });
    }

    protected static removeAttributes( owner : Actor, effect : Effect ) {

        if ( ! effect.removeAttributes.length ) { return; }

        effect.removeAttributes.forEachItem( ( item : string ) => {
            owner.attributes.remove(item);
        });
    }

    protected static setLabels( owner : Actor, effect : Effect ) {

        if ( ! effect.setLabels.length ) { return; }

        effect.setLabels.forEachKey( ( key : string ) => {
            owner.labels.set( key, effect.setLabels.get( key ));
        });
    }

    protected static removeLabels( owner : Actor, effect : Effect ) {

        if ( ! effect.removeLabels.length ) { return; }

        effect.removeLabels.forEachItem( ( key : string ) => {
           owner.labels.remove( key );
        });
    }

    protected static setFlags( owner : Actor, effect : Effect ) {

        if ( ! effect.setFlags.length ) { return; }

        effect.setFlags.forEachKey( ( key : string ) => {
           owner.flags.set( key, effect.setFlags.get( key ));
        });
    }

    protected static removeFlags( owner : Actor, effect : Effect ) {

        if ( ! effect.removeFlags.length ) { return; }

        effect.removeFlags.forEachItem( (key : string) => {
            owner.flags.remove( key );
        });
    }

    protected static setStatus( owner : Actor, effect : Effect ) {

        if ( ! effect.setStatus.length ) { return; }

        effect.setStatus.forEachKey( ( key : string ) => {
            owner.statusEffects.set( key, effect.setStatus.get( key ));
        });
    }

    protected static removeStatus( owner : Actor, effect : Effect ) {

        if ( ! effect.removeStatus.length ) { return; }

        effect.removeStatus.forEachItem(( key : string ) => {
           owner.statusEffects.remove( key );
        });
    }
}