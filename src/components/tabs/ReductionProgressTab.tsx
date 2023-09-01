import { getActorOverview } from "@/lib/api";
import type { ActorOverview } from "@/lib/models";
import validCountries from "@/lib/valid-countries.json";
import HelpOutlinedIcon from "@mui/icons-material/HelpOutlined";
import { CircularProgress, Container } from "@mui/material";
import { useState } from "react";
import { CircleFlag } from "react-circle-flags";
import { ReductionProgress } from "../sections/ReductionProgress";
import TextBox from "../sections/TextBox";
import CountrySelect from "../ui/CountrySelect";

export function ReductionProgressTab() {
  const [isLoading, setLoading] = useState<boolean>(false);
  const [countryDetails, setCountryDetails] = useState<ActorOverview | undefined>(
    undefined,
  );

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
This target gap visualiser shows lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
`;

  const methodology = `
The 1.5C target is calculated by lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
`;

  return (
    <>
      <TextBox
        coloredTitle="Reduction"
        otherTitle="Progress"
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
        <ReductionProgress actor={countryDetails} />
      </Container>
      <TextBox
        coloredTitle="Methodology"
        otherTitle="used"
        description={methodology}
      />
    </>
  );
}
