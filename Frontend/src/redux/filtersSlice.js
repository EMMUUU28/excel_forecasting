// Filters Slice
// src/redux/filtersSlice.js
import { createSlice } from "@reduxjs/toolkit";

const filtersSlice = createSlice({
  name: "filters",
  initialState: {
    // Available filter options
    availableFilters: {
      categories: [],
      birthstones: [],
      red_box_items: [],
      vdf_statuses: [],
    },

    // Selected filters
    selectedFilters: {
      category: [],
      birthstone: [],
      red_box_item: [],
      vdf_status: [],
    },

    // Search and sorting
    searchQuery: "",
    sortBy: "pid",
    sortOrder: "asc",

    // View preferences
    viewMode: "table", // 'table' | 'grid' | 'list'
    itemsPerPage: 50,

    // Filter loading state
    loading: false,
  },

  reducers: {
    // Available filters
    setAvailableFilters: (state, action) => {
      state.availableFilters = { ...state.availableFilters, ...action.payload };
    },

    // Selected filters
    updateSelectedFilters: (state, action) => {
      state.selectedFilters = { ...state.selectedFilters, ...action.payload };
    },

    addFilter: (state, action) => {
      const { filterKey, value } = action.payload;
      if (!state.selectedFilters[filterKey].includes(value)) {
        state.selectedFilters[filterKey].push(value);
      }
    },

    removeFilter: (state, action) => {
      const { filterKey, value } = action.payload;
      state.selectedFilters[filterKey] = state.selectedFilters[
        filterKey
      ].filter((item) => item !== value);
    },

    clearFilter: (state, action) => {
      const filterKey = action.payload;
      state.selectedFilters[filterKey] = [];
    },

    clearAllFilters: (state) => {
      state.selectedFilters = {
        category: [],
        birthstone: [],
        red_box_item: [],
        vdf_status: [],
      };
    },

    // Search
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },

    // Sorting
    setSorting: (state, action) => {
      const { sortBy, sortOrder } = action.payload;
      state.sortBy = sortBy;
      state.sortOrder = sortOrder;
    },

    // View preferences
    setViewMode: (state, action) => {
      state.viewMode = action.payload;
    },

    setItemsPerPage: (state, action) => {
      state.itemsPerPage = action.payload;
    },

    // Loading
    setFiltersLoading: (state, action) => {
      state.loading = action.payload;
    },

    // Reset filters
    resetFilters: (state) => {
      state.selectedFilters = {
        category: [],
        birthstone: [],
        red_box_item: [],
        vdf_status: [],
      };
      state.searchQuery = "";
    },
  },
});

// Selectors
export const selectAvailableFilters = (state) => state.filters.availableFilters;
export const selectSelectedFilters = (state) => state.filters.selectedFilters;
export const selectSearchQuery = (state) => state.filters.searchQuery;
export const selectSorting = (state) => ({
  sortBy: state.filters.sortBy,
  sortOrder: state.filters.sortOrder,
});
export const selectViewPreferences = (state) => ({
  viewMode: state.filters.viewMode,
  itemsPerPage: state.filters.itemsPerPage,
});

export const selectHasActiveFilters = (state) => {
  return (
    Object.values(state.filters.selectedFilters).some(
      (filterArray) => filterArray.length > 0
    ) || state.filters.searchQuery.length > 0
  );
};

export const {
  setAvailableFilters,
  updateSelectedFilters,
  addFilter,
  removeFilter,
  clearFilter,
  clearAllFilters,
  setSearchQuery,
  setSorting,
  setViewMode,
  setItemsPerPage,
  setFiltersLoading,
  resetFilters,
} = filtersSlice.actions;

export default filtersSlice.reducer;
