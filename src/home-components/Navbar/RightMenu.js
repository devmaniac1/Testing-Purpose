import React, { useState } from "react";
import { Menu, Avatar } from "antd";
import { UserOutlined, CodeOutlined, LogoutOutlined } from "@ant-design/icons";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { Switch, Space } from "antd";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
const RightMenu = ({ mode }) => {
  const [language, setLanguage] = useState("en");
  const { t, i18n } = useTranslation();
  const handleLanguageChange = (checked) => {
    const newLanguage = checked ? "en" : "si"; // Assuming 'si' corresponds to another language
    setLanguage(newLanguage);
    i18n.changeLanguage(newLanguage); // Change language using i18n instance
  };

  return (
    <Menu mode={mode}>
      <Menu.SubMenu
        title={
          <>
            <Space direction="vertical">
              <Switch
                checkedChildren="EN"
                unCheckedChildren="SI"
                defaultChecked={language === "en"}
                style={{ marginRight: "1rem" }}
                onChange={handleLanguageChange}
              />
            </Space>
            <Avatar icon={<UserOutlined style={{ height: "1.6rem" }} />} />
            <span className="username">John Doe</span>
          </>
        }
      >
        <Menu.Item key="about-us">
          <UserOutlined /> Profile
        </Menu.Item>
        <Link to="/signUp">
          <Menu.Item key="log-out">
            <LogoutOutlined /> Account
          </Menu.Item>
        </Link>
      </Menu.SubMenu>
    </Menu>
  );
};

export default RightMenu;
