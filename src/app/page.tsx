'use client';

import Emissions from "@/components/sections/Emissions";
import Reductions from "@/components/sections/Reductions";
import TextBox from "@/components/sections/TextBox";
import CountrySelect from "@/components/ui/CountrySelect";
import { getActorEmissions, getActorParts } from "@/lib/api";
import { ActorEmissionsMap, ActorPart, ActorType } from "@/lib/models";
import { Container } from "@mui/material";
import { useEffect, useState } from "react";

export default function Home() {
  const [countries, setCountries] = useState<ActorPart[]>([]);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [countryEmissions, setCountryEmissions] = useState<ActorEmissionsMap>({});
  const [subActorEmissions, setSubActorEmissions] = useState<Map<ActorPart, ActorEmissionsMap>>(new Map());

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
    const countryEmissionsData = await getActorEmissions(actorId);
    const subActors = await getActorParts(actorId);
    const adm1Actors = subActors.filter((actor) => actor.type === ActorType.Adm1);
    const subActorEmissionsData = await Promise.all(
      adm1Actors.map(async (subActor): Promise<[ActorPart, ActorEmissionsMap]> => {
        return [subActor, await getActorEmissions(subActor.actor_id)];
      })
    );
    const subActorEmissionsMap = new Map<ActorPart, ActorEmissionsMap>(subActorEmissionsData); // transforms tuple array into Map
    setCountryEmissions(countryEmissionsData);
    setSubActorEmissions(subActorEmissionsMap);
  }

  return (
    <div className="p-16">
      <TextBox
        description="This target visualiser shows Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin in luctus quam, vel lacinia est. Praesent vel sagittis urna, eget rutrum sapien. Integer eu arcu eros. Curabitur in consequat lacus, ac ullamcorper metus. Vivamus rutrum purus ac mollis ullamcorper"
      />
      <CountrySelect countries={countries} onSelected={onCountrySelected} />
      <p className="mb-8">Selected country: {selectedCountry}</p>
      <Emissions actor={countryEmissions} parts={subActorEmissions} />
      <Reductions/>
      <TextBox
        description="The 1.5C is calculated Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin in luctus quam, vel lacinia est. Praesent vel sagittis urna, eget rutrum sapien. Integer eu arcu eros. Curabitur in consequat lacus, ac ullamcorper metus. Vivamus rutrum purus ac mollis ullamcorper"
      />
    </div>
  )
}
