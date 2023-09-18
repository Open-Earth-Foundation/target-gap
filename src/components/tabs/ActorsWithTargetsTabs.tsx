import { Box, CircularProgress, Container, Typography } from "@mui/material";
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
import { CoverageData, CoverageDiagramEntry } from "@/lib/models";
import { getCoverageData } from "@/lib/api";
import TextBox from "../sections/TextBox";
import ButtonMain from "../button/ButtonMain";

const ActorsWithTargetsTabs = () => {
  const [isLoading, setLoading] = useState(true);
  const [coverageData, setCoverageData] = useState<CoverageData>();
  const [diagramData, setDiagramData] = useState<CoverageDiagramEntry[]>([]);
  useEffect(() => {
    async function loadData() {
      const data = await getCoverageData();
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
    }

    loadData();
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
      <div className="h-[100px] w-[400px] flex gap-4 top-[40px] relative">
        <div className="flex bg-[#E8EAFB] gap-[10px] h-[24px] items-center justify-center p-[8px] rounded-[50px] text-xs">
          <div className="h-[5px] w-[16px] bg-[#E9750A]" />
          <Typography variant="body2" color="#001EA7" fontSize="12px">
            Emissions
          </Typography>
        </div>
        <div className="flex bg-[#E8EAFB] gap-[10px] h-[24px] items-center justify-center p-[8px] rounded-[50px] text-xs">
          <div className="h-[5px] w-[16px]  bg-[#24BE00]" />
          <Typography variant="body2" color="#001EA7" fontSize="12px">
            Pledges
          </Typography>
        </div>
      </div>
    );
  };
  return (
    <Box display="flex" flexDirection="column">
      <TextBox
        coloredTitle="Percentage of Actors "
        otherTitle="with Targets"
        description={`This visualization provides a snapshot of the availability of emissions
        and pledges data across countries, regions, cities, and companies within
        OpenClimate. By showcasing the percentages of available data, we
        highlight both the progress made and the gaps that remain. We believe
        that by identifying these gaps, we can spur more entities to contribute
        and complete the picture. We encourage stakeholders to dive in, identify
        these areas of opportunity, and collaborate with us to further develop
        and enrich our collective climate dataset.`}
      />
      <Typography
        fontSize="12px"
        fontWeight="400"
        lineHeight="16px"
        variant="body2"
        letterSpacing="0.5px"></Typography>
      {isLoading ? (
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          gap="8px">
          <CircularProgress />
          <Typography variant="body2">Loading Chart Data</Typography>
        </Box>
      ) : (
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
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#E6E7FF"
                height={1}
              />
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
      )}
      <Box display="flex" flexDirection="column" gap="24px" className="mt-8">
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
          className="md:h-[732px] w-full"
        />
        <p className="w-full text-right">Image by L. Gloege</p>
      </Box>
      <Box
        display="flex"
        flexDirection="column"
        gap="24px"
        className="h-[200px] pt-8">
        <Heading
          titleHighlighted="OpenClimate "
          titleDark="Data Coverage"
          color=""
        />
        <ButtonMain
          bgColor="#008600"
          border={false}
          text="Review Data Coverage"
          h="48px"
          w="320px"
          textColor="white"
          borderColor="none"
        />
      </Box>
    </Box>
  );
};

export default ActorsWithTargetsTabs;
