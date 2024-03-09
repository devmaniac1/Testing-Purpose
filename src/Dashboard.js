import { Button, Card, CardContent, Typography } from "@mui/material";
import Navbar from "./Navbar";
import LoginBgImg from "./images/login1.png";
import ProfileImg from "./images/profile.jpg";

function Dashboard() {
  return(
    <div>   
      <div className="dashboard--mainContainer" style={{margin: "0 15%", height:"100vh"}}>
        <ProdileDetails img={ProfileImg} name="John Smith" username="@johnsmith"/>
        <Card variant="outlined" sx={{p: "0 2vh", m: "2vh 0vw"}}>
          <h1 style={{padding: "3vh 1vw 1.5vh 1vw", fontSize: "4rem", fontFamily: "roboto"}}>My Plans</h1>
          <TripDetailCard tripname="Trip name 001" budget="25000.00" date="02/06/2024"/>
          <TripDetailCard tripname="Trip name 001" budget="25000.00" date="02/06/2024"/>
          <TripDetailCard tripname="Trip name 001" budget="25000.00" date="02/06/2024"/>
        </Card>

        <Button variant="outlined" style={{backgroundImage: "LoginBgImg"}}>Events</Button>
      </div>

    </div>

  )
}


function TripDetailCard(props) {
  return(
    <Card variant="outlined" sx={{m: "2vh 0", backgroundColor: "#ECF4D6", color: "#265073"}}>
      <CardContent sx={{display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px"}}>
        <Typography variant="h4" component="h1" fontWeight="bold">
          {props.tripname}
        </Typography>
        <Typography variant="h4" component="h1">
          Budget: Rs. {props.budget}
        </Typography>
        <Typography variant="h4" component="h1">
          Date: {props.date}
        </Typography>
        <Button variant="contained" size="medium" style={{fontSize: "1.2rem"}}>
          VIEW
        </Button>
      </CardContent>
    </Card>
  )
}

function ProdileDetails(props) {
  return(
    <div style={{padding: "5vh ", display: "flex", alignItems: "center"}}>
      <img src={props.img} style={{
        width: "10rem", 
        height: "10rem", 
        borderRadius: "5rem", 
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat"  
      }}/>
      <div style={{ marginLeft: "1vw"}}>
        <Typography variant="h3" fontWeight="bold">{props.name}</Typography>
        <Typography variant="h4" component="h1" color="rgba(0, 0, 0, 0.49)">{props.username}</Typography>
      </div>

    </div>

  // <div style={{width: "10rem", height: "10rem", border: "1px solid black", borderRadius: "5rem"}}>

  // </div>
  )
}

export default Dashboard;