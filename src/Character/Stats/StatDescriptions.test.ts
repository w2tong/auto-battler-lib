import StatDescriptions from './StatDescriptions';
import StatType from './StatType';

test('Dodge Description', () => {
    expect(StatDescriptions[StatType.Dodge]()).toBe('Affects the chance of avoiding an incoming attack. Dodge is affected by the type of armour the character is wearing.\n\nThe character\'s dodge is multipled by the value corresponding to the armour worn.\nUnarmoured: 100%\nLight Armour: 80%\nMedium Armour: 50%\nHeavy Armour: 25%');
});