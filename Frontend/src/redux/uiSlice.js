// UI Slice - Complete with selectors
// src/redux/uiSlice.js
import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: {
    // Navigation
    currentView: "selector", // 'selector' | 'details'

    // Modals and overlays
    modals: {
      productDetails: false,
      exportData: false,
      settings: false,
    },

    // Notifications
    notifications: [],

    // Loading states
    globalLoading: false,

    // Layout
    sidebarCollapsed: false,
    mobileMenuOpen: false,

    // Theme
    theme: "light", // 'light' | 'dark'

    // Toast messages
    toasts: [],
  },

  reducers: {
    // View management
    setCurrentView: (state, action) => {
      state.currentView = action.payload;
    },

    // Modal management
    openModal: (state, action) => {
      state.modals[action.payload] = true;
    },

    closeModal: (state, action) => {
      state.modals[action.payload] = false;
    },

    closeAllModals: (state) => {
      Object.keys(state.modals).forEach((key) => {
        state.modals[key] = false;
      });
    },

    // Notifications
    addNotification: (state, action) => {
      state.notifications.push({
        id: Date.now(),
        timestamp: new Date().toISOString(),
        ...action.payload,
      });
    },

    removeNotification: (state, action) => {
      state.notifications = state.notifications.filter(
        (notification) => notification.id !== action.payload
      );
    },

    clearNotifications: (state) => {
      state.notifications = [];
    },

    // Layout
    toggleSidebar: (state) => {
      state.sidebarCollapsed = !state.sidebarCollapsed;
    },

    setSidebarCollapsed: (state, action) => {
      state.sidebarCollapsed = action.payload;
    },

    toggleMobileMenu: (state) => {
      state.mobileMenuOpen = !state.mobileMenuOpen;
    },

    setMobileMenuOpen: (state, action) => {
      state.mobileMenuOpen = action.payload;
    },

    // Theme
    setTheme: (state, action) => {
      state.theme = action.payload;
    },

    toggleTheme: (state) => {
      state.theme = state.theme === "light" ? "dark" : "light";
    },

    // Global loading
    setGlobalLoading: (state, action) => {
      state.globalLoading = action.payload;
    },

    // Toast management
    addToast: (state, action) => {
      state.toasts.push({
        id: Date.now(),
        timestamp: new Date().toISOString(),
        ...action.payload,
      });
    },

    removeToast: (state, action) => {
      state.toasts = state.toasts.filter(
        (toast) => toast.id !== action.payload
      );
    },

    clearToasts: (state) => {
      state.toasts = [];
    },
  },
});

// ADD THESE MISSING SELECTORS - This is what you're missing
export const selectCurrentView = (state) => state.ui.currentView;
export const selectModals = (state) => state.ui.modals;
export const selectNotifications = (state) => state.ui.notifications;
export const selectGlobalLoading = (state) => state.ui.globalLoading;
export const selectSidebarCollapsed = (state) => state.ui.sidebarCollapsed;
export const selectMobileMenuOpen = (state) => state.ui.mobileMenuOpen;
export const selectTheme = (state) => state.ui.theme;
export const selectToasts = (state) => state.ui.toasts;

export const {
  setCurrentView,
  openModal,
  closeModal,
  closeAllModals,
  addNotification,
  removeNotification,
  clearNotifications,
  toggleSidebar,
  setSidebarCollapsed,
  toggleMobileMenu,
  setMobileMenuOpen,
  setTheme,
  toggleTheme,
  setGlobalLoading,
  addToast,
  removeToast,
  clearToasts,
} = uiSlice.actions;

export default uiSlice.reducer;
