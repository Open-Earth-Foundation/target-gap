'use client';

import { createTheme, ThemeOptions } from '@mui/material/styles';
import { Poppins } from 'next/font/google';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ["300", "400", "500", "600"],
});

const defaultTheme = createTheme(
  {
    palette: {
      primary: { main: '#008600' },
      info: { main: '#2351DC', light: '#C5CBF5' },
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

