import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
  drawShape: false,
  bbox: {
    south: 0,
    west: 0,
    north: 0,
    east: 0,
  },
};

const mapDataSlice = createSlice({
  name: "MAP_DATA_SLICE",
  initialState,
  reducers: {
    resetMapState: () => initialState,
    openMap: (state, { payload: { isOpen } }) => {
      state.isOpen = isOpen;
    },
    drawShape: (state, { payload: { drawShape } }) => {
      state.drawShape = drawShape;
    },
    setMapData: (state, { payload: { bbox } }) => {
      state.bbox = bbox;
    },
  },
});

export const { resetMapState, setMapData, openMap, drawShape } =
  mapDataSlice.actions;
export default mapDataSlice.reducer;
