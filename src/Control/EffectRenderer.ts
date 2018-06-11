import {Effect} from "../Model/Effect";
import {Actor} from "../Model/Actor";
import {List} from "../Model/List";

/**
 * @class EffectRenderer
 * The EffectRenderer facilitates the application of Effects to Actors.
 */
export class EffectRenderer {

    /**
     * Render every effect in the effect list passed into the EffectRenderer.
     *
     * @param {Actor} owner
     * @param {List<Effect>} effects
     */
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

    // @TODO Write up tests to back up operation of this function, then code out the rest of them.
    // @TODO DONT FORGET THAT THE STATUS FILTERS ARE -PRIORITIZED- IN THOSE TESTS!
    /**
     * Modify the attributes of the owning (target) actor, using the Effect to provide the directives.
     *
     * @param {Actor} owner
     * @param {Effect} effect
     */
    protected static modifyAttributes( owner: Actor, effect : Effect ) {

        if ( ! effect.attributeModifications.length ) { return; }

        effect.attributeModifications.forEachKey( ( attributeKey : string ) => {

            let attributeValue : number = owner.attributes.get( attributeKey );
            let modificationValue : number = effect.attributeModifications.get( attributeKey );

            owner.statuses.forEachKey( ( statusKey : string ) => {
                if ( owner.statuses.get( statusKey ).attributeEffectFilters.has( attributeKey )) {

                    modificationValue = owner.statuses.get( statusKey )
                        .attributeEffectFilters.get( attributeKey )
                        .call( this, modificationValue );
                }
            });

            attributeValue += modificationValue;
            owner.attributes.replace( attributeKey, attributeValue );
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
            owner.statuses.set( key, effect.statusAssignments.get( key ));
        });
    }

    protected static removeStatus( owner : Actor, effect : Effect ) {

        if ( ! effect.statusRemovals.length ) { return; }

        effect.statusRemovals.forEachItem(( key : string ) => {
           owner.statuses.remove( key );
        });
    }
}