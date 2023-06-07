import { actorNextTarget } from '../src/lib/util';
import fs from 'fs';
import path from 'path';

describe('Util', () => {
    const CA = JSON.parse(fs.readFileSync(path.join(__dirname, 'CA.json'), 'utf8')).data;
    console.dir(CA.actor_id)
    describe('actorNextTarget', () => {
        test('returns the next target for the given actor', () => {
            const target = actorNextTarget(CA);
            expect(target.target_year).toBe(2030);
            expect(target.target_value).toBe("40");
        });
    })
});