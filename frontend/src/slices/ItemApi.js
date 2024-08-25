import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const ITEMS_URL = "http://localhost:5000";
export const itemsApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: ITEMS_URL }),
  // name for reducer default is api
  reducerPath: "items",
  tagTypes: ["Items"],
  endpoints: (builder) => ({
    // get all items
    getAllItems: builder.query({
      query: () => "/items",
      providesTags: ["Items"],
    }),
    addItem: builder.mutation({
      query: (data) => ({
        url: `/items`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Items"],
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
      providesTags: (result, error, id) => [{ type: "Items", id }],
    }),
    updateItem: builder.mutation({
      query: ({ id, updatedItem }) => ({
        url: `/items/${id}`,
        method: "PUT",
        body: updatedItem,
      }),
      invalidatesTags: ["Items"],
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
