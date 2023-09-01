"use client";

import { SyntheticEvent, useRef, useState } from "react";

import Hero from "@/components/header/Hero";
import { TabPanel } from "@/components/tabs/TabPanel";
import { TargetGapTab } from "@/components/tabs/TargetGapTab";
import { ArrowForward } from "@mui/icons-material";
import { Box, Button, Tab, Tabs } from "@mui/material";
import { ReductionProgressTab } from "@/components/tabs/ReductionProgressTab";

function a11yProps(index: number) {
  return {
    id: `tab-${index}`,
    "aria-controls": `tabpanel-${index}`,
  };
}

export default function Home() {
  const [selectedTab, setSelectedTab] = useState(0);
  const handleTabChange = (event: SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

  const contentRef = useRef<null | HTMLDivElement>(null);
  const scrollToContent = () => {
    contentRef.current?.scrollIntoView();
  };

  return (
    <div className="bg-[#FAFAFA]">
      <Hero>
        <Button
          variant="contained"
          className="rounded-full px-6 py-4 text-white"
          color="secondary"
          endIcon={<ArrowForward />}
          onClick={scrollToContent}
        >
          Start Exploring
        </Button>
      </Hero>
      <div className="p-16" ref={contentRef}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={selectedTab}
            onChange={handleTabChange}
            aria-label="basic tabs example"
          >
            <Tab label="Target Gap Visualizer" {...a11yProps(0)} />
            <Tab label="Reduction Progress" {...a11yProps(1)} />
            <Tab label="Actors with Targets" {...a11yProps(2)} />
          </Tabs>
        </Box>
        <TabPanel value={selectedTab} index={0}>
          <TargetGapTab />
        </TabPanel>
        <TabPanel value={selectedTab} index={1}>
          <ReductionProgressTab />
        </TabPanel>
        <TabPanel value={selectedTab} index={2}>
          Item Three
        </TabPanel>
      </div>
    </div>
  );
}
