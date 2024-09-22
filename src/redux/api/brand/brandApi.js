// api/brand.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const brand = createApi({
  reducerPath: 'brand',
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_REACT_APP_ROOT}),

  endpoints: (builder) => ({

    createbrand: builder.mutation({
      query: (createBrand) => ({
        url: `/brand/create-brand`,
        method: 'POST',
        body: createBrand,
      }),
    }),

    getAllBrand: builder.query({
      query: () => '/products',
    }),

    getSingleBrand: builder.query({
      query: (id) => `/brand/${id}`,
    }),

    updateBrand: builder.mutation({
      query: ({ id, ...updateData }) => ({
        url: `/brand/${id}`,
        method: 'PATCH',
        body: updateData,
      }),
    }),

    deleteBrand: builder.mutation({
      query: (id) => ({
        url: `/brand/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
  
});

export const {
  useCreatebrandMutation,
  useGetAllBrandQuery,
  useGetSingleBrandQuery,
  useUpdateBrandMutation,
  useDeleteBrandMutation,
} = brand;
