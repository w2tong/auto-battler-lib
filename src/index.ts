// TODO: redo exports for StatusEffects / Buffs / Debuffs
// export { Buffs, BuffId } from './StatusEffect/buffs';
// export { Debuffs, DebuffId } from './StatusEffect/debuffs';

export { ClassName, Classes } from './Character/Classes/classes';

export { Equip, Equipment, EquipmentImport, EquipmentItemIds, EquipSlot, equips, isValidEquip, createEquipmentImport } from './Equipment/Equipment';
export { Item, ItemType, Tier, ItemAttributes, ItemStats } from './Equipment/Item';
export { Armour, ArmourId, armour } from './Equipment/Armour';
export { Waist, WaistId, waists } from './Equipment/Waist';
export { Hands, HandsId, hands } from './Equipment/Hands';
export { Head, HeadId, heads } from './Equipment/Head';
export { Potion, PotionId, potions } from './Equipment/Potion';
export { Ring, RingId, rings } from './Equipment/Ring';
export { Shield, ShieldId, shields } from './Equipment/Shield';
export { WeaponType, Weapon, WeaponTypeProperties } from './Equipment/Weapon/Weapon';
export { WeaponId, weapons } from './Equipment/Weapon/weapons';

import WeaponStyle from './WeaponStyle';
export { WeaponStyle };

import Battle, { Side, BattleJSON } from './Battle/Battle';
export { Battle, Side, BattleJSON };

import Character, { CharacterInfo, CharacterJSON } from './Character/Character';
export { Character, CharacterInfo, CharacterJSON };

import Ability from './Ability/Ability';
export { Ability };

import Attributes from './Character/Attributes/Attributes';
export { Attributes };

import AttributeStatScaling from './Character/Attributes/AttributeStatScaling';
import AttributeType from './Character/Attributes/AttributeType';
export { AttributeStatScaling, AttributeType };
export { STARTING_POINTS, POINTS_PER_LEVEL, LEVEL_CAPS } from './Character/Attributes/PlayerAttributes';

import ArmourTypeDodgeMultiplier from './Character/Stats/ArmourTypeDodgeMultiplier';
import StatType from './Character/Stats/StatType';
import StatDescriptions from './Character/Stats/StatDescriptions';
export { ArmourTypeDodgeMultiplier, StatType, StatDescriptions };

import AttackType from './types/AttackType';
export { AttackType };

import HitType from './types/HitType';
export { HitType };

import LevelRange from './types/LevelRange';
export { LevelRange };

import BuffId from './StatusEffect/BuffId';
import buffs from './StatusEffect/buffs';
import DebuffId from './StatusEffect/DebuffId';
import debuffs from './StatusEffect/debuffs';
export { BuffId, buffs, DebuffId, debuffs };

export { Dice, dice, rollDice } from './dice';

import Log, { LogLine, LineType } from './Battle/Log';
export { Log, LogLine, LineType };

export { getRandomEncounter } from './encounters';

export { levelExp, encounterExp } from './experience';

import lootTables from './lootTables';
export { lootTables };

export { startingAbility, startingEquipment } from './Character/Classes/classLoadouts';