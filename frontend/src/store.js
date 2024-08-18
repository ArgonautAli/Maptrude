import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import userDataSlice from "./pages/login/Login.slice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const rootReducer = combineReducers({
  userData: userDataSlice,
});

const appReducer = (state, action) => {
  if (action.type === "RESET") {
    return rootReducer(undefined, action);
  }

  return rootReducer(state, action);
};

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, appReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

store.subscribe(() => {
  const state = store.getState();
  console.log("Store updated:", state);
});
