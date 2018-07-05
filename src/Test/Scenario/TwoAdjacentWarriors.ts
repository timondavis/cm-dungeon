import 'mocha';
import {Actor} from "../../Model/Actor";
import {Ability} from "../../Model/Ability/Ability";
import {Character} from "../../Model/Actor/Character";
import {CheckExecutor} from "cm-check/lib/Check/CheckExecutor";
import {Check} from "cm-check/lib/Check/Check";
import {Weapon} from "../../Model/Actor/Weapon";
import {Effect} from "../../Model/Effect";
import {Interaction} from "../../Control/Interaction";
import {ConsoleLog, Logger} from "../../Log/Logger";

describe ('TwoAdjacentWarriors', () => {

    /*
    let edTheWarrior = new Character();
    let joanTheWarrior = new Character();

    let battleAxe = new Weapon();
    battleAxe.labels.set( 'Name', 'Battle Axe + 1' );
    battleAxe.damageRoll.addDie( 2, 6 );
    */





    it( 'lets them duke it out!' );

    class Swing extends Ability {

        execute( source : Actor, target: Actor, data?: any): Ability {

            let cSource = <Character> source;
            let weapon : Weapon = <Weapon> cSource.equipped.get( 'Right Hand' ).getAll()[0];
            let damageRoll : Check = weapon.damageRoll;
            let effect = new Effect();
            let damage = damageRoll.roll().getResult();
            let connectCheck = CheckExecutor.getInstance().generateCheck();
            let i : Interaction;
            let console = Logger.getInstance();

            console.log( cSource.labels.get( 'Name' ) +
                "swings their " +
                weapon.labels.get( 'Name' ) +
                "at " +
                target.labels.get( 'Name' )
            );

            connectCheck.addDie( 1, 20 );
            connectCheck.setTarget( target.attributes.get( 'AC' ));
            connectCheck.addModifier(
                CheckExecutor.getInstance().generateModifier( 'result' )
                    .setName( 'Strength Bonus' )
                    .setValue( convertAttributeToBonus( cSource.attributes.get( 'Strength' )))
            );

            effect.attributeAssignments.add( 'HP', ( value:number ) => {
               return value - damage;
            });

            let startingTargetHp = target.attributes.get( 'HP' );

            i = new Interaction( source, target, connectCheck );
            i.effects.add( effect );

            if (i.execute()) {
                let targetHpDelta = target.attributes.get( 'HP' ) - startingTargetHp;

                console.log( 'Swing Hits!' );
                console.log( 'Damage: ' + targetHpDelta );
            }

            return this;
        }
    }

    function convertAttributeToBonus( attribute : number ) : number {

        if ( attribute < 3 ) { return -3; }
        if ( attribute < 6 ) { return -2; }
        if ( attribute < 9 ) { return -1; }
        if ( attribute < 12 ) { return 0; }
        if ( attribute < 15 ) { return 1; }
        if ( attribute < 18 ) { return 2; }
        if ( attribute < 21 ) { return 3; }
        if ( attribute < 23 ) { return 4; }
        if ( attribute < 26 ) { return 5; }
        if ( attribute < 29 ) { return 6; }
        return 7;
    }
});