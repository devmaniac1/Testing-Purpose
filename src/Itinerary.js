import "./Itinerary.css";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";

import "react-vertical-timeline-component/style.min.css";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  Accordion,
  Button,
  Card,
  Typography,
  useScrollTrigger,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
// import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import testIMG from "./images/Slide images/slideI3.jpg";

// let days = [];

function Itinerary({
  toLocation,
  toDate,
  fromDate,
  // budget,
  travelMode,
  response,
}) {
  // const toLocation = "Nuwara Eliya, Sri Lanka";
  // const toDate = "2024-03-13";
  // const fromDate = "2024-03-10";
  const budget = 25000;
  const [hotelsData, setHotelsData] = useState(null);
  const [filteredHotel, setFIlteredHotel] = useState(null);
  const [placesData, setPlacesData] = useState(null);
  const [filteredPlacesData, setFilteredPlacesData] = useState(null);
  const [days, setDays] = useState([]);
  const [travelBudget, setTravelBudget] = useState([]);

  const toDateObj = new Date(toDate);
  const fromDateObj = new Date(fromDate);
  const differenceInTime = toDateObj.getTime() - fromDateObj.getTime();
  const numberOfDays = differenceInTime / (1000 * 3600 * 24);

  const addDay = (day) => {
    setDays((existingDays) => [...existingDays, day]);
  };

  // const numberOfDays = 3; //Temporary
  // console.log(numberOfDays);
  useEffect(() => {
    const fetchData = async () => {
      try {
        // console.log((budget * 0.6) / 307.56 / numberOfDays);
        const response = await axios.get(
          "http://localhost:3001/serpAPI/Google-hotels",
          {
            params: {
              toLocation: toLocation,
              toDate: toDate,
              fromDate: fromDate,
              budget: Math.trunc((budget * 0.5) / 307.56 / numberOfDays),
              travelMode: travelMode,
            },
          }
        );
        // console.log(response);

        setHotelsData(response.data.properties);
        // console.log(toLocation);
        const reponcePlaces = await axios.get(
          "http://localhost:3001/serpAPI/places",
          {
            params: {
              toLocation: toLocation,
            },
          }
        );
        setPlacesData(reponcePlaces.data.top_sights.sights);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

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
    // const meanReviews =
    //   placesData.reduce((acc, cur) => {
    //     typeof cur.reviews === "number" ? (acc += cur.reviews) : (acc += 0);
    //     return acc;
    //   }, 0) / placesData.length;
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
          date: "2024-03-10",
          location: toLocation.split(",")[0],
          accommadation: filteredHotel[0].name,
          accPrice: `${
            filteredHotel[0].total_rate.extracted_lowest * 307.5
          } rupees`,
          placesToVisit: slicedObjects.map((obj) => obj),
          events: ["a"],
          foodAlloc: { breakfast: 200, lunch: 600, dinner: 800 },
        });
      }
    }
  };
  // const getTransportBudget = async (routeCode) => {
  //   try {
  //     console.log("fafa");
  //     const routePrice = await axios.get("http://localhost:3001/busFare", {
  //       params: { routeNumber: routeCode },
  //     });
  //     console.log(routePrice);
  //     setTravelBudget((existingPrice) => ({ ...existingPrice, routePrice }));
  //     console.log(travelBudget);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  // response &&
  //   response.routes[0].legs[0].steps.map((step) => {
  //     step.transit &&
  //       step.transit.line &&
  //       step.transit.line.short_name &&
  //       getTransportBudget(step.transit.line.short_name);
  //   });
  // const getTransportBudget = async (RouteNumber) => {
  //   try {
  //     const response = await axios.get("http://localhost:3001/busFare", {
  //       params: { RouteNumber: RouteNumber },
  //     });
  //     console.log("Route price response:", response.data);
  //     // const routePrice = response.data;
  //     response.data[0] &&
  //       setTravelBudget((existingBudget) => [
  //         ...existingBudget,
  //         response.data[0],
  //       ]);
  //     console.log(travelBudget);
  //   } catch (error) {
  //     console.error("Error fetching route price:", error);
  //   }
  // };
  useEffect(() => {
    // setTravelBudget([]);
    response &&
      response.routes[0].legs[0].steps.forEach((step, index) => {
        // console.log(index);
        if (step.transit && step.transit.line && step.transit.line.short_name)
          console.log();
        // getTransportBudget(step.transit.line.short_name);
        // step.transit &&
        //   step.transit.line &&
        //   step.transit.line.short_name &&
        //   getTransportBudget(step.transit.line.short_name);
      });
  });

  return (
    <div className="main_itinerary">
      <BannerContainer
        toLocation={toLocation}
        fromDate={fromDate}
        toDate={toDate}
      />
      <AllAccommodationsCard
        filteredHotel={filteredHotel}
        toLocation={toLocation}
        daysNum={numberOfDays}
      />
      {days && <DaysDetailsCard days={days} toLocation={toLocation} />}
      {/* <DayDetailCard placeInfo={placesDetails} /> */}
      <BudgetTrackerCard travelBudget={travelBudget} />
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
              class="w-6 h-6"
            >
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

/* Full Plan Details component */
// function FullPlan() {
//   return (
//     <div className="Full-Plan">
//       <div>
//         <h1>Full Plan</h1>
//         <div>
//           <Buttons name="Edit plan" />
//         </div>
//         <div>
//           <Buttons name="Add to my plans" />
//         </div>
//       </div>
//       <AllDates />
//     </div>
//   );
// }

function Buttons(props) {
  return <button className="btn">{props.name}</button>;
}

// function AllDates() {
//   return (
//     <div className="All-Dates">
//       <VerticalTimeline layout={"1-column-left"} lineColor={"#254E72"}>
//         {days.map((day) => {
//           return (
//             <VerticalTimelineElement
//               key={day.day}
//               iconStyle={{ background: "#254E72" }}
//               contentStyle={{
//                 backgroundColor: "#e2f5f3",
//                 boxShadow: "0px 0px 0px 0px",
//               }}
//               iconClassName="icon"
//               contentArrowStyle={{ display: "none" }}
//             >
//               <div className="day">DAY {day.day}</div>
//               <div className="items">
//                 <div>
//                   <span>Date : </span>
//                   {day.date}
//                 </div>
//                 <div>
//                   <span>Location : </span>
//                   {day.location}
//                 </div>
//                 <div>
//                   <span>Accomadation : </span>
//                   {day.accommadation}
//                 </div>
//                 <div>
//                   <span>Accom. Price : </span>
//                   {day.accPrice}
//                 </div>
//                 <div>
//                   <span>Places to visit : </span>
//                 </div>
//                 <div className="sub-items">
//                   {day.placesToVisit.length !== 0 &&
//                     day.placesToVisit.map((place) => {
//                       return <div>{place}</div>;
//                     })}
//                 </div>
//                 {day.events !== 0 && (
//                   <div>
//                     <span>Events : </span>
//                     {day.events.length === 0
//                       ? "No events for this day"
//                       : day.events.join(", ")}
//                   </div>
//                 )}
//                 <div>
//                   <span>Food allocation per head : </span>
//                 </div>
//                 <div className="sub-items">
//                   <div>
//                     <span>Breakfast : </span>
//                     {day.foodAlloc.breakfast}
//                   </div>
//                   <div>
//                     <span>Lunch : </span>
//                     {day.foodAlloc.lunch}
//                   </div>
//                   <div>
//                     <span>Dinner : </span>
//                     {day.foodAlloc.dinner}
//                   </div>
//                 </div>
//               </div>
//             </VerticalTimelineElement>
//           );
//         })}
//       </VerticalTimeline>
//     </div>
//   );
// }

//New Components

function AllAccommodationsCard({ filteredHotel, toLocation, daysNum }) {
  return (
    <Card
      // variant="outlined"
      style={{ alignSelf: "center", margin: "2rem 4rem" }}
    >
      <Typography
        variant="h4"
        component="h1"
        fontWeight="bold"
        margin="1rem"
        fontFamily="Poppins"
      >
        See Accommodations Available in {toLocation}
      </Typography>
      <Typography
        variant="p"
        component="p"
        fontWeight="400"
        margin="1rem"
        fontSize="1.6rem"
        fontFamily="Poppins"
      >
        Get to stay in one our handpicked hotel that can make your stay
        memorable All hotels are priced for your {daysNum} day travel.
      </Typography>
      <div
        className="accommmodations--grid"
        style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}
      >
        {filteredHotel &&
          filteredHotel.map((hotel) => <AccommodationCard hotel={hotel} />)}
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
        }}
      >
        <div
          style={{
            display: "flex",
            gap: "1rem",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              // border: "1px solid black",
              borderRadius: ".6rem",
              height: "14.5rem",
              width: "25.8rem",
              backgroundImage: `url(https://serpapi.com/searches/65f0207e9b6472da3937422c/images/29707e339d84248d6b246383910ba13b168eb0570ddb07c7a129cd8d5ef190f7.jpeg)`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          ></div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <Typography
              variant="h5"
              fontWeight="bold"
              sx={{ marginBottom: "1rem" }}
            >
              {hotel.name}
            </Typography>
            <div style={{ display: "flex", gap: "0.8rem" }}>
              {hotel.amenities.map(
                (prop, i) =>
                  i < 3 && (
                    <Typography variant="h5" sx={{}}>
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
          }}
        >
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
            }}
          >
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
      style={{ alignSelf: "center", margin: "9.6rem 4rem" }}
    >
      <Typography
        sx={{
          fontWeight: "700",
          fontSize: "2.4rem",
          fontFamily: "Poppins",
          margin: "1.6rem 1rem 2.4rem 1rem",
        }}
      >
        Places that can be explored in {toLocation}
      </Typography>
      <Typography
        sx={{
          // fontWeight: "700",
          fontSize: "1.6rem",
          fontFamily: "Poppins",
          margin: "1.6rem 1rem 2.4rem 1rem",
        }}
      >
        View places in {toLocation} which includes landmarks, tourist attraction
        and many more. Please ensure to protect your belongings while visiting.
      </Typography>
      {days &&
        days.map((day, index) => <DayCard dayNumber={index + 1} day={day} />)}
    </Card>
  );
}

function DayCard({ dayNumber, day }) {
  return (
    // <Card sx={{ m: "1.6rem" }}>
    <Accordion
      sx={{
        margin: "1.6rem 1rem 2.4rem 1rem",
      }}
    >
      <AccordionSummary
        expandIcon={"+"}
        aria-controls="panel1-content"
        id="panel1-header"
        sx={{ backgroundColor: "#ddd" }}
      >
        <Typography
          sx={{
            fontFamily: "Poppins",
            fontWeight: "600",
            fontSize: "1.6rem",
            margin: "0 2.4rem",
          }}
        >
          Day {dayNumber}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <SingleDayCard dayNumber={dayNumber} day={day} />
      </AccordionDetails>
    </Accordion>
    // <Typography variant="h4" component="h1" fontWeight="bold">
    //   <SingleDayCard dayNumber={dayNumber} day={day} />
    // </Typography>
    // </Card>
  );
}

function DayDetailCard(props) {
  return (
    <Card
      variant="outlined"
      style={{
        width: "33vw",
        alignSelf: "center",
        marginTop: "2rem",
        padding: "0 18px",
        backgroundColor: "white",
        maxHeight: "0",
        overflow: "hidden",
        transition: "max-height 0.2s ease-out",
      }}
    >
      {props.placeInfo.map((x, index) => (
        <SingleDayCard x={x} dayIn={index + 1} />
      ))}
    </Card>
  );
}

function SingleDayCard({ day }) {
  return (
    <div
      className="item"
      style={{ marginBottom: "5px", padding: "10px 20px " }}
    >
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
          }}
        >
          On day 01. The places that can be visited are{" "}
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
          }}
        >
          {day.placesToVisit.map((place) => (
            <VisitingPlaceInfo place={place} />
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
      }}
    >
      <div
        style={{
          borderRadius: ".6rem",
          height: "14.5rem",
          width: "25.8rem",
          backgroundImage: `url(${place.thumbnail})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></div>
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
        }}
      >
        View Location
      </Button>
    </div>
  );
}

function BudgetTrackerCard({ travelBudget }) {
  return (
    <Card
      style={{
        // padding: "20px",
        margin: "1.6rem 4rem",
      }}
    >
      <Typography
        sx={{
          fontSize: "2.4rem",
          fontFamily: "Poppins",
          fontWeight: "700",
          margin: "1.6rem",
        }}
      >
        Manage Your Expenses
      </Typography>
      <Typography
        sx={{
          fontSize: "1.6rem",
          fontFamily: "Poppins",
          fontWeight: "400",
          margin: "0 1.6rem 1.6rem 1.6rem",
        }}
      >
        Track your expenses and have a full breakdown on the travel expense
      </Typography>
      <div
        style={
          {
            // marginBottom: "15px",
            // borderBottom: "1px solid #ddd",
            // paddingBottom: "10px",
          }
        }
      >
        <Typography
          sx={{
            fontSize: "1.6rem",
            fontFamily: "Poppins",
            fontWeight: "400",
            margin: "0 1.6rem 1.6rem 1.6rem",
          }}
        >
          Expense Breakdown
        </Typography>

        <div>
          <Typography
            sx={{
              fontSize: "1.6rem",
              fontFamily: "Poppins",
              fontWeight: "400",
              margin: "0 4.8rem 1.6rem 4.8rem",
            }}
          >
            Travel Expenses
          </Typography>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              margin: "0 4.8rem 1.6rem 4.8rem",
            }}
          >
            <Typography
              sx={{
                fontSize: "1.6rem",
                fontFamily: "Poppins",
                fontWeight: "400",
                margin: "0 1.6rem 1.6rem 4.8rem",
              }}
            >
              Bus Fare
            </Typography>
            <Typography
              sx={{
                fontSize: "1.6rem",
                fontFamily: "Poppins",
                fontWeight: "400",
                margin: "0 1.6rem 1.6rem 4.8rem",
              }}
            >
              1,500.00
            </Typography>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              margin: "0 4.8rem 1.6rem 4.8rem",
            }}
          >
            <Typography
              sx={{
                fontSize: "1.6rem",
                fontFamily: "Poppins",
                fontWeight: "400",
                margin: "0 1.6rem 1.6rem 4.8rem",
              }}
            >
              Location Travel Charges
            </Typography>
            <Typography
              sx={{
                fontSize: "1.6rem",
                fontFamily: "Poppins",
                fontWeight: "400",
                margin: "0 1.6rem 1.6rem 4.8rem",
              }}
            >
              1,000.00
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

function ExpenseCard() {
  return <div>sgsgsdg</div>;
}

export default Itinerary;

{
  /* <VerticalTimeline></VerticalTimeline>; */
}
