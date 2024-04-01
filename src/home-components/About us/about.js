import React, { useState, useEffect } from "react";
import "./Stylesheet.css"; // Import your stylesheet
import sidu from "./../Images/sidu.jpg";
import binada from "./../Images/binada.jpg";
import saleem from "./../Images/saleem.jpg";
import nashan from "./../Images/nashan.jpg";
import ashfaq from "./../Images/ashfaq.jpg";
import Navbar from "./../Navbar";

function About() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 0;
      setScrolled(isScrolled);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <Navbar />
      <div className={`navbar ${scrolled ? "scrolled" : ""}`}>
        {/* Navbar content */}
      </div>
      <div className="bo">
        <div className="card">
          <img src={ashfaq} alt="Ashfaq" className="card-image" />
          <div className="card-body">
            <h1 className="card-title">Ashfaq Farleen</h1>
            <p className="card-sub-topic">About Student 1 tasks</p>
            <p className="card-info">
              <h3>Backend</h3>
              <li>Crud operation</li>
              <ul>etc..</ul>
            </p>
          </div>
        </div>

        {/* Repeat similar structures for other cards */}

        <div className="card">
          <img src={sidu} className="card-image" alt="sidu" />
          <div className="card-body">
            <h1 className="card-title">Sidu </h1>
            <p className="card-sub-topic">About Student 2 tasks</p>
            <p className="card-info">
              <h3>Frontend</h3>
              <li>Landing page etc..</li>
              <ul>etc..</ul>
            </p>
          </div>
        </div>

        <div className="card">
          <img src={saleem} className="card-image" alt="Nashan" />
          <div className="card-body">
            <h1 className="card-title">Saleem Malik</h1>
            <p className="card-sub-topic">About Student 2 tasks</p>
            <p className="card-info">
              <h3>Backend</h3>
              <li>Bilingual Experience</li>
              <ul>etc..</ul>
            </p>
          </div>
        </div>

        <div className="card">
          <img src={nashan} className="card-image" alt="Saleem Malik" />
          <div className="card-body">
            <h1 className="card-title">Nashan</h1>
            <p className="card-sub-topic">About Student 2 tasks</p>
            <p className="card-info">
              <h3>Backend</h3>
              <li>Chatbot</li>
              <ul>etc..</ul>
            </p>
          </div>
        </div>

        <div className="card">
          <img src={binada} className="card-image" alt="Binada" />
          <div className="card-body">
            <h1 className="card-title">Binada</h1>
            <p className="card-sub-topic">About Student 2 tasks</p>
            <p className="card-info">
              <h3>Frontend</h3>
              <li>iteration page </li>
              <ul>etc..</ul>
            </p>
          </div>
        </div>

        {/* Remaining cards... */}
      </div>
    </>
  );
}

export default About;
