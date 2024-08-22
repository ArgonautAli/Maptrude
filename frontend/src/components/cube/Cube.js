import React, { useEffect, useRef, useState } from "react";
import {
  Engine,
  Scene,
  useBeforeRender,
  useClick,
  useHover,
} from "react-babylonjs";
import { Vector3, Color3 } from "@babylonjs/core";
import { useSelector } from "react-redux";

const rpm = 5;

export const SpinningBox = () => {
  const boxRef = useRef(null);
  const texture = useSelector((state) => state.mapData.texture);
  const [hovered, setHovered] = useState(false);

  useHover(
    () => setHovered(true),
    () => setHovered(false),
    boxRef
  );

  useBeforeRender((scene) => {
    if (boxRef.current) {
      var deltaTimeInMillis = scene.getEngine().getDeltaTime();
      boxRef.current.rotation.y +=
        (rpm / 60) * Math.PI * 2 * (deltaTimeInMillis / 1000);
    }
  });

  console.log("texture123", texture);

  return (
    <Engine antialias adaptToDeviceRatio canvasId="babylonJS">
      <Scene>
        <arcRotateCamera
          name="camera1"
          target={Vector3.Zero()}
          alpha={Math.PI / 2}
          beta={Math.PI / 4}
          radius={5}
          minZ={0.1}
          wheelPrecision={50}
        />
        <hemisphericLight
          name="light1"
          intensity={0.7}
          direction={Vector3.Up()}
        />
        <box name="cube" size={2} position={Vector3.Zero()}>
          <standardMaterial name="box-mat">
            <texture key={texture} url={texture} />
          </standardMaterial>
        </box>
      </Scene>
    </Engine>
  );
};
