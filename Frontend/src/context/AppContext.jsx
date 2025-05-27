// src/context/AppContext.jsx
import React, { createContext, useContext, useReducer, useEffect } from "react";

const AppContext = createContext();

const initialContextState = {
  // Real-time updates
  websocketConnected: false,
  lastUpdate: null,

  // Performance tracking
  performance: {
    apiCallsCount: 0,
    averageResponseTime: 0,
    lastApiCall: null,
  },

  // User preferences
  userPreferences: {
    autoRefresh: true,
    refreshInterval: 300000, // 5 minutes
    notifications: true,
    soundEnabled: false,
  },

  // Application metadata
  metadata: {
    version: "1.0.0",
    buildTime: new Date().toISOString(),
    featureFlags: {
      advancedFilters: true,
      exportFeatures: true,
      realTimeUpdates: false,
    },
  },
};

const contextReducer = (state, action) => {
  switch (action.type) {
    case "SET_WEBSOCKET_STATUS":
      return { ...state, websocketConnected: action.payload };

    case "UPDATE_PERFORMANCE":
      return {
        ...state,
        performance: { ...state.performance, ...action.payload },
      };

    case "UPDATE_USER_PREFERENCES":
      return {
        ...state,
        userPreferences: { ...state.userPreferences, ...action.payload },
      };

    case "SET_LAST_UPDATE":
      return { ...state, lastUpdate: action.payload };

    default:
      return state;
  }
};

export const AppContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(contextReducer, initialContextState);

  // Load preferences from localStorage
  useEffect(() => {
    const savedPreferences = localStorage.getItem("userPreferences");
    if (savedPreferences) {
      try {
        const preferences = JSON.parse(savedPreferences);
        dispatch({
          type: "UPDATE_USER_PREFERENCES",
          payload: preferences,
        });
      } catch (error) {
        console.error("Failed to load user preferences:", error);
      }
    }
  }, []);

  // Save preferences to localStorage when they change
  useEffect(() => {
    localStorage.setItem(
      "userPreferences",
      JSON.stringify(state.userPreferences)
    );
  }, [state.userPreferences]);

  // Auto-refresh functionality
  useEffect(() => {
    if (!state.userPreferences.autoRefresh) return;

    const interval = setInterval(() => {
      dispatch({ type: "SET_LAST_UPDATE", payload: new Date().toISOString() });
      // Trigger data refresh through Redux actions if needed
    }, state.userPreferences.refreshInterval);

    return () => clearInterval(interval);
  }, [
    state.userPreferences.autoRefresh,
    state.userPreferences.refreshInterval,
  ]);

  const value = {
    ...state,
    dispatch,

    // Helper functions
    updatePerformance: (data) =>
      dispatch({ type: "UPDATE_PERFORMANCE", payload: data }),
    updatePreferences: (preferences) =>
      dispatch({ type: "UPDATE_USER_PREFERENCES", payload: preferences }),
    setWebsocketStatus: (status) =>
      dispatch({ type: "SET_WEBSOCKET_STATUS", payload: status }),
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within AppContextProvider");
  }
  return context;
};
