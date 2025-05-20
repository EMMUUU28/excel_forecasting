import { createSlice } from '@reduxjs/toolkit';
import { api } from '../services/api';

// Initial state for the product selector
const initialState = {
  selectedCategory: '',
  activeFilters: [],
  selectedProduct: null,
  productData: {},
};

// Create a slice with reducers
const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    // Set the selected category
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
      state.activeFilters = [];
      state.selectedProduct = null;
    },
    
    // Toggle a filter on/off
    toggleFilter: (state, action) => {
      const filter = action.payload;
      if (state.activeFilters.includes(filter)) {
        state.activeFilters = state.activeFilters.filter(f => f !== filter);
      } else {
        state.activeFilters.push(filter);
      }
    },
    
    // Clear all active filters
    clearFilters: (state) => {
      state.activeFilters = [];
    },
    
    // Set the selected product for detailed view
    setSelectedProduct: (state, action) => {
      state.selectedProduct = action.payload;
    },
    
    // Reset selected product (go back to list view)
    resetSelectedProduct: (state) => {
      state.selectedProduct = null;
    },
    
    // Update product data in state (when mock data is used)
    setProductData: (state, action) => {
      state.productData = action.payload;
    },
  },
  // Extra reducers to handle API actions
  extraReducers: (builder) => {
    builder.addMatcher(
      api.endpoints.getProductDetails.matchFulfilled,
      (state, { payload, meta }) => {
        // When product details are fetched, store them
        if (payload && meta.arg.originalArgs) {
          const productId = meta.arg.originalArgs;
          if (!state.productData[state.selectedCategory]) {
            state.productData[state.selectedCategory] = {};
          }
          state.productData[state.selectedCategory][productId] = payload;
        }
      }
    );
  }
});

// Export the actions
export const {
  setSelectedCategory,
  toggleFilter,
  clearFilters,
  setSelectedProduct,
  resetSelectedProduct,
  setProductData,
} = productSlice.actions;

// Selectors
export const selectCategory = (state) => state.products.selectedCategory;
export const selectActiveFilters = (state) => state.products.activeFilters;
export const selectSelectedProduct = (state) => state.products.selectedProduct;
export const selectProductData = (state) => state.products.productData;
export const selectDisplayedProducts = (state) => {
  const { selectedCategory, activeFilters, productData } = state.products;
  
  // If no category is selected, return empty array
  if (!selectedCategory || !productData[selectedCategory]) {
    return [];
  }
  
  const categoryData = productData[selectedCategory];
  
  // If no filters are active, show all products
  if (activeFilters.length === 0 && categoryData.Pid_to_all) {
    return [...new Set(categoryData.Pid_to_all)];
  }
  
  // Combine products from all active filters
  let filteredProducts = [];
  activeFilters.forEach(filter => {
    if (categoryData[filter]) {
      filteredProducts = [...filteredProducts, ...categoryData[filter]];
    }
  });
  
  // Remove duplicates
  return [...new Set(filteredProducts)];
};

export default productSlice.reducer;