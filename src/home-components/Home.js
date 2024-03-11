import { Children, useState, useEffect, useRef } from "react";
import heroImage from "../images/hero1.jpg";
import { Link, useNavigate } from "react-router-dom";

/* Slide images */
import slideI1 from "../images/Slide images/slideI1.jpg";
import slideI2 from "../images/Slide images/slideI2.jpg";
import slideI3 from "../images/Slide images/slideI3.jpg";
import slideI4 from "../images/Slide images/slideI4.jpg";

import "./Home.css";
import Navbar from "../Navbar.js";
import Login from "../Login.js";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
} from "react-icons/fa";
import { Autocomplete, useJsApiLoader } from "@react-google-maps/api";
import Dashboard from "../Dashboard.js";
import Itinerary from "../Itinerary.js";







function Home({ viewportWidth, handleCurrentPage }) {
  const [signUp, setSignUp] = useState(false);
  const navigate = useNavigate();
  const handleGenerateClick = () => {
    // Perform form validation or data processing here (if needed)
    navigate("/applicationInterface"); // Navigate to the desired route
  };
  function handleClick(e) {
    e.preventDefault();
    setSignUp(!signUp);
  }
  return (
    <>
      {signUp ? (
        <Login />
      ) : (
        <>
          <Itinerary/>
          <Hero viewportWidth={viewportWidth} handleClick={handleClick} />
          <CTA handleCurrentPage={handleCurrentPage} />
          <Features />
          <HowWorksItems />
          <Footer />
        </>
      )}
    </>
  );
}

function Hero({ viewportWidth, handleClick }) {
  const style = { position: "absolute", color: "#fff" };

  return (
    <section className="section section--hero">
      <Navbar viewportWidth={viewportWidth} style={style} />
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
          <Button
            handleClick={handleClick}
            fontSize={1.6}
            color={"#fff"}
            padding={"1.6rem 3.2rem"}
          >
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

function CTA({ handleCurrentPage }) {
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
          handleClick={handleStartPlan}
        >
          Start Planning
        </Button>
        <Button fontSize={1.4} color={"#fff"} padding={"1.6rem 2.4rem"}>
          Sign Up
        </Button>
      </div>
      {startPlan && <GeneratePlan handleCurrentPage={handleCurrentPage} />}
    </section>
  );
}

function GeneratePlan({ handleCurrentPage }) {
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
    return <div>Wrong Api</div>;
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
              ref={originRef}
            ></input>
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
              ref={destiantionRef}
            ></input>
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
              }}
            >
              <button>Generate</button>
            </Link>
          )}
      </form>
    </section>
  );
}

/*How Works JS*/

function StepBox({ text, number, style }) {
  return (
    <div className={`step-box ${style}`}>
      <div className="step-content">
        <div className="step-number">{number}</div>
        <div className="step-text">{text}</div>
      </div>
    </div>
  );
}

function HowWorksItems() {
  const steps = [
    "Select Your Destination",
    "Choose Your Accommodations",
    "Get Recommendations & Plan Your Trip",
    "Have a great time with your Friends!",
  ];
  const images = [slideI1, slideI2, slideI3, slideI4];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <>
      <p className="header">
        How <span className="lankan-amigo">Lankan Amigo</span> Works!
      </p>
      <div className="HowWorksContainer">
        <div className="steps">
          {steps.map((step, index) => (
            <StepBox
              key={index}
              text={step}
              number={index + 1}
              style={index % 2 === 0 ? "stepstyle1" : "stepstyle2"}
            />
          ))}
        </div>

        <div className="slideshow">
          <img
            src={images[currentImageIndex]}
            alt={`Slide ${currentImageIndex + 1}`}
          />
        </div>
      </div>
    </>
  );
}

function Footer() {
  return (
    <div className="footer">
      <div className="footer-section-padding">
        <div className="footer-links">
          <div className="footer-links-div">
            <h4>Plan Your Trip</h4>
            <div>
              <a href="/explore">Destination</a>
              <a href="/accommodation">Accommodations</a>
              <a href="/activities">Book Activities</a>
              <a href="/experiences">Discover Experiences</a>
              <a href="/budgettips">Budgeting Tips</a>
              <a href="/customizeplan">Customize Your Plan</a>
            </div>
          </div>
          <div className="footer-links-div">
            <h4>Our Partners</h4>
            <div>
              <a href="/agencies">
                <p>Travel Agencies</p>
              </a>
              <a href="/accomodationproviders">
                <p>Accommodation Providers</p>
              </a>
              <a href="/guides">
                <p>Local Guides</p>
              </a>
            </div>
          </div>

          <div className="footer-links-div">
            <h4>About Us</h4>
            <div>
              <a href="/about">
                <p>Company Overview</p>
              </a>
              <a href="/coverage">
                <p>Press Coverage</p>
              </a>
              <a href="/team">
                <p>Career Opportunities</p>
              </a>
              <a href="/contact">
                <p>Contact Information</p>
              </a>
            </div>
          </div>
          <div className="footer-links-div">
            <h4>Connect With Us</h4>
            <div className="social-media-icons">
              <div className="social-media-set">
                <a
                  href="https://www.facebook.com"
                  className="social-media-link"
                >
                  <FaFacebookF />
                  <span>Facebook</span>
                </a>
              </div>
              <div className="social-media-set">
                <a
                  href="https://www.instagram.com"
                  className="social-media-link"
                >
                  <FaInstagram />
                  <span>Instagram</span>
                </a>
              </div>
              <div className="social-media-set">
                <a href="https://www.twitter.com" className="social-media-link">
                  <FaTwitter />
                  <span>Twitter</span>
                </a>
              </div>
              <div className="social-media-set">
                <a
                  href="https://www.linkedin.com"
                  className="social-media-link"
                >
                  <FaLinkedinIn />
                  <span>LinkedIn</span>
                </a>
              </div>
            </div>
            <a href="/newsletter-signup" className="newsletter-link">
              Newsletter Signup
            </a>
          </div>
        </div>
      </div>
      <hr></hr>
      <div className="footer-below">
        <div class="footer-copyright">
          <p>
            &copy; <span id="copyright-year"></span> LankanAmigo. All rights
            reserved.
          </p>
        </div>
      </div>
    </div>
  );
}

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

function Button({ fontSize, color, padding, handleClick, children }) {
  const buttonStyle = {
    color: color,
    fontSize: `${fontSize}rem`,
    padding: padding,
  };
  return (
    <a href="" style={buttonStyle} className="btn-cta" onClick={handleClick}>
      {children}
    </a>
  );
}

/* Features page */
function Features() {
  return (
    <div className="features--mainContainer">
      <p className="features--header">
        <span>LANKAN AMIGO</span> Features
      </p>
      <div className="features--CardsContainer">
        <FeatureCards />
      </div>
    </div>
  );
}

function FeatureCards() {
  const featureList = [
    "Sample feature sample sample 1",
    "Sample feature sample sample 2",
    "Sample feature sample sample 3",
    "Sample feature sample sample 4",
  ];

  return (
    <div className="features--featureCard">
      {featureList.map((step, index) => (
        <StepBox
          key={index}
          text={step}
          style={index % 2 === 0 ? "stepstyle1" : "stepstyle2"}
        />
      ))}
    </div>
  );
}

export default Home;
