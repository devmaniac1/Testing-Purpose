// import logo from "./logo.svg";
import "./App.css";
import Itinerary from "./Itinerary.js";
import Navbar from "./Navbar.js";
import Map from "./Map.js";
import FooterBar from "./FooterBar.js";
import Home from "./home-components/Home.js";
import Error from "./Error.js";
import React, { useEffect, useState } from "react";
import {
  BrowserRouter,
  Route,
  Routes,
  useLocation,
  useParams,
} from "react-router-dom";
import Login from "./Login.js";

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
        <Route path="/" element={<Home viewportWidth={viewportWidth} />} />
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
        <Route path="/signUp" element={<Login />} />
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

  console.log(location);
  // const from
  // const {params} =
  const style = { position: "relative", color: "#000" };
  return (
    <div className="App">
      <header className="App-header">
        <Navbar viewportWidth={viewportWidth} style={style} />
      </header>
      <div className="main_app">
        {currentWindow === "Itinerary" && (
          <Itinerary
            toLocation={to}
            toDate={toDate}
            fromDate={fromDate}
            budget={budget}
            travelMode={travelMode}
          />
        )}
        {currentWindow === "Map" && (
          <Map fromLocation={from} toLocation={to} travelMode={travelMode} />
        )}
        {viewportWidth > 800 && (
          <Map fromLocation={from} toLocation={to} travelMode={travelMode} />
        )}
      </div>
      {viewportWidth <= 800 && (
        <FooterBar onChangeWindow={handleChangeWindow} />
      )}
    </div>
  );
}

export default App;
