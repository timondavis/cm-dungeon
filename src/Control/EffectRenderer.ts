import {Effect} from "../Model/Effect";
import {Actor} from "../Model/Entity/Actor";
import {List} from "../Model/List";
import {Status} from "../Model/Status";

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

            EffectRenderer.setAttributes( owner, effect );
            EffectRenderer.setLabels( owner, effect );
            EffectRenderer.setFlags( owner, effect );
            EffectRenderer.setStatus( owner, effect );
            EffectRenderer.removeStatus( owner, effect );
        });
    }

    /**
     * Set the attribute from the effect.  Respects attribute assignment filters in priority order.
     *
     * @param {Actor} owner
     * @param {Effect} effect
     * @param {?Any} data - supplied at will
     */
    protected static setAttributes( owner : Actor, effect : Effect, data? : any ) {

        if ( ! effect.attributeAssignments.length ) { return; }

        let newValue : number;
        let originalValue : number;

        effect.attributeAssignments.forEachKey( ( attributeKey : string ) => {

            originalValue = owner.attributes.get( attributeKey );
            newValue = effect.attributeAssignments.get( attributeKey )(originalValue, data);

            owner.statuses.forEachKey( ( statusKey : string ) => {
                if ( owner.statuses.get( statusKey ).attributeAssignmentFilters.has( attributeKey )) {

                   newValue = owner.statuses.get( statusKey )
                        .attributeAssignmentFilters.get( attributeKey )
                        .call( this, newValue, originalValue );
                }

            });

            owner.attributes.set( attributeKey, newValue );
        });
    }


    /**
     * Set the labels on the owning actor as defined in the effect.  Respects status filters in priority order.
     *
     * @param {Actor} owner
     * @param {Effect} effect
     * @param {Any?} data
     */
    protected static setLabels( owner : Actor, effect : Effect, data? : any ) {

        if ( ! effect.labelAssignments.length ) { return; }

        let originalValue : string;
        let newValue : string;

        effect.labelAssignments.forEachKey( ( labelKey : string ) => {

            originalValue = ( owner.labels.has( labelKey ) ) ? owner.labels.get( labelKey ) : "";
            newValue = effect.labelAssignments.get( labelKey )(originalValue, data);

            owner.statuses.forEachKey( ( statusKey : string ) => {

                if ( owner.statuses.get( statusKey ).labelAssignmentFilters.has( labelKey )) {

                    newValue = owner.statuses.get( statusKey )
                        .labelAssignmentFilters.get( labelKey )
                        .call( this, newValue, originalValue );
                }

            });

            owner.labels.set( labelKey, newValue );
        });
    }

    /**
     * Set flags on the owning actors as defined in the effect. Respects status filters in priority order.
     *
     * @param {Actor} owner
     * @param {Effect} effect
     */
    protected static setFlags( owner : Actor, effect : Effect, data? : any ) {

        if ( ! effect.flagAssignments.length ) { return; }

        let originalValue : boolean;
        let newValue : boolean;

        effect.flagAssignments.forEachKey( ( flagKey : string ) => {

            originalValue = ( owner.flags.has( flagKey )) ? owner.flags.get( flagKey ) : false;
            newValue = effect.flagAssignments.get( flagKey )(originalValue, data);

            owner.statuses.forEachKey( ( statusKey : string ) => {

                if ( owner.statuses.get( statusKey ).flagAssignmentFilters.has( flagKey )) {

                    newValue = owner.statuses.get( statusKey )
                        .flagAssignmentFilters.get( flagKey )
                        .call( this, newValue, originalValue );
                }
            });

            owner.flags.set( flagKey, newValue );
        });
    }

    /**
     * Set a status on the owner as defined in the effect.  Respects status filters in priority order.
     *
     * @param {Actor} owner
     * @param {Effect} effect
     */
    protected static setStatus( owner : Actor, effect : Effect ) {

        if ( ! effect.statusAssignments.length ) { return; }

        let status : Status;
        let updateStatus : boolean;

        effect.statusAssignments.forEachKey( ( statusInstanceKey  : string ) => {

            status = effect.statusAssignments.get( statusInstanceKey );
            updateStatus = true;

            owner.statuses.forEachKey( ( statusKey : string ) => {

                if ( owner.statuses.get( statusKey ).statusAssignmentFilters.has( statusInstanceKey )) {

                    updateStatus = owner.statuses.get( statusKey )
                        .statusAssignmentFilters.get( statusInstanceKey )
                        .call( this, updateStatus, status );
                }
            });

            if ( updateStatus ) {
                owner.statuses.set( statusInstanceKey, status );
            }

        });
    }

    /**
     * Remove a status from the owner as defined on the effect.  Respects status filters in priority order.
     * @param {Actor} owner
     * @param {Effect} effect
     */
    protected static removeStatus( owner : Actor, effect : Effect ) {

        if ( ! effect.statusRemovals.length ) { return; }

        let status : Status;
        let updateStatus : boolean;

        effect.statusRemovals.forEachItem(( statusInstanceKey : string ) => {

            status = effect.statusAssignments.get( statusInstanceKey );
            updateStatus = true;

            owner.statuses.forEachKey( ( statusKey : string ) => {

                if ( owner.statuses.get( statusKey ).statusAssignmentFilters.has( statusInstanceKey )) {

                    updateStatus = owner.statuses.get( statusKey )
                        .statusAssignmentFilters.get( statusInstanceKey )
                        .call( this, updateStatus, status);
                }
            });

            if ( updateStatus ) {
                owner.statuses.remove( statusInstanceKey );
            }
        });
    }
}