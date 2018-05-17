"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("mocha");
var Actor_1 = require("../../Model/Actor");
describe('EffectRenderer', function () {
    var attacker = new Actor_1.Actor();
    var defender = new Actor_1.Actor();
    var initActors = function () {
        attacker.attributes.add('Strength', 10);
        attacker.attributes.add('Dexterity', 10);
        attacker.attributes.add('Constitution', 10);
        attacker.attributes.add('Wisdom', 10);
        attacker.attributes.add('Intelligence', 10);
        attacker.attributes.add('Charisma', 10);
        attacker.attributes.add('HP', 10);
        attacker.attributes.add('MaxHP', 10);
        attacker.attributes.add('AC', 10);
        defender.attributes.add('Strength', 10);
        defender.attributes.add('Dexterity', 10);
        defender.attributes.add('Constitution', 10);
        defender.attributes.add('Wisdom', 10);
        defender.attributes.add('Intelligence', 10);
        defender.attributes.add('Charisma', 10);
        defender.attributes.add('HP', 10);
        defender.attributes.add('MaxHP', 10);
        defender.attributes.add('AC', 10);
    };
    it('processes the attribute modifiers on an event and applies to the target actor', function () {
        initActors();
    });
});
//# sourceMappingURL=EffectRenderer.js.map