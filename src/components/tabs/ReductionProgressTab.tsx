"use client";

import { getActorOverview } from "@/lib/api";
import type { ActorOverview } from "@/lib/models";
import validCountries from "@/lib/valid-countries.json";
import HelpOutlinedIcon from "@mui/icons-material/HelpOutlined";
import { CircularProgress } from "@mui/material";
import { useState } from "react";
import { CircleFlag } from "react-circle-flags";
import { ReductionProgress } from "../sections/ReductionProgress";
import TextBox from "../sections/TextBox";
import CountrySelect from "../ui/CountrySelect";

export function ReductionProgressTab() {
  const [isLoading, setLoading] = useState<boolean>(false);
  const [countryDetails, setCountryDetails] = useState<
    ActorOverview | undefined
  >(undefined);

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
This tool offers an intuitive way to gauge a city's progress toward its emission reduction targets. Drawing on the Hsu et al. (2020) methodology, the visualization serves as a guide for cities to evaluate their current emissions against a modelled linear reduction path from baseline to target years.
`;

  const methodology = `
The "Reduction Progress" visualization is based on the Hsu et al. (2020) approach. It compares a city's latest emissions data to a linear reduction scenario from baseline to target years. The linear model serves as a comparative benchmark, not as an expected reduction path. In the chart, an orange line represents current emissions and a dotted line indicates baseline emissions. A city is deemed "on track" if its current emissions are below the baseline, and "not on track" otherwise. The visualization aims to give cities a clear understanding of how effective their climate actions have been.
`;

  return (
    <>
      <TextBox
        coloredTitle="Reduction"
        otherTitle="Progress"
        description={description}
      />
      <div className="pb-2 max-w-4xl">
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
      </div>
      <div className="max-w-4xl w-full lg:space-x-4 pb-8 whitespace-nowrap inline-block">
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
