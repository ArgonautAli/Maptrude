import React from "react";
import { Typography } from "antd";
import { Menu, Button } from "antd";
import { useNavigate } from "react-router-dom";
import { APP_ROUTES } from "../../utils";
import { getJwtToken, logout } from "../../pages/login/helper";
import "./appBar.css";

const { Text } = Typography;

export const Appbar = () => {
  const navigate = useNavigate();
  const isAuthenticated = getJwtToken();

  return (
    <Menu theme="light" mode="horizontal" defaultSelectedKeys={["1"]}>
      <Menu.Item key="emoji" className="menu-item-logo">
        🐙 Maptrude
      </Menu.Item>
      <Menu.Item key="spacer" disabled style={{ marginLeft: "auto" }} />
      {isAuthenticated ? (
        <>
          <Menu.Item key="logout">
            <Button
              type="error"
              onClick={() => {
                logout();
                navigate(APP_ROUTES.LOGIN);
                localStorage.removeItem("persist:root");
              }}
            >
              <Text type="danger">Logout</Text>
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
