import React, { useEffect, useState } from "react";
import { Menu } from "antd";
import {
  CheckCircleOutlined,
  CloseOutlined,
  RollbackOutlined,
  FolderViewOutlined,
  FieldNumberOutlined,
} from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import {
  toggleDrawShape,
  setMapData,
  setRectangleBounds,
  clearRectangle,
} from "../mapContainer/Map.slice";
import { getMostFreqText, getTexture } from "../mapContainer/helper";

export const Toolbar = () => {
  const { SubMenu } = Menu;
  const dispatch = useDispatch();
  const texture = useSelector((state) => state.mapData.texture);
  const rectangleBounds = useSelector((state) => state.mapData.rectangleBounds);
  const userId = useSelector((state) => state.userData.userId);
  const [current, setCurrent] = useState("1");
  const [textureList, setTextureList] = useState([]);
  const [mostFreq, setMostFreq] = useState([]);

  useEffect(() => {
    getTextureHandler();
    getMostFrequentTexture();
  }, []);

  const getTextureHandler = async () => {
    await getTexture(
      userId,
      (data) => {
        setTextureList(data);
      },
      (err) => {
        console.err(err);
      }
    );
  };

  const getMostFrequentTexture = async () => {
    await getMostFreqText(
      (data) => setMostFreq(data),
      (err) => {
        console.err(err);
      }
    );
  };

  const onClick = (e) => {
    setCurrent(e.key);

    if (e.key.startsWith("texture_")) {
      const textureId = e.key.replace("texture_", ""); // Extract the texture ID
      dispatch(setMapData({ texture: textureList[textureId].texture }));
      return;
    } else {
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
          dispatch(setRectangleBounds(null));
          dispatch(clearRectangle());
          break;
        default:
          break;
      }
    }
  };

  return (
    <Menu
      theme={"light"}
      onClick={onClick}
      style={{
        width: 300,
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
        style={{ maxHeight: "250px", overflow: "scroll" }}
        key="sub1"
        icon={<FolderViewOutlined />}
        title="Recent textures"
      >
        {textureList.map((texture, index) => {
          return (
            <Menu.Item key={`texture_${index}`}>
              {texture.geoCode || `Region: ${index}`}
            </Menu.Item>
          );
        })}
      </SubMenu>
      <SubMenu
        key="sub2"
        style={{ maxHeight: "250px", overflow: "scroll" }}
        icon={<FieldNumberOutlined />}
        title="Frequent regions"
      >
        {mostFreq.map((freq, index) => {
          return (
            <Menu.Item>
              {`Region: ${freq._id || index}`}
              <span> Count: {freq.count}</span>
              {/* {`Count : ${freq.count}`} */}
            </Menu.Item>
          );
        })}
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
