"use client";

import { Box, Button, Divider } from "@mui/material";
import Container from "@mui/material/Container";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <Box
      sx={{
        height: {
          xs: "592px",
          md: "320px",
        },
      }}
      bgcolor="#00001F">
      <Container maxWidth="lg">
        <Box className="flex flex-col gap-[48px]">
          <Box className="flex flex-col md:pt-[48px] md:flex-row md:items-center h-1/2 justify-between gap-[36px]">
            <Box className="pt-[130px] md:pt-0 flex flex-col md:flex-row gap-[36px]">
              <Box>
                <Image
                  src="/images/DIGSAnalyticsFooter.svg"
                  alt="digs footer logo"
                  height={200}
                  width={148}
                />
              </Box>
              <Box className="grid grid-cols-2 md:grid-cols-4 gap-[24px]">
                <Link
                  className="text-white text-[14px]"
                  href="https://www.openearth.org/projects/openclimate">
                  About OpenClimate
                </Link>
                <Link
                  className="text-white text-[14px]"
                  href="https://www.openearth.org/projects/openclimate">
                  Go to GitHub
                </Link>
                <Link
                  className="text-white text-[14px]"
                  href="https://www.openearth.org/projects/openclimate">
                  Read the Docs
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
              <p className="text-white text-[12px] leading-4 mr-5">
                This site is a beta version, we appreciate all feedback to
                improve the platform
              </p>
              <Link
                className="text-white font-[500] text-[12px] underline"
                href="mailto:ux@openearth.org">
                Send Feedback
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
      </Container>
    </Box>
  );
};

export default Footer;
