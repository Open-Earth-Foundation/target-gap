"use client";

import { BASE_URL } from "@/lib/api";
import { Box, Button, Divider, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <Box
      sx={{
        height: {
          xs: "650px",
          md: "320px",
        },
      }}
      bgcolor="#00001F">
      <div className="max-w-layout mx-auto px-[16px]">
        <Box className="flex flex-col gap-[48px]">
          <Box className="flex flex-col md:pt-[48px] md:flex-row md:items-center h-1/2 justify-between gap-[36px]">
            <Box className="pt-[100px] md:pt-0 flex flex-col md:flex-row gap-[36px] md:gap-[48px]">
              <Box>
                <Image
                  src="/images/OpenClimateDIGSDataExplorerLogo.svg"
                  alt="digs footer logo"
                  height={200}
                  width={200}
                />
              </Box>
              <Box className="grid grid-cols-2 md:flex gap-[24px] md:gap-[48px]">
                <Link
                  className="text-white text-[14px]"
                  href="https://www.openearth.org/projects/openclimate">
                  <Typography
                    sx={{ fontSize: { xs: "12px", md: "14px" } }}
                    fontWeight="500"
                    lineHeight="20px"
                    letterSpacing="0.5px">
                    About US
                  </Typography>
                </Link>
                <Link
                  className="text-white text-[14px]"
                  href="https://www.openearth.org/projects/openclimate">
                  <Typography
                    sx={{ fontSize: { xs: "12px", md: "14px" } }}
                    fontWeight="500"
                    lineHeight="20px"
                    letterSpacing="0.5px">
                    About OpenClimate
                  </Typography>
                </Link>
                <Link className="text-white text-[14px]" href={`${BASE_URL}`}>
                  <Typography
                    sx={{ fontSize: { xs: "12px", md: "14px" } }}
                    fontWeight="500"
                    lineHeight="20px"
                    letterSpacing="0.5px">
                    OpenClimate Platform
                  </Typography>
                </Link>
                <Link
                  className="text-white text-[14px]"
                  href="https://www.openearth.org/projects/openclimate">
                  <Typography
                    sx={{ fontSize: { xs: "12px", md: "14px" } }}
                    fontWeight="500"
                    lineHeight="20px"
                    letterSpacing="0.5px">
                    Go to GitHub
                  </Typography>
                </Link>
                <Link
                  className="text-white text-[14px]"
                  href="https://www.openearth.org/projects/openclimate">
                  <Typography
                    sx={{ fontSize: { xs: "12px", md: "14px" } }}
                    fontWeight="500"
                    lineHeight="20px"
                    letterSpacing="0.5px">
                    Read the Docs
                  </Typography>
                </Link>
              </Box>
            </Box>
            <Box>
              <Link href="mailto:info@openearth.org">
                <Button
                  sx={{
                    border: "2px solid #5FE500",
                    fontWeight: 600,
                    lineHeight: "16px",
                    letterSpacing: "1.25px",
                  }}
                  className="
                  h-[48px]
                  w-full
                  text-[#5FE500]
                  px-5
                  rounded-full">
                  CONTACT US
                </Button>
              </Link>
            </Box>
          </Box>
          <Divider className="w-full bg-[#232640]" light />
          <Box className="flex flex-col md:flex-row items-center justify-between gap-[18px]">
            <Box className="flex flex-col md:flex-row w-full md:w-3/4 gap-[18px]">
              <Box className="bg-[#D7D8FA] flex justify-center font-medium pt-[2px] text-center w-[45px] h-[20px] text-[11px] leading-4 rounded-full mr-5">
                BETA
              </Box>
              <Typography
                sx={{ fontSize: { xs: "12px", md: "14px" } }}
                fontWeight="500"
                lineHeight="20px"
                letterSpacing="0.5px"
                variant="body2"
                color="white">
                This site is a beta version, we appreciate all feedback to
                improve the platform
              </Typography>
              <Link href="mailto:ux@openearth.org">
                <Typography
                  sx={{ fontSize: { xs: "12px", md: "14px" } }}
                  fontWeight="500"
                  className="underline"
                  color="white"
                  lineHeight="20px"
                  letterSpacing="0.5px">
                  Send Feedback
                </Typography>
              </Link>
            </Box>
            <Box className="flex justify-end w-full md:w-1/4">
              <a href="https://openearth.org">
                <Image
                  src="/images/OEFLogo.svg"
                  alt="OEF_Logo"
                  height={150}
                  width={107}
                  className="md:w-[142px]"
                />
              </a>
            </Box>
          </Box>
        </Box>
      </div>
    </Box>
  );
};

export default Footer;
