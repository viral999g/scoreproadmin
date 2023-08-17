import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { END_POINT } from "../../constants";
import axios from "axios";
import { useState } from "react";
import { CircularProgress } from "@mui/material";
import { useNavigate } from "react-router";

export default function Login() {
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setError("");
    setLoader(true);
    try {
      const { data: res } = await axios.post("/api/admin/login", {
        username: data?.get("email"),
        password: data.get("password"),
      });

      const token = res?.token;
      await localStorage.setItem("token", token);
      navigate("/dashboard");
    } catch (e) {
      console.log(e);
      setError("Invalid credentials!");
    } finally {
      setLoader(false);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 16,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          ScorePro Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />

          <p className="text-sm text-[#f00] mt-3">{error}</p>

          <button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            className="py-3 bg-white w-full text-black mt-5"
          >
            {loader ? (
              <CircularProgress size={16} color="success" />
            ) : (
              "Sign In"
            )}
          </button>
        </Box>
      </Box>
    </Container>
  );
}
