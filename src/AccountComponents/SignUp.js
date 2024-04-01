import { Container, Card, Grid } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import LoginBgImg from "./../images/login1.png";
import { Typography, TextField } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Link from "@mui/material/Link";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const defaultTheme = createTheme();

function SignUp() {
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const isAuthenticated = () => {
    const token = localStorage.getItem("token");
    return token !== null;
  };

  useEffect(() => {
    // Check authentication status when the component mounts
    if (isAuthenticated()) {
      navigate("/dashboard");
    }
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const data = new FormData(event.currentTarget);
      const firstName = data.get("firstName");
      const lastName = data.get("lastName");
      const email = data.get("email");
      const password = data.get("password");
      const confirmPassword = data.get("confirm-password");

      if (!(firstName && lastName && email && password)) {
        setErrorMessage("Enter Required Details.");
        return;
      }

      if (password !== confirmPassword) {
        setErrorMessage("Passwords do not match.");
        return;
      }
      if (password.length < 8) {
        setErrorMessage("Password must be at least 8 characters long.");
        return;
      }

      const response = await fetch(
        "https://lankanamigov2backend.onrender.com/api/users/signUp",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ firstName, lastName, email, password }),
        }
      );
      if (!response.ok) {
        throw new Error("Signup failed");
      }
      setErrorMessage("");
      navigate("/signIn");
    } catch (error) {
      setErrorMessage("This email is already registered.");
      console.error("Signup failed:", error.message);
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
                    marginTop: 6,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    component="h1"
                    variant="h4"
                    sx={{ fontWeight: "bold", fontFamily: "Poppins" }}
                  >
                    Sign up
                  </Typography>
                  <Typography
                    sx={{
                      fontFamily: "Poppins",
                      fontSize: "1.2rem",
                      marginTop: 2,
                      textAlign: "center",
                    }}
                  >
                    Plan your trips effortlessly and focus on what matters - the
                    adventure!
                  </Typography>
                  <Box
                    component="form"
                    noValidate
                    onSubmit={handleSubmit}
                    sx={{ mt: 2 }}
                  >
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <Typography
                          sx={{
                            color: "red",
                            fontFamily: "Poppins",
                            fontWeight: "600",
                          }}
                        >
                          {errorMessage ? errorMessage : " "}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          autoComplete="given-name"
                          name="firstName"
                          required
                          fullWidth
                          id="firstName"
                          label="First Name"
                          autoFocus
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          required
                          fullWidth
                          id="lastName"
                          label="Last Name"
                          name="lastName"
                          autoComplete="family-name"
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          required
                          fullWidth
                          id="email"
                          label="Email Address"
                          name="email"
                          autoComplete="email"
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          required
                          fullWidth
                          name="password"
                          label="Password"
                          type="password"
                          id="password"
                          autoComplete="new-password"
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          required
                          fullWidth
                          name="confirm-password"
                          label="Confirm Password"
                          type="password"
                          id="confirm-password"
                          autoComplete="off"
                        />
                      </Grid>
                    </Grid>
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{ mt: 3, mb: 3, bgcolor: "#265073" }}
                    >
                      Sign Up
                    </Button>
                    <Grid container justifyContent="space-between">
                      <Grid item>
                        <RouterLink to="/signIn">
                          <Typography
                            sx={{ color: "#265073", fontFamily: "Poppins" }}
                          >
                            Already have an account? Sign in
                          </Typography>
                        </RouterLink>
                      </Grid>
                      <Grid item>
                        <RouterLink to="/">
                          <Typography
                            sx={{ color: "#265073", fontFamily: "Poppins" }}
                          >
                            Back to home
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

export default SignUp;
