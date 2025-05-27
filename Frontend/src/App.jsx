// src/App.jsx
import React, { useEffect } from "react";
import { useLocation, Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppContextProvider } from "./context/AppContext";

// Components
import LandingPage from "./components/LandingPage";
import XLSXUploader from "./components/XLSXUploader";
import Forecast from "./components/Forecast";
import ProductSelector from "./components/ProductSelector";
import Navbar from "./components/Navbar";
import Toast from "./components/Toast";
import LoadingOverlay from "./components/LoadingOverlay";

// Redux imports
import { setCurrentView } from "./redux/uiSlice";
import { setCurrentSession } from "./redux/forecastSlice";

function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  // Global state
  const globalLoading = useSelector((state) => state.ui.globalLoading);
  const toasts = useSelector((state) => state.ui.toasts);
  const theme = useSelector((state) => state.ui.theme);

  // Initialize app state
  useEffect(() => {
    // Load forecast data from localStorage if available
    const storedForecastData = localStorage.getItem("forecastData");
    if (storedForecastData) {
      try {
        const parsedData = JSON.parse(storedForecastData);
        dispatch(setCurrentSession(parsedData));
      } catch (error) {
        console.error("Failed to parse stored forecast data:", error);
        localStorage.removeItem("forecastData");
      }
    }

    // Set initial view based on route
    const viewMap = {
      "/": "landing",
      "/pricing": "pricing",
      "/forecast": "forecast",
      "/products": "products",
    };

    const currentView = viewMap[location.pathname] || "landing";
    dispatch(setCurrentView(currentView));
  }, [dispatch, location.pathname]);

  // Apply theme to document
  useEffect(() => {
    document.documentElement.className = theme;
  }, [theme]);

  return (
    <AppContextProvider>
      <div className={`min-h-screen bg-gray-50 flex flex-col ${theme}`}>
        {/* Global Loading Overlay */}
        {globalLoading && <LoadingOverlay />}

        {/* Navigation */}
        {!isHomePage && <Navbar />}

        {/* Main Content */}
        <div className={`flex-grow ${!isHomePage ? "pb-16 sm:pb-0" : ""}`}>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/pricing" element={<XLSXUploader />} />
            <Route path="/forecast" element={<Forecast />} />
            <Route path="/products" element={<ProductSelector />} />
            <Route path="*" element={<LandingPage />} />
          </Routes>
        </div>

        {/* Toast Notifications */}
        <div className="fixed top-4 right-4 z-50 space-y-2">
          {toasts.map((toast) => (
            <Toast
              key={toast.id}
              id={toast.id}
              type={toast.type}
              message={toast.message}
              duration={toast.duration}
            />
          ))}
        </div>
      </div>
    </AppContextProvider>
  );
}

export default App;
