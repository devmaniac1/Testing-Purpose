import React from "react";
import { Menu } from "antd";
import { Link } from "react-router-dom";

const LeftMenu = ({ mode }) => {
  return (
    <Menu mode={mode} style={{ fontFamily: "Poppins", fontSize: "1.6rem" }}>
      <Link to="/">
        <Menu.Item key="home">Home</Menu.Item>
      </Link>
      <Link to="/services">
        <Menu.Item key="services">Services</Menu.Item>{" "}
      </Link>
      <Menu.Item key="destination">Destinations</Menu.Item>
      <Link to="/about">
        <Menu.Item key="about">Team</Menu.Item>
      </Link>
      <Link to="/contact">
        <Menu.Item key="contact">Contact Us</Menu.Item>
      </Link>
    </Menu>
  );
};

export default LeftMenu;
