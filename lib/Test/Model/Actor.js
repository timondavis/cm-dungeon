"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
require("mocha");
var Actor_1 = require("../../Model/Actor");
var D20_Attack_1 = require("../../Model/Ability/d20/D20_Attack");
describe('Actor', function () {
    var a = new Actor_1.Actor();
    var b = new Actor_1.Actor();
    function reset() {
        a = new Actor_1.Actor();
        a.attributes.add('AC', 0);
        a.attributes.add('HP', 10);
        b = new Actor_1.Actor();
        b.attributes.add('AC', 0);
        b.attributes.add('HP', 10);
    }
    it('stores numerically based attributes about the actor, referenced by name', function () {
        reset();
        a.attributes.add('Strength', 5);
        var strength = a.attributes.get('Strength');
        chai_1.expect(a.attributes.get('Strength')).to.be.equal(5);
    });
    it('retains abilities, which can be used to interact with the world around the actor', function () {
        reset();
        var attackAbility = new D20_Attack_1.D20_Attack();
        a.abilities.add('Attack', attackAbility);
        a.abilities.get('Attack').execute(a, b);
    });
});
//# sourceMappingURL=Actor.js.map