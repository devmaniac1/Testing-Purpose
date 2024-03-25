import {
  Button,
  Card,
  CardContent,
  Container,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  CssBaseline,
  Typography,
  Box,
} from "@mui/material";
import Navbar from "./Navbar";
import LoginBgImg from "./images/login1.png";
import ProfileImg from "./images/profile.jpg";
import "./Dashboard.css";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const plans = [
  { planname: "plan-001", budget: 1000, date: "2024-07-15" },
  { planname: "Trip to galle", budget: 5000, date: "2024-09-01" },
  { planname: "Ella Trip", budget: 8000, date: "2025-01-10" },
  { planname: "Camping trip 2", budget: 20000, date: "2024-12-31" },
];

const pastPlans = [
  { planname: "plan-001", budget: 1000, date: "2024-07-15" },
  { planname: "Trip to galle", budget: 5000, date: "2024-09-01" },
  { planname: "Ella Trip", budget: 8000, date: "2025-01-10" },
];

const profileDetails = {
  firstname: "Sidu",
  lastname: "Gamage",
  username: "sidugamage",
  email: "sidugamage@gmail.com",
};

function Dashboard() {
  const [displayedContent, setDisplayedContent] = useState("yourPlans");
  const navigate = useNavigate();

  const [userData, setUserData] = useState(null);

  useEffect(() => {
    async function fetchUserData() {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("Token not found");
          return;
        }

        const decodedToken = jwtDecode(token);
        console.log(decodedToken);
        const userId = decodedToken.id;

        const response = await fetch(
          `https://lankanamigov2backend.onrender.com/api/users/${userId}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          console.error("Failed to fetch user data:", response.statusText);
          return;
        }

        const userData = await response.json();
        setUserData(userData.user); // Assuming the response contains a 'user' object
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }

    fetchUserData();
  }, []);

  const handleLogout = () => {
    // Clear the token from localStorage
    localStorage.removeItem("token");

    // Navigate to the login page or any other appropriate route
    navigate("/");
  };

  const handleYourPlansClick = () => {
    setDisplayedContent("yourPlans");
  };

  const handlePastPlansClick = () => {
    setDisplayedContent("pastPlans");
  };

  const handleYourProfileClick = () => {
    setDisplayedContent("yourProfile");
  };

  return (
    <>
      <CssBaseline />

      <Box display="flex" minHeight="100vh">
        <Box
          minWidth="20%"
          sx={{
            background: "linear-gradient(45deg, #6D48D9 0%, #8F65B0 100%)",
          }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
            }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                m: "8rem",
              }}>
              <div
                style={{
                  borderRadius: "10rem",
                  border: "2px solid white",
                  height: "12rem",
                  width: "12rem",
                }}></div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                  marginTop: "2rem",
                }}>
                <Typography variant="h5" fontWeight="bold" color="white">
                  {userData && userData.firstName + " " + userData.lastName}
                </Typography>
                <Typography variant="h6" fontWeight="normal" color="white">
                  {userData &&
                    "@" +
                      userData.firstName.toLowerCase() +
                      userData.lastName.toLowerCase()}
                </Typography>
              </div>
            </Box>
            <Box
              alignItems="center"
              display="flex"
              flexDirection="column"
              justifyContent="center">
              {/* Handle clicks on anchor tags */}
              <a class="menu__link" href="#" onClick={handleYourProfileClick}>
                Your Profile
              </a>
              <a class="menu__link" href="#" onClick={handleYourPlansClick}>
                Your Plans
              </a>
              <a class="menu__link" href="#" onClick={handlePastPlansClick}>
                Past Plans
              </a>
              <p class="menu__link" onClick={handleLogout}>
                Log Out
              </p>
            </Box>
          </Box>
        </Box>

        <Box>
          <Box
            minHeight="40rem"
            margin="10rem 10rem 2rem 10rem"
            p="2rem"
            minWidth="65vw"
            borderRadius="5px"
            sx={{
              background: "linear-gradient(45deg, #6D48D9 0%, #8F65B0 100%)",
            }}>
            {/* Conditionally render content based on displayedContent state */}
            {displayedContent === "yourPlans" && (
              <>
                <Typography
                  variant="h3"
                  fontWeight="bold"
                  color="white"
                  sx={{ m: "2vh 0.5vw 3vh 0.5vw" }}>
                  Your Plans
                </Typography>
                {userData &&
                  userData.days &&
                  userData.days.map((trip, i) => {
                    trip !== null && <TripDetailCard trip={trip} />;
                  })}
              </>
            )}

            {displayedContent === "pastPlans" && (
              <>
                <Typography
                  variant="h3"
                  fontWeight="bold"
                  color="white"
                  sx={{ m: "2vh 0.5vw 3vh 0.5vw" }}>
                  Past Plans
                </Typography>
                {/* Render past plans here */}
                {/* {pastPlans.map((trip) => (
                  <TripDetailCard
                    tripname={trip.planname}
                    budget={trip.budget}
                    date={trip.date}
                    key={trip.planname}
                  />
                ))} */}
              </>
            )}

            {displayedContent === "yourProfile" && (
              <>
                <Typography
                  variant="h3"
                  fontWeight="bold"
                  color="white"
                  sx={{ m: "2vh 0.5vw 3vh 0.5vw" }}>
                  Your Profile
                </Typography>
                <YourProfile userData={userData} />
              </>
            )}
          </Box>
          <Link to="/">
            <Button
              variant="contained"
              size="large"
              sx={{ ml: "10rem", fontSize: "1.2rem" }}>
              Back to home
            </Button>
          </Link>
        </Box>
      </Box>
    </>
  );
}

function TripDetailCard({ trip, index }) {
  console.log(trip);
  return (
    <Card
      variant="outlined"
      sx={{ m: "2vh 0", pb: "0", minHeight: "1vh", color: "#265073" }}>
      <CardContent
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "16px",
        }}>
        <Typography
          variant="h5"
          component="h1"
          fontWeight="bold"
          style={{ minWidth: "20vw" }}>
          Plan
        </Typography>

        <Typography variant="h5" component="h1" style={{ minWidth: "12vw" }}>
          {/* Budget: Rs. {props.budget} */}
        </Typography>

        <Typography variant="h5" component="h1" style={{ minWidth: "10vw" }}>
          Date: {trip[0].fromDate}
        </Typography>
        <Button
          variant="contained"
          size="medium"
          style={{ fontSize: "1.2rem" }}>
          VIEW
        </Button>
      </CardContent>
    </Card>
  );
}

function YourProfile({ userData }) {
  return (
    <>
      <Card
        variant="outlined"
        sx={{
          m: "2vh 0",
          p: "2rem",
          minHeight: "40vh",
          color: "#265073",
          display: "flex",
        }}>
        <div style={{ margin: "3rem" }}>
          <div
            style={{
              borderRadius: "10rem",
              border: "2px solid black",
              height: "14rem",
              width: "14rem",
            }}></div>
        </div>
        <div style={{ margin: "3rem" }}>
          <div>
            <Typography variant="h3" component="h1" fontWeight="bold">
              {userData && userData.firstName + " " + userData.lastName}
            </Typography>
            <Typography variant="h4" component="h1">
              {userData &&
                "@" +
                  userData.firstName.toLowerCase() +
                  userData.lastName.toLowerCase()}
            </Typography>
          </div>

          <div style={{ margin: "2vh 0" }}>
            <Typography variant="h5" component="h1">
              <span style={{ fontWeight: "bold" }}>email:</span>{" "}
              {userData && userData.email}
            </Typography>
          </div>
          <Button variant="outlined">Edit profile</Button>
        </div>
      </Card>
    </>
  );
}

export default Dashboard;
