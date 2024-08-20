// MapOverlay.js
import React from "react";
import ReactDOM from "react-dom";
import { CheckCircleOutlined, CloseOutlined } from "@ant-design/icons";

const Overlay = ({ position, onDone, onCancel }) => {
  return ReactDOM.createPortal(
    <div
      style={{
        position: "absolute",
        top: position.lat,
        left: position.lng,
        display: "flex",
        flexDirection: "row",
        gap: "10px",
        backgroundColor: "white",
        padding: "5px",
        borderRadius: "5px",
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
        zIndex: 10,
      }}
    >
      <button onClick={onDone} style={{ border: "none", background: "none" }}>
        <CheckCircleOutlined style={{ fontSize: "24px", color: "green" }} />
      </button>
      <button onClick={onCancel} style={{ border: "none", background: "none" }}>
        <CloseOutlined style={{ fontSize: "24px", color: "red" }} />
      </button>
    </div>,
    document.body
  );
};

export default Overlay;
