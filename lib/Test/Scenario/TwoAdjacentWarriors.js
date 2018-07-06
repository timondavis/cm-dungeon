"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
require("mocha");
var Ability_1 = require("../../Model/Ability/Ability");
var Character_1 = require("../../Model/Actor/Character");
var CheckExecutor_1 = require("cm-check/lib/Check/CheckExecutor");
var Weapon_1 = require("../../Model/Actor/Weapon");
var Effect_1 = require("../../Model/Effect");
var Interaction_1 = require("../../Control/Interaction");
var Logger_1 = require("../../Log/Logger");
describe('TwoAdjacentWarriors', function () {
    var Swing = /** @class */ (function (_super) {
        __extends(Swing, _super);
        function Swing() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Swing.prototype.execute = function (source, target, data) {
            var cSource = source;
            var weapon = cSource.equipped.get('Weapons').get('Right Hand');
            var damageRoll = weapon.damageRoll;
            var effect = new Effect_1.Effect();
            var damage = damageRoll.roll().getResult();
            var connectCheck = CheckExecutor_1.CheckExecutor.getInstance().generateCheck();
            var i;
            var console = Logger_1.Logger.getInstance();
            console.log(cSource.labels.get('Name') +
                "swings their " +
                weapon.labels.get('Name') +
                "at " +
                target.labels.get('Name'));
            connectCheck.addDie(1, 20);
            connectCheck.setTarget(target.attributes.get('AC'));
            connectCheck.addModifier(CheckExecutor_1.CheckExecutor.getInstance().generateModifier('result')
                .setName('Strength Bonus')
                .setValue(convertAttributeToBonus(cSource.attributes.get('Strength'))));
            effect.attributeAssignments.add('HP', function (value) {
                return value - damage;
            });
            var startingTargetHp = target.attributes.get('HP');
            i = new Interaction_1.Interaction(source, target, connectCheck);
            i.effects.add(effect);
            if (i.execute()) {
                var targetHpDelta = target.attributes.get('HP') - startingTargetHp;
                console.log(cSource.labels.get('Name') + '\'s Swing Hits!');
                console.log('Damage: ' + targetHpDelta);
            }
            else {
                console.log(cSource.labels.get('Name') + '\'s Swing Misses!');
            }
            return this;
        };
        return Swing;
    }(Ability_1.Ability));
    var battleAxe = new Weapon_1.Weapon();
    battleAxe.labels.set('Name', 'Battle Axe');
    battleAxe.damageRoll.addDie(2, 6);
    var shortSword = new Weapon_1.Weapon();
    shortSword.labels.set('Name', 'Short Sword');
    shortSword.damageRoll.addDie(1, 10);
    var edTheWarrior = new Character_1.Character();
    edTheWarrior.labels.set('Name', 'Ed');
    edTheWarrior.equipped.add('Weapon', battleAxe);
    edTheWarrior.attributes.add('HP', 25);
    edTheWarrior.attributes.add('AC', 10);
    edTheWarrior.abilities.add('Swing', new Swing());
    var joanTheWarrior = new Character_1.Character();
    joanTheWarrior.labels.set('Name', 'Joan');
    joanTheWarrior.equipped.add('Weapon', shortSword);
    joanTheWarrior.attributes.add('HP', 25);
    joanTheWarrior.attributes.add('AC', 10);
    joanTheWarrior.abilities.add('Swing', new Swing());
    it('lets them duke it out!', function () {
        var roundNumber = 1;
        do {
            Logger_1.Logger.getInstance().log('Round #' + roundNumber);
            Logger_1.Logger.getInstance().log('Ed HP: ' + edTheWarrior.attributes.get('HP'));
            Logger_1.Logger.getInstance().log('Joan HP: ' + joanTheWarrior.attributes.get('HP'));
            edTheWarrior.execute('Swing', joanTheWarrior);
            joanTheWarrior.execute('Swing', edTheWarrior);
        } while (edTheWarrior.attributes.get('HP') > 0 &&
            joanTheWarrior.attributes.get('HP') > 0);
        Logger_1.Logger.getInstance().printLogToConsole();
    });
    function convertAttributeToBonus(attribute) {
        if (attribute < 3) {
            return -3;
        }
        if (attribute < 6) {
            return -2;
        }
        if (attribute < 9) {
            return -1;
        }
        if (attribute < 12) {
            return 0;
        }
        if (attribute < 15) {
            return 1;
        }
        if (attribute < 18) {
            return 2;
        }
        if (attribute < 21) {
            return 3;
        }
        if (attribute < 23) {
            return 4;
        }
        if (attribute < 26) {
            return 5;
        }
        if (attribute < 29) {
            return 6;
        }
        return 7;
    }
});
//# sourceMappingURL=TwoAdjacentWarriors.js.map