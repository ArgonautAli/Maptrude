// mapSlice.js
import { createSlice } from "@reduxjs/toolkit";

const mapSlice = createSlice({
  name: "map",
  initialState: {
    rectangleBounds: null,
    drawShape: false,
    texture: null,
    cancelRect: false,
  },
  reducers: {
    setRectangleBounds: (state, action) => {
      state.rectangleBounds = action.payload;
      state.cancelRect = false;
    },
    toggleDrawShape: (state, action) => {
      state.drawShape = action.payload;
      state.cancelRect = false;
    },
    setMapData: (state, action) => {
      state.texture = action.payload.texture;
      state.cancelRect = false;
    },
    clearRectangle: (state) => {
      state.rectangleBounds = null;
      state.drawShape = false;
      state.cancelRect = true;
    },
  },
});

export const {
  setRectangleBounds,
  toggleDrawShape,
  setMapData,
  clearRectangle,
} = mapSlice.actions;
export default mapSlice.reducer;
