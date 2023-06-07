'use client'

import Container from '@mui/material/Container';

const Emissions = () => {
    return(
         <div className=''>
            <Container maxWidth="xl" className='flex items-center h-full'>
                <p className='text-3xl font-bold'>Emissions for the next national target year (2030)</p>
                {/* Graph can go here */}
            </Container>
        </div>
    )
}

export default Emissions;