import React, { useState } from "react";
import {
  AppstoreOutlined,
  ContainerOutlined,
  DesktopOutlined,
  MailOutlined,
  PieChartOutlined,
} from "@ant-design/icons";
import { Menu, Switch } from "antd";
import { CheckCircleOutlined, CloseOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import { drawShape, openMap } from "../mapContainer/Map.slice";

const items_annotate = [
  {
    key: "1",
    label: (
      <div>
        <CheckCircleOutlined />
        <span style={{ marginLeft: "8px" }}>Draw Shape</span>
      </div>
    ),
  },
  {
    key: "2",
    label: (
      <div>
        <CloseOutlined />
        <span style={{ marginLeft: "8px" }}>Cancel</span>
      </div>
    ),
  },
  {
    key: "3",
    icon: <DesktopOutlined />,
    label: "View shape",
  },
  {
    key: "sub2",
    label: "View recent",
    icon: <MailOutlined />,
    children: [
      {
        key: "5",
        label: "Option 5",
      },
      {
        key: "6",
        label: "Option 6",
      },
      {
        key: "7",
        label: "Option 7",
      },
      {
        key: "8",
        label: "Option 8",
      },
    ],
  },
  {
    key: "sub3",
    label: "Most frequent",
    icon: <MailOutlined />,
    children: [
      {
        key: "5",
        label: "Option 5",
      },
      {
        key: "6",
        label: "Option 6",
      },
      {
        key: "7",
        label: "Option 7",
      },
      {
        key: "8",
        label: "Option 8",
      },
    ],
  },
];

const items = [
  {
    key: "3",
    icon: <DesktopOutlined />,
    label: "View shape",
  },
  {
    key: "sub2",
    label: "View recent",
    icon: <MailOutlined />,
    children: [
      {
        key: "5",
        label: "Option 5",
      },
      {
        key: "6",
        label: "Option 6",
      },
      {
        key: "7",
        label: "Option 7",
      },
      {
        key: "8",
        label: "Option 8",
      },
    ],
  },
  {
    key: "sub3",
    label: "Most frequent",
    icon: <MailOutlined />,
    children: [
      {
        key: "5",
        label: "Option 5",
      },
      {
        key: "6",
        label: "Option 6",
      },
      {
        key: "7",
        label: "Option 7",
      },
      {
        key: "8",
        label: "Option 8",
      },
    ],
  },
];

export const Toolbar = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.mapData.isOpen);
  const [current, setCurrent] = useState("1");

  const onClick = (e) => {
    setCurrent(e.key);
    switch (e.key) {
      case "1": {
        dispatch(drawShape({ drawShape: true }));
      }
      case "2": {
        dispatch(openMap({ isOpen: false }));
      }
    }
  };
  return (
    <>
      <Menu
        theme={"light"}
        onClick={onClick}
        style={{
          width: 256,
          borderRadius: "16px",
          padding: "8px",
        }}
        defaultOpenKeys={["sub1"]}
        selectedKeys={[current]}
        mode="inline"
        items={isOpen ? items_annotate : items}
      />
    </>
  );
};
