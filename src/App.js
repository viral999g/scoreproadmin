import "./App.css";
import { Outlet, useNavigate } from "react-router";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { useEffect } from "react";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function App() {
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/dashboard");
    } else {
      navigate("/login");
    }
  }, [navigate]);
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Outlet />
    </ThemeProvider>
  );
}

export default App;
