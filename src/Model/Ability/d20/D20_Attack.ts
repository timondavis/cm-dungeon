import {Ability} from "../Ability";
import {Interaction} from "../../../Control/Interaction";
import {Actor} from "../../Actor";
import {CheckExecutor} from "cm-check/lib/Check/CheckExecutor";
import {Effect} from "../../Effect";
import {DieBag} from "cm-check/lib/Die/DieBag";


export class D20_Attack implements Ability {

    disabled: boolean = false;

    execute(source: Actor, target: Actor): Ability {

        const effect = new Effect();
        let check = this.generateCheck( source, target );
        let damage = this.getDamage() * -1;
        effect.attributeModifications.add('HP', damage);

        let attackInteraction = new Interaction( source, target, check );
        attackInteraction.effects.add( effect );

        attackInteraction.execute();

        return this;
    }

    private generateCheck( source : Actor, target : Actor ) {

        const CE = CheckExecutor.getInstance();

        let strengthModifier = CE.generateModifier( 'result' );
        strengthModifier.setValue( 2 );

        const AC = target.attributes.get( 'AC' );

        let check = CE.generateCheck( 'd20-attribute' );

        check.addDie( 1, 20 );
        check.addModifier( strengthModifier );
        check.setTarget( AC );

        return check;
    }

    private getDamage() {

        let damageRoll = new DieBag();
        damageRoll.add( 1, 8 );
        damageRoll.roll();

        return damageRoll.getTotal();
    }

}
