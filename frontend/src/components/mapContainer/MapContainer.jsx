import React, { useState, useRef, useEffect } from "react";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  DrawingManagerF,
} from "@react-google-maps/api";
import "./mapContainer.css";
import { Toolbar } from "../toolbar/Toolbar";
import { useDispatch, useSelector } from "react-redux";
import { openMap } from "./Map.slice.js";
import html2canvas from "html2canvas";

const libraries = ["places", "drawing"];
const mapContainerStyle = {
  width: "100vw",
  height: "90vh",
};
const center = {
  lat: 7.2905715, // default latitude
  lng: 80.6337262, // default longitude
};

export const MapContainer = () => {
  const dispatch = useDispatch();
  const mapContainerRef = useRef(null);
  const [mapInstance, setMapInstance] = useState(null);
  const [overlayPosition, setOverlayPosition] = useState(null);
  const isOpen = useSelector((state) => state.mapData.isOpen);
  const drawShape = useSelector((state) => state.mapData.drawShape);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP,
    libraries,
  });

  const [rectangle, setRectangle] = useState(null);

  useEffect(() => {
    if (!isOpen && rectangle) {
      rectangle.setMap(null); // This removes the rectangle from the map
      setRectangle(null);
    }
  }, [isOpen]);

  useEffect(() => {
    if (drawShape && rectangle) {
      const bounds = rectangle.getBounds();
      const northEast = bounds.getNorthEast();
      const southWest = bounds.getSouthWest();
      captureMap(northEast, southWest);
      // rectangle.setMap(null);
      // setRectangle(null);
    }
  }, [drawShape]);

  const onLoad = (map) => {
    setMapInstance(map);
  };

  const onRectangleComplete = (rectangle) => {
    dispatch(openMap({ isOpen: true }));
    setRectangle(rectangle);
  };

  const captureMap = (northEast, southWest) => {
    if (mapContainerRef.current) {
      html2canvas(mapContainerRef.current, {
        useCORS: true,
      }).then((canvas) => {
        const croppedCanvas = document.createElement("canvas");
        const context = croppedCanvas.getContext("2d");

        const width = 100;
        const height = 100;

        croppedCanvas.width = width;
        croppedCanvas.height = height;

        context.drawImage(
          canvas,
          northEast.x,
          northEast.y,
          width,
          height,
          0,
          0,
          width,
          height
        );

        console.log("croppedCanvas", croppedCanvas);
        const imageUrl = croppedCanvas.toDataURL("image/png");
        console.log("Captured image:", imageUrl);
      });
    }
  };

  if (loadError) {
    return <div>Error loading maps</div>;
  }

  if (!isLoaded) {
    return <div>Loading maps</div>;
  }

  return (
    <div ref={mapContainerRef}>
      <GoogleMap
        onLoad={onLoad}
        mapContainerStyle={mapContainerStyle}
        zoom={10}
        center={center}
        options={{
          mapTypeControlOptions: {
            position: window.google.maps.ControlPosition.LEFT_TOP,
          },
        }}
      >
        <DrawingManagerF
          onRectangleComplete={onRectangleComplete}
          options={{
            drawingMode: window.google.maps.drawing.OverlayType.RECTANGLE,
            drawingControl: true,
            drawingControlOptions: {
              position: window.google.maps.ControlPosition.LEFT_CENTER,
              drawingModes: ["rectangle"],
            },
            rectangleOptions: {
              fillColor: "#2196F3",
              fillOpacity: 0.5,
              strokeWeight: 2,
              clickable: false,
              editable: true,
              zIndex: 1,
            },
          }}
        />
        <Marker position={center} />
      </GoogleMap>
      <div className="toolbar">
        <Toolbar />
      </div>
    </div>
  );
};
