import { configureStore } from "@reduxjs/toolkit";
import itemReducer from "../src/slices/apiSlice";

const store = configureStore({
  reducer: {
    items: itemReducer,
  },
});

export default store;
