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
var CheckExecutor_1 = require("cm-check/lib/Check/CheckExecutor");
var Effect_1 = require("../../Model/Effect");
var Interaction_1 = require("../../Control/Interaction");
var Logger_1 = require("../../Log/Logger");
describe('TwoAdjacentWarriors', function () {
    /*
    let edTheWarrior = new Character();
    let joanTheWarrior = new Character();

    let battleAxe = new Weapon();
    battleAxe.labels.set( 'Name', 'Battle Axe + 1' );
    battleAxe.damageRoll.addDie( 2, 6 );
    */
    it('lets them duke it out!');
    var Swing = /** @class */ (function (_super) {
        __extends(Swing, _super);
        function Swing() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Swing.prototype.execute = function (source, target, data) {
            var cSource = source;
            var weapon = cSource.equipped.get('Right Hand').getAll()[0];
            var damageRoll = weapon.damageRoll;
            var effect = new Effect_1.Effect();
            var damage = damageRoll.roll().getResult();
            var connectCheck = CheckExecutor_1.CheckExecutor.getInstance().generateCheck();
            var i;
            var console = Logger_1.ConsoleLog.getInstance();
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
                console.log('Swing Hits!');
                console.log('Damage: ' + targetHpDelta);
            }
            return this;
        };
        return Swing;
    }(Ability_1.Ability));
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