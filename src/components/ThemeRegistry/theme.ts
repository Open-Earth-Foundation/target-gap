"use client";

import {
  createTheme,
  ThemeOptions,
  Palette,
  PaletteOptions,
} from "@mui/material/styles";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

const defaultTheme = createTheme(
  {
    palette: {
      primary: { main: "#008600" },
      info: { main: "#2351DC" },
      secondary: { main: "#24BE00" },
    },
    typography: {
      fontFamily: poppins.style.fontFamily,
      body1: { fontFamily: poppins.style.fontFamily },
      body2: { fontFamily: poppins.style.fontFamily },
    },
  },
  {} satisfies ThemeOptions,
);

export default defaultTheme;
