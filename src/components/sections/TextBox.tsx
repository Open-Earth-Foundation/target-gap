'use client'

import React, { FC } from "react"
import Container from '@mui/material/Container';

interface HeroProps {
  coloredTitle?: string,
  otherTitle?: string,
  description: string
}

const TextBox: FC<HeroProps> = ({ description, coloredTitle, otherTitle }) => {
  return (
    <Container maxWidth="xl" className='items-center h-full'>
      <h1 className="text-3xl font-bold pb-4"><span className="text-[#008600]">{coloredTitle}</span> <span className="text-[#00001F]">{otherTitle}</span></h1>
      <p className="text-lg font-light pb-8">
        {description}
      </p>
    </Container>
  );
}

export default TextBox;
