// src/redux/forecastSlice.js - Add missing selector
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const uploadForecast = createAsyncThunk(
  "forecast/upload",
  async (forecastData, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      Object.entries(forecastData).forEach(([key, value]) => {
        if (key === "categories") {
          formData.append(key, JSON.stringify(value));
        } else {
          formData.append(key, value);
        }
      });

      const response = await axios.post(
        `${API_BASE_URL}/forecast/upload/`,
        formData
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const forecastSlice = createSlice({
  name: "forecast",
  initialState: {
    // Current forecast session
    currentSession: null,

    // Form data
    formData: {
      file: null,
      outputFileName: "",
      monthFrom: "",
      monthTo: "",
      percentage: "",
      selectedCategories: [],
    },

    // Upload state
    uploadStatus: "idle", // 'idle' | 'pending' | 'fulfilled' | 'rejected'
    uploadProgress: 0,
    downloadUrl: null,

    // History
    forecastHistory: [],

    // Errors
    error: null,
  },

  reducers: {
    // Form data management
    updateFormData: (state, action) => {
      state.formData = { ...state.formData, ...action.payload };
    },

    resetFormData: (state) => {
      state.formData = {
        file: null,
        outputFileName: "",
        monthFrom: "",
        monthTo: "",
        percentage: "",
        selectedCategories: [],
      };
    },

    // Session management
    setCurrentSession: (state, action) => {
      state.currentSession = action.payload;
      // Also save to localStorage for persistence across page refreshes
      if (typeof window !== "undefined") {
        localStorage.setItem("forecastData", JSON.stringify(action.payload));
      }
    },

    clearCurrentSession: (state) => {
      state.currentSession = null;
      if (typeof window !== "undefined") {
        localStorage.removeItem("forecastData");
      }
    },

    // History management
    addToHistory: (state, action) => {
      state.forecastHistory.unshift({
        ...action.payload,
        id: Date.now(),
        timestamp: new Date().toISOString(),
      });

      // Keep only last 10 forecasts
      if (state.forecastHistory.length > 10) {
        state.forecastHistory = state.forecastHistory.slice(0, 10);
      }
    },

    removeFromHistory: (state, action) => {
      state.forecastHistory = state.forecastHistory.filter(
        (item) => item.id !== action.payload
      );
    },

    clearHistory: (state) => {
      state.forecastHistory = [];
    },

    // Error handling
    clearError: (state) => {
      state.error = null;
    },

    // Progress
    setUploadProgress: (state, action) => {
      state.uploadProgress = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(uploadForecast.pending, (state) => {
        state.uploadStatus = "pending";
        state.error = null;
        state.uploadProgress = 0;
      })
      .addCase(uploadForecast.fulfilled, (state, action) => {
        state.uploadStatus = "fulfilled";
        state.downloadUrl = action.payload.file_url;
        state.uploadProgress = 100;

        // Create session object
        const session = {
          ...state.formData,
          downloadUrl: action.payload.file_url,
          timestamp: new Date().toISOString(),
        };

        state.currentSession = session;

        // Add to history
        state.forecastHistory.unshift({
          ...session,
          id: Date.now(),
        });
      })
      .addCase(uploadForecast.rejected, (state, action) => {
        state.uploadStatus = "rejected";
        state.error = action.payload;
        state.uploadProgress = 0;
      });
  },
});

// Selectors - ADD THESE MISSING SELECTORS
export const selectCurrentSession = (state) => state.forecast.currentSession;
export const selectFormData = (state) => state.forecast.formData;
export const selectUploadStatus = (state) => state.forecast.uploadStatus;
export const selectUploadProgress = (state) => state.forecast.uploadProgress;
export const selectDownloadUrl = (state) => state.forecast.downloadUrl;
export const selectForecastHistory = (state) => state.forecast.forecastHistory;
export const selectForecastError = (state) => state.forecast.error;

export const {
  updateFormData,
  resetFormData,
  setCurrentSession,
  clearCurrentSession,
  addToHistory,
  removeFromHistory,
  clearHistory,
  clearError,
  setUploadProgress,
} = forecastSlice.actions;

export default forecastSlice.reducer;
