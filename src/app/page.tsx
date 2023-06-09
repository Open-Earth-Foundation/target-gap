'use client';

import Emissions from "@/components/sections/Emissions";
import Reductions from "@/components/sections/Reductions";
import TextBox from "@/components/sections/TextBox";
import CountrySelect from "@/components/ui/CountrySelect";
import { getActorOverview, getActorParts } from "@/lib/api";
import { ActorOverview, ActorPart, ActorType } from "@/lib/models";
import { useEffect, useState } from "react";

import Container from '@mui/material/Container';

import ReactCountryFlag from "react-country-flag"

export default function Home() {
  const [countries, setCountries] = useState<ActorPart[]>([]);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [countryDetails, setCountryDetails] = useState<ActorOverview | null>(null);
  const [subActorDetails, setSubActorDetails] = useState<ActorOverview[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getActorParts('EARTH');
      setCountries(data);
    }

    fetchData().catch(console.error);
  });

  const onCountrySelected = (actorId: string) => {
    setSelectedCountry(actorId);
    loadEmissionsData(actorId).catch(console.error);
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
  }

  return (
    <div className="p-16 bg-[#FAFAFA]">
      <TextBox
        coloredTitle="Target Gap"
        otherTitle="Visualizer"
        description="This target visualiser shows Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin in luctus quam, vel lacinia est. Praesent vel sagittis urna, eget rutrum sapien. Integer eu arcu eros. Curabitur in consequat lacus, ac ullamcorper metus. Vivamus rutrum purus ac mollis ullamcorper"
      />
      <Container maxWidth="xl" className="pb-8">
        <CountrySelect countries={countries} onSelected={onCountrySelected} />
        <div className="text-xl font-bold pt-8">{countryDetails ?
          <div className="flex items-center space-x-4 mb-8 mt-2">
            <ReactCountryFlag
              svg
              countryCode={countryDetails.actor_id}
              style={{
                fontSize: '2em',
                lineHeight: '6em',
                borderRadius: "100%"
              }}
              aria-label={countryDetails.name}
            />
            <p className="font-bold text-xl">{countryDetails.name}</p>
          </div> : 'No country selected'}</div>
      </Container>
      <Container maxWidth="xl" className="flex space-x-4 h-full pb-8">
        <Emissions actor={countryDetails} parts={subActorDetails} />
        <Reductions actor={countryDetails} parts={subActorDetails} />
      </Container>
      <TextBox
        coloredTitle="Methodology"
        otherTitle="used"
        description="The 1.5C is calculated Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin in luctus quam, vel lacinia est. Praesent vel sagittis urna, eget rutrum sapien. Integer eu arcu eros. Curabitur in consequat lacus, ac ullamcorper metus. Vivamus rutrum purus ac mollis ullamcorper"
      />
    </div>
  );
}
