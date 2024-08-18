import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userName: "",
  userId: "",
  fullName: "",
};

const userDataSlice = createSlice({
  name: "USER_DATA_SLICE",
  initialState,
  reducers: {
    setUserData: (state, { payload: { userName, userId, fullName } }) => {
      console.log("payload", userName, userId, fullName);
      state.userName = userName;
      state.userId = userId;
      state.fullName = fullName;
    },
  },
});

export const { setUserData } = userDataSlice.actions;
export default userDataSlice.reducer;
