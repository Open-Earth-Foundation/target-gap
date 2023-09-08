"use client";

import { SyntheticEvent, useEffect, useRef, useState } from "react";

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
  Typography,
} from "@mui/material";

import Select, { SelectChangeEvent } from "@mui/material/Select";
import ActorsWithTargetsTabs from "@/components/tabs/ActorsWithTargetsTabs";

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function Home() {
  const [selectedTab, setSelectedTab] = useState(0);
  const [screenSize, setScreenSize] = useState(getCurrentDimension());
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

  function getCurrentDimension() {
    return {
      width: window.innerWidth,
    };
  }

  useEffect(() => {
    const updateDimension = () => {
      setScreenSize(getCurrentDimension());
    };
    if (typeof window !== "undefined") {
      window.addEventListener("resize", updateDimension);

      return () => {
        window.removeEventListener("resize", updateDimension);
      };
    }
  }, []);

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
      <div
        className="px-[16px] pt-[63px] md:p-16 max-w-[1440px] mx-auto"
        ref={contentRef}>
        <Box
          sx={{
            borderBottom: { xs: "none", md: 1 },
            borderColor: { xs: "none", md: "divider" },
          }}>
          {screenSize.width > 600 ? (
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
            <Box display="flex" flexDirection="column" gap="8px">
              <Typography
                textAlign="center"
                color="#7A7B9A"
                variant="body1"
                fontSize="12px"
                fontWeight={500}
                lineHeight="16px"
                letterSpacing="0.5px">
                Select a visualization
              </Typography>
              <FormControl fullWidth>
                <Box className="flex w-full justify-center">
                  <Select
                    sx={{
                      border: "1px solid #D7D8FA",
                      borderRadius: "8px",
                      width: "209px",
                      height: "44px",
                      fontWeight: 500,
                      lineHeight: "20px",
                      fontSize: "14px",
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
          <ActorsWithTargetsTabs />
        </TabPanel>
      </div>
    </div>
  );
}
