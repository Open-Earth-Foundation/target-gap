import { getActorOverview, getActorParts } from '../src/lib/api';
import { actorEmissions, actorNextTarget } from '../src/lib/util';
import { ActorOverview, ActorPart } from '../src/lib/models';

const queryDelay = 500; // ms between requests for different countries' regions

// Run this script with:
// ts-node -O '{"module": "commonjs"}' scripts/determineValidCountries.ts

async function main() {
  const countries = await getActorParts('EARTH', 'country');
  console.log(`Loaded ${countries.length} countries`);
  const countryOverviews = await Promise.all(countries.map((country) => getActorOverview(country.actor_id)));
  console.log(`Loaded ${countryOverviews.length} countries`);

  const validCountries = countryOverviews.filter((country) => {
    const nextTarget = actorNextTarget(country);
    if (!nextTarget || !nextTarget.target_year) return false;
    const emissions = actorEmissions(country, nextTarget.target_year);
    return !isNaN(emissions);
  });
  console.log(`${countryOverviews.length} countries with emissions found`);

  const countryParts = await Promise.all(validCountries.map((country) => getActorParts(country.actor_id)));
  console.log('Country parts loaded')
  const countryRegions = countryParts.map((parts) => parts.filter((part) => part.type === 'adm1'));
  console.log('Filtered out regions')

  let regionDetails: Array<Array<ActorOverview>> = [];
  for (let i = 0; i < countryRegions.length; i++) {
    const regions = countryRegions[i];
    console.log(`Loading ${regions.length} regions for country ${validCountries[i].name}`)
    const regionsData = await Promise.all(regions.map((region: ActorPart) => {
      console.log(`Loading data for region ${region.name} (${region.actor_id})`);
      return getActorOverview(region.actor_id);
    }));
    regionDetails.push(regionsData);
    await new Promise(resolve => setTimeout(resolve, queryDelay));
  }
  console.log('Loaded region details')

  const fullyValidCountries = validCountries.filter((country, i) => {
    const nextTarget = actorNextTarget(country);
    if (!nextTarget || !nextTarget.target_year) return false;
    const regions = regionDetails[i];
    return regions.every((region) => {
      return !isNaN(actorEmissions(region, nextTarget.target_year));
    });
  });
  console.log(`${fullyValidCountries} fully valid countries found!`)
  console.log()

  const result = fullyValidCountries.map((country) => ({ name: country.name, id: country.actor_id }));
  console.log('###### RESULT #####');
  console.log(JSON.stringify(result, null, 2));
}

main();

