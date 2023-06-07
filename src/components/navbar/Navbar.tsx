'use client'

import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Image from 'next/image';

const Navbar = () => {
    return(
        <AppBar className='bg-[#008600] h-20' position="static">
            <Container maxWidth="xl" className='flex items-center h-full'>
                <Toolbar disableGutters>
                    <Image 
                        src="/images/OEFLogo.svg"
                        height={150}
                        width={150}
                        alt='OEF_Logo'

                    />
                    <Typography
                    variant="h6"
                    noWrap
                    component="a"
                    href="/"
                    sx={{
                        ml:2,
                        borderLeft: "2px solid #ffffff",
                        pl:2,
                        display: { xs: 'none', md: 'flex' },
                        fontFamily: 'inherit',
                        fontWeight: 400,
                        color: 'inherit',
                        textDecoration: 'none',
                    }}
                    >
                    Target Gap Visualiser
                    </Typography>
        
                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                    <IconButton
                        size="large"
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        color="inherit"
                    >
                        <MenuIcon />
                    </IconButton>
                    </Box>
                    <Typography
                    variant="h5"
                    noWrap
                    component="a"
                    href=""
                    sx={{
                        mr: 2,
                        display: { xs: 'flex', md: 'none' },
                        flexGrow: 1,
                        fontFamily: 'monospace',
                        fontWeight: 700,
                        letterSpacing: '.3rem',
                        color: 'inherit',
                        textDecoration: 'none',
                    }}
                    >
                        Target Gap Visualiser
                    </Typography>
                </Toolbar>
        </Container>
      </AppBar>
    )
}

export default Navbar