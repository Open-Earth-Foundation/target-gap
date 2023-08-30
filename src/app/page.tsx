"use client";

import Emissions from "@/components/sections/Emissions";
import Reductions from "@/components/sections/Reductions";
import TextBox from "@/components/sections/TextBox";
import CountrySelect from "@/components/ui/CountrySelect";
import { getActorOverview, getActorParts } from "@/lib/api";
import { ActorOverview, ActorType } from "@/lib/models";
import { useRef, useState } from "react";
import validCountries from "@/lib/valid-countries.json";

import Container from "@mui/material/Container";

import { CircleFlag } from "react-circle-flags";
import { Button, CircularProgress } from "@mui/material";
import HelpOutlinedIcon from "@mui/icons-material/HelpOutlined";
import Hero from "@/components/header/Hero";
import { ArrowForward } from "@mui/icons-material";

export default function Home() {
  const [isLoading, setLoading] = useState<boolean>(false);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [countryDetails, setCountryDetails] = useState<ActorOverview | null>(
    null,
  );
  const [subActorDetails, setSubActorDetails] = useState<ActorOverview[]>([]);

  const onCountrySelected = (actorId: string) => {
    setSelectedCountry(actorId);
    loadEmissionsData(actorId).catch(console.error);
    setLoading(true);
  };

  const loadEmissionsData = async (actorId: string) => {
    const countryEmissionsData = await getActorOverview(actorId);
    const subActors = await getActorParts(actorId);
    const adm1Actors = subActors.filter(
      (actor) => actor.type === ActorType.Adm1,
    );
    const subActorDetails = await Promise.all(
      adm1Actors.map(async (subActor): Promise<ActorOverview> => {
        return await getActorOverview(subActor.actor_id);
      }),
    );
    setCountryDetails(countryEmissionsData);
    setSubActorDetails(subActorDetails);
    setLoading(false);
  };

  const contentRef = useRef<null | HTMLDivElement>(null);
  const scrollToContent = () => {
    contentRef.current?.scrollIntoView();
  };

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
    <div className="bg-[#FAFAFA]">
      <Hero>
        <Button
          variant="contained"
          className="rounded-full px-6 py-4 text-white"
          color="secondary"
          endIcon={<ArrowForward />}
          onClick={scrollToContent}
        >
          Start Exploring
        </Button>
      </Hero>
      <div className="p-16" ref={contentRef}>
        <TextBox
          coloredTitle="Target Gap"
          otherTitle="Visualizer"
          description={description}
        />
        <Container maxWidth="xl" className="pb-2" disableGutters>
          <CountrySelect
            countries={validCountries}
            onSelected={onCountrySelected}
          />
          {isLoading && <CircularProgress className="align-bottom m-2 ml-4" />}
          <div className="text-xl font-bold pt-8">
            {countryDetails ? (
              <div className="flex items-center space-x-4 mb-8 mt-2">
                <CircleFlag
                  countryCode={countryDetails.actor_id.toLowerCase()}
                  aria-label={countryDetails.name}
                  className="h-12"
                />
                <p className="font-bold text-xl">{countryDetails.name}</p>
              </div>
            ) : (
              <p className="mb-8 mt-2">
                <HelpOutlinedIcon
                  fontSize="large"
                  style={{
                    color: "#C5CBF5",
                    verticalAlign: -11,
                    marginRight: 16,
                  }}
                />
                No country selected
              </p>
            )}
          </div>
        </Container>
        <Container
          maxWidth="xl"
          disableGutters
          className="lg:space-x-4 pb-8 whitespace-nowrap inline-block"
        >
          <Emissions actor={countryDetails} parts={subActorDetails} />
          <Reductions actor={countryDetails} parts={subActorDetails} />
        </Container>
        <TextBox
          coloredTitle="Methodology"
          otherTitle="used"
          description={methodology}
        />
      </div>
    </div>
  );
}
