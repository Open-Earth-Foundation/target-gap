"use client";

import { SyntheticEvent, useRef, useState } from "react";

import Hero from "@/components/header/Hero";
import { TabPanel } from "@/components/tabs/TabPanel";
import { TargetGapTab } from "@/components/tabs/TargetGapTab";
import { ArrowForward } from "@mui/icons-material";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Tab,
  Tabs,
} from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import Select, { SelectChangeEvent } from "@mui/material/Select";

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function Home() {
  const [selectedTab, setSelectedTab] = useState(0);
  const handleTabChange = (event: SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };
  const handleTabChangeMobile = (event: any) => {
    setSelectedTab(event.target.value);
  };

  const contentRef = useRef<null | HTMLDivElement>(null);
  const scrollToContent = () => {
    contentRef.current?.scrollIntoView();
  };

  // listen to media queries that match css
  const matches = useMediaQuery("(min-width: 600px)");

  return (
    <div className="bg-[#FAFAFA]">
      <Hero>
        <Button
          variant="contained"
          className="rounded-full px-6 py-4 text-white"
          color="secondary"
          endIcon={<ArrowForward />}
          onClick={scrollToContent}>
          Start Exploring
        </Button>
      </Hero>
      <div className="p-16" ref={contentRef}>
        <Box
          sx={{
            borderBottom: { xs: "none", md: 1 },
            borderColor: { xs: "none", md: "divider" },
          }}>
          {matches ? (
            <Tabs
              value={selectedTab}
              onChange={handleTabChange}
              aria-label="basic tabs example"
              textColor="primary"
              indicatorColor="primary">
              <Tab label="Target Gap Visualizer" {...a11yProps(0)} />
              <Tab label="Reduction Progress" {...a11yProps(1)} />
              <Tab label="Actors with Targets" {...a11yProps(2)} />
            </Tabs>
          ) : (
            <Box>
              <FormControl fullWidth>
                <p className="text-center pb-2 text-[12px] font-semibold text-[#7A7B9A] tracking-[0.5px]">
                  Select a visualization
                </p>
                <Box className="flex w-full justify-center">
                  <Select
                    sx={{
                      border: "1px solid #D7D8FA",
                      borderRadius: "8px",
                      width: "209px",
                      height: "44px",
                      fontWeight: 500,
                      lineHeight: "20px",
                      letterSpacing: "0.5px",
                      ":focus": {
                        borderColor: "blue",
                      },
                    }}
                    id="demo-simple-select"
                    value={selectedTab}
                    onChange={handleTabChangeMobile}>
                    <MenuItem value={0}>Target Gap Visualizer</MenuItem>
                    <MenuItem value={1}>Reduction Progress</MenuItem>
                    <MenuItem value={2}>Actors with Targets</MenuItem>
                  </Select>
                </Box>
              </FormControl>
            </Box>
          )}
        </Box>
        <TabPanel value={selectedTab} index={0}>
          <TargetGapTab />
        </TabPanel>
        <TabPanel value={selectedTab} index={1}>
          Item Two
        </TabPanel>
        <TabPanel value={selectedTab} index={2}>
          Item Three
        </TabPanel>
      </div>
    </div>
  );
}
