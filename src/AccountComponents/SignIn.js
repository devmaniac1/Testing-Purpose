import { Container, Card } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { Typography, TextField } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import LoginBgImg from "./../images/login1.png";

import { useNavigate, Link as RouterLink } from "react-router-dom";
import { useState } from "react";

const defaultTheme = createTheme();

function SignIn() {
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const userData = new FormData(event.currentTarget);
      const email = userData.get("email");
      const password = userData.get("password");
      if (!(email && password)) {
        setErrorMessage("Enter Required Details.");
        return;
      }
      const response = await fetch(
        "https://lankanamigov2backend.onrender.com/api/users/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );
      if (!response.ok) {
        throw new Error("Invalid credentials");
      }
      const data = await response.json();
      localStorage.setItem("token", data.token);
      setErrorMessage("");
      navigate("/dashboard", { state: data });
    } catch (error) {
      setErrorMessage("Wrong Credentials.");
      console.error("Login failed:", error.message);
    }
  };

  return (
    <div
      style={{
        backgroundImage: `url(${LoginBgImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        width: "100vw",
        height: "100vh",
        backgroundBlendMode: "overlay",
        backgroundColor: "hsla(0, 0%, 0%, 0.3)",
      }}
    >
      <Container
        sx={{
          width: "100%",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            width: { xs: "90%", sm: "80%", md: "70%" },
            alignItems: "center",
            display: "flex",
            justifyContent: "space-between",
            flexDirection: { xs: "column", sm: "row" },
          }}
        >
          <Typography
            variant="h1"
            sx={{
              fontFamily: '"Katibeh", serif',
              fontStyle: "normal",
              fontWeight: "bold",
              fontSize: { xs: "6rem", sm: "8rem" },
              color: "WHITE",
              mx: 4,
              textAlign: "center",
            }}
          >
            Lankan Amigo
          </Typography>
          <Card variant="outlined" sx={{ width: "100%", pb: 4, my: 4 }}>
            <ThemeProvider theme={defaultTheme}>
              <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                  sx={{
                    marginTop: 8,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    component="h1"
                    variant="h4"
                    sx={{ fontWeight: "bold" }}
                  >
                    Sign in
                  </Typography>

                  <Box
                    component="form"
                    onSubmit={handleSubmit}
                    noValidate
                    sx={{ mt: 1 }}
                  >
                    <Typography
                      sx={{
                        color: "red",
                        fontFamily: "Poppins",
                        fontWeight: "600",
                      }}
                    >
                      {errorMessage ? errorMessage : " "}
                    </Typography>
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
                    <FormControlLabel
                      control={<Checkbox value="remember" color="primary" />}
                      label="Remember me"
                    />
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{ mt: 3, mb: 2, bgcolor: "green" }}
                    >
                      Sign In
                    </Button>
                    <Grid container spacing={1} justifyContent="center">
                      <Grid item xs>
                        <RouterLink to="/ass">
                          <Typography
                            sx={{
                              color: "#265073",
                              fontFamily: "Poppins",
                              textAlign: "center",
                            }}
                          >
                            Forgot Password
                          </Typography>
                        </RouterLink>
                      </Grid>
                      <Grid item>
                        <RouterLink to="/signUp">
                          <Typography
                            sx={{
                              color: "#265073",
                              fontFamily: "Poppins",
                              textAlign: "center",
                            }}
                          >
                            Don't have an account? Sign Up
                          </Typography>
                        </RouterLink>
                      </Grid>
                    </Grid>
                  </Box>
                </Box>
              </Container>
            </ThemeProvider>
          </Card>
        </Box>
      </Container>
    </div>
  );
}

export default SignIn;
