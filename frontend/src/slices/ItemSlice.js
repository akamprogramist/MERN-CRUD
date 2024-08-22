import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const ITEMS_URL = "http://localhost:5000";
export const itemsApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: ITEMS_URL }),
  tagTypes: ["Item"],
  endpoints: (builder) => ({
    // get all items
    getAllItems: builder.query({
      query: () => "/items",
    }),
    addItem: builder.mutation({
      query: (data) => ({
        url: `/items`,
        method: "POST",
        body: data,
      }),
    }),
    deleteItem: builder.mutation({
      query: (id) => ({
        url: `/items/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Items"],
    }),
    getSingleItem: builder.query({
      query: (id) => `/items/${id}`,
    }),
    updateItem: builder.mutation({
      query: ({ id, updatedItem }) => ({
        url: `/items/${id}`,
        method: "PUT",
        body: updatedItem,
      }),
    }),
  }),
});

export const {
  useGetAllItemsQuery,
  useAddItemMutation,
  useDeleteItemMutation,
  useUpdateItemMutation,
  useGetSingleItemQuery,
} = itemsApi;
