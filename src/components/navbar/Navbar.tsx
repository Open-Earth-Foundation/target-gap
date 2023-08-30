"use client";

import React, { FC } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Image from "next/image";
import Link from "next/link";
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";

interface NavbarProps {
  window?: () => Window;
}

const drawerWidth = 240;

const Navbar: FC<NavbarProps> = ({ window }) => {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };
  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <List>
        <ListItem>
          <ListItemButton>
            <Link href="/documentation">Documentation</Link>
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );
  const container =
    window !== undefined ? () => window().document.body : undefined;
  return (
    <AppBar position="static" sx={{ background: "#008600" }}>
      <Container maxWidth="xl" className="flex items-center h-full">
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
          disableGutters>
          <Box display="flex" alignItems="center" gap="58px">
            <Image
              src="/images/OEFLogo.png"
              height={36}
              width={36}
              alt="OEF_Logo"
            />
            <Box
              sx={{
                display: { xs: "none", md: "flex" },
              }}>
              <Link href="/documentation">
                <Image
                  src="/images/DIGSAnalyticsLogo.svg"
                  height={24}
                  width={123}
                  alt="OEF_Logo"
                />
              </Link>
            </Box>
          </Box>
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <Link href="">
              <Typography fontWeight={600}>Documentation</Typography>
            </Link>
          </Box>
          <Box
            sx={{
              display: { xs: "flex", md: "none" },
            }}>
            <Link href="/documentation">
              <Image
                src="/images/DIGSAnalyticsLogo.svg"
                height={24}
                width={123}
                alt="OEF_Logo"
              />
            </Link>
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="small"
              aria-label="open side navigation menu"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              color="inherit"
              onClick={handleDrawerToggle}>
              <MenuIcon />
            </IconButton>
          </Box>
          <Drawer
            container={container}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true,
            }}
            sx={{
              display: { xs: "block", sm: "none" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
              },
            }}>
            {drawer}
          </Drawer>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
