import { configureStore } from "@reduxjs/toolkit";
// import profileEditHandeler from "./editcardSlice";
// import ApiSlice from "./ApisSlice";
import profileInfoSlice from "./profileInfoSlice";
// import modalHandeler from "./Modalslice";

export const store = configureStore({
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }),
  reducer: {
    profileInfoSlice: profileInfoSlice,
  },
});
