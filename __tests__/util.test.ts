import { actorNextTarget, actorEmissions } from '../src/lib/util';
import fs from 'fs';
import path from 'path';

describe('Util', () => {
    const CA = JSON.parse(fs.readFileSync(path.join(__dirname, 'CA.json'), 'utf8')).data;
    describe('actorNextTarget', () => {
        test('returns the next target for the given actor', () => {
            const target = actorNextTarget(CA);
            expect(target?.target_year).toBe(2030);
            expect(target?.target_value).toBe("40");
        });
    });
    describe('actorEmissions', () => {
        test('returns the actor\'s emissions for a past year', () => {
            const emissions2005 = actorEmissions(CA, 2005);
            expect(Math.round(emissions2005/1000000)).toBeCloseTo(741);
        });
        test('returns the actor\'s emissions for a future year', () => {
            const emissions2030 = actorEmissions(CA, 2030);
            expect(Math.round(emissions2030/1000000)).toBeCloseTo(445);
        });
    });
});