// import { createSlice } from '@reduxjs/toolkit';
// import { api } from '../services/api';

// // Initial state for the product selector
// const initialState = {
//   selectedCategory: '',
//   activeFilters: [],
//   selectedProduct: null,
//   productData: {},
// };

// // Create a slice with reducers
// const productSlice = createSlice({
//   name: 'products',
//   initialState,
//   reducers: {
//     // Set the selected category
//     setSelectedCategory: (state, action) => {
//       state.selectedCategory = action.payload;
//       state.activeFilters = [];
//       state.selectedProduct = null;
//     },

//     // Toggle a filter on/off
//     toggleFilter: (state, action) => {
//       const filter = action.payload;
//       if (state.activeFilters.includes(filter)) {
//         state.activeFilters = state.activeFilters.filter(f => f !== filter);
//       } else {
//         state.activeFilters.push(filter);
//       }
//     },

//     // Clear all active filters
//     clearFilters: (state) => {
//       state.activeFilters = [];
//     },

//     // Set the selected product for detailed view
//     setSelectedProduct: (state, action) => {
//       state.selectedProduct = action.payload;
//     },

//     // Reset selected product (go back to list view)
//     resetSelectedProduct: (state) => {
//       state.selectedProduct = null;
//     },

//     // Update product data in state (when mock data is used)
//     setProductData: (state, action) => {
//       state.productData = action.payload;
//     },
//   },
//   // Extra reducers to handle API actions
//   extraReducers: (builder) => {
//     builder.addMatcher(
//       api.endpoints.getProductDetails.matchFulfilled,
//       (state, { payload, meta }) => {
//         // When product details are fetched, store them
//         if (payload && meta.arg.originalArgs) {
//           const productId = meta.arg.originalArgs;
//           if (!state.productData[state.selectedCategory]) {
//             state.productData[state.selectedCategory] = {};
//           }
//           state.productData[state.selectedCategory][productId] = payload;
//         }
//       }
//     );
//   }
// });

// // Export the actions
// export const {
//   setSelectedCategory,
//   toggleFilter,
//   clearFilters,
//   setSelectedProduct,
//   resetSelectedProduct,
//   setProductData,
// } = productSlice.actions;

// // Selectors
// export const selectCategory = (state) => state.products.selectedCategory;
// export const selectActiveFilters = (state) => state.products.activeFilters;
// export const selectSelectedProduct = (state) => state.products.selectedProduct;
// export const selectProductData = (state) => state.products.productData;
// export const selectDisplayedProducts = (state) => {
//   const { selectedCategory, activeFilters, productData } = state.products;

//   // If no category is selected, return empty array
//   if (!selectedCategory || !productData[selectedCategory]) {
//     return [];
//   }

//   const categoryData = productData[selectedCategory];

//   // If no filters are active, show all products
//   if (activeFilters.length === 0 && categoryData.Pid_to_all) {
//     return [...new Set(categoryData.Pid_to_all)];
//   }

//   // Combine products from all active filters
//   let filteredProducts = [];
//   activeFilters.forEach(filter => {
//     if (categoryData[filter]) {
//       filteredProducts = [...filteredProducts, ...categoryData[filter]];
//     }
//   });

//   // Remove duplicates
//   return [...new Set(filteredProducts)];
// };

// export default productSlice.reducer;

// src/redux/productSlice.js - Complete with all selectors
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Async thunks for API calls
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async ({ productType, filters }, { rejectWithValue }) => {
    try {
      const params = new URLSearchParams();

      // Add filters to params
      Object.entries(filters).forEach(([key, values]) => {
        if (Array.isArray(values) && values.length > 0) {
          values.forEach((value) => params.append(key, value));
        }
      });

      if (productType) {
        params.append("product_type", productType);
      }

      const response = await axios.get(
        `${API_BASE_URL}/forecast/query/filter_products/?${params}`
      );

      return {
        productType,
        data: response.data,
        filters,
        timestamp: Date.now(),
      };
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const fetchProductDetails = createAsyncThunk(
  "products/fetchProductDetails",
  async (productId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/forecast/api/product/${productId}/`
      );
      return { productId, data: response.data };
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const initialState = {
  // Product data
  storeProducts: [],
  comProducts: [],
  omniProducts: [],

  // Selected states
  selectedProductType: "store",
  selectedProduct: null,
  selectedProductDetails: null,

  // Loading states
  loading: {
    products: false,
    productDetails: false,
  },

  // Error states
  errors: {
    products: null,
    productDetails: null,
  },

  // Cache and metadata
  lastFetch: {
    store: null,
    com: null,
    omni: null,
  },
  cache: {
    productDetails: {},
  },

  // Pagination
  pagination: {
    store: { page: 1, totalPages: 1, totalItems: 0 },
    com: { page: 1, totalPages: 1, totalItems: 0 },
    omni: { page: 1, totalPages: 1, totalItems: 0 },
  },
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    // Product type selection
    setSelectedProductType: (state, action) => {
      state.selectedProductType = action.payload;
      state.selectedProduct = null;
      state.selectedProductDetails = null;
    },

    // Product selection
    setSelectedProduct: (state, action) => {
      state.selectedProduct = action.payload;
    },

    clearSelectedProduct: (state) => {
      state.selectedProduct = null;
      state.selectedProductDetails = null;
    },

    // Clear errors
    clearErrors: (state) => {
      state.errors.products = null;
      state.errors.productDetails = null;
    },

    // Cache management
    clearCache: (state) => {
      state.cache.productDetails = {};
    },

    // Reset state
    resetProductState: (state) => {
      return {
        ...initialState,
        selectedProductType: state.selectedProductType,
      };
    },

    // Pagination
    setPagination: (state, action) => {
      const { productType, pagination } = action.payload;
      state.pagination[productType] = pagination;
    },
  },

  extraReducers: (builder) => {
    builder
      // Fetch products
      .addCase(fetchProducts.pending, (state) => {
        state.loading.products = true;
        state.errors.products = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        const { productType, data, timestamp } = action.payload;

        state.loading.products = false;
        state.lastFetch[productType] = timestamp;

        // Update products based on type
        if (!productType || productType === "store") {
          state.storeProducts = data.store_products || [];
        }
        if (!productType || productType === "com") {
          state.comProducts = data.com_products || [];
        }
        if (!productType || productType === "omni") {
          state.omniProducts = data.omni_products || [];
        }
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading.products = false;
        state.errors.products = action.payload;
      })

      // Fetch product details
      .addCase(fetchProductDetails.pending, (state) => {
        state.loading.productDetails = true;
        state.errors.productDetails = null;
      })
      .addCase(fetchProductDetails.fulfilled, (state, action) => {
        const { productId, data } = action.payload;

        state.loading.productDetails = false;
        state.selectedProductDetails = data;
        state.cache.productDetails[productId] = {
          data,
          timestamp: Date.now(),
        };
      })
      .addCase(fetchProductDetails.rejected, (state, action) => {
        state.loading.productDetails = false;
        state.errors.productDetails = action.payload;
      });
  },
});

// Selectors - COMPLETE LIST WITH ALL MISSING SELECTORS
export const selectSelectedProductType = (state) =>
  state.products.selectedProductType;

export const selectProductsByType = (state, productType) => {
  switch (productType) {
    case "store":
      return state.products.storeProducts;
    case "com":
      return state.products.comProducts;
    case "omni":
      return state.products.omniProducts;
    default:
      return [];
  }
};

export const selectCurrentProducts = (state) => {
  return selectProductsByType(state, state.products.selectedProductType);
};

export const selectProductsLoading = (state) => state.products.loading.products;
export const selectProductDetailsLoading = (state) =>
  state.products.loading.productDetails;
export const selectSelectedProduct = (state) => state.products.selectedProduct;
export const selectSelectedProductDetails = (state) =>
  state.products.selectedProductDetails;
export const selectProductErrors = (state) => state.products.errors;

// Additional selectors that might be needed
export const selectStoreProducts = (state) => state.products.storeProducts;
export const selectComProducts = (state) => state.products.comProducts;
export const selectOmniProducts = (state) => state.products.omniProducts;
export const selectAllProducts = (state) => [
  ...state.products.storeProducts,
  ...state.products.comProducts,
  ...state.products.omniProducts,
];

export const selectProductCache = (state) =>
  state.products.cache.productDetails;
export const selectLastFetch = (state) => state.products.lastFetch;
export const selectPagination = (state) => state.products.pagination;

// Check if data needs refresh (older than 5 minutes)
export const selectShouldRefreshProducts = (state, productType) => {
  const lastFetch = state.products.lastFetch[productType];
  if (!lastFetch) return true;
  return Date.now() - lastFetch > 5 * 60 * 1000; // 5 minutes
};

export const {
  setSelectedProductType,
  setSelectedProduct,
  clearSelectedProduct,
  clearErrors,
  clearCache,
  resetProductState,
  setPagination,
} = productSlice.actions;

export default productSlice.reducer;
