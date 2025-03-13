import React from 'react';
import { useLocation, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import XLSXUploader from './components/XLSXUploader';
import Forecast from './components/Forecast';
import ProductSelector from './components/ProductSelector';
import Navbar from './components/Navbar';

function App() {
  // Use location hook to determine current page
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Only show navbar when not on the homepage */}
      {!isHomePage && <Navbar />}
      
      <div className={`flex-grow ${!isHomePage ? 'pb-16 sm:pb-0' : ''}`}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/pricing" element={<XLSXUploader />} />
          <Route path="/forecast" element={<Forecast />} />
          <Route path="/products" element={<ProductSelector />} />
          <Route path="*" element={<LandingPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;