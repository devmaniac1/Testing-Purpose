import React from "react";
import { Menu } from "antd";

const LeftMenu = ({ mode }) => {
  return (
    <Menu mode={mode} style={{ fontFamily: "Poppins", fontSize: "1.6rem" }}>
      <Menu.Item key="explore">Home</Menu.Item>
      <Menu.Item key="explore">Services</Menu.Item>
      <Menu.Item key="features">Destinations</Menu.Item>
      <Menu.Item key="about">Team</Menu.Item>
      <Menu.Item key="contact">Contact Us</Menu.Item>
    </Menu>
  );
};

export default LeftMenu;
