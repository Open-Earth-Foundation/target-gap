import { Box, Container, Typography } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import Heading from "../typography/Heading";
import { Open_Sans } from "next/font/google";

import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  Legend,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import Image from "next/image";

interface CoverageData {
  number_of_countries: number;
  number_of_regions: number;
  number_of_cities: number;
  number_of_countries_with_targets: number;
  number_of_regions_with_targets: number;
  number_of_cities_with_targets: number;
}

interface CoverageDiagramEntry {
  name: string;
  Emissions: number;
  Pledges: number;
}

const ActorsWithTargetsTabs = () => {
  const [isLoading, setLoading] = useState(true);
  const [coverageData, setCoverageData] = useState<CoverageData>();
  const [diagramData, setDiagramData] = useState<CoverageDiagramEntry[]>([]);
  useEffect(() => {
    async function fetchData() {
      try {
        const result = await fetch(
          `https://openclimate.openearth.dev/api/v1/coverage/stats`
        );
        const data = await result.json();

        const calc = (value: number, sum_of_actors: number) => {
          return Math.round((value / sum_of_actors) * 100);
        };

        let countryData = {
          emissions: 0,
          pledges: 0,
        };

        let regionalData = {
          emissions: 0,
          pledges: 0,
        };

        let cityData = {
          emissions: 0,
          pledges: 0,
        };

        if (!isLoading && coverageData) {
          countryData = {
            emissions: calc(
              data.number_of_countries_with_emissions,
              coverageData?.number_of_countries
            ),
            pledges: calc(
              data.number_of_countries_with_targets,
              coverageData?.number_of_countries
            ),
          };

          regionalData = {
            emissions: calc(
              data.number_of_regions_with_emissions,
              coverageData?.number_of_regions
            ),
            pledges: calc(
              data.number_of_regions_with_targets,
              coverageData?.number_of_regions
            ),
          };

          cityData = {
            emissions: calc(
              data.number_of_cities_with_emissions,
              coverageData?.number_of_cities
            ),
            pledges: calc(
              data.number_of_cities_with_targets,
              coverageData?.number_of_cities
            ),
          };
        }

        setCoverageData(data);
        setLoading(false);

        setDiagramData([
          {
            name: "Countries",
            Emissions: countryData.emissions,
            Pledges: countryData.pledges,
          },
          {
            name: "Regions",
            Emissions: regionalData.emissions,
            Pledges: regionalData.pledges,
          },
          {
            name: "Cities",
            Emissions: cityData.emissions,
            Pledges: cityData.pledges,
          },
        ]);
      } catch (err) {
        console.log("Failed to load coverage data!", err);
        setLoading(false);
      }
    }

    fetchData();
  }, [coverageData, isLoading]);

  const customEmissionsLabel = useCallback(
    (props: any) => {
      const { value, x, y, width } = props;
      const radius = 10;
      if (coverageData) {
        return (
          <g>
            <text
              x={x + width / 2}
              y={y - radius}
              fill="#E9750A"
              style={{ fontWeight: "bold" }}
              textAnchor="middle"
              dominantBaseline="middle">
              {value}%
            </text>
          </g>
        );
      }
    },
    [coverageData]
  );

  const customPledgesLabel = useCallback((props: any) => {
    const { value, x, y, width } = props;
    const radius = 10;
    return (
      <g>
        <text
          x={x + width / 2}
          y={y - radius}
          fill="#24BE00"
          style={{ fontWeight: "bold" }}
          textAnchor="middle"
          dominantBaseline="middle">
          {value}%
        </text>
      </g>
    );
  }, []);

  const LegendContent = () => {
    return (
      <div className="h-[100px] w-[400px] flex gap-8 top-[40px] relative">
        <div className="flex bg-[#E8EAFB] gap-[10px] h-[24px] items-center justify-center p-[8px] rounded-[50px] text-xs">
          <div className="h-[5px] w-[16px] bg-[#E9750A]" />
          <Typography
            variant="body2"
            fontFamily="sans-serif"
            color="#001EA7"
            fontSize="12px">
            Emissions
          </Typography>
        </div>
        <div className="flex bg-[#E8EAFB] gap-[10px] h-[24px] items-center justify-center p-[8px] rounded-[50px] text-xs">
          <div className="h-[5px] w-[16px]  bg-[#24BE00]" />
          <Typography
            variant="body2"
            fontFamily="sans-serif"
            color="#001EA7"
            fontSize="12px">
            Pledges
          </Typography>
        </div>
      </div>
    );
  };
  return (
    <Box display="flex" flexDirection="column" gap="24px">
      <Heading
        titleHighlighted="Percentage of Actors "
        titleDark="with Targets"
        color=""
      />
      <Typography
        fontSize="12px"
        fontWeight="400"
        lineHeight="16px"
        variant="body2"
        fontFamily="sans-serif"
        letterSpacing="0.5px">
        This visualization provides a snapshot of the availability of emissions
        and pledges data across countries, regions, cities, and companies within
        OpenClimate. By showcasing the percentages of available data, we
        highlight both the progress made and the gaps that remain. We believe
        that by identifying these gaps, we can spur more entities to contribute
        and complete the picture. We encourage stakeholders to dive in, identify
        these areas of opportunity, and collaborate with us to further develop
        and enrich our collective climate dataset.
      </Typography>
      <Box
        border="1px solid #E6E7FF"
        borderRadius="8px"
        boxShadow="0px 2px 4px -2px rgba(0, 0, 0, 0.10), 0px 4px 6px -1px rgba(0, 0, 0, 0.10)"
        padding="16px"
        bgcolor="#ffffff">
        <Box borderBottom="2px solid #D7D8FA" paddingBottom="16px">
          <Typography fontWeight={600} fontSize="14px">
            Percentage of Actors with Emissions and Pledges Data
          </Typography>
        </Box>
        <ResponsiveContainer className="h-[440px] w-full">
          <BarChart
            width={550}
            height={300}
            data={diagramData}
            margin={{
              top: 30,
              right: 16,
              left: 0,
              bottom: 0,
            }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E6E7FF" height={1} />
            <XAxis dataKey="name" capHeight={30} />
            <YAxis
              tick={(props) => (
                <text {...props} className="text-[12px]">
                  {props.payload.value} %
                </text>
              )}
              stroke="eeffee"
            />
            <Legend content={<LegendContent />} />
            <Bar
              barSize={100}
              style={{ marginRight: "10px" }}
              dataKey="Emissions"
              fill="#FA7200">
              <LabelList
                dataKey="Emissions"
                position="top"
                dy={0}
                dx={50}
                content={customEmissionsLabel} // Render the value on top of the bar
              />
            </Bar>
            <Bar barSize={100} dataKey="Pledges" fill="#24BE00">
              <LabelList
                dataKey="Pledges"
                position="top"
                dy={0}
                content={customPledgesLabel} // Render the value on top of the bar
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </Box>
      <Box display="flex" flexDirection="column" gap="24px">
        <Box
          sx={{
            display: {
              xs: "flex",
              md: "none",
            },
          }}>
          <Typography
            color="#008600"
            fontSize="14px"
            fontWeight="600"
            lineHeight="20px">
            Methodology&nbsp;
          </Typography>
          <Typography fontSize="14px" fontWeight="600" lineHeight="20px">
            used
          </Typography>
        </Box>
        <Typography
          fontSize="12px"
          fontWeight="400"
          lineHeight="16px"
          variant="body2"
          fontFamily="sans-serif"
          letterSpacing="0.5px">
          The 1.5C target is calculated by lorem ipsum dolor sit amet,
          consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
          labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
          exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
          dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
          proident, sunt in culpa qui officia deserunt mollit anim id est
          laborum.
        </Typography>
      </Box>
      <Box display="flex" flexDirection="column" gap="24px">
        <Heading
          titleHighlighted="Percentage of Subnationals "
          titleDark="with 2030 Targets"
          color=""
        />
        <Image
          src="/images/TargetMap.svg"
          alt="Target map"
          height={179}
          width={328}
        />
      </Box>
    </Box>
  );
};

export default ActorsWithTargetsTabs;
