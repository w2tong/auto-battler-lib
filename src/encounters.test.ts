import { describe, it, expect } from '@jest/globals';
import Character from './Character/Character';
import BanditFighter from './npc/bandit/BanditFighter';
import BanditRogue from './npc/bandit/BanditRogue';
import { createNpcChars, getRandomEncounter } from './encounters';
import LevelRange from './types/LevelRange';
import Ranger from './npc/bandit/BanditRanger';

describe('createNpcChars', () => {
    it('creates a single Character from one NPC', () => {
        const chars = createNpcChars([BanditFighter], 3);
        expect(chars).toHaveLength(1);
        expect(chars[0]).toBeInstanceOf(Character);
        expect(chars[0].name).toBe(BanditFighter.name);
        expect(chars[0].level).toBe(3);
    });

    it('creates multiple Characters from multiple NPCs', () => {
        const chars = createNpcChars([BanditFighter, BanditRogue], 2);
        expect(chars).toHaveLength(2);
        expect(chars[0].name).toBe(BanditFighter.name);
        expect(chars[0].level).toBe(2);
        expect(chars[1].name).toBe(BanditRogue.name);
        expect(chars[0].level).toBe(2);
    });

    it('creates multiple copies of each NPC when count > 1', () => {
        const chars = createNpcChars([BanditFighter], 1, 3);
        expect(chars).toHaveLength(3);
        expect(chars[0].name).toBe('Bandit Fighter 1');
        expect(chars[1].name).toBe('Bandit Fighter 2');
        expect(chars[2].name).toBe('Bandit Fighter 3');
    });

    it('creates multiple copies for multiple NPCs when count > 1', () => {
        const chars = createNpcChars([BanditFighter, BanditRogue], 1, 2);
        expect(chars).toHaveLength(4);
        expect(chars[0].name).toBe('Bandit Fighter 1');
        expect(chars[1].name).toBe('Bandit Rogue 1');
        expect(chars[2].name).toBe('Bandit Fighter 2');
        expect(chars[3].name).toBe('Bandit Rogue 2');
    });

    it('creates a ranger with a pet', () => {
        const chars = createNpcChars([Ranger], 1);
        expect(chars).toHaveLength(1);
        expect(chars[0]).toBeInstanceOf(Character);
        expect(chars[0].name).toBe(Ranger.name);
        expect(chars[0].pet).not.toBeNull();
    });
});

describe('getRandomEncounter', () => {
    it('returns an array of Character(s) for a valid level', () => {
        const chars = getRandomEncounter(1 as LevelRange);
        expect(Array.isArray(chars)).toBe(true);
        expect(chars.length).toBeGreaterThan(0);
        for (const char of chars) {
            expect(char).toBeInstanceOf(Character);
        }
    });

    it('returns different encounters for the same level (randomized)', () => {
        const results = new Set();
        for (let i = 0; i < 10; i++) {
            const chars = getRandomEncounter(1 as LevelRange);
            results.add(chars.map(c => c.name).join(','));
        }
        expect(results.size).toBeGreaterThan(1);
    });

    it('returns encounters for all valid levels', () => {
        for (let lvl = 1; lvl <= 20; lvl++) {
            const chars = getRandomEncounter(lvl as LevelRange);
            expect(Array.isArray(chars)).toBe(true);
            expect(chars.length).toBeGreaterThan(0);
        }
    });
});
