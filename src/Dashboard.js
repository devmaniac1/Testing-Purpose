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
import { useLocation } from "react-router-dom";

const plans = [
  { planname: "plan-001", budget: 1000, date: "2024-07-15" },
  { planname: "Trip to galle", budget: 5000, date: "2024-09-01" },
  { planname: "Ella Trip", budget: 8000, date: "2025-01-10" },
  { planname: "Camping trip 2", budget: 20000, date: "2024-12-31" },
];

function Dashboard({ viewportWidth }) {
  const location = useLocation();
  const data = location.state;
  console.log(data);
  const style = {
    position: "absolute",
    color: "#000",
  };
  const items = [{ name: "Home", path: "/" }];
  return (
    <>
      <CssBaseline />
      <Navbar style={style} viewportWidth={viewportWidth} items={items} />
      <Box display="flex" height="100vh">
        <Box
          minWidth="20%"
          sx={{
            background: "linear-gradient(45deg, #6D48D9 0%, #8F65B0 100%)",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                m: "8rem",
              }}
            >
              <div
                style={{
                  borderRadius: "10rem",
                  border: "2px solid white",
                  height: "12rem",
                  width: "12rem",
                }}
              ></div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                  marginTop: "2rem",
                }}
              >
                <Typography variant="h5" fontWeight="bold" color="white">
                  {data.data.user.firstName + " " + data.data.user.lastName}
                </Typography>
                <Typography variant="h6" fontWeight="normal" color="white">
                  @
                  {data.data.user.firstName.toLowerCase() +
                    data.data.user.lastName.toLowerCase()}
                </Typography>
              </div>
            </Box>
            <Box
              alignItems="center"
              display="flex"
              flexDirection="column"
              justifyContent="center"
            >
              <a class="menu__link" href="#">
                Your Trips
              </a>
              <a class="menu__link" href="#">
                Past Trips
              </a>
              <a class="menu__link" href="#">
                Log out
              </a>
            </Box>
          </Box>
        </Box>

        <Box>
          <Box
            minHeight="40rem"
            margin="10rem"
            p="2rem"
            minWidth="60vh"
            borderRadius="5px"
            sx={{
              background: "linear-gradient(45deg, #6D48D9 0%, #8F65B0 100%)",
            }}
          >
            <TripDetailCard />
          </Box>
        </Box>
      </Box>
    </>
  );
}

function TripDetailCard(props) {
  return (
    <Card
      variant="outlined"
      sx={{ m: "2vh 0", backgroundColor: "#ECF4D6", color: "#265073" }}
    >
      <CardContent
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "16px",
        }}
      >
        <Typography
          variant="h4"
          component="h1"
          fontWeight="bold"
          style={{ minWidth: "20vw" }}
        >
          {props.tripname}
        </Typography>

        <Typography variant="h4" component="h1" style={{ minWidth: "12vw" }}>
          Budget: Rs. {props.budget}
        </Typography>

        <Typography variant="h4" component="h1" style={{ minWidth: "10vw" }}>
          Date: {props.date}
        </Typography>
        <Button
          variant="contained"
          size="medium"
          style={{ fontSize: "1.2rem" }}
        >
          VIEW
        </Button>
      </CardContent>
    </Card>
  );
}

function ProdileDetails(props) {
  return (
    <div style={{ padding: "5vh ", display: "flex", alignItems: "center" }}>
      <img
        src={props.img}
        style={{
          width: "10rem",
          height: "10rem",
          borderRadius: "5rem",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      />
      <div style={{ marginLeft: "1vw" }}>
        <Typography variant="h3" fontWeight="bold">
          {props.name}
        </Typography>
        <Typography variant="h4" component="h1" color="rgba(0, 0, 0, 0.49)">
          {props.username}
        </Typography>
      </div>
    </div>

    // <div style={{width: "10rem", height: "10rem", border: "1px solid black", borderRadius: "5rem"}}>

    // </div>
  );
}

export default Dashboard;
