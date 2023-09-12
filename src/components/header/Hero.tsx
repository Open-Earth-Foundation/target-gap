import { ReactNode } from "react";
import Image from "next/image";
import { Box, Typography } from "@mui/material";

export default function Hero({ children }: { children: ReactNode }) {
  return (
    <div className="relative">
      <Image
        src="/images/earth.png"
        alt="Picture of the earth taken from space"
        fill
        className="absolute inset-0 object-cover"
      />
      <div className="relative z-10 px-[16px] py-[32px] md:p-16 pb-36 max-w-[1440px] mx-auto h-[430px] md:h-[530px]">
        <Box className="pb-[24px] md:flex gap-2">
          <Typography
            color="#24BE00"
            sx={{
              fontSize: {
                xs: "28px",
                md: "57px",
              },
              lineHeight: {
                xs: "36px",
                md: "64px",
              },
            }}
            fontWeight={600}
            lineHeight="36px"
            fontStyle="normal"
            className="text-[#24BE00]">
            OpenClimate
          </Typography>{" "}
          <Typography
            color="#24BE00"
            sx={{
              fontSize: {
                xs: "28px",
                md: "57px",
              },
              lineHeight: {
                xs: "36px",
                md: "64px",
              },
            }}
            fontWeight={400}
            fontStyle="normal"
            className="text-white">
            DIGS Data Explorer
          </Typography>
        </Box>
        <Typography
          variant="body2"
          fontFamily="sans-serif"
          sx={{
            fontSize: {
              xs: "12px",
              md: "16px",
            },
            lineHeight: {
              xs: "16px",
              md: "24px",
            },
          }}
          fontSize="12px"
          letterSpacing="0.5px"
          fontStyle="normal"
          lineHeight="16px"
          className="mb-[24px] md:mb-[48px] w-[245px] md:w-[656px] text-white">
          Using data available at OpenClimate, we&apos;ve conducted a Digitally
          Enabled Independent Global Stocktake exercise to spotlight the
          alignment and gaps between climate targets and actions of nations,
          regions, and cities.
          <br />
          <br />
          Join us at OpenClimate for collaborative efforts towards an informed
          global climate response.
        </Typography>
        {children}
      </div>
    </div>
  );
}
