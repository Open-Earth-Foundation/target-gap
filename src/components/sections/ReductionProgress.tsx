"use client";

import type { ActorOverview } from "@/lib/models";
import DownloadIcon from "@mui/icons-material/Download";
import InputIcon from "@mui/icons-material/Input";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import {
  Box,
  Card,
  CardContent,
  Divider,
  FormControl,
  InputLabel,
  ListItemIcon,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  Stack,
} from "@mui/material";
import { useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ReferenceDot,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import PopperPortal from "../util/PopperPortal";
import { actorNextTarget } from "@/lib/util";

interface Source {
  id: string;
  name: string;
  year: number;
  url: string;
}

interface DiagramEntry {
  year: number;
  emissions?: number;
  emissionsAfterBaseline?: number;
  emissionsReduction?: number;
}

const emissionsScale = 1e6; // transform to megatons

const ReductionProgressTooltip = ({
  active = false,
  payload = [],
  label = "",
  source = "",
  targetData,
}: {
  active?: boolean;
  payload?: Array<any>;
  label?: string;
  source?: string;
  targetData: { reductionPercent: number; year: number; fromYear: number };
}) => {
  if (!(active && payload && payload.length)) {
    return null;
  }
  const totalEmissions = payload[0].value;
  const isTarget = payload[0].payload.year === targetData.year;
  const color = isTarget ? "#24BE00" : payload[0].stroke;

  const methodologies = [
    "Remote sensing",
    "Machine learning",
    "Satellite imagery",
    "Very long source name that overflows",
  ];

  return (
    <PopperPortal active={active}>
      <div className="bg-white rounded-md p-4 drop-shadow-lg">
        <div className="font-bold">
          <span className="h-full align-middle font-bold text-xl">{label}</span>
        </div>
        <hr className="my-4 -mx-4" />
        {isTarget ? (
          <>
            <p className="text-base font-bold" style={{ color }}>
              Absolute emissions reduction
            </p>
            <p className="text-content-tertiary mb-6">GHG Emissions</p>
            <p className="text-base font-bold" style={{ color }}>
              {(targetData.reductionPercent * 100).toFixed(1)}%
            </p>
            <p className="text-content-tertiary mb-6">
              by {targetData.year} relative to {targetData.fromYear}
            </p>
            <p className="text-base font-bold" style={{ color }}>
              {totalEmissions.toFixed(3)}
            </p>
            <p className="text-content-tertiary">Total emissions in MtCO2eq</p>
          </>
        ) : (
          <>
            <p className="text-xl font-bold" style={{ color }}>
              {totalEmissions.toFixed(3)}
            </p>
            <p className="text-content-tertiary mb-6">
              Total emissions in MtCO2eq
            </p>
            <p className="text-xl font-bold" style={{ color }}>
              {source}
            </p>
            <p className="text-content-tertiary mb-6">Source</p>
            <div className="flex flex-row flex-wrap gap-3 max-w-[270px] mb-3 shrink-0">
              {methodologies.map((methodology) => (
                <div
                  key={methodology}
                  className="bg-background-neutral text-content-alternative text-[12px] rounded-full px-3 py-1"
                >
                  {methodology}
                </div>
              ))}
            </div>
            <p className="text-content-tertiary">Methodologies used</p>
          </>
        )}
      </div>
    </PopperPortal>
  );
};

const PledgesArrow = ({ cx, cy }: { cx?: number; cy?: number }) => (
  <svg>
    <path
      id="icon"
      d="M0.5 8L16.5 24L32.5 8H0.5Z"
      fill="#24BE00"
      transform={`translate(${(cx || 0) - 16} ${(cy || 0) - 15})`}
    />
  </svg>
);

export function ReductionProgress({ actor }: { actor?: ActorOverview }) {
  const [selectedSourceId, setSelectedSourceId] = useState<string>("");
  const lastUpdateYear = 2019;
  const endYear = 2050; // last year shown on diagram
  let sources: Source[] = [];
  let selectedSource: Source | undefined;
  let data: DiagramEntry[] = [];
  let pledgeTarget = { year: 0, emissions: 0 };
  let targetData = { reductionPercent: 0, year: 0, fromYear: 0 };

  const handleSourceChange = (event: SelectChangeEvent) => {
    setSelectedSourceId(event.target.value as string);
    // TODO update loaded data
  };

  if (actor != null) {
    sources = Object.entries(actor.emissions).map(([key, value]) => ({
      id: key,
      name: value.publisher,
      year: new Date(value.published).getFullYear(),
      url: value.URL,
    }));
    selectedSource = sources.find((source) => source.id === selectedSourceId);
    if (selectedSource != null) {
      const selectedTarget = actor.targets.find((target) => {
        return target.target_type === "Absolute emission reduction";
      });
      if (selectedTarget !== undefined) {
        const baselineYear = selectedTarget.baseline_year;
        const baselineData = actor.emissions[selectedSource.id].data.find(
          (entry) => entry.year === baselineYear,
        );
        if (baselineData) {
          const reductionPercent = Number(selectedTarget.target_value) / 100;
          pledgeTarget = {
            year: selectedTarget.target_year,
            emissions: reductionPercent * baselineData.total_emissions / emissionsScale,
          };
          targetData = {
            reductionPercent, 
            year: selectedTarget.target_year,
            fromYear: selectedTarget.baseline_year,
          };

          data = actor.emissions[selectedSource.id].data.map((entry) => {
            const emissions = entry.total_emissions / emissionsScale;
            return {
              year: entry.year,
              emissions: entry.year <= baselineYear ? emissions : undefined,
              emissionsAfterBaseline:
                entry.year >= baselineYear ? emissions : undefined,
              emissionsReduction:
                entry.year == baselineYear ? emissions : undefined,
            };
          });
          data.push({ year: pledgeTarget.year, emissionsReduction: pledgeTarget.emissions });
        } else {
          console.log("Baseline data missing!");
        }
      } else {
        console.log("Selected target missing!");
      }
    } else {
      console.log("Selected source missing!");
    }
  }

  // interface DiagramEntry {
  //   year: number;
  //   emissions?: number;
  //   emissionsAfterBaseline?: number;
  //   emissionsReduction?: number;
  // }

  // const data = [
  //   { year: 2005, emissions: 35.4 },
  //   { year: 2010, emissions: 38.4 },
  //   {
  //     year: 2017,
  //     emissions: 45.5,
  //     emissionsAfterBaseline: 45.5,
  //     emissionsReduction: 45.5,
  //   },
  //   { year: 2018, emissionsAfterBaseline: 48.5 },
  //   { year: 2019, emissionsAfterBaseline: 51.5 },
  //   { year: 2025, emissionsAfterBaseline: 52.3 },
  //   { year: 2045, emissionsReduction: 12.3 },
  // ];

  // const pledgeTarget = { year: 2045, emissions: 12.3 };
  // const targetData = { reductionPercent: 0.4, year: 2045, fromYear: 2017 };
  const baselineEmissions = data.find(
    (entry) => entry.year === targetData.fromYear,
  )?.emissions;

  return (
    <Card sx={{ boxShadow: 3 }}>
      <CardContent>
        <div className="flex flex-row items-center">
          <Stack>
            <h1 className="text-lg font-bold pb-1">
              Emissions Reduction Progress
            </h1>
            {selectedSource && (
              <>
                <p className="text-content-tertiary">
                  Last updated in {lastUpdateYear}
                </p>
                <p className="text-content-tertiary">
                  Source: {selectedSource.name} ({selectedSource.year}){" "}
                  <a href={selectedSource.url} target="_blank" rel="noreferrer">
                    <OpenInNewIcon
                      fontSize="small"
                      className="-mt-1 text-secondary"
                    />
                  </a>
                </p>
              </>
            )}
          </Stack>
          <div className="grow" />
          <DownloadIcon className="text-control" />
        </div>
        <Divider className="mt-6" />
        <Box className="my-6" sx={{ width: 200 }}>
          <FormControl fullWidth>
            <InputLabel id="source-label"></InputLabel>
            <Select
              id="source-select"
              value={selectedSourceId}
              label="Source"
              onChange={handleSourceChange}
              displayEmpty
              input={<OutlinedInput />}
              renderValue={(selected) => {
                return (
                  <>
                    <InputIcon className="text-control" />{" "}
                    {selectedSource?.name || "Source"}
                  </>
                );
              }}
            >
              {sources.map((source) => (
                <MenuItem value={source.id} key={source.name}>
                  {source.name}
                  <div className="w-full" />
                  <ListItemIcon>
                    <a href={source.url} target="_blank" rel="noreferrer">
                      <OpenInNewIcon />
                    </a>
                  </ListItemIcon>
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <ResponsiveContainer
          width="100%"
          height="100%"
          minHeight={300}
          className="my-6"
        >
          <AreaChart
            width={500}
            height={300}
            data={data}
            margin={{
              top: 10,
              right: 50,
              left: 5,
              bottom: 0,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="year"
              type="number"
              domain={["dataMin", endYear]}
              axisLine={false}
              tickCount={10}
            />
            <YAxis unit="Mt" type="number" axisLine={false} />
            <Tooltip
              content={
                <ReductionProgressTooltip
                  source={selectedSource?.name}
                  targetData={targetData}
                />
              }
              allowEscapeViewBox={{ x: true, y: true }}
            />
            <Area
              dataKey="emissionsReduction"
              connectNulls
              name="Achieved Reduction"
              unit="Mt"
              stroke="#2351DC"
              fill="#2351DC"
              fillOpacity="0.2"
              strokeWidth="2"
              dot={{ fill: "#2351DC", strokeWidth: 3, r: 2, stroke: "#2351DC" }}
            />
            <Area
              type="monotone"
              dataKey="emissions"
              name="Total emissions"
              unit="Mt"
              stroke="#FA7200"
              fill="#FA7200"
              fillOpacity="0.2"
              strokeWidth="2"
              dot={{ fill: "#FA7200", strokeWidth: 3, r: 2, stroke: "#FA7200" }}
            />
            <Area
              type="monotone"
              dataKey="emissionsAfterBaseline"
              name="Total emissions"
              unit="Mt"
              stroke="#FA7200"
              fill="#FA7200"
              fillOpacity="0.0"
              strokeWidth="2"
              dot={{ fill: "#FA7200", strokeWidth: 3, r: 2, stroke: "#FA7200" }}
            />
            <ReferenceLine
              stroke="#505050CC"
              strokeDasharray="4 4"
              strokeWidth={2}
              segment={[
                { x: targetData.fromYear, y: baselineEmissions },
                { x: endYear, y: baselineEmissions },
              ]}
            />
            <ReferenceDot
              x={pledgeTarget.year}
              y={pledgeTarget.emissions}
              shape={<PledgesArrow />}
              isFront
              ifOverflow="extendDomain"
            />
          </AreaChart>
        </ResponsiveContainer>
        <p className="text-content-secondary text-sm mb-3">References</p>
        <div className="flex flex-row flex-wrap items-center gap-x-2 gap-y-2">
          <div className="bg-background-neutral rounded-full px-3 py-1">
            <span className="w-5 h-1 align-middle bg-[#FA7200] inline-block mr-2" />
            <span className="text-content-alternative text-sm">
              Total GHG Emissions
            </span>
          </div>
          <div className="bg-background-neutral rounded-full px-3 py-1">
            <span className="w-2 h-1 align-middle bg-[#232640] inline-block mr-0.5" />
            <span className="w-2 h-1 align-middle bg-[#232640] inline-block mr-2" />
            <span className="text-content-alternative text-sm">
              Baseline Year Emissions Level
            </span>
          </div>
          <div className="bg-background-neutral rounded-full px-3 py-1">
            <span className="w-5 h-1 align-middle bg-[#2351DC] inline-block mr-2" />
            <span className="text-content-alternative text-sm">
              Achieved Reduction
            </span>
          </div>
          <div className="bg-background-neutral rounded-full px-3 py-1">
            <span className="w-5 h-1 align-middle bg-[#008600] inline-block mr-2" />
            <span className="text-content-alternative text-sm">
              Required Reduction Based on Target
            </span>
          </div>
          <div className="bg-background-neutral rounded-full px-3 py-1">
            <svg width="25" height="24" className="inline">
              <path id="icon" d="M4.5 8L12.5 16L20.5 8H4.5Z" fill="#24BE00" />
            </svg>
            <span className="text-content-alternative text-sm">
              Absolute emissions reduction
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
