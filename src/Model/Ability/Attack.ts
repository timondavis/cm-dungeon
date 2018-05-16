import {Ability} from "./Ability";
import {Interaction} from "../../Control/Interaction";
import {Actor} from "../Actor";
import {CheckExecutor} from "cm-check/lib/Check/CheckExecutor";
import {Effect} from "../Effect";


export class Attack implements Ability {


    execute(source: Actor, target: Actor, data? : any ): Interaction {

        const CE = CheckExecutor.getInstance();

        const strength = source.attributes.get( 'Strength' );

        let strengthModifier = CE.generateModifier( 'Strength' );
        strengthModifier.setValue( 2 );

        const AC = target.attributes.get( 'AC' );

        let check = CE.generateCheck();

        check.addDie( 1, 20 );
        check.addModifier( strengthModifier );
        check.setTarget( AC );

        const effect = new Effect();

    }

}
