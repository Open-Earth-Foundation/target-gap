import { actorNextTarget, actorTargetAfter, actorEmissions, actorReductions, paris15Emissions, paris20Emissions } from '../src/lib/util';
import fs from 'fs';
import path from 'path';

describe('Util', () => {
    const CA = JSON.parse(fs.readFileSync(path.join(__dirname, 'CA.json'), 'utf8')).data;
    const CA_AB = JSON.parse(fs.readFileSync(path.join(__dirname, 'CA-AB.json'), 'utf8')).data;

    describe('actorNextTarget', () => {
        test('returns the next target for the given actor', () => {
            const target = actorNextTarget(CA);
            expect(target?.target_year).toBe(2030);
            expect(target?.target_value).toBe("40");
        });
    });
    describe('actorTargetAfter', () => {
        test('returns the next target for the given actor on or after a given year', () => {
            const target = actorTargetAfter(CA_AB, 2030);
            expect(target?.target_year).toBe(2050);
            expect(target?.target_value).toBe("14");
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
        test('returns emissions for a future year for actor with no target', () => {
            const emissions2030 = actorEmissions(CA_AB, 2030);
            expect(Math.round(emissions2030/1000000)).toBeCloseTo(219);
        });
    });
    describe('actorReductions', () => {
        test('returns the actor\'s reductions for a future year', () => {
            const reductions = actorReductions(CA, 2005, 2030);
            expect(Math.round(reductions/1000000)).toBeCloseTo(296);
        });
        test('returns reductions for a future year for actor with no target', () => {
            const reductions = actorReductions(CA_AB, 2005, 2030);
            expect(Math.round(reductions/1000000)).toBeCloseTo(18);
        });
    });
    describe('Paris goals', () => {
        test('returns the actor\'s recommended emissions level for 1.5C', () => {
            const emissions = paris15Emissions(CA);
            expect(Math.round(emissions/1000000)).toBeCloseTo(421);
        });
        test('returns the actor\'s recommended emissions level for 2.0C', () => {
            const emissions = paris20Emissions(CA);
            expect(Math.round(emissions/1000000)).toBeCloseTo(539);
        });
    });
});