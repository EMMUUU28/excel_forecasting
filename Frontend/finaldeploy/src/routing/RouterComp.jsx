import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Import your components/pages
// import Home from "./pages/Home";
// import About from "./pages/About";
// import Contact from "./pages/Contact";
// import NotFound from "./pages/NotFound";
import XLSXUpload from "../components/XLSXUploader";
import Forecast from "../components/Forecast";

const RouterComp = () => {
  return (
    <Router>
      <Routes>
        {/* Define Routes */}
        <Route path="/" element={<XLSXUpload />} />
        <Route path="/forecast" element={<Forecast />} />
        {/* <Route path="/contact" element={<Contact />} /> */}
        {/* Fallback route for unmatched paths */}
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </Router>
  );
};

export default RouterComp;
