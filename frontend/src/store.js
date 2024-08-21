import { configureStore } from "@reduxjs/toolkit";
//only useful for caching
import { setupListeners } from "@reduxjs/toolkit/query";
import { productsApi } from "./slices/dummy";
import { itemsApi } from "./slices/ItemSlice";

const store = configureStore({
  reducer: {
    [itemsApi.reducerPath]: itemsApi.reducer,
    [productsApi.reducerPath]: productsApi.reducer,
  },
  //only for caching
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productsApi.middleware).concat(itemsApi.middleware)
});

setupListeners(store.dispatch);

export default store;
