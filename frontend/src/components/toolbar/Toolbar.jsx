import React, { useState } from "react";
import {
  AppstoreOutlined,
  ContainerOutlined,
  DesktopOutlined,
  MailOutlined,
  PieChartOutlined,
} from "@ant-design/icons";
import { Menu, Switch } from "antd";

const items = [
  {
    key: "1",
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
  const [current, setCurrent] = useState("1");

  const onClick = (e) => {
    console.log("click ", e);
    setCurrent(e.key);
    switch (e.key) {
      case "1": {
        console.log("Annotate");
      }
      case "2": {
        console.log("View");
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
        items={items}
      />
    </>
  );
};
