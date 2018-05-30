import {Effect} from "../Model/Effect";
import {Actor} from "../Model/Actor";
import {List} from "../Model/List";

export class EffectRenderer {

    public static renderEffects( owner: Actor, effects: List<Effect> ) {

        effects.forEachItem(( effect : Effect ) => {

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

        if ( ! effect.attributeModifications.length ) { return; }

        effect.attributeModifications.forEachKey( ( key : string ) => {
            let attributeValue : number = owner.attributes.get(key);
            attributeValue += effect.attributeModifications.get(key);
            owner.attributes.replace( key, attributeValue );
        });
    }

    protected static setAttributes( owner : Actor, effect : Effect ) {

        if ( ! effect.attributeAssignments.length ) { return; }

        effect.attributeAssignments.forEachKey( ( key : string ) => {
            owner.attributes.set( key, effect.attributeAssignments.get(key));
        });
    }

    protected static removeAttributes( owner : Actor, effect : Effect ) {

        if ( ! effect.attributeRemovals.length ) { return; }

        effect.attributeRemovals.forEachItem( ( item : string ) => {
            owner.attributes.remove(item);
        });
    }

    protected static setLabels( owner : Actor, effect : Effect ) {

        if ( ! effect.labelAssignments.length ) { return; }

        effect.labelAssignments.forEachKey( ( key : string ) => {
            owner.labels.set( key, effect.labelAssignments.get( key ));
        });
    }

    protected static removeLabels( owner : Actor, effect : Effect ) {

        if ( ! effect.labelRemovals.length ) { return; }

        effect.labelRemovals.forEachItem( ( key : string ) => {
           owner.labels.remove( key );
        });
    }

    protected static setFlags( owner : Actor, effect : Effect ) {

        if ( ! effect.flagAssignments.length ) { return; }

        effect.flagAssignments.forEachKey( ( key : string ) => {
           owner.flags.set( key, effect.flagAssignments.get( key ));
        });
    }

    protected static removeFlags( owner : Actor, effect : Effect ) {

        if ( ! effect.flagRemovals.length ) { return; }

        effect.flagRemovals.forEachItem( (key : string) => {
            owner.flags.remove( key );
        });
    }

    protected static setStatus( owner : Actor, effect : Effect ) {

        if ( ! effect.statusAssignments.length ) { return; }

        effect.statusAssignments.forEachKey( ( key : string ) => {
            owner.statusEffects.set( key, effect.statusAssignments.get( key ));
        });
    }

    protected static removeStatus( owner : Actor, effect : Effect ) {

        if ( ! effect.statusRemovals.length ) { return; }

        effect.statusRemovals.forEachItem(( key : string ) => {
           owner.statusEffects.remove( key );
        });
    }
}