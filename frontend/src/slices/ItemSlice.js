import { createSlice } from "@reduxjs/toolkit";
import {
  useGetAllItemsQuery,
  useAddItemMutation,
  useDeleteItemMutation,
  useUpdateItemMutation,
} from "../slices/ItemApi";

const initialState = {
  items: [],
  status: "idle",
  error: null,
};

const itemSlice = createSlice({
  name: "items",
  initialState,
  reducers: {
    // Additional local reducers if needed
  },
  extraReducers: (builder) => {
    // Handle the fetch all items action
    builder
      .addMatcher(useGetAllItemsQuery.matchFulfilled, (state, action) => {
        state.items = action.payload;
        state.status = "succeeded";
      })
      .addMatcher(useAddItemMutation.matchFulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addMatcher(useDeleteItemMutation.matchFulfilled, (state, action) => {
        state.items = state.items.filter((item) => item.id !== action.meta.arg);
      })
      .addMatcher(useUpdateItemMutation.matchFulfilled, (state, action) => {
        const index = state.items.findIndex(
          (item) => item.id === action.payload.id
        );
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addMatcher(useGetAllItemsQuery.matchRejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default itemSlice.reducer;
