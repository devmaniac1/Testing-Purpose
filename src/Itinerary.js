import "./Itinerary.css";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";

import "react-vertical-timeline-component/style.min.css";
import { useEffect, useState } from "react";
import axios from "axios";

const days = [
  {
    day: 1,
    date: "2023-08-13",
    location: "Nuwara Eliya",
    accommadation: "Gregory Lake Inn",
    accPrice: 8000.0,
    placesToVisit: ["Garden", "Gregory Lake"],
    events: ["BnS Concert"],
    foodAlloc: { breakfast: 200, lunch: 500, dinner: 500 },
  },
  {
    day: 2,
    date: "2023-08-14",
    location: "Ella",
    accommadation: "Gregory Lake Inn",
    accPrice: 8000.0,
    placesToVisit: [],
    events: [],
    foodAlloc: { breakfast: 200, lunch: 500, dinner: 500 },
  },
  {
    day: 3,
    date: "2023-08-15",
    location: "Nuwara Eliya",
    accommadation: "Gregory Lake Inn",
    accPrice: 8000.0,
    placesToVisit: [],
    events: [],
    foodAlloc: { breakfast: 200, lunch: 600, dinner: 800 },
  },
];

function Itinerary() {
  const [hotelsData, setHotelsData] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3001/Google-hotels");
        setHotelsData(response.data.properties);
        // console.log(hotelsData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);
  return (
    <div className="main_itinerary">
      <BannerContainer />
      <FullPlan />
    </div>
  );
}

function BannerContainer() {
  return (
    <div className="banner-container">
      <img src="../banner.jpg" alt="" />
      <div className="transparent-box">
        <p>Trip to Somewhere</p>
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
          <p>Start Date: 2024.01.01</p>
          <p>|</p>
          <p>End Date: 2024.12.31</p>
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
              contentArrowStyle={{ display: "none" }}>
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

export default Itinerary;

<VerticalTimeline></VerticalTimeline>;
