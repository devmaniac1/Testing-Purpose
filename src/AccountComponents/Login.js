import { Container } from "@mui/material";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
// import Typography from "@mui/material/Typography";
import { Typography, TextField } from "@mui/material";
// import TextField from "@mui/material/TextField";
// import "./App.css";
import LoginBgImg from "./../images/login1.png";

import CssBaseline from "@mui/material/CssBaseline";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import SignIn from "./SignIn.js";
import SignUp from "./SignUp.js";

function Login() {
  const [signUp, setSignUp] = useState(true);

  const handleSignPage = () => {
    setSignUp(!signUp);
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
      }}
    >
      <Container
        sx={{
          width: "70%",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            minWidth: 275,
            alignItems: "center",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Typography
            variant="h1"
            sx={{
              fontFamily: '"Katibeh", serif',
              fontStyle: "normal",
              fontWeight: "bold",
              fontSize: "8rem",
              color: "WHITE",
              mx: 8,
            }}
          >
            Lankan Amigo
          </Typography>
          <Card variant="outlined" sx={{ width: "25vw", pb: 4, my: 4, mx: 8 }}>
            {signUp ? (
              <SignUp handleSignPage={handleSignPage} />
            ) : (
              <SignIn handleSignPage={handleSignPage} />
            )}
          </Card>
        </Box>
      </Container>
    </div>
  );
}

export default Login;
