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
        <AppBar position="static" sx={{background: "#008600"}}>
            <Container maxWidth="xl" className='flex items-center h-full'>
                <Toolbar disableGutters>
                    <Image 
                        src="/images/OEFLogo.png"
                        height={36}
                        width={36}
                        alt='OEF_Logo'

                    />
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            ml:6,
                            pl:2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'inherit',
                            fontWeight: 600,
                            fontSize: "16px",
                            color: 'inherit',
                            textDecoration: 'none',
                            
                        }}
                    >
                    TargetGapVisualiser
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
                        TargetGapVisualiser
                    </Typography>
                </Toolbar>
        </Container>
      </AppBar>
    )
}

export default Navbar