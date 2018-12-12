import 'mocha';
import {Actor} from "../../Model/Actor";
import {Ability} from "../../Model/Ability/Ability";
import {Character} from "../../Model/Actor/Character";
import {CheckExecutor} from "cm-check/lib/Check/CheckExecutor";
import {Check} from "cm-check/lib/Check/Check";
import {Weapon} from "../../Model/Actor/Weapon";
import {Effect} from "../../Model/Effect";
import {Interaction} from "../../Control/Interaction";
import {Logger} from "../../Log/Logger";

class Swing extends Ability {

    execute( source : Actor, target: Actor, data?: any): Ability {

        let cSource = <Character> source;
        let weapon : Weapon = <Weapon> cSource.equipped.get( 'Weapon' );
        let damageRoll : Check = weapon.damageRoll;
        let effect = new Effect();
        let damage = damageRoll.roll().getResult();
        let connectCheck = CheckExecutor.getInstance().generateCheck();
        let i : Interaction;
        let console = Logger.getInstance();

        console.log( cSource.labels.get( 'Name' ) +
            " swings their " +
            weapon.labels.get( 'Name' ) +
            " at " +
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

            console.log( cSource.labels.get( 'Name' ) + '\'s Swing Hits!' );
            console.log( 'Damage: ' + Math.abs( targetHpDelta ));
        }
        else {
            console.log( cSource.labels.get( 'Name' ) + '\'s Swing Misses!' );
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

let battleAxe = new Weapon();
battleAxe.labels.set( 'Name', 'Battle Axe' );
battleAxe.damageRoll.addDie( 2, 6 );

let shortSword = new Weapon();
shortSword.labels.set( 'Name', 'Short Sword' );
shortSword.damageRoll.addDie( 1, 10 );

let edTheWarrior = new Character();
edTheWarrior.labels.set( 'Name', 'Ed' );
edTheWarrior.equipped.add( 'Weapon', battleAxe );
edTheWarrior.attributes.add( 'HP', 25 );
edTheWarrior.attributes.add( 'AC', 10 );
edTheWarrior.attributes.add( 'Strength', Math.random() * 15 + 3 );
edTheWarrior.abilities.add( 'Swing', new Swing() );

let joanTheWarrior = new Character();
joanTheWarrior.labels.set( 'Name', 'Joan' );
joanTheWarrior.equipped.add( 'Weapon', shortSword );
joanTheWarrior.attributes.add( 'HP', 25 );
joanTheWarrior.attributes.add( 'AC', 10 );
joanTheWarrior.attributes.add( 'Strength', Math.random() * 15 + 3 );
joanTheWarrior.abilities.add( 'Swing', new Swing() );

describe ('TwoAdjacentWarriors', () => {

    it( 'lets them duke it out!', () => {

        let roundNumber = 1;

        do {
            Logger.getInstance().log( 'Round #' + roundNumber );
            Logger.getInstance().log( 'Ed HP: ' + edTheWarrior.attributes.get( 'HP' ));
            Logger.getInstance().log( 'Joan HP: ' + joanTheWarrior.attributes.get( 'HP' ));

            Logger.getInstance().log( "" );
            edTheWarrior.execute( 'Swing', joanTheWarrior );
            Logger.getInstance().log( "" );
            joanTheWarrior.execute( 'Swing', edTheWarrior);

            roundNumber++;
            Logger.getInstance().log( "" );
        } while (
            edTheWarrior.attributes.get( 'HP' ) > 0 &&
            joanTheWarrior.attributes.get( 'HP' ) > 0 );

        Logger.getInstance().printLogToConsole();
    });
});