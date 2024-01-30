import { useState, useEffect } from "react";
import "./Navbar.css";

const Navbar = ({viewportWidth}) => {
  const [navIsOpen, setNavIsOpen] = useState(false);

  function handleClick() {
    console.log("Before Toggle:", navIsOpen);
    setNavIsOpen(!navIsOpen);
    console.log("After Toggle:", navIsOpen);
  }

  useEffect(() => {
    console.log("Navbar Component Rendering. IsOpen:", navIsOpen);
  }, [navIsOpen]);

  const sidebarPanelClass = `sidebar-panel ${navIsOpen ? "sidebar-open" : ""}`;

  return (
    <nav className="main__navbar">
      {navIsOpen ? (
        <SideBarPanel
          sidebarPanelClass={sidebarPanelClass}
          OnViewSideBar={handleClick}
          navIsOpen={navIsOpen}
        />
      ) : (
        <>
          {viewportWidth <= 800 && <MenuIcon OnViewSideBar={handleClick} />}
          {viewportWidth > 800 && <DesktopNavigation />}

          <UserIcon />
        </>
      )}
    </nav>
  );
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
      <div className={sidebarPanelClass}>
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

function DesktopNavigation() {
  return (
    <div className="navigation-panel">
      <h4>Lankan Amigo</h4>
      <ul className="main-nav-links">
        <li className="main-nav-link">Home</li>
        <li className="main-nav-link">Edit</li>
        <li className="main-nav-link">Places</li>
        <li className="main-nav-link">Reviews</li>
      </ul>
    </div>
  );
}

function UserIcon() {
  return (
    <div className="user">
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
          d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
        />
      </svg>
    </div>
  );
}

function CloseIcon({OnViewSideBar, navIsOpen}){
  return <div className={`menu ${navIsOpen ? "open-sidebar" : ""}`} onClick={OnViewSideBar}>
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 nav-icon">
  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
</svg>
</div>

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

