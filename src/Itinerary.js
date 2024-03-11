import "./Itinerary.css";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";

import "react-vertical-timeline-component/style.min.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { Button, Card, Typography, useScrollTrigger } from "@mui/material";

let days = [
  // {
  //   day: 1,
  //   date: "2023-08-13",
  //   location: "Nuwara Eliya",
  //   accommadation: "Gregory Lake Inn",
  //   accPrice: 8000.0,
  //   placesToVisit: ["Garden", "Gregory Lake"],
  //   events: ["BnS Concert"],
  //   foodAlloc: { breakfast: 200, lunch: 500, dinner: 500 },
  // },
  // {
  //   day: 2,
  //   date: "2023-08-14",
  //   location: "Ella",
  //   accommadation: "Gregory Lake Inn",
  //   accPrice: 8000.0,
  //   placesToVisit: [],
  //   events: [],
  //   foodAlloc: { breakfast: 200, lunch: 500, dinner: 500 },
  // },
  // {
  //   day: 3,
  //   date: "2023-08-15",
  //   location: "Nuwara Eliya",
  //   accommadation: "Gregory Lake Inn",
  //   accPrice: 8000.0,
  //   placesToVisit: [],
  //   events: [],
  //   foodAlloc: { breakfast: 200, lunch: 600, dinner: 800 },
  // },
];

function Itinerary({
  toLocation,
  toDate,
  fromDate,
  // budget,
  travelMode,
}) {
  // const toLocation = "Nuwara Eliya, Sri Lanka";
  // const toDate = "2024-03-13";
  // const fromDate = "2024-03-10";
  const budget = 25000;
  const [hotelsData, setHotelsData] = useState(null);
  const [filteredHotel, setFIlteredHotel] = useState(null);
  const [placesData, setPlacesData] = useState(null);
  const [filteredPlacesData, setFilteredPlacesData] = useState(null);

  const toDateObj = new Date(toDate);
  const fromDateObj = new Date(fromDate);
  const differenceInTime = toDateObj.getTime() - fromDateObj.getTime();
  const numberOfDays = differenceInTime / (1000 * 3600 * 24);

  // const numberOfDays = 3; //Temporary
  console.log(numberOfDays);
  useEffect(() => {
    const fetchData = async () => {
      try {
        // console.log((budget * 0.6) / 307.56 / numberOfDays);
        const response = await axios.get(
          "http://localhost:3001/Google-hotels",
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

        setHotelsData(response.data.properties);
        console.log(toLocation);
        const reponcePlaces = await axios.get("http://localhost:3001/places", {
          params: {
            toLocation: toLocation,
          },
        });
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
      days = [];
      for (let i = 1; i <= numberOfDays; i++) {
        let slicedObjects = filteredPlacesData.slice(
          index,
          index + placePerDay
        );
        console.log(slicedObjects.map((obj) => obj.name));
        index += placePerDay;
        days.push({
          day: i,
          date: "2024-03-10",
          location: toLocation.split(",")[0],
          accommadation: filteredHotel[0].name,
          accPrice: `${
            filteredHotel[0].total_rate.extracted_lowest * 307.5
          } rupees`,
          placesToVisit: slicedObjects.map((obj) => obj.title),
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
      <AllAccommodationsCard/>
      <DaysDetailsCard/>
      <DayDetailCard placeInfo={placesDetails}/>
      <BudgetTrackerCard/>
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
function FullPlan() {
  return (
    <div className="Full-Plan">
      <div>
        <h1>Full Plan</h1>
        <div>
          <Buttons name="Edit plan" />
        </div>
        <div>
          <Buttons name="Add to my plans" />
        </div>
      </div>
      <AllDates />
    </div>
  );
}

function Buttons(props) {
  return <button className="btn">{props.name}</button>;
}

function AllDates() {
  return (
    <div className="All-Dates">
      <VerticalTimeline layout={"1-column-left"} lineColor={"#254E72"}>
        {days.map((day) => {
          return (
            <VerticalTimelineElement
              key={day.day}
              iconStyle={{ background: "#254E72" }}
              contentStyle={{
                backgroundColor: "#e2f5f3",
                boxShadow: "0px 0px 0px 0px",
              }}
              iconClassName="icon"
              contentArrowStyle={{ display: "none" }}
            >
              <div className="day">DAY {day.day}</div>
              <div className="items">
                <div>
                  <span>Date : </span>
                  {day.date}
                </div>
                <div>
                  <span>Location : </span>
                  {day.location}
                </div>
                <div>
                  <span>Accomadation : </span>
                  {day.accommadation}
                </div>
                <div>
                  <span>Accom. Price : </span>
                  {day.accPrice}
                </div>
                <div>
                  <span>Places to visit : </span>
                </div>
                <div className="sub-items">
                  {day.placesToVisit.length !== 0 &&
                    day.placesToVisit.map((place) => {
                      return <div>{place}</div>;
                    })}
                </div>
                {day.events !== 0 && (
                  <div>
                    <span>Events : </span>
                    {day.events.length === 0
                      ? "No events for this day"
                      : day.events.join(", ")}
                  </div>
                )}
                <div>
                  <span>Food allocation per head : </span>
                </div>
                <div className="sub-items">
                  <div>
                    <span>Breakfast : </span>
                    {day.foodAlloc.breakfast}
                  </div>
                  <div>
                    <span>Lunch : </span>
                    {day.foodAlloc.lunch}
                  </div>
                  <div>
                    <span>Dinner : </span>
                    {day.foodAlloc.dinner}
                  </div>
                </div>
              </div>
            </VerticalTimelineElement>
          );
        })}
      </VerticalTimeline>
    </div>
  );
}


//New Components

function AllAccommodationsCard() {

  const accdetails = [
    ["Ella River Inn", ["Free Wifi", "Breakfast Included", "Swimming Pool"], 13000], 
    ["Galle Villa", ["Free Wifi", "Breakfast Included", "Swimming Pool"], 25000]
  ]


  return(
    <Card variant="outlined" style={{width: "33vw", alignSelf: "center", margin: "2rem 0rem"}}>
      <Typography variant="h4" component="h1" fontWeight="bold" margin="1rem">Your Accommodations</Typography>
      {accdetails.map((detail) => 
        <AccommodationCard features={detail}/>
      )}
      
    </Card>
  )
} 

function AccommodationCard(props) {
  const accImg = "test.jpg"
  return(
    <Card variant="outlined" sx={{m: "1rem"}}>
      <div style={{display: "flex", margin: "2rem", justifyContent: "space-between"}}>
        <div style={{display: "flex"}}>
          <div style={{border: "1px solid black", height: "10rem", width: "10rem"}}>
            <img src={accImg}/>
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
}


function DaysDetailsCard() {
  return(
    <Card variant="outlined" style={{width: "33vw", alignSelf: "center"}}>
      {placesDetails.map((day, index) =>
      <DayCard dayNumber={index + 1}/>
      )}
    </Card>
  )
}

function DayCard(props){
  return(
    <Card variant="outlined" sx={{p: "2rem", m: "1rem"}}>
      <Typography variant="h4" component="h1" fontWeight="bold" >
        Day {props.dayNumber}
      </Typography>
    </Card>
  )
}



  //Places to visit sample data variable
  const placesDetails = [
    [{placename: "Ella Rock", placeRating: 4.8, placeReviews: 26},
    {placename: "Nine Arch", placeRating: 4.2, placeReviews: 56}],
  
    [{placename: "Ella Rock", placeRating: 4.8, placeReviews: 26},
    {placename: "Nine Arch", placeRating: 4.2, placeReviews: 56}]
  ]

  const indexDay = 0

function DayDetailCard(props) {

  return(
    <Card variant="outlined" style={{width: "33vw", alignSelf: "center", marginTop: "2rem"}}>
      
      {props.placeInfo.map((x, index) => 
        <SingleDayCard x={x} dayIn={index + 1}/>
      )}
    </Card>
  )
}

function SingleDayCard(props) {
  return (
    <Card variant="outlined" sx={{ m: "1rem", p: "1rem" }}>
      <Typography variant="h3" component="h1" fontWeight="bold">
        Day {props.dayIn}
      </Typography>
      <Typography variant="h4" component="h1" sx={{ mt: "1.5rem" }}>
        Places to visit:
      </Typography>

      {props.x.map((y) => (
        <VisitingPlaceInfo place={y} />
      ))}
    </Card>
  );
}


function VisitingPlaceInfo(props) {
  return(
  <div style={{display: "flex", marginTop: "1rem"}}>

    <div style={{border: "1px solid black", height: "10rem", width: "10rem"}}>

    </div>
    <div style={{marginLeft: "1rem ", marginTop: "0.5rem"}}>
      <Typography variant="h5" component="h2" fontWeight="bold">
        {props.place.placename}
      </Typography>
      <Typography variant="h5" component="h2">
        Rating: {props.place.placeRating}
      </Typography>
      <Typography variant="h5" component="h2">
        Reviews: {props.place.placeReviews}
      </Typography>
    </div>
  </div>
  )
}


function BudgetTrackerCard() {
  return(
  <Card variant="outlined" style={{width: "33vw", alignSelf: "center", margin: "2rem 0rem"}}>
    <Typography variant="h4" component="h1" fontWeight="bold" margin="1rem">Budget Tracker</Typography>
  </Card>
  )
}




export default Itinerary;

<VerticalTimeline></VerticalTimeline>;
