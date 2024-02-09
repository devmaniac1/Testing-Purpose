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
    <Home viewportWidth={viewportWidth} />
  ) : (
    <ApplicationInterface
      handleChangeWindow={handleChangeWindow}
      viewportWidth={viewportWidth}
      currentWindow={currentWindow}
    />
  );
}

function ApplicationInterface({
  handleChangeWindow,
  viewportWidth,
  currentWindow,
}) {
  return (
    <div className="App">
      <header className="App-header">
        <Navbar viewportWidth={viewportWidth} />
      </header>
      <div className="main_app">
        {currentWindow === "Itinerary" && <Itinerary />}
        {currentWindow === "Map" && <Map />}
        {viewportWidth > 800 && <Map />}
      </div>
      {viewportWidth <= 800 && (
        <FooterBar onChangeWindow={handleChangeWindow} />
      )}
    </div>
  );
}

export default App;
