"use client";

import { getActorOverview, getActorParts } from "@/lib/api";
import type { ActorOverview } from "@/lib/models";
import HelpOutlinedIcon from "@mui/icons-material/HelpOutlined";
import { CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import { CircleFlag } from "react-circle-flags";
import { ReductionProgress } from "../sections/ReductionProgress";
import TextBox from "../sections/TextBox";
import CountrySelect from "../ui/CountrySelect";

export function ReductionProgressTab() {
  const [isLoading, setLoading] = useState<boolean>(false);
  const [countries, setCountries] = useState<{ id: string; name: string }[]>(
    []
  );
  const [countryDetails, setCountryDetails] = useState<
    ActorOverview | undefined
  >(undefined);

  useEffect(() => {
    const loadCountries = async () => {
      const actorParts = await getActorParts("EARTH");
      const countryData = actorParts.map((actor) => ({
        id: actor.actor_id,
        name: actor.name,
      }));
      setCountries(countryData);
    };
    loadCountries();
  }, []);

  const onCountrySelected = (actorId: string) => {
    setLoading(true);
    loadEmissionsData(actorId).catch(console.error);
  };

  const loadEmissionsData = async (actorId: string) => {
    const countryEmissionsData = await getActorOverview(actorId);
    setCountryDetails(countryEmissionsData);
    setLoading(false);
  };

  const description = `
<<<<<<< HEAD
  This tool offers an intuitive way to gauge an actor’s progress toward its emission reduction targets. Drawing on the Hsu et al. (2020) methodology, the visualization serves as a guide to evaluate current emissions against a scenario where emissions are reduced linearly from the baseline year to target year. 
`;

  const methodology = `
  The “Reduction Progress” visualization is based on the Hsu et al. (2020) approach. It compares latest emissions data to a linear reduction scenario from baseline to target years. This linear reduction pathway serves as a comparative benchmark, not as an expected reduction path. In the chart, an orange line represents current emissions and a dotted line indicates baseline emissions. An actor is deemed “on track” if its current emissions are below the baseline, and “not on track” otherwise. The visualization aims to give a clear understanding of how effective climate actions have been. 
=======
This tool offers an intuitive way to gauge a country's progress toward its emission reduction targets. Drawing on the Hsu et al. (2020) methodology, the visualization serves as a guide for countries to evaluate their current emissions against a modelled linear reduction path from baseline to target years.
`;

  const methodology = `
The "Reduction Progress" visualization is based on the Hsu et al. (2020) approach. It compares a country's latest emissions data to a linear reduction scenario from baseline to target years. The linear model serves as a comparative benchmark, not as an expected reduction path. In the chart, an orange line represents current emissions and a dotted line indicates baseline emissions. A country is deemed "on track" if its current emissions are below the baseline, and "not on track" otherwise. The visualization aims to give countries a clear understanding of how effective their climate actions have been.
>>>>>>> main
`;

  return (
    <>
      <TextBox
        coloredTitle="Reduction"
        otherTitle="Progress"
        description={description}
      />
      <div className="pb-2 max-w-layout mx-auto">
        <CountrySelect countries={countries} onSelected={onCountrySelected} />
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
      </div>
      <div className="max-w-layout w-full lg:space-x-4 pb-8 whitespace-nowrap inline-block">
        <ReductionProgress actor={countryDetails} />
      </div>
      <TextBox
        coloredTitle="Methodology"
        otherTitle="used"
        description={methodology}
      />
    </>
  );
}
