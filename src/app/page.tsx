'use client';

import Emissions from "@/components/sections/Emissions";
import Reductions from "@/components/sections/Reductions";
import TextArea from "@/components/sections/TextArea";
import CountrySelect from "@/components/ui/CountrySelect";
import { getActorParts } from "@/lib/api";
import { ActorPart } from "@/lib/models";
import { Container } from "@mui/material";
import { useEffect, useState } from "react";

export default function Home() {
  const [countries, setCountries] = useState<ActorPart[]>([]);
  const [selectedCountry, setSelectedCountry] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const data = await getActorParts('EARTH');
      setCountries(data);
    }

    fetchData().catch(console.error);
  });

  const onCountrySelected = (actorId: string) => {
    setSelectedCountry(actorId);
  }

  return (
    <>
      <TextArea
        description="This target visualiser shows Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin in luctus quam, vel lacinia est. Praesent vel sagittis urna, eget rutrum sapien. Integer eu arcu eros. Curabitur in consequat lacus, ac ullamcorper metus. Vivamus rutrum purus ac mollis ullamcorper"
      />
      <Container maxWidth="xl" className="pb-16">
        <CountrySelect countries={countries} onSelected={onCountrySelected} />
        <p>Selected country: {selectedCountry}</p>
      </Container>
      <Emissions/>
      <Reductions/>
      <TextArea
        description="The 1.5C is calculated Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin in luctus quam, vel lacinia est. Praesent vel sagittis urna, eget rutrum sapien. Integer eu arcu eros. Curabitur in consequat lacus, ac ullamcorper metus. Vivamus rutrum purus ac mollis ullamcorper"
      />
    </>
  )
}
