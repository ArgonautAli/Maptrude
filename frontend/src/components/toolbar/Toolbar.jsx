import React, { useState } from "react";
import { Menu } from "antd";
import {
  CheckCircleOutlined,
  CloseOutlined,
  RollbackOutlined,
  FolderViewOutlined,
} from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import {
  toggleDrawShape,
  setMapData,
  setRectangleBounds,
  clearRectangle,
} from "../mapContainer/Map.slice";

export const Toolbar = () => {
  const { SubMenu } = Menu;
  const dispatch = useDispatch();
  const texture = useSelector((state) => state.mapData.texture);
  const rectangleBounds = useSelector((state) => state.mapData.rectangleBounds);
  const [current, setCurrent] = useState("1");

  const onClick = (e) => {
    setCurrent(e.key);
    switch (e.key) {
      case "1":
        dispatch(toggleDrawShape(true));
        break;
      case "2":
        dispatch(toggleDrawShape(false));
        dispatch(setRectangleBounds(null)); // Clear the rectangle
        dispatch(clearRectangle()); // Dispatch action to clear the rectangle
        break;
      case "3":
        dispatch(setMapData({ texture: null }));
        dispatch(toggleDrawShape(false));
        dispatch(setRectangleBounds(null)); // Clear the rectangle
        dispatch(clearRectangle());
        break;
    }
  };

  return (
    <Menu
      theme={"light"}
      onClick={onClick}
      style={{
        width: 256,
        borderRadius: "16px",
        padding: "8px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
      }}
      selectedKeys={[current]}
      mode="inline"
    >
      <SubMenu
        key="sub1"
        icon={<FolderViewOutlined />}
        title="View recent textures"
        // style={{ textAlign: "left", display: "flex", alignItems: "center" }}
      >
        <Menu.Item key="4">Option 1</Menu.Item>
        <Menu.Item key="5">Option 2</Menu.Item>
        <Menu.Item key="6">Option 3</Menu.Item>
      </SubMenu>
      {rectangleBounds && !texture ? (
        <>
          <Menu.Item
            key="1"
            style={{ textAlign: "left", display: "flex", alignItems: "center" }}
          >
            <CheckCircleOutlined />
            <span style={{ marginLeft: "8px" }}>Create texture </span>
          </Menu.Item>
          <Menu.Item
            key="2"
            style={{ textAlign: "left", display: "flex", alignItems: "center" }}
          >
            <CloseOutlined />
            <span style={{ marginLeft: "8px" }}>Cancel</span>
          </Menu.Item>
        </>
      ) : null}

      {texture ? (
        <Menu.Item
          key="3"
          icon={<RollbackOutlined />}
          style={{ textAlign: "left", display: "flex", alignItems: "center" }}
        >
          Go Back
        </Menu.Item>
      ) : null}
    </Menu>
  );
};

export default Toolbar;
