"use client";

import { Typography } from "@mui/material";
import React, { FC } from "react";

interface HeroProps {
  coloredTitle?: string;
  otherTitle?: string;
  description: string;
}

const TextBox: FC<HeroProps> = ({ description, coloredTitle, otherTitle }) => {
  return (
    <div className="max-w-layout items-center h-full">
      <h1 className="text-3xl font-bold pb-4">
        <span className="text-[#008600]">{coloredTitle}</span>{" "}
        <span className="text-[#00001F]">{otherTitle}</span>
      </h1>
      <Typography
        variant="body2"
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
        fontStyle="normal"
        fontWeight="400"
        letterSpacing="0.5px"
        paddingBottom="32px">
        {description}
      </Typography>
    </div>
  );
};

export default TextBox;
