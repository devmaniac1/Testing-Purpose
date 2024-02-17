import { Children, useState, useEffect, useRef } from "react";
import heroImage from "../images/hero1.jpg";

/* Slide images */
import slideI1 from "../images/Slide images/slideI1.jpg"
import slideI2 from "../images/Slide images/slideI2.jpg"
import slideI3 from "../images/Slide images/slideI3.jpg"
import slideI4 from "../images/Slide images/slideI4.jpg"


import "./Home.css";
import Navbar from "../Navbar.js";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
} from "react-icons/fa";
import { Autocomplete, useJsApiLoader } from "@react-google-maps/api";

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
      <HowWorksItems/> 
      <Footer />
    </>
  );
}

function Hero({ viewportWidth }) {
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
          onHandleStatPlan={handleStartPlan}>
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

  const printLocation = () => {
    // console.log(originRef.current.value, destiantionRef.current.value);
    handleFromLocationChange(originRef.current.value);
    handleToLocationChange(destiantionRef.current.value);
  };

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
              onChange={printLocation}
              ref={originRef}></input>
          </Autocomplete>
        </div>
        <div className="location--details">
          <label>Destination</label>
          <Autocomplete>
            <input
              type="text"
              value={toLocation}
              onChange={printLocation}
              ref={destiantionRef}></input>
          </Autocomplete>
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
        {/* Testing Purpose OnMouseEnter */}
        <button onClick={handleCurrentPage} onMouseEnter={printLocation}>
          Generate
        </button>
      </form>
    </section>
  );
}


/*How Works JS*/

function StepBox({ text, number,style}) {
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
    "Have a great time with your Friends!"
  ];
  const images = [
    slideI1,
    slideI2,
    slideI3,
    slideI4
  ];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex(prevIndex =>
        (prevIndex + 1) % images.length
      );
    }, 4000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <>
    
      <p className="header">How <span className="lankan-amigo">Lankan Amigo</span> Works!</p>
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
        <img src={images[currentImageIndex]} alt={`Slide ${currentImageIndex + 1}`} />
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
                  className="social-media-link">
                  <FaFacebookF />
                  <span>Facebook</span>
                </a>
              </div>
              <div className="social-media-set">
                <a
                  href="https://www.instagram.com"
                  className="social-media-link">
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
                  className="social-media-link">
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
        {/* <div class="footer-section">
            <h4>Legal Information</h4>
            <ul>
              <li>
                <a href="/terms">Terms & Conditions</a>
              </li>
              <li>
                <a href="/privacy">Privacy Policy</a>
              </li>
              <li>
                <a href="/security">Security Measures</a>
              </li>
              <li>
                <a href="/cookie">Cookie Usage</a>
              </li>
            </ul>
          </div> */}
      </div>
    </div>
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
      style={{ position: "absolute", padding: 0 }}>
      {suggestions.map((suggestion, index) => (
        <div
          key={index}
          onClick={() => handleSuggestionClick(suggestion)}
          style={{ cursor: "pointer" }}>
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
      onClick={onHandleStatPlan}>
      {children}
    </a>
  );
}


export default Home;
