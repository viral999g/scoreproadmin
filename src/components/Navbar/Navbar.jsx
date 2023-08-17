import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router";

const Navbar = () => {
  const navigate = useNavigate();

  const logOutHandler = async () => {
    await localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            ScorePro
          </Typography>
          <Button color="inherit" onClick={logOutHandler}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
