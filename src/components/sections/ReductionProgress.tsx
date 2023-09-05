"use client";

import type { ActorOverview } from "@/lib/models";
import DownloadIcon from "@mui/icons-material/Download";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
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
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import PopperPortal from "../util/PopperPortal";

const ReductionProgressTooltip = ({
  active = false,
  payload = [],
  label = "",
}: {
  active?: boolean;
  payload?: Array<any>;
  label?: string;
}) => {
  if (!(active && payload && payload.length)) {
    return null;
  }
  const totalEmissions = payload.reduce((acc, value) => acc + value.value, 0);

  return (
    <PopperPortal active={active}>
      <div className="bg-white rounded-md p-4 drop-shadow-lg">
        <div className="font-bold">
          <InfoOutlinedIcon color="info" />{" "}
          <span className="h-full align-middle">
            {label === "Provinces" ? "Subnational" : label} Emissions
          </span>
        </div>
        <hr className="my-4 -mx-4" />
        <p className="font-bold">Total</p>
        <p className="text-xl">
          <span className="font-bold">{totalEmissions.toFixed(3)}</span> MtCO2eq
        </p>
        {payload.length > 1 && (
          <>
            <hr className="my-4" />
            <hr className="my-2" />
            <p className="font-bold mb-2">Key</p>
            <p className="mb-2">
              <span
                className="w-4 h-4 inline-block mr-6"
                style={{ backgroundColor: "#F9A200" }}
              />
              Expected value based on target
            </p>
            <p>
              <span
                className="w-4 h-4 inline-block mr-6"
                style={{ backgroundColor: "#C5CBF5" }}
              />
              No target; business-as-usual based on
              <br />
              <span className="pl-10">most recent emissions</span>
            </p>
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
  const sources = [
    { name: "BP", year: 2018, url: "https://unfccc.int/" },
    { name: "JRC", year: 2019, url: "https://unfccc.int/" },
    { name: "UNFCC", year: 2016, url: "https://unfccc.int/" },
  ];
  const source = sources.find((source) => source.name === selectedSourceId);

  const handleSourceChange = (event: SelectChangeEvent) => {
    setSelectedSourceId(event.target.value as string);
    // TODO update loaded data
  };

  const data = [
    { year: 2017, emissions: 45.5 },
    { year: 2018, emissions: 48.5 },
    { year: 2019, emissions: 51.5 },
    { year: 2025, emissions: 52.3, futureEmissions: 52.3 },
    { year: 2030, futureEmissions: 32.3 },
    { year: 2045, futureEmissions: 12.3 },
  ];

  const pledgeTarget = { year: 2045, emissions: 12.3 };

  return (
    <Card sx={{ boxShadow: 3 }}>
      <CardContent>
        <div className="flex flex-row items-center">
          <Stack>
            <h1 className="text-lg font-bold pb-1">
              Emissions Reduction Progress
            </h1>
            <p className="text-tertiary">Last updated in {lastUpdateYear}</p>
            {source && (
              <p className="text-tertiary">
                Source: {source.name} ({source.year}){" "}
                <a href={source.url} target="_blank" rel="noreferrer">
                  <OpenInNewIcon
                    fontSize="small"
                    className="-mt-1 text-secondary"
                  />
                </a>
              </p>
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
                    {selected || "Source"}
                  </>
                );
              }}
            >
              <MenuItem value="BP">
                BP
                <div className="w-full" />
                <ListItemIcon>
                  <OpenInNewIcon />
                </ListItemIcon>
              </MenuItem>
              <MenuItem value="JRC">JRC</MenuItem>
              <MenuItem value="UNFCC">UNFCC</MenuItem>
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
              domain={["dataMin", 2050]}
              axisLine={false}
              tickCount={10}
            />
            <YAxis unit="Mt" type="number" axisLine={false} />
            <Tooltip
              content={<ReductionProgressTooltip />}
              allowEscapeViewBox={{ x: true, y: true }}
            />
            <Area
              type="monotone"
              dataKey="emissions"
              name="Total emissions"
              unit="Mt"
              stroke="#FA7200"
              fill="#FA7200"
              fillOpacity="0.2"
              dot={{ fill: "#FA7200", strokeWidth: 3, r: 2, stroke: "#FA7200" }}
            />
            <Area
              type="monotone"
              dataKey="futureEmissions"
              name="Future emissions"
              unit="Mt"
              stroke="#2351DC"
              fill="#2351DC"
              fillOpacity="0.2"
              dot={{ fill: "#2351DC", strokeWidth: 3, r: 2, stroke: "#2351DC" }}
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
      </CardContent>
    </Card>
  );
}
