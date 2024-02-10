import { Children, useState, useEffect } from "react";
import heroImage from "../images/hero1.jpg";
import "./Home.css";
import Navbar from "../Navbar.js";

function Home({
  viewportWidth,
  handleCurrentPage,
  fromLocation,
  toLocation,
  handleToLocationChange,
  handleFromLocationChange,
  handleFromSuggestionClick,
  handleToSuggestionClick,
  toSuggestions,
  fromSuggestions,
}) {
  return (
    <>
      <Hero viewportWidth={viewportWidth} />
      <CTA
        handleCurrentPage={handleCurrentPage}
        fromLocation={fromLocation}
        toLocation={toLocation}
        handleToLocationChange={handleToLocationChange}
        handleFromLocationChange={handleFromLocationChange}
        handleFromSuggestionClick={handleFromSuggestionClick}
        handleToSuggestionClick={handleToSuggestionClick}
        toSuggestions={toSuggestions}
        fromSuggestions={fromSuggestions}
      />
    </>
  );
}

function Hero({ viewportWidth }) {
  return (
    <section className="section section--hero">
      <Navbar viewportWidth={viewportWidth} />
      <img src={heroImage} alt="hero" />
      <div className="hero--textbox">
        <p className="hero-header">Explore the World with Travel Amigo</p>
        <p className="hero-text">
          Are you ready to embark on the journey of a lifetime? At Travel Amigo,
          we specialize in crafting unforgettable travel experiences tailored to
          your desires.
        </p>
        <div className="btns--cta">
          <Button fontSize={1.6} color={"#fff"} padding={"1.6rem 3.2rem"}>
            Start Planning
          </Button>
          <Button fontSize={1.6} color={"#fff"} padding={"1.6rem 3.2rem"}>
            Sign Up
          </Button>
        </div>
      </div>
      <Button color={"#fff"} fontSize={1.6} padding={"1.6rem 3.2rem"}>
        Learn More<span> &darr;</span>
      </Button>
    </section>
  );
}

function CTA({
  handleCurrentPage,
  fromLocation,
  toLocation,
  handleToLocationChange,
  handleFromLocationChange,
  handleFromSuggestionClick,
  handleToSuggestionClick,
  toSuggestions,
  fromSuggestions,
}) {
  const [startPlan, setStartPlan] = useState(false);

  function handleStartPlan(e) {
    e.preventDefault();
    setStartPlan(!startPlan);
  }

  return (
    <section className="section--cta">
      <p className="cta--header">Start Planning and save your time by half</p>
      <div className="btns--cta">
        <Button
          fontSize={1.4}
          color={"#fff"}
          padding={"1.6rem 2.4rem"}
          onHandleStatPlan={handleStartPlan}
        >
          Start Planning
        </Button>
        <Button fontSize={1.4} color={"#fff"} padding={"1.6rem 2.4rem"}>
          Sign Up
        </Button>
      </div>
      {startPlan && (
        <GeneratePlan
          handleCurrentPage={handleCurrentPage}
          fromLocation={fromLocation}
          toLocation={toLocation}
          handleToLocationChange={handleToLocationChange}
          handleFromLocationChange={handleFromLocationChange}
          handleFromSuggestionClick={handleFromSuggestionClick}
          handleToSuggestionClick={handleToSuggestionClick}
          toSuggestions={toSuggestions}
          fromSuggestions={fromSuggestions}
        />
      )}
    </section>
  );
}

function GeneratePlan({
  handleCurrentPage,
  fromLocation,
  toLocation,
  handleToLocationChange,
  handleFromLocationChange,
  handleFromSuggestionClick,
  handleToSuggestionClick,
  toSuggestions,
  fromSuggestions,
}) {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [travelMode, setTravelMode] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <section className="section--generate">
      <p className="generate--header">Create your plan</p>
      <p className="generate--text">Select location and dates to get started</p>
      <form onSubmit={handleSubmit}>
        <div className="location--details">
          <label>From</label>
          <input
            type="text"
            value={fromLocation}
            onChange={handleFromLocationChange}
          ></input>
          <div className="suggestions">
            {fromSuggestions &&
              fromSuggestions.map((suggestion, index) => (
                <div
                  key={index}
                  onClick={() => handleFromSuggestionClick(suggestion)}
                >
                  {suggestion}
                </div>
              ))}
          </div>
        </div>
        <div className="location--details">
          <label>Destination</label>
          <input
            type="text"
            value={toLocation}
            onChange={handleToLocationChange}
          ></input>
          <div className="suggestions">
            {toSuggestions &&
              toSuggestions.map((suggestion, index) => (
                <div
                  key={index}
                  onClick={() => handleToSuggestionClick(suggestion)}
                >
                  {suggestion}
                </div>
              ))}
          </div>
        </div>
        <div className="location--details">
          <label>Start Date</label>
          <input type="text"></input>
        </div>
        <div className="location--details">
          <label>End Date</label>
          <input type="text"></input>
        </div>
        <div className="location--details">
          <label>Mode</label>
          <select value={travelMode}>
            <option value="">Select mode</option>
            <option value="bus">Bus</option>
            <option value="train">Train</option>
            <option value="own vehicle">Own Vehicle</option>
          </select>
        </div>
        <div className="location--details">
          <label>Budget</label>
          <input type="text"></input>
        </div>
        <button onClick={handleCurrentPage}>Generate</button>
      </form>
    </section>
  );
}

// function GeneratePlan() {
//   const [fromLocation, setFromLocation] = useState("");
//   const [toLocation, setToLocation] = useState("");
//   const [fromSuggestions, setFromSuggestions] = useState([]);
//   const [toSuggestions, setToSuggestions] = useState([]);

//   useEffect(() => {
//     const apiKey = "AIzaSyBkePZHNAeceiSPlP4LuZIPd28NpBJcaF8";
//     const input = fromLocation || toLocation;
//     const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${input}&key=${apiKey}`;

//     fetch(apiUrl)
//       .then((response) => response.json())
//       .then((data) => {
//         console.log(data);
//         if (data.status === "OK") {
//           const suggestions = data.results.map(
//             (result) => result.formatted_address
//           );
//           if (fromLocation) {
//             setFromSuggestions(suggestions);
//           } else {
//             setToSuggestions(suggestions);
//           }
//         } else {
//           if (fromLocation) {
//             setFromSuggestions([]);
//           } else {
//             setToSuggestions([]);
//           }
//         }
//       })
//       .catch((error) => {
//         console.error("Error fetching data:", error);
//       });
//   }, [fromLocation, toLocation]);

//   const handleFromLocationChange = (e) => {
//     setFromLocation(e.target.value);
//   };

//   const handleToLocationChange = (e) => {
//     setToLocation(e.target.value);
//   };

//   const handleFromSuggestionClick = (suggestion) => {
//     setFromLocation(suggestion);
//     setFromSuggestions([]);
//   };

//   const handleToSuggestionClick = (suggestion) => {
//     setToLocation(suggestion);
//     setToSuggestions([]);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log({
//       fromLocation,
//       toLocation,
//     });
//   };

//   return (
//     <section className="section--generate">
//       <p className="generate--header">Create your plan</p>
//       <p className="generate--text">Select location and dates to get started</p>
//       <form onSubmit={handleSubmit}>
//         <div className="location--details">
//           <label>From</label>
//           <input
//             type="text"
//             value={fromLocation}
//             onChange={handleFromLocationChange}
//           />
//           <div className="suggestions">
//             {fromSuggestions.map((suggestion, index) => (
//               <div
//                 key={index}
//                 onClick={() => handleFromSuggestionClick(suggestion)}
//               >
//                 {suggestion}
//               </div>
//             ))}
//           </div>
//         </div>
//         <div className="location--details">
//           <label>Destination</label>
//           <input
//             type="text"
//             value={toLocation}
//             onChange={handleToLocationChange}
//           />
//           <div className="suggestions">
//             {toSuggestions.map((suggestion, index) => (
//               <div
//                 key={index}
//                 onClick={() => handleToSuggestionClick(suggestion)}
//               >
//                 {suggestion}
//               </div>
//             ))}
//           </div>
//         </div>
//         <button>Generate</button>
//       </form>
//     </section>
//   );
// }

function Suggestions({ suggestions, handleSuggestionClick }) {
  return (
    <div
      className="dropdown--suggestion"
      style={{ position: "absolute", padding: 0 }}
    >
      {suggestions.map((suggestion, index) => (
        <div
          key={index}
          onClick={() => handleSuggestionClick(suggestion)}
          style={{ cursor: "pointer" }}
        >
          {suggestion}
        </div>
      ))}
    </div>
  );
}

function Button({ fontSize, color, padding, onHandleStatPlan, children }) {
  const buttonStyle = {
    color: color,
    fontSize: `${fontSize}rem`,
    padding: padding,
  };
  return (
    <a
      href="www.google.com"
      style={buttonStyle}
      className="btn-cta"
      onClick={onHandleStatPlan}
    >
      {children}
    </a>
  );
}

export default Home;
