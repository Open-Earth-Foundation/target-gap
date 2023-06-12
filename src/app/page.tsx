'use client';

import Emissions from "@/components/sections/Emissions";
import Reductions from "@/components/sections/Reductions";
import TextBox from "@/components/sections/TextBox";
import CountrySelect from "@/components/ui/CountrySelect";
import { getActorOverview, getActorParts } from "@/lib/api";
import { ActorOverview, ActorPart, ActorType } from "@/lib/models";
import { useEffect, useState } from "react";

import Container from '@mui/material/Container';

import { CircleFlag } from "react-circle-flags";
import { CircularProgress } from "@mui/material";

export default function Home() {
  const [countries, setCountries] = useState<ActorPart[]>([]);
  const [isLoading, setLoading] = useState<boolean>(true);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [countryDetails, setCountryDetails] = useState<ActorOverview | null>(null);
  const [subActorDetails, setSubActorDetails] = useState<ActorOverview[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getActorParts('EARTH');
      setCountries(data);
      setLoading(false);
    }

    fetchData().catch(console.error);
  });

  const onCountrySelected = (actorId: string) => {
    setSelectedCountry(actorId);
    loadEmissionsData(actorId).catch(console.error);
    setLoading(true);
  }

  const loadEmissionsData = async (actorId: string) => {
    const countryEmissionsData = await getActorOverview(actorId);
    const subActors = await getActorParts(actorId);
    const adm1Actors = subActors.filter((actor) => actor.type === ActorType.Adm1);
    const subActorDetails = await Promise.all(
      adm1Actors.map(async (subActor): Promise<ActorOverview> => {
        return await getActorOverview(subActor.actor_id);
      })
    );
    setCountryDetails(countryEmissionsData);
    setSubActorDetails(subActorDetails);
    setLoading(false);
  }

  const description = `
  This target gap visualizer uses the OpenClimate API to shows the
  difference between the emissions reductions targets of national actors
  and their subnational parts (states, provinces, or regions).
  The emissions graph shows the projected emissions by the national actor
  if they achieve their next reductions target, next to the sum of the
  emissions by all of their subnational parts. If subnational actors
  have not made emission reductions targets, it uses their last measured
  emisisons values. The reductions graph shows the amount of reductions
  the national actor needs to achieve their next target, next to the sum
  of the reductions needed by all of their subnational parts. If a subnational
  actor has not made a reduction target, we use 0.0 for its reductions value.
  `;

  const methodology = `
  Emissions data is from the OpenClimate API. Emissions values are
  derived from national or international datasets. Target values come
  from nationally-determined contributions (NDCs) or other public sources.
  `;

  return (
    <div className="p-16 bg-[#FAFAFA]">
      <TextBox
        coloredTitle="Target Gap"
        otherTitle="Visualizer"
        description={description}
      />
      <Container maxWidth="xl" className="pb-8">
        <CountrySelect countries={countries} onSelected={onCountrySelected} />
        {<CircularProgress className="align-bottom m-2 ml-4" />}
        <div className="text-xl font-bold pt-8">{countryDetails ?
          <div className="flex items-center space-x-4 mb-8 mt-2">
            <CircleFlag countryCode={countryDetails.actor_id.toLowerCase()} aria-label={countryDetails.name} className="h-12" />
            <p className="font-bold text-xl">{countryDetails.name}</p>
          </div> : 'No country selected'}</div>
      </Container>
      <Container maxWidth="xl" className="space-x-4 pb-8 whitespace-nowrap inline-block">
        <Emissions actor={countryDetails} parts={subActorDetails} />
        <Reductions actor={countryDetails} parts={subActorDetails} />
      </Container>
      <TextBox
        coloredTitle="Methodology"
        otherTitle="used"
        description={methodology}
      />
    </div>
  );
}
