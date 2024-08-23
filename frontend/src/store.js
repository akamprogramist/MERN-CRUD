import { configureStore } from "@reduxjs/toolkit";
import { productsApi } from "./slices/dummy";
import { itemsApi } from "./slices/ItemApi";
import itemSlice from "./slices/ItemSlice";

const store = configureStore({
  reducer: {
    items: itemsApi.reducer,
    [itemSlice.reducerPath]: itemSlice.reducer,
    [productsApi.reducerPath]: productsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(productsApi.middleware)
      .concat(itemsApi.middleware),
});

export default store;
