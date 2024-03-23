import { useState, useEffect } from "react";
import "./Navbar.css";
import logo from "./images/hero-logo.png";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

const Navbar = ({ viewportWidth, style, items }) => {
  const [navIsOpen, setNavIsOpen] = useState(false);
  const position = style.position;
  const color = style.color;
  // console.log(color);

  const [isSticky, setIsSticky] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 100) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  function handleClick() {
    setNavIsOpen(!navIsOpen);
  }

  const sidebarPanelClass = `sidebar-panel ${navIsOpen ? "sidebar-open" : ""}`;
  const navbarStyle = {
    // position: position,
    // top: "0",
    // left: "50%",
    // transform: "translateX(-50%)",
    // backgroundColor: "#265073",
    // width: "100vw",
    // padding: "1.6rem 3.2rem",
    // margin: "0",
    color: color,
    // boxShadow: "0rem 0.5rem 0.5rem rgba(0,0,0,0.5)",
  };
  return (
    <nav
      className={`main__navbar ${isSticky ? "sticky" : ""}`}
      style={navbarStyle}
    >
      {navIsOpen ? (
        <SideBarPanel
          sidebarPanelClass={sidebarPanelClass}
          OnViewSideBar={handleClick}
          navIsOpen={navIsOpen}
        />
      ) : (
        <>
          {viewportWidth <= 800 && <MenuIcon OnViewSideBar={handleClick} />}
          {viewportWidth > 800 && (
            <DesktopNavigation color={color} items={items} />
          )}

          <UserIcon />
        </>
      )}
    </nav>
  );
};

const temp = {
  zIndex: "100",
};

function SideBarPanel({ sidebarPanelClass, OnViewSideBar, navIsOpen }) {
  return (
    <>
      <div
        className="empty-container"
        aria-label="Empty Container"
        role="presentation"
        style={{ height: "2rem", margin: "0.4rem" }}
      ></div>
      <div className={sidebarPanelClass} style={temp}>
        <CloseIcon OnViewSideBar={OnViewSideBar} navIsOpen={navIsOpen} />
        <h4>Lankan Amigo</h4>
        <ul>
          <li>Home</li>
          <li>Trip Assistant</li>
          <li>Edit Plan</li>
          <li>User Account</li>
        </ul>
      </div>
    </>
  );
}

function DesktopNavigation({ color, items }) {
  console.log(color);
  return (
    <div className="navigation-panel">
      <img src={logo} alt="logo"></img>
      <ul className="main-nav-links">
        {items.map((item) => (
          <li className="main-nav-link">
            <Link to={item.path} style={{ color }}>
              {item.name}
            </Link>
          </li>
        ))}
        {/* <li className="main-nav-link">Edit</li> */}
        {/* <li className="main-nav-link">Places</li> */}
        {/* <li className="main-nav-link">Reviews</li> */}
      </ul>
    </div>
  );
}

function UserIcon() {
  return (
    <div className="user">
      {/* <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6 nav-icon">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
        />
      </svg> */}
      <Button
        sx={{
          color: "#fff",
          fontSize: "1.6rem",
          fontFamily: "Poppins",
          fontWeight: "600",
          backgroundColor: "#2d9596",
          borderRadius: "2rem",
          padding: "0.8rem 1.6rem",
        }}
      >
        <Link to="/signIn">My Account</Link>
      </Button>
    </div>
  );
}

function CloseIcon({ OnViewSideBar, navIsOpen }) {
  return (
    <div
      className={`menu ${navIsOpen ? "open-sidebar" : ""}`}
      onClick={OnViewSideBar}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6 nav-icon"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6 18 18 6M6 6l12 12"
        />
      </svg>
    </div>
  );
}

function MenuIcon({ OnViewSideBar, navIsOpen }) {
  return (
    <div
      className={`menu ${navIsOpen ? "open-sidebar" : ""}`}
      onClick={OnViewSideBar}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6 nav-icon"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
        />
      </svg>
    </div>
  );
}

export default Navbar;
