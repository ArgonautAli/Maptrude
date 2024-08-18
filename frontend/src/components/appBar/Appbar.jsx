import React from "react";
import { HomeOutlined, UserOutlined, SettingOutlined } from "@ant-design/icons";
import { Menu, Button } from "antd";
import { useNavigate } from "react-router-dom";
import { APP_ROUTES } from "../../utils";
import { getJwtToken, logout } from "../../pages/login/helper";

export const Appbar = () => {
  const navigate = useNavigate();
  const isAuthenticated = getJwtToken();

  return (
    <Menu theme="light" mode="horizontal" defaultSelectedKeys={["1"]}>
      <Menu.Item key="emoji">😊 Maptrude</Menu.Item>
      <Menu.Item key="spacer" disabled style={{ marginLeft: "auto" }} />
      {isAuthenticated ? (
        <>
          <Menu.Item key="logout">
            <Button
              type="error"
              onClick={() => {
                logout();
                navigate(APP_ROUTES.LOGIN);
              }}
            >
              Logout
            </Button>
          </Menu.Item>
        </>
      ) : (
        <>
          {" "}
          <Menu.Item key="login">
            <Button type="primary" onClick={() => navigate(APP_ROUTES.LOGIN)}>
              Login
            </Button>
          </Menu.Item>
          <Menu.Item key="signup">
            <Button type="default" onClick={() => navigate(APP_ROUTES.SIGNUP)}>
              Signup
            </Button>
          </Menu.Item>
        </>
      )}
    </Menu>
  );
};
