import { configureStore } from "@reduxjs/toolkit";
import { itemsApi } from "./slices/ItemApi";
const store = configureStore({
  reducer: {
    [itemsApi.reducerPath]: itemsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(itemsApi.middleware),
  devTools: true,
});

export default store;
