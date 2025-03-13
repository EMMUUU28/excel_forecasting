import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";

// Import components
import LandingPage from "../components/LandingPage";
import XLSXUploader from "../components/XLSXUploader";
import Forecast from "../components/Forecast";
import ProductSelector from "../components/ProductSelector";
import Navbar from "../components/Navbar";

const AppRoutes = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <>
      {/* Don't show Navbar on the landing page */}
      {!isHomePage && <Navbar />}
      
      <div className={`flex-grow ${!isHomePage ? 'pb-16 sm:pb-0' : ''}`}>
        <Routes>
          {/* Landing page is the root route */}
          <Route path="/" element={<LandingPage />} />
          
          {/* Pricing tool */}
          <Route path="/pricing" element={<XLSXUploader />} />
          
          {/* Forecast route */}
          <Route path="/forecast" element={<Forecast />} />
          
          {/* Product Selector route */}
          <Route path="/products" element={<ProductSelector />} />
          
          {/* Fallback route - redirect to landing page */}
          <Route path="*" element={<LandingPage />} />
        </Routes>
      </div>
    </>
  );
};

export default AppRoutes;