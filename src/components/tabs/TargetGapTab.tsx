import Emissions from "@/components/sections/Emissions";
import Reductions from "@/components/sections/Reductions";
import TextBox from "@/components/sections/TextBox";
import CountrySelect from "@/components/ui/CountrySelect";
import { getActorOverview, getActorParts } from "@/lib/api";
import { ActorOverview, ActorType } from "@/lib/models";
import validCountries from "@/lib/valid-countries.json";
import { useState } from "react";

import HelpOutlinedIcon from "@mui/icons-material/HelpOutlined";
import { CircularProgress } from "@mui/material";
import { CircleFlag } from "react-circle-flags";

export function TargetGapTab() {
  const [isLoading, setLoading] = useState<boolean>(false);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [countryDetails, setCountryDetails] = useState<ActorOverview | null>(
    null
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
      (actor) => actor.type === ActorType.Adm1
    );
    const subActorDetails = await Promise.all(
      adm1Actors.map(async (subActor): Promise<ActorOverview> => {
        return await getActorOverview(subActor.actor_id);
      })
    );
    setCountryDetails(countryEmissionsData);
    setSubActorDetails(subActorDetails);
    setLoading(false);
  };

  const description = `
  This target gap visualizer uses the OpenClimate API to illustrate the difference in reduction targets between a national actor and its subnational parts (states, provinces, or regions). The emissions graph shows the expected target emissions set by the national actor alongside the cumulative emissions of its subnational parts, using the expected target emissions set by each. If a subnational actor has not established an emissions reduction target, we use their most recent inventory emissions, thus presuming their emissions will remain at current levels. The reductions graph compares the emission reductions a national actor must attain to achieve their emissions target with the cumulative reductions of all its subnational parts. Subnational actors lacking specific reduction targets are assigned a reduction value of 0, thus assuming their emissions remain unchanged. 
  `;

  const methodology = `
  Emissions data is from the OpenClimate API. Emissions values are
  derived from national or international datasets. Target values come
  from nationally-determined contributions (NDCs) or other public sources.
  `;

  return (
    <>
      <TextBox
        coloredTitle="Target Gap"
        otherTitle="Visualizer"
        description={description}
      />
      <div className="max-w-layout pb-2">
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
      <div className="max-w-layout lg:space-x-4 pb-8 whitespace-nowrap">
        <Emissions actor={countryDetails} parts={subActorDetails} />
        <Reductions actor={countryDetails} parts={subActorDetails} />
      </div>
      <TextBox
        coloredTitle="Methodology"
        otherTitle="used"
        description={methodology}
      />
    </>
  );
}
