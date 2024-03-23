import "./TranslateComponent/i18n.js";
import "./Home.css";
import { ReactTyped } from "react-typed";
import { Button, Card } from "@mui/material";
import { Fade } from "react-awesome-reveal";
import { Carousel } from "antd";
import Kandy1 from "./Images/kandy.jpg";
import Kandy2 from "./Images/kandy (2).jpg";
import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
} from "react-icons/fa";
import { useScroll, motion, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Autocomplete, useJsApiLoader } from "@react-google-maps/api";
import Navbar from "./Navbar";
import { useTranslation } from "react-i18next";

// import { useTranslation } from "react-i18next";

function App() {
  return (
    <div className="app">
      <Navbar />

      <Header />

      <Services />
      <HowItWorks />
      <PopularDestination />
      <Footer />
    </div>
  );
}

function NavBar() {
  const { t } = useTranslation();

  return (
    <div className="main--navigation">
      <h4>Lankan Amigo</h4>

      <nav>
        <ul>
          <li>Home</li>

          <li>Feature</li>

          <li>Team</li>

          <li>Ask Amigo</li>

          <li>Contact</li>
        </ul>
      </nav>

      <div style={{ display: "flex", alignItems: "center", gap: "1.6rem" }}>
        <Button
          sx={{
            fontFamily: "Poppins",
            fontSize: "2.4rem",
            margin: "0",
            padding: "0",
          }}
        >
          Sign Up
        </Button>
        <Button
          sx={{
            fontFamily: "Poppins",
            fontSize: "2.4rem",
            margin: "0",
            padding: "0",
          }}
        >
          Login{" "}
        </Button>
      </div>
    </div>
  );
}

function Header() {
  const { t } = useTranslation();
  const {
    line1,
    line2,
    line3,
    line4,
    line5,
    line6,
    line7,
    line8,
    line9,
    line10,
    line11,
    line12,
    line13,
    line14,
    line15,
    line16,
    line17,
    line18,
  } = t("header");
  return (
    <div className="main--header">
      <div className="main--header--text">
        <Fade direction="up" duration={500} cascade={true}>
          <p>{line1}</p>
        </Fade>
        <Fade direction="up" delay={200} duration={500}>
          <p className="header--subtext">{line2}</p>
        </Fade>
        <Fade>
          <p className="header--typed">
            {line3}{" "}
            <ReactTyped
              strings={[`${line4}`, line5, line6]}
              typeSpeed={40}
              backSpeed={50}
              loop
            />
          </p>
        </Fade>
      </div>
      <GeneratePlan />
    </div>
  );
}

function GeneratePlan() {
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
  const { t } = useTranslation();
  /** @type React.MutableRefObject<HTMLInputElement> */
  const originRef = useRef();
  /** @type React.MutableRefObject<HTMLInputElement> */
  const destiantionRef = useRef();
  if (!isLoaded) {
    return <div>Loading....</div>;
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

  const allInputsFilled = () => {
    return (
      fromLocation.trim() !== "" &&
      toLocation.trim() !== "" &&
      fromDate.trim() !== "" &&
      toDate.trim() !== "" &&
      // budget.trim() !== "" &&
      travelMode.trim() !== ""
    );
  };

  const {
    line7,
    line8,
    line9,
    line10,
    line11,
    line12,
    line13,
    line14,
    line15,
    line16,
    line17,
    line18,
  } = t("header");

  return (
    <div className="main--generate">
      <p className="generate--header">{line18}</p>
      <div className="generate--grid">
        <div className="from">
          <label>{line7}</label>
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
        <div className="to">
          <label>{line8}</label>
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
        <div className="date--from">
          <label>{line9}</label>
          <input type="date" onChange={handleFromDate} value={fromDate}></input>
        </div>
        <div className="date--to">
          <label>{line10}</label>
          <input type="date" onChange={handleToDate} value={toDate}></input>
        </div>
        <div className="mode">
          <label>{line11}</label>
          <select onChange={handleTravelMode} value={travelMode}>
            <option value="">Select mode</option>
            <option value="bus">Bus</option>
            <option value="train">Train</option>
            <option value="own vehicle">Own Vehicle</option>
          </select>
        </div>
        <div className="budget">
          <label>{line15}</label>
          <input type="number" onChange={handleBudget} value={budget}></input>
        </div>
      </div>
      <div className="cta--btns">
        <Button
          sx={{
            fontSize: "1.6rem",
            backgroundColor: "#333",
            borderRadius: "0.8rem",
          }}
        >
          {line16}
        </Button>
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
          <Button
            sx={{
              fontSize: "1.6rem",
              backgroundColor: "#333",
              borderRadius: "0.8rem",
            }}
            disabled={!isLoaded || !allInputsFilled()}
          >
            {line17}
          </Button>
        </Link>
      </div>
    </div>
  );
}

function Services() {
  const { t } = useTranslation();
  const { line1, line2, line3, line4, line5, line6 } = t("services");
  const services = [
    {
      service: line2,
      svg: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6 service--icon"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m10.5 21 5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 0 1 6-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3 17.502m9.334-12.138c.896.061 1.785.147 2.666.257m-4.589 8.495a18.023 18.023 0 0 1-3.827-5.802"
          />
        </svg>
      ),
    },
    {
      service: line3,
      svg: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6 service--icon"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 0 1 1.037-.443 48.282 48.282 0 0 0 5.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
          />
        </svg>
      ),
    },
    {
      service: line4,
      svg: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6 service--icon"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
          />
        </svg>
      ),
    },
    {
      service: line5,
      svg: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6 service--icon"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
          />
        </svg>
      ),
    },
    {
      service: line6,
      svg: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6 service--icon"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          />
        </svg>
      ),
    },
  ];
  return (
    <div className="services--main">
      <p className="services--header">{line1}</p>

      <div className="all--services">
        {services.map((service, index) => (
          <Fade
            cascade={false}
            delay={index * 50}
            direction="up"
            // triggerOnce={true}
          >
            <Service service={service} />
          </Fade>
        ))}
      </div>
    </div>
  );
}

function Service({ service }) {
  return (
    <div className="service">
      {service.svg}
      <p>{service.service}</p>
    </div>
  );
}

function HowItWorks() {
  const { t } = useTranslation();
  const { line1, line2 } = t("howItWorks");
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["0 1", "1.33 1"],
  });
  const scaleProgress = useTransform(scrollYProgress, [0, 1], [0.5, 1]);

  return (
    <motion.section
      ref={ref}
      style={{
        scale: scaleProgress,
        opacity: scrollYProgress,
      }}
    >
      <Fade
        direction="up"
        duration={1000}
        // cascade={true}
        //  triggerOnce={true}
      >
        <div className="works--main">
          <p className="header">{line1}</p>
          <p className="text">{line2}</p>
          <div className="works--steps">
            <div className="work--step"></div>
            <div className="work--step"></div>
            <div className="work--step"></div>
          </div>
        </div>
      </Fade>
    </motion.section>
  );
}

function PopularDestination() {
  const { t } = useTranslation();
  const { line1, line2, line3 } = t("popularDestination");
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["0 1", "1.33 1"],
  });
  const scaleProgress = useTransform(scrollYProgress, [0, 1], [0.5, 1]);

  const destinations = [
    { name: "Kandy", img1: Kandy1, img2: Kandy2 },
    { name: "Galle" },
    { name: "Nuwara Eliya" },
  ];
  return (
    <motion.section
      ref={ref}
      style={{
        scale: scaleProgress,
        opacity: scrollYProgress,
      }}
    >
      <Fade
        direction="up"
        duration={1000}
        // cascade={true}
        // triggerOnce={true}
      >
        <div className="destination--main">
          <p className="header">{line1}</p>
          <p className="text">{line2}</p>
          {/* <div className="destinations">
          <div className="destination">
          <div>
              <Carousel autoplay>
                <img src={Kandy1} />
                <img src={Kandy2} />
                </Carousel>
                </div>
                </div>
                <div className="destination fix">
                <div>
                <Carousel autoplay>
                <img src={Kandy1} alt="" />
                <img src={Kandy2} alt="" />
                </Carousel>
                </div>
                </div>
                <div className="destination">
                <Carousel autoplay>
                <img src={Kandy1} />
                {/* <img src={Kandy2} /> */}
          {/* </Carousel> */}
          {/* </div> */}
          {/* {destinations.map((destination, index) => (
          <Destination destination={destination} />
        ))} */}
          {/* </div> */}
        </div>
      </Fade>
    </motion.section>
  );
}

function Destination({ destination }) {
  return (
    <div className="destination">
      <Carousel autoplay>
        <img src={destination.img1} />
        <img src={destination.img2} />
      </Carousel>
    </div>
  );
}

function Footer() {
  return (
    <div className="footer">
      <div className="footer-section-padding">
        <div className="footer-links">
          <div className="footer-links-div">
            <h4>Plan Your Trip</h4>
            <div></div>
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

export default App;
