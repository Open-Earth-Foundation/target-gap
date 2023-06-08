'use client'

import React, {FC} from "react"
import Container from '@mui/material/Container';

interface HeroProps {
    title?: string,
    description: string
}

const TextBox:FC<HeroProps> = ({description, title}) => {
    return(
        <div className="
            h-72
            py-16
            w-full
            flex
            items-center
        ">
            <Container maxWidth="xl" className='flex items-center h-full'>
                <h1>{title}</h1>
                <p className="w-1/2 text-xl font-light py-10">
                    {description}
                </p>
            </Container>
            
        </div>
    )
}

export default TextBox;
