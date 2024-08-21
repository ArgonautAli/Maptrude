import React, { useState, useRef, useEffect } from "react";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  DrawingManagerF,
} from "@react-google-maps/api";
import "./mapContainer.css";
import { Toolbar } from "../toolbar/Toolbar.jsx";
import { useDispatch, useSelector } from "react-redux";
import { setMapData, setRectangleBounds, clearRectangle } from "./Map.slice.js";
import { SpinningBox } from "../cube/Cube.js";
import html2canvas from "html2canvas";
import { saveTexture } from "./helper.js";

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
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP,
    libraries,
  });
  const mapContainerRef = useRef(null);
  const [mapInstance, setMapInstance] = useState(null);
  const rectangle = useRef(null); // Track the rectangle instance
  const texture = useSelector((state) => state.mapData.texture);
  const drawShape = useSelector((state) => state.mapData.drawShape);
  const rectangleBounds = useSelector((state) => state.mapData.rectangleBounds);
  const cancelRect = useSelector((state) => state.mapData.cancelRect);
  const userId = useSelector((state) => state.userData.userId);

  useEffect(() => {
    if (drawShape) {
      captureMap();
    }
  }, [drawShape]);

  useEffect(() => {
    if (cancelRect) {
      handleCancel();
    }
  }, [cancelRect]);

  useEffect(() => {
    return () => {
      if (rectangle.current) {
        rectangle.current.setMap(null);
      }
    };
  }, []);

  const onLoad = (map) => {
    setMapInstance(map);
  };

  const onRectangleComplete = (rect) => {
    rectangle.current = rect; // Store the rectangle instance
    const bounds = rect.getBounds();
    dispatch(
      setRectangleBounds({
        northEast: bounds.getNorthEast().toJSON(),
        southWest: bounds.getSouthWest().toJSON(),
      })
    );
  };

  const handleCancel = () => {
    if (rectangle.current) {
      rectangle.current.setMap(null); // Remove rectangle from the map
      rectangle.current = null; // Clear the rectangle instance
      dispatch(setRectangleBounds(null)); // Clear Redux state
      dispatch(clearRectangle()); // Clear additional state if needed
    }
  };

  const captureMap = () => {
    if (mapContainerRef.current && rectangleBounds) {
      html2canvas(mapContainerRef.current, { useCORS: true }).then((canvas) => {
        const croppedCanvas = document.createElement("canvas");
        const context = croppedCanvas.getContext("2d");

        // Get the full map container dimensions
        const { width: mapWidth, height: mapHeight } =
          mapContainerRef.current.getBoundingClientRect();

        // Get the current map bounds (full visible area of the map)
        const mapBounds = mapInstance.getBounds();
        const mapNorthEast = mapBounds.getNorthEast();
        const mapSouthWest = mapBounds.getSouthWest();

        // Ensure the bounds are valid
        if (!mapNorthEast || !mapSouthWest) {
          console.error("Invalid map bounds");
          return;
        }

        // Convert geographical coordinates to pixel coordinates
        const lngToX = (lng) =>
          ((lng - mapSouthWest.lng()) /
            (mapNorthEast.lng() - mapSouthWest.lng())) *
          mapWidth;
        const latToY = (lat) =>
          mapHeight -
          ((lat - mapSouthWest.lat()) /
            (mapNorthEast.lat() - mapSouthWest.lat())) *
            mapHeight;

        const northEastPx = {
          x: lngToX(rectangleBounds.northEast.lng),
          y: latToY(rectangleBounds.northEast.lat),
        };
        const southWestPx = {
          x: lngToX(rectangleBounds.southWest.lng),
          y: latToY(rectangleBounds.southWest.lat),
        };

        const startX = Math.min(northEastPx.x, southWestPx.x);
        const startY = Math.min(northEastPx.y, southWestPx.y);

        const endX = Math.max(northEastPx.x, southWestPx.x);
        const endY = Math.max(northEastPx.y, southWestPx.y);

        const rectangleWidth = endX - startX;
        const rectangleHeight = endY - startY;

        // Set cropped canvas dimensions
        croppedCanvas.width = rectangleWidth;
        croppedCanvas.height = rectangleHeight;

        // Draw the cropped area on the new canvas
        context.drawImage(
          canvas,
          northEastPx.x,
          northEastPx.y,
          rectangleWidth,
          rectangleHeight,
          0,
          0,
          rectangleWidth,
          rectangleHeight
        );

        const imageUrl = croppedCanvas.toDataURL("image/png");

        if (imageUrl) {
          dispatch(setMapData({ texture: imageUrl }));
          saveTextureHandler(imageUrl);
        } else {
          console.error("Failed to generate image URL");
        }
      });
    }
  };

  const saveTextureHandler = async (imageUrl) => {
    await saveTexture(
      imageUrl,
      rectangleBounds,
      userId,
      (data) => {
        console.log("data", data);
      },
      (data) => {
        console.log("data", data);
      }
    );
  };

  if (loadError) {
    return <div>Error loading maps</div>;
  }

  if (!isLoaded) {
    return <div>Loading maps</div>;
  }

  return (
    <div>
      {texture !== null ? (
        <div className="fullscreen-container">
          <SpinningBox />
        </div>
      ) : (
        <div ref={mapContainerRef} className={texture === null ? "" : "hidden"}>
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
        </div>
      )}
      <div className="toolbar">
        <Toolbar />
      </div>
    </div>
  );
};
