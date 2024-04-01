import logo from "./logo.svg";
import "./App.css";
import Itinerary from "./Itinerary.js";
import Navbar from "./Navbar.js";
import Map from "./Map.js";
import FooterBar from "./FooterBar.js";
import Home from "./home-components/Home.js";
import React, { useState, useEffect, useRef } from "react";

import "./home-components/TranslateComponent/i18n.js";
import {
  BrowserRouter,
  Route,
  Routes,
  useLocation,
  useParams,
} from "react-router-dom";
import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  DirectionsRenderer,
} from "@react-google-maps/api";
import Login from "./AccountComponents/Login.js";
import SignUp from "./AccountComponents/SignUp.js";
import SignIn from "./AccountComponents/SignIn.js";
import Dashboard from "./Dashboard.js";
import Error from "./Error.js";
import About from "./home-components/About us/about.js";

function App() {
  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);
  const [currentWindow, setCurrentWindow] = useState("Itinerary");
  // const [currentPage, setCurrentPage] = useState(true);

  // function handlePage() {
  //   setCurrentPage(!currentPage);
  // }

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

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/trip"
          element={
            <ApplicationInterface
              viewportWidth={viewportWidth}
              currentWindow={currentWindow}
              handleChangeWindow={handleChangeWindow}
            />
          }
        />
        <Route
          path="/dashboard"
          element={<Dashboard viewportWidth={viewportWidth} />}
        />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/signIn" element={<SignIn />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<Error />} />

        {/* <Route path="/login" element={<SignIn />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

function ApplicationInterface({
  handleChangeWindow,
  viewportWidth,
  currentWindow,
}) {
  const { type } = useParams();
  const location = useLocation();
  const params = new URLSearchParams(location.state);
  const { from, to, fromDate, toDate, budget, travelMode } = location.state;

  const style = { position: "absolute", color: "#000" };

  ///////////////////////////////////////////////////////////////////////////

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyBkePZHNAeceiSPlP4LuZIPd28NpBJcaF8",
    libraries: ["places"],
  });
  const [map, setMap] = useState(/** @type google.maps.Map */ (null));
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [busRoute, setBusRoute] = useState(null);
  useEffect(() => {
    if (directionsResponse) {
      const newBusRoute = [];
      directionsResponse.routes[0].legs[0].steps.forEach((step) => {
        // console.log(step);
        if (step.transit && step.transit.num_stops) {
          newBusRoute.push(step.transit.num_stops);
        }
      });
      setBusRoute(newBusRoute);
    }
  }, [directionsResponse]);

  console.log(busRoute);

  if (directionsResponse) {
    console.log("Rerendering");
  }
  if (!isLoaded) {
    return <div>Loading</div>;
  }

  async function calculateRoute() {
    if (from === "" || to === "") {
      return;
    }

    let mode = "";
    mode =
      travelMode === "bus" || travelMode === "train"
        ? // eslint-disable-next-line no-undef
          google.maps.TravelMode.TRANSIT
        : // eslint-disable-next-line no-undef
          google.maps.TravelMode.DRIVING;
    // eslint-disable-next-line no-undef
    const directionsService = new google.maps.DirectionsService();
    const results = await directionsService.route({
      origin: from,
      destination: to,
      travelMode: mode,
    });
    setDirectionsResponse(results);
    console.log(results);
  }

  ///////////////////////////////////////////////////////////////////////////

  const items = [
    { name: "Home", path: "/" },
    { name: "Edit Plan", path: "/edit" },
    { name: "Reviews", path: "/reviews" },
  ];
  return (
    <div className="App">
      <header className="App-header">
        <Navbar viewportWidth={viewportWidth} style={style} items={items} />
      </header>
      <div className="main_app">
        {currentWindow === "Itinerary" && (
          <Itinerary
            toLocation={to}
            toDate={toDate}
            fromDate={fromDate}
            budget={budget}
            travelMode={travelMode}
            response={directionsResponse}
            busRoute={busRoute}
          />
        )}
        {currentWindow === "Map" && (
          <Map
            fromLocation={from}
            toLocation={to}
            travelMode={travelMode}
            setMap={setMap}
            calculateRoute={calculateRoute}
            directionsResponse={directionsResponse}
          />
        )}
        {viewportWidth > 800 && (
          <Map
            fromLocation={from}
            toLocation={to}
            travelMode={travelMode}
            setMap={setMap}
            calculateRoute={calculateRoute}
            directionsResponse={directionsResponse}
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
