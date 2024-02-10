// import logo from "./logo.svg";
import "./App.css";
import Itinerary from "./Itinerary.js";
import Navbar from "./Navbar.js";
import Map from "./Map.js";
import FooterBar from "./FooterBar.js";
import Home from "./home-components/Home.js";
import React, { useEffect, useState } from "react";

function App() {
  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);
  const [currentWindow, setCurrentWindow] = useState("Itinerary");
  const [currentPage, setCurrentPage] = useState(true);

  const [fromLocation, setFromLocation] = useState("");
  const [toLocation, setToLocation] = useState("");
  const [fromSuggestions, setFromSuggestions] = useState([]);
  const [toSuggestions, setToSuggestions] = useState([]);
  const [fromLongitude, setFromLongitude] = useState(0);
  const [fromLatitude, setFromLatitude] = useState(0);
  const [toLongitude, setToLongitude] = useState(0);
  const [toLatitude, settoLatitude] = useState(0);
  // const apiKey = "AIzaSyBkePZHNAeceiSPlP4LuZIPd28NpBJcaF8";

  useEffect(() => {
    const apiKey = "AIzaSyBkePZHNAeceiSPlP4LuZIPd28NpBJcaF8";
    const input = fromLocation || toLocation;
    if (!input) return; // If both locations are empty, do nothing

    const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${input}&key=${apiKey}`;

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "OK" && data.results.length > 0) {
          const suggestions = data.results.map(
            (result) => result.formatted_address
          );
          const location = data.results[0].geometry.location;
          const latitude = location.lat;
          const longitude = location.lng;
          console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
          if (fromLocation) {
            setFromLongitude(longitude);
            setFromLatitude(latitude);
            setFromSuggestions(suggestions);
          } else {
            setToLongitude(longitude);
            settoLatitude(latitude);
            setToSuggestions(suggestions);
          }
        } else {
          if (fromLocation) {
            setFromSuggestions([]);
          } else {
            setToSuggestions([]);
          }
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [fromLocation, toLocation]);

  const handleFromLocationChange = (e) => {
    setFromLocation(e.target.value);
  };

  const handleToLocationChange = (e) => {
    setToLocation(e.target.value);
  };

  const handleFromSuggestionClick = (suggestion) => {
    setFromLocation(suggestion);
    setFromSuggestions([]);
  };

  const handleToSuggestionClick = (suggestion) => {
    setToLocation(suggestion);
    setToSuggestions([]);
  };

  function handlePage() {
    setCurrentPage(!currentPage);
  }

  useEffect(() => {
    const handleResize = () => {
      setViewportWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  function handleChangeWindow(windowName) {
    setCurrentWindow(windowName);
  }

  return currentPage ? (
    <Home
      viewportWidth={viewportWidth}
      handleCurrentPage={handlePage}
      fromLocation={fromLocation}
      toLocation={toLocation}
      setFromSuggestions={setFromSuggestions}
      setToSuggestions={setToSuggestions}
      handleToLocationChange={handleToLocationChange}
      handleFromLocationChange={handleFromLocationChange}
      handleFromSuggestionClick={handleFromSuggestionClick}
      handleToSuggestionClick={handleToSuggestionClick}
      toSuggestions={toSuggestions}
      fromSuggestions={fromSuggestions}
    />
  ) : (
    <ApplicationInterface
      handleChangeWindow={handleChangeWindow}
      viewportWidth={viewportWidth}
      currentWindow={currentWindow}
      fromLocation={fromLocation}
      toLocation={toLocation}
      fromLatitude={fromLatitude}
      fromLongitude={fromLongitude}
      toLatitude={toLatitude}
      toLongitude={toLongitude}
    />
  );
}

function ApplicationInterface({
  handleChangeWindow,
  viewportWidth,
  currentWindow,
  fromLocation,
  toLocation,
  fromLatitude,
  fromLongitude,
  toLatitude,
  toLongitude,
}) {
  return (
    <div className="App">
      <header className="App-header">
        <Navbar viewportWidth={viewportWidth} />
      </header>
      <div className="main_app">
        {currentWindow === "Itinerary" && <Itinerary />}
        {currentWindow === "Map" && (
          <Map
            fromLocation={fromLocation}
            toLocation={toLocation}
            fromLatitude={fromLatitude}
            fromLongitude={fromLongitude}
            toLatitude={toLatitude}
            toLongitude={toLongitude}
          />
        )}
        {viewportWidth > 800 && (
          <Map
            fromLocation={fromLocation}
            toLocation={toLocation}
            fromLatitude={fromLatitude}
            fromLongitude={fromLongitude}
            toLatitude={toLatitude}
            toLongitude={toLongitude}
          />
        )}
      </div>
      {viewportWidth <= 800 && (
        <FooterBar onChangeWindow={handleChangeWindow} />
      )}
    </div>
  );
}

export default App;
