"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
require("mocha");
var Ability_1 = require("../../Model/Ability");
var Character_1 = require("../../Model/Character");
describe('Actor', function () {
    it('should allow attachment of new Abilities to the Actor', function () {
        var myAbility = new Ability_1.Ability();
        var linda = new Character_1.Character();
        linda.addAbility('myAbility', myAbility);
        chai_1.expect(linda.hasAbility('myAbility')).to.be.true;
        chai_1.expect(linda.hasAbility('notMyAbility')).to.be.false;
    });
    it('should allow detachment of existing abilities to the actor.  Removal of non-existent abilities should throw no error', function () {
        var linda = new Character_1.Character();
        var myAbility = new Ability_1.Ability();
        linda.addAbility('myAbility', myAbility).removeAbility('myAbility');
        chai_1.expect(linda.hasAbility('myAbility')).to.be.false;
    });
    it('should distinguish between Adding and Setting an ability (Add cannot replace, Set can)', function () {
        var linda = new Character_1.Character();
        var ability1 = new Ability_1.Ability();
        var ability2 = new Ability_1.Ability();
        linda.addAbility('myAbility', ability1).removeAbility('myAbility');
        chai_1.expect((function () { return linda.addAbility('myAbility', ability2); })).to.throw;
        chai_1.expect((function () { return linda.setAbility('myAbility', ability2); })).not.to.throw;
    });
    it('should deliver a list of abilities on the actor, on demand', function () {
        var linda = new Character_1.Character();
        var ability1 = new Ability_1.Ability();
        var ability2 = new Ability_1.Ability();
        linda.addAbility('1', ability1).addAbility('2', ability2);
        chai_1.expect(linda.getAbilities()).to.have.property('1');
        chai_1.expect(linda.getAbilities()).to.have.property('2');
    });
});
//# sourceMappingURL=Actor.js.map