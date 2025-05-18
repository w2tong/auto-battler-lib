import { describe, it, expect } from '@jest/globals';
import Character from './Character/Character';
import Fighter from './npc/Fighter';
import Rogue from './npc/Rogue';
import { createNPCChars } from './encounters';

describe('createNPCChars', () => {
    it('creates a single Character from one NPC', () => {
        const chars = createNPCChars([Fighter], 3);
        expect(chars).toHaveLength(1);
        expect(chars[0]).toBeInstanceOf(Character);
        expect(chars[0].name).toBe(Fighter.name);
        expect(chars[0].level).toBe(3);
    });

    it('creates multiple Characters from multiple NPCs', () => {
        const chars = createNPCChars([Fighter, Rogue], 2);
        expect(chars).toHaveLength(2);
        expect(chars[0].name).toBe(Fighter.name);
        expect(chars[1].name).toBe(Rogue.name);
    });

    it('creates multiple copies of each NPC when count > 1', () => {
        const chars = createNPCChars([Fighter], 1, 3);
        expect(chars).toHaveLength(3);
        expect(chars[0].name).toBe('Fighter 1');
        expect(chars[1].name).toBe('Fighter 2');
        expect(chars[2].name).toBe('Fighter 3');
    });

    it('creates multiple copies for multiple NPCs when count > 1', () => {
        const chars = createNPCChars([Fighter, Rogue], 1, 2);
        expect(chars).toHaveLength(4);
        expect(chars[0].name).toBe('Fighter 1');
        expect(chars[1].name).toBe('Rogue 1');
        expect(chars[2].name).toBe('Fighter 2');
        expect(chars[3].name).toBe('Rogue 2');
    });
});
