import { Box, Typography } from "@mui/material";
import React, { FC } from "react";

interface HeadingProps {
  titleHighlighted?: string;
  titleDark?: string;
  color: string;
}

const Heading: FC<HeadingProps> = ({ titleHighlighted, color, titleDark }) => {
  return (
    <Box display="flex">
      <Typography
        variant="h1"
        lineHeight="32px"
        sx={{
          fontSize: {
            xs: "24px",
            lg: "32px",
          },
        }}
        fontWeight={600}>
        <span style={{ color: "#008600" }}>{titleHighlighted}</span>
        <span style={{ color: "#232640" }}>{titleDark}</span>
      </Typography>
    </Box>
  );
};

export default Heading;
