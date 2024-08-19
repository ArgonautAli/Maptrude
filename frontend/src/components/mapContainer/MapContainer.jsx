import React, { useCallback, useState } from "react";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  DrawingManagerF,
} from "@react-google-maps/api";
import "./mapContainer.css";
import { Toolbar } from "../toolbar/Toolbar";

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
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP,
    libraries,
    // Optionally you can include other options here
  });

  const [rectangle, setRectangle] = useState(null);

  const onRectangleComplete = useCallback((rect) => {
    setRectangle(rect);
    rect.setMap(null); // Optionally hide the rectangle after drawing
  }, []);

  if (loadError) {
    return <div>Error loading maps</div>;
  }

  if (!isLoaded) {
    return <div>Loading maps</div>;
  }

  return (
    <div>
      <GoogleMap
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
