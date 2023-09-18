import React, { FC } from "react";
import { Button } from "@mui/material";

interface ButtonMainProps {
  bgColor: string;
  border: boolean;
  borderColor: string;
  h?: string;
  w?: string;
  text: string;
  textColor: string;
}

const ButtonMain: FC<ButtonMainProps> = ({
  bgColor,
  border,
  borderColor,
  text,
  textColor,
  h,
  w,
}) => {
  return (
    <Button
      sx={{
        backgroundColor: bgColor,
        borderRadius: "50px",
        color: textColor,
        width: w,
        height: h,
        fontWeight: "600",
        letterSpacing: "1.25px",
        lineHeight: "16px",
        fontSize: "14px",
        border: border ? "2px solid #24BE00" : undefined,
        ":hover": {
          background: "#24BE00",
          color: bgColor === "none" ? "white" : textColor,
        },
      }}>
      {text}
    </Button>
  );
};

export default ButtonMain;
