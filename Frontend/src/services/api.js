import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Create an API service using RTK Query
export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ 
    baseUrl: import.meta.env.VITE_API_BASE_URL,
  }),
  tagTypes: ['Product', 'Forecast'],
  endpoints: (builder) => ({
    // Get all products from a category
    getProductsByCategory: builder.query({
      query: (category) => `/forecast/api/products?category=${category}`,
      providesTags: ['Product'],
    }),
    
    // Get product details
    getProductDetails: builder.query({
      query: (productId) => `/forecast/api/product/${productId}/`,
      providesTags: (result, error, productId) => [{ type: 'Product', id: productId }],
    }),
    
    // Update product details
    updateProductDetails: builder.mutation({
      query: ({ productId, productData }) => ({
        url: `/forecast/api/product/${productId}/`,
        method: 'PUT',
        body: productData,
      }),
      invalidatesTags: (result, error, { productId }) => [
        { type: 'Product', id: productId },
        'Forecast'
      ],
    }),
  }),
});

// Export the auto-generated hooks for use in components
export const {
  useGetProductsByCategoryQuery,
  useGetProductDetailsQuery,
  useUpdateProductDetailsMutation,
} = api;