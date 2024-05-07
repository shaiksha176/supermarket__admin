import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { Box, Stack } from "@mui/material";
import Header from "../components/header/Header";
const Layout = () => {
  return (
    <Stack direction="row">
      <Sidebar />
      <Box flex={1} sx={{ p: 3 }}>
        <Header />
        <br />
        <br />
        <Outlet />
      </Box>
    </Stack>
  );
};

export default Layout;
