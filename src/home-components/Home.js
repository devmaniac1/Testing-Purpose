import { Children } from "react";
import heroImage from "../images/hero1.jpg";
import "./Home.css";
import Navbar from "../Navbar";

function Home() {
  return (
    <>
      <Hero />
    </>
  );
}

function Hero() {
  return (
    <section className="section section--hero">
      <Navbar viewportWidth={1300} />
      <img src={heroImage} alt="hero" />
      <div className="hero--textbox">
        <p className="hero-header">Explore the World with Travel Amigo</p>
        <p className="hero-text">
          Are you ready to embark on the journey of a lifetime? At Travel Amigo,
          we specialize in crafting unforgettable travel experiences tailored to
          your desires.
        </p>
        <div className="btns--cta">
          <Button fontSize={1.6} color={"#fff"}>
            Start Planning
          </Button>
          <Button fontSize={1.6} color={"#fff"} text-decoration={"none"}>
            Sign Up
          </Button>
        </div>
      </div>
      <Button color={"#fff"} fontSize={1.6}>
        Learn More<span> &darr;</span>
      </Button>
    </section>
  );
}

function Button({ fontSize, color, children }) {
  const buttonStyle = {
    color: color,
    fontSize: `${fontSize}rem`,
  };
  return (
    <a href="www.google.com" style={buttonStyle} className="btn-cta">
      {children}
    </a>
  );
}

export default Home;
