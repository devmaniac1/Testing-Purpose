// import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Error.css";

function Error() {
  // const [progress404, setProgress404] = useState(0);
  // const [progressLink, setProgressLink] = useState(0);
  // const [string404, setString404] = useState("");
  // const [stringLink, setStringLink] = useState("");

  // const characters =
  //   "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890-=+<>,./?[{()}]!@#$%^&*~`\\|".split(
  //     ""
  //   );

  // useEffect(() => {
  //   const intervalId = setTimeout(() => {
  //     const total404 =
  //       document.querySelector(".text__error")?.dataset?.text?.length;
  //     const totalLink =
  //       document.querySelector(".text__link a")?.dataset?.text?.length;

  //     if (total404 && totalLink) {
  //       const scrambleInterval = setInterval(() => {
  //         let updatedString404 = string404;
  //         let updatedStringLink = stringLink;

  //         for (let i = 0; i < total404; i++) {
  //           if (i >= progress404) {
  //             updatedString404 = setCharAt(
  //               updatedString404,
  //               i,
  //               characters[Math.round(Math.random() * (characters.length - 1))]
  //             );
  //           }
  //         }

  //         for (let i = 0; i < totalLink; i++) {
  //           if (i >= progressLink) {
  //             updatedStringLink = setCharAt(
  //               updatedStringLink,
  //               i,
  //               characters[Math.round(Math.random() * (characters.length - 1))]
  //             );
  //           }
  //         }

  //         setString404(updatedString404);
  //         setStringLink(updatedStringLink);
  //       }, 1000 / 60);

  //       const revealInterval = setInterval(() => {
  //         if (progress404 < total404) {
  //           setProgress404(progress404 + 1);
  //         } else if (progressLink < totalLink) {
  //           setProgressLink(progressLink + 1);
  //         } else {
  //           clearInterval(revealInterval);
  //           clearInterval(scrambleInterval);
  //         }
  //       }, 50);

  //       // Cleanup function for clearing intervals
  //       return () => {
  //         clearInterval(scrambleInterval);
  //         clearInterval(revealInterval);
  //       };
  //     }
  //   }, 1000);

  //   // Cleanup function for clearing timeout
  //   return () => clearTimeout(intervalId);
  // }, [progress404, progressLink, string404, stringLink, characters]);

  // const setCharAt = (str, index, chr) => {
  //   if (index > str.length - 1) return str;
  //   return str.substr(0, index) + chr + str.substr(index + 1);
  // };

  return (
    <div className="error-container">
      <div className="text">
        <h1>Oops. Something went wrong.</h1>
        <p>It seems there was an unexpected error. Please try again later.</p>
      </div>
      <div className="return-button">
        <Link to="/">
          <button>Back to home</button>
        </Link>
      </div>
    </div>
  );
}

export default Error;
