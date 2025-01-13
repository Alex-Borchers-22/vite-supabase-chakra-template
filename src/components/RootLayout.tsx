import { Box } from "@chakra-ui/react";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

export default function RootLayout() {
  return (
    <Box minH="100vh">
      <Navbar />
      <Box className="content_container">
        <Outlet />
      </Box>
    </Box>
  );
} 