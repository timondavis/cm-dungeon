import {Effect} from "../Model/Effect";
import {Actor} from "../Model/Actor";

export class EffectRenderer {

    public static renderEffects( owner: Actor, effect : Effect ) {

        EffectRenderer.modifyAttributes( owner, effect );
    }

    protected static modifyAttributes( owner: Actor, effect : Effect ) {

        effect.modifyAttributes.forEachKey( ( key : string ) => {

            let attributeValue : number = owner.attributes.get(key);
            attributeValue += effect.modifyAttributes.get(key);
            owner.attributes.replace( key, attributeValue );
        });
    }

    protected setAttributes( effect : Effect ) {

    }
}