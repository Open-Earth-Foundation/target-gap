'use client';

import Emissions from "@/components/sections/Emissions";
import Reductions from "@/components/sections/Reductions";
import TextBox from "@/components/sections/TextBox";
import CountrySelect from "@/components/ui/CountrySelect";
import { getActorEmissions, getActorOverview, getActorParts } from "@/lib/api";
import { ActorEmissionsMap, ActorOverview, ActorPart, ActorType } from "@/lib/models";
import { useEffect, useState } from "react";

import HelpIcon from '@mui/icons-material/Help';
import Container from '@mui/material/Container';

import ReactCountryFlag from "react-country-flag"

export default function Home() {
  const [countries, setCountries] = useState<ActorPart[]>([]);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [getCountryName, setCountryName] = useState('');
  const [countryDetails, setCountryDetails] = useState<ActorOverview | null>(null);
  const [subActorDetails, setSubActorDetails] = useState<ActorOverview[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getActorParts('EARTH');
      setCountries(data);
    }

    fetchData().catch(console.error);
  });

  const onCountrySelected = (actorId: string, actorName: string) => {
    setSelectedCountry(actorId);
    setCountryName(actorName)
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
      <Container maxWidth="xl">
        <TextBox
          headerTextSize="large"
          title="Target Gap Visualizer"
          description="This target visualiser shows Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin in luctus quam, vel lacinia est. Praesent vel sagittis urna, eget rutrum sapien. Integer eu arcu eros. Curabitur in consequat lacus, ac ullamcorper metus. Vivamus rutrum purus ac mollis ullamcorper"
        />
        <CountrySelect countries={countries} onSelected={onCountrySelected} />
        
        <div className="py-5">
          {
            getCountryName ? <div className="flex items-center space-x-4 mb-8 mt-2">
                <ReactCountryFlag
                    svg
                    countryCode={selectedCountry}
                    style={{
                        fontSize: '2em',
                        lineHeight: '6em',
                        borderRadius: "100%"
                    }}
                    aria-label={getCountryName}
                />
                <p className="font-bold text-xl">{getCountryName}</p>
              </div> 
            :            
            <div className="flex items-center space-x-3">
              <HelpIcon className="text-[#D9D9D9]"/>
              <p>No country selected</p>
            </div>
          }
        </div>

        <div className="flex space-x-4 mb-10">
          <Emissions actor={countryDetails} parts={subActorDetails} />
          <Reductions/>
        </div>
        <TextBox
          title="Methodologies  used"
          description="The 1.5C is calculated Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin in luctus quam, vel lacinia est. Praesent vel sagittis urna, eget rutrum sapien. Integer eu arcu eros. Curabitur in consequat lacus, ac ullamcorper metus. Vivamus rutrum purus ac mollis ullamcorper"
        />
      </Container>
    </div>
  )
}
