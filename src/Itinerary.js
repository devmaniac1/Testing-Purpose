import "./Itinerary.css";
import "./home-components/Home.js";
import "./home-components/Home.css";
import { jwtDecode } from "jwt-decode";

import { Link } from "react-router-dom";
import { Autocomplete, useJsApiLoader } from "@react-google-maps/api";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";

import "react-vertical-timeline-component/style.min.css";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import {
  Accordion,
  Button,
  Card,
  Typography,
  useScrollTrigger,
  AccordionSummary,
  AccordionDetails,
  Modal,
  Box,
  TextField,
} from "@mui/material";
// import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import testIMG from "./images/Slide images/slideI3.jpg";

// Event Details Sample Array
const eventDetails = [
  { eventName: "Tomorrow Land", price: 10000, date: "2022/02/15" },
  { eventName: "Tomorrow Land", price: 10000, date: "2022/02/15" },
];

// let days = [];

function Itinerary({
  toLocation,
  toDate,
  fromDate,
  budget,
  travelMode,
  response,
  busRoute,
}) {
  // const toLocation = "Nuwara Eliya, Sri Lanka";
  // const toDate = "2024-03-13";
  // const fromDate = "2024-03-10";
  // const budget = 25000;
  const [hotelsData, setHotelsData] = useState(null);
  const [filteredHotel, setFIlteredHotel] = useState(null);
  const [placesData, setPlacesData] = useState(null);
  const [filteredPlacesData, setFilteredPlacesData] = useState(null);
  const [days, setDays] = useState([]);
  const [travelBudget, setTravelBudget] = useState(null);
  const [events, setEvents] = useState(null);

  const toDateObj = new Date(toDate);
  const fromDateObj = new Date(fromDate);
  const differenceInTime = toDateObj.getTime() - fromDateObj.getTime();
  const numberOfDays = differenceInTime / (1000 * 3600 * 24);

  const addDay = (day) => {
    setDays((existingDays) => [...existingDays, day]);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://lankanamigov2backend.onrender.com/serpAPI/Google-hotels",
          {
            params: {
              toLocation: toLocation,
              toDate: toDate,
              fromDate: fromDate,
              budget: Math.trunc(
                (Number(budget) * 0.5) / 307.56 / numberOfDays
              ),
              travelMode: travelMode,
            },
          }
        );

        setHotelsData(response.data.properties);

        const reponcePlaces = await axios.get(
          "https://lankanamigov2backend.onrender.com/serpAPI/places",
          {
            params: {
              toLocation: toLocation,
            },
          }
        );
        setPlacesData(reponcePlaces.data.top_sights.sights);

        const responseEvents = await axios.get(
          "https://lankanamigov2backend.onrender.com/serpAPI/events",
          {
            params: {
              toLocation: toLocation,
              fromDate: fromDate,
            },
          }
        );

        setEvents(responseEvents.data.events_results);

        if (busRoute) {
          const StopFare = busRoute.reduce((acc, curr) => acc + curr, 0);
          const res = await axios.get(
            "https://lankanamigov2backend.onrender.com/busFare",
            {
              params: { StopFare: StopFare },
            }
          );

          setTravelBudget(res.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [busRoute]);

  useEffect(() => {
    if (hotelsData && placesData) {
      filterData(hotelsData);
      filterHotel(hotelsData);
      filterNearby(placesData);
      filteredHotel && filteredPlacesData && createItinerary();
    }
  }, [hotelsData, placesData]);

  function filterData(hotelsData) {
    // hotelsData.sort((a, b) => b.overall_rating - a.overall_rating);
    hotelsData.sort((a, b) => b.reviews - a.reviews);
    // console.log(hotelsData);
  }

  function filterHotel(hotelsData) {
    const filter = hotelsData && hotelsData.filter((hotel) => hotel.reviews);
    if (filter && filter.length > 0) {
      const totalReviews = filter.reduce(
        (acc, hotel) => acc + hotel.reviews,
        0
      );
      const meanReviews = totalReviews / filter.length;
      const filterHotel = filter.filter(
        (hotel) => hotel.reviews >= meanReviews
      );
      filterHotel.sort((a, b) => b.overall_rating - a.overall_rating);
      setFIlteredHotel(filterHotel);
    }
  }

  function filterNearby(placesData) {
    placesData.sort((a, b) => b.rating - a.rating);

    const filteredData = placesData.filter(
      (place) =>
        place.description === "Tourist attraction" ||
        place.description === "Hiking area" ||
        place.description === "Bridge" ||
        place.description.toLowerCase().includes("museum") ||
        place.description.toLowerCase().includes("fortress") ||
        place.description.toLowerCase().includes("national") ||
        place.description.toLowerCase().includes("temple") ||
        place.description.toLowerCase().includes("historical")
    );
    setFilteredPlacesData(filteredData);
  }

  const createItinerary = () => {
    if (filteredHotel && filteredPlacesData) {
      const placePerDay = Math.trunc(filteredPlacesData.length / numberOfDays);
      let index = 0;
      // days = [];
      setDays([]);
      for (let i = 1; i <= numberOfDays; i++) {
        let slicedObjects = filteredPlacesData.slice(
          index,
          index + placePerDay
        );
        // console.log(slicedObjects.map((obj) => obj.name));
        index += placePerDay;
        addDay({
          day: i,
          fromate: fromDate,
          toDate: toDate,
          location: toLocation.split(",")[0],
          accommadation: filteredHotel[0].name,
          accPrice: filteredHotel[0].total_rate.extracted_lowest * 307.5,
          placesToVisit: slicedObjects.map((obj) => obj),
          events: ["a"],
          foodAlloc: { breakfast: 200, lunch: 600, dinner: 800 },
        });
      }
    }
  };

  return (
    <div className="main_itinerary">
      <BannerContainer
        toLocation={toLocation}
        fromDate={fromDate}
        toDate={toDate}
      />
      <CustomizePlanModal days={days} />
      <AllAccommodationsCard
        filteredHotel={filteredHotel}
        toLocation={toLocation}
        daysNum={numberOfDays}
      />
      {days && <DaysDetailsCard days={days} toLocation={toLocation} />}
      {/* <DayDetailCard placeInfo={placesDetails} /> */}

      {events && <EventsCard events={events}></EventsCard>}
      {/* <GeneratePlan /> */}
      <BudgetTrackerCard travelBudget={travelBudget} days={days} />
    </div>
  );
}

function BannerContainer({ toLocation, fromDate, toDate }) {
  return (
    <div className="banner-container">
      <img src="../banner.jpg" alt="" />
      <div className="transparent-box">
        <p>Trip to {toLocation}</p>
        <div className="date-info">
          <div className="date-svg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z"
              />
            </svg>
          </div>
          <p>Start Date: {fromDate}</p>
          <p>|</p>
          <p>End Date: {toDate}</p>
        </div>
      </div>
    </div>
  );
}

function Buttons(props) {
  return <button className="btn">{props.name}</button>;
}

//New Components

function AllAccommodationsCard({ filteredHotel, toLocation, daysNum }) {
  return (
    <Card
      // variant="outlined"
      style={{ alignSelf: "center", margin: "2rem 4rem" }}>
      <Typography
        variant="h4"
        component="h1"
        fontWeight="bold"
        margin="1rem"
        fontFamily="Poppins">
        See Accommodations Available in {toLocation}
      </Typography>
      <Typography
        variant="p"
        component="p"
        fontWeight="400"
        margin="1rem"
        fontSize="1.6rem"
        fontFamily="Poppins">
        Get to stay in one our handpicked hotel that can make your stay
        memorable All hotels are priced for your {daysNum} day travel.
      </Typography>
      <div
        className="accommmodations--grid"
        style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
        {filteredHotel &&
          filteredHotel.map((hotel, index) => (
            <AccommodationCard hotel={hotel} key={index} />
          ))}
      </div>
    </Card>
  );
}

/*function AccommodationCard(props) {

  return(
    <Card variant="outlined" sx={{m: "1rem"}}>
      <div style={{display: "flex", margin: "2rem", justifyContent: "space-between"}}>
        <div style={{display: "flex"}}>
          <div style={{border: "1px solid black", height: "10rem", width: "10rem"}}>
            <img src={testIMG}/>
          </div>
          <div style={{marginLeft: "1rem "}}>
            <Typography variant="h5" fontWeight="bold">
              {props.features[0]}
            </Typography>
            {props.features[1].map((prop) => 
              <Typography variant="h5">{prop}</Typography>
            ) }
          </div>
        </div>
        <div style={{textAlign: "right"}}>
          <Typography variant="h5" fontWeight="bold">Rs. {props.features[2]}</Typography>
          <Button variant="contained">
            Book via BluePillow
          </Button>
        </div>
      </div>
    </Card>
  )
}*/

function AccommodationCard({ hotel }) {
  return (
    <Card sx={{ m: "1.6rem" }}>
      <div
        style={{
          display: "flex",
          margin: "1.6rem 4.8rem",
          justifyContent: "space-between",
          flexDirection: "column",
          gap: "2.4rem",
        }}>
        <div
          style={{
            display: "flex",
            gap: "1rem",
            flexDirection: "column",
          }}>
          <div
            style={{
              // border: "1px solid black",
              borderRadius: ".6rem",
              height: "14.5rem",
              width: "25.8rem",
              backgroundImage: `url(https://serpapi.com/searches/65f0207e9b6472da3937422c/images/29707e339d84248d6b246383910ba13b168eb0570ddb07c7a129cd8d5ef190f7.jpeg)`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}></div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <Typography
              variant="h5"
              fontWeight="bold"
              sx={{ marginBottom: "1rem" }}>
              {hotel.name}
            </Typography>
            <div style={{ display: "flex", gap: "0.8rem" }}>
              {hotel.amenities &&
                hotel.amenities.map(
                  (prop, i) =>
                    i < 3 && (
                      <Typography variant="h5" sx={{}} key={i}>
                        {prop}
                      </Typography>
                    )
                )}
            </div>
          </div>
        </div>

        <div
          style={{
            textAlign: "right",
            display: "flex",
            // flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "center",
          }}>
          <Typography variant="h5" fontWeight="bold">
            Rs. {hotel.total_rate.extracted_lowest * 300}
          </Typography>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#2D9596",
              borderRadius: "50rem",
              boxShadow: "0px 5px 5px 0px rgba(0,0,0,0.3)",
              padding: "0.8rem 1.6rem",
            }}>
            View Deal
          </Button>
        </div>
      </div>
    </Card>
  );
}

function DaysDetailsCard({ days, toLocation }) {
  return (
    <Card
      // variant="outlined"
      style={{ alignSelf: "center", margin: "9.6rem 4rem" }}>
      <Typography
        sx={{
          fontWeight: "700",
          fontSize: "2.4rem",
          fontFamily: "Poppins",
          margin: "1.6rem 1rem 2.4rem 1rem",
        }}>
        Places that can be explored in {toLocation}
      </Typography>
      <Typography
        sx={{
          // fontWeight: "700",
          fontSize: "1.6rem",
          fontFamily: "Poppins",
          margin: "1.6rem 1rem 2.4rem 1rem",
        }}>
        View places in {toLocation} which includes landmarks, tourist attraction
        and many more. Please ensure to protect your belongings while visiting.
      </Typography>
      {days &&
        days.map((day, index) => (
          <DayCard dayNumber={index + 1} day={day} key={index} />
        ))}
    </Card>
  );
}

function DayCard({ dayNumber, day }) {
  return (
    <Accordion
      sx={{
        margin: "1.6rem 1rem 2.4rem 1rem",
      }}>
      <AccordionSummary
        expandIcon={"+"}
        aria-controls="panel1-content"
        id="panel1-header"
        sx={{ backgroundColor: "#ddd" }}>
        <Typography
          sx={{
            fontFamily: "Poppins",
            fontWeight: "600",
            fontSize: "1.6rem",
            margin: "0 2.4rem",
          }}>
          Day {dayNumber}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <SingleDayCard dayNumber={dayNumber} day={day} />
      </AccordionDetails>
    </Accordion>
  );
}

function SingleDayCard({ day, dayNumber }) {
  return (
    <div
      className="item"
      style={{ marginBottom: "5px", padding: "10px 20px " }}>
      <div
        className="title"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
        // onClick={() => toggle(dayNumber)}
      ></div>
      <div>
        <Typography
          sx={{
            // fontWeight: "700",
            fontSize: "1.6rem",
            fontFamily: "Poppins",
            margin: "2.4rem 0rem",
          }}>
          On day 0{dayNumber}. The places that can be visited are{" "}
          {day.placesToVisit.map(
            (place, i) =>
              `${place.title}${day.placesToVisit.length === i + 1 ? "." : ", "}`
          )}
        </Typography>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr ",
            justifyItems: "center",
            rowGap: "4.8rem",
          }}>
          {day.placesToVisit.map((place, i) => (
            <VisitingPlaceInfo place={place} key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}

function VisitingPlaceInfo({ place }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
      }}>
      <div
        style={{
          borderRadius: ".6rem",
          height: "14.5rem",
          width: "25.8rem",
          backgroundImage: `url(${place.thumbnail})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}></div>
      <div style={{ display: "flex", flexDirection: "column", gap: ".4rem" }}>
        <Typography variant="h5" component="h2" fontWeight="bold">
          {place.title}
        </Typography>
        <Typography variant="h5" component="h2">
          {place.description}
        </Typography>
        <Typography variant="h5" component="h2">
          {place.rating}⭐{place.reviews}
        </Typography>
      </div>
      <Button
        sx={{
          backgroundColor: "#2D9596",
          width: "fit-content",
          alignSelf: "center",
          color: "#fff",
          fontSize: "1rem",
        }}>
        View Location
      </Button>
    </div>
  );
}

function BudgetTrackerCard({ travelBudget, days }) {
  return (
    <Card
      style={{
        // padding: "20px",
        margin: "1.6rem 4rem",
      }}>
      <Typography
        sx={{
          fontSize: "2.4rem",
          fontFamily: "Poppins",
          fontWeight: "700",
          margin: "1.6rem",
        }}>
        Manage Your Expenses
      </Typography>
      <Typography
        sx={{
          fontSize: "1.6rem",
          fontFamily: "Poppins",
          fontWeight: "400",
          margin: "0 1.6rem 1.6rem 1.6rem",
        }}>
        Track your expenses and have a full breakdown on the travel expense
      </Typography>
      <div
        style={
          {
            // marginBottom: "15px",
            // borderBottom: "1px solid #ddd",
            // paddingBottom: "10px",
          }
        }>
        <Typography
          sx={{
            fontSize: "1.6rem",
            fontFamily: "Poppins",
            fontWeight: "400",
            margin: "0 1.6rem 1.6rem 1.6rem",
          }}>
          Expense Breakdown
        </Typography>

        <div>
          <Typography
            sx={{
              fontSize: "1.6rem",
              fontFamily: "Poppins",
              fontWeight: "400",
              margin: "0 4.8rem 1.6rem 4.8rem",
            }}>
            Travel Expenses
          </Typography>

          {/* Bus Ok */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              margin: "0 4.8rem 1.6rem 4.8rem",
            }}>
            <Typography
              sx={{
                fontSize: "1.6rem",
                fontFamily: "Poppins",
                fontWeight: "400",
                margin: "0 1.6rem 1.6rem 4.8rem",
              }}>
              Bus Fare (Up & Down)
            </Typography>
            <Typography
              sx={{
                fontSize: "1.6rem",
                fontFamily: "Poppins",
                fontWeight: "400",
                margin: "0 1.6rem 1.6rem 4.8rem",
              }}>
              {travelBudget && travelBudget[0].RouteFare * 2}
              .00
            </Typography>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              margin: "0 4.8rem 1.6rem 4.8rem",
            }}>
            <Typography
              sx={{
                fontSize: "1.6rem",
                fontFamily: "Poppins",
                fontWeight: "400",
                margin: "0 1.6rem 1.6rem 4.8rem",
              }}>
              Location Travel Charges
            </Typography>
            <Typography
              sx={{
                fontSize: "1.6rem",
                fontFamily: "Poppins",
                fontWeight: "400",
                margin: "0 1.6rem 1.6rem 4.8rem",
              }}>
              1,000.00
            </Typography>
          </div>
        </div>

        {/* {Accoomodation Ok} */}
        <div>
          <Typography
            sx={{
              fontSize: "1.6rem",
              fontFamily: "Poppins",
              fontWeight: "400",
              margin: "0 4.8rem 1.6rem 4.8rem",
            }}>
            Accommodation Expenses (Best Available)
          </Typography>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              margin: "0 4.8rem 1.6rem 4.8rem",
            }}>
            <Typography
              sx={{
                fontSize: "1.6rem",
                fontFamily: "Poppins",
                fontWeight: "400",
                margin: "0 1.6rem 1.6rem 4.8rem",
              }}>
              {days && days[0] && days[0].accommadation}
            </Typography>
            <Typography
              sx={{
                fontSize: "1.6rem",
                fontFamily: "Poppins",
                fontWeight: "400",
                margin: "0 1.6rem 1.6rem 4.8rem",
              }}>
              {days && days[0] && days[0].accPrice}.00
            </Typography>
          </div>
        </div>

        <div>
          <Typography
            sx={{
              fontSize: "1.6rem",
              fontFamily: "Poppins",
              fontWeight: "400",
              margin: "0 4.8rem 1.6rem 4.8rem",
            }}>
            Food Expenses
          </Typography>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              margin: "0 4.8rem 1.6rem 4.8rem",
            }}>
            <Typography
              sx={{
                fontSize: "1.6rem",
                fontFamily: "Poppins",
                fontWeight: "400",
                margin: "0 1.6rem 1.6rem 4.8rem",
              }}>
              Food Rough Expense
            </Typography>
            <Typography
              sx={{
                fontSize: "1.6rem",
                fontFamily: "Poppins",
                fontWeight: "400",
                margin: "0 1.6rem 1.6rem 4.8rem",
              }}>
              1500.00
            </Typography>
          </div>
        </div>
      </div>

      {/* <div
        style={{
          marginBottom: "15px",
          borderBottom: "1px solid #ddd",
          paddingBottom: "10px",
        }}
      >
        <h3>Accommodation Expense</h3>
        <ul>
          <p>Ella River Inn: 1175000</p>
        </ul> */}
      {/* </div> */}
      {/* <div
        style={{
          marginBottom: "15px",
          borderBottom: "1px solid #ddd",
          paddingBottom: "10px",
        }}
      >
        <h3>Food Expense</h3>
        <ul
          style={{
            display: "flex",
            padding: "10px 20px",
          }}
        >
          <p>Food Charges: </p>
          <p>1000 </p>
        </ul>
      </div>
      <div
        style={{
          marginTop: "15px",
          padding: "10px",
        }}
      >
        <p>Estimated Expense: 17250</p>
        <p>Your Budget: 20000</p>
        <p>You saved (Approx): 2750</p>
      </div>
      <div
        className="sign-up"
        style={{ textAlign: "center", marginTop: "15px" }}
      >
        <div
          style={{
            textAlign: "center",
            display: "flex",
            justifyContent: "space-evenly",
          }}
        >
          <button
            style={{
              background: "#07b0a0",
              color: "white",
              padding: "10px 20px",
              textDecoration: "none",
              borderRadius: "5px",

              cursor: "pointer",
            }}
          >
            Save Plan
          </button>
          <button
            style={{
              background: "#07b0a0",
              color: "white",
              padding: "10px 20px",
              textDecoration: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Sign Up
          </button>
        </div>
      </div> */}
    </Card>
  );
}

function EventsCard({ events }) {
  return (
    <div>
      <Card
        style={{
          // padding: "20px",
          margin: "1.6rem 4rem",
        }}>
        <Typography
          sx={{
            fontSize: "2.4rem",
            fontFamily: "Poppins",
            fontWeight: "700",
            margin: "1.6rem",
          }}>
          Events
        </Typography>
        {events.map((event, i) => (
          <SingleEventCard event={event} key={i} />
        ))}
      </Card>
    </div>
  );
}

function SingleEventCard({ event }) {
  return (
    <Card
      variant="outlined"
      style={{
        padding: "20px",
        margin: "1.6rem 4rem",
        display: "flex",
        justifyContent: "space-between",
      }}>
      <Typography variant="h5" fontWeight="bold">
        {event.title}
      </Typography>

      <Typography variant="h5">
        <span style={{ fontWeight: "bold" }}>Price:</span>
        .00
      </Typography>

      <Typography variant="h5">{event.date.start_date}</Typography>
    </Card>
  );
}

function ExpenseCard() {
  return <div>sgsgsdg</div>;
}

function CustomizePlanModal({ days }) {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("Token not found");
        return;
      }

      const decodedToken = jwtDecode(token);
      console.log(decodedToken);
      const userId = decodedToken.id;
      console.log(userId);
      const response = await fetch(
        `https://lankanamigov2backend.onrender.com/api/users/${userId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ days: days, userId: userId }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to save plan data");
      }

      handleClose(); // Close the modal after successful submission
    } catch (error) {
      console.error("Error saving plan data:", error);
      // Handle error (e.g., display error message)
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "end", gap: "2.4rem" }}>
      <Button variant="contained" onClick={handleOpen} sx={{}}>
        Customize Plan
      </Button>
      <Button variant="contained" onClick={handleSubmit} sx={{}}>
        Save Plan
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="customize-plan-modal"
        aria-describedby="customize-plan-form"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: "1",
        }}>
        <Box
          sx={{
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            width: "40%",
            borderRadius: 4,
          }}>
          <Typography
            variant="h3"
            fontWeight="bold"
            align="center"
            gutterBottom>
            Customize Your Plan
          </Typography>
          <form onSubmit={handleSubmit}>
            {/* Two Sample text fields */}
            <GeneratePlan />
          </form>
        </Box>
      </Modal>
    </div>
  );
}
function GeneratePlan() {
  const [fromLocation, setFromLocation] = useState("");
  const [toLocation, setToLocation] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [budget, setBudget] = useState("");
  const [travelMode, setTravelMode] = useState("");
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyBkePZHNAeceiSPlP4LuZIPd28NpBJcaF8",
    libraries: ["places"],
  });
  /** @type React.MutableRefObject<HTMLInputElement> */
  const originRef = useRef();
  /** @type React.MutableRefObject<HTMLInputElement> */
  const destiantionRef = useRef();
  if (!isLoaded) {
    return <div>Loading....</div>;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleOriginChange = (e) => {
    setFromLocation(e.target.value);
  };

  const handleDestinationChange = (e) => {
    setToLocation(e.target.value);
  };

  const handleOriginAutocomplete = (e) => {
    setFromLocation(e.target.value);
  };

  const handleDestinationAutocomplete = (e) => {
    setToLocation(e.target.value);
  };

  const handleFromDate = (e) => {
    setFromDate(e.target.value);
  };

  const handleToDate = (e) => {
    setToDate(e.target.value);
  };

  const handleBudget = (e) => {
    setBudget(Number(e.target.value));
  };
  const handleTravelMode = (e) => {
    setTravelMode(e.target.value);
  };

  // const handled

  return (
    <section className="section--generate">
      <p className="generate--header">Create your plan</p>
      <p className="generate--text">Select location and dates to get started</p>
      <form onSubmit={handleSubmit}>
        <div className="location--details">
          <label>From</label>
          <Autocomplete>
            <input
              type="text"
              value={fromLocation}
              onChange={handleOriginChange}
              onBlur={handleOriginAutocomplete}
              ref={originRef}></input>
          </Autocomplete>
        </div>
        <div className="location--details">
          <label>Destination</label>
          <Autocomplete>
            <input
              type="text"
              value={toLocation}
              onChange={handleDestinationChange}
              onBlur={handleDestinationAutocomplete}
              ref={destiantionRef}></input>
          </Autocomplete>
        </div>
        <div className="location--details">
          <label>Start Date</label>
          <input type="date" onChange={handleFromDate} value={fromDate}></input>
        </div>
        <div className="location--details">
          <label>End Date</label>
          <input type="date" onChange={handleToDate} value={toDate}></input>
        </div>
        <div className="location--details">
          <label>Mode</label>
          <select onChange={handleTravelMode} value={travelMode}>
            <option value="">Select mode</option>
            <option value="bus">Bus</option>
            <option value="train">Train</option>
            <option value="own vehicle">Own Vehicle</option>
          </select>
        </div>
        <div className="location--details">
          <label>Budget</label>
          <input type="number" onChange={handleBudget} value={budget}></input>
        </div>
        {/* Testing Purpose OnMouseEnter */}
        {originRef.current &&
          destiantionRef.current &&
          originRef.current.value &&
          destiantionRef.current.value && (
            <Link
              to="/trip"
              state={{
                from: fromLocation,
                to: toLocation,
                fromDate: fromDate,
                toDate: toDate,
                budget: budget,
                travelMode: travelMode,
              }}>
              <button>Generate</button>
            </Link>
          )}
      </form>
    </section>
  );
}

export default Itinerary;

{
  /* <VerticalTimeline></VerticalTimeline>; */
}
