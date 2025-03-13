import React from "react";
import { Link } from "react-router-dom";
import { FileSpreadsheet, TrendingUp, List } from "lucide-react";

function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex flex-col items-center justify-center p-6">
      <div className="max-w-5xl w-full mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
          Data Processing Dashboard
        </h1>
        
        <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto">
          Upload, process and visualize your data with our suite of specialized tools
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* Pricing Sheet Card */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border border-gray-100">
            <div className="p-8">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <FileSpreadsheet size={32} className="text-blue-600" />
              </div>
              
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Pricing Sheet
              </h2>
              
              <p className="text-gray-600 mb-6">
                Upload and process pricing data with our specialized tool.
              </p>
              
              <Link
                to="/pricing"
                className="block w-full py-3 px-6 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors text-center"
              >
                Go to Pricing Tool
              </Link>
            </div>
          </div>
          
          {/* Forecast Card */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border border-gray-100">
            <div className="p-8">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <TrendingUp size={32} className="text-green-600" />
              </div>
              
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Forecast Dashboard
              </h2>
              
              <p className="text-gray-600 mb-6">
                Create detailed sales forecasts with our advanced forecasting tool.
              </p>
              
              <Link
                to="/forecast"
                className="block w-full py-3 px-6 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors text-center"
              >
                Go to Forecast Tool
              </Link>
            </div>
          </div>
          
          {/* Product Selector Card */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border border-gray-100">
            <div className="p-8">
              <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <List size={32} className="text-indigo-600" />
              </div>
              
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Product Selector
              </h2>
              
              <p className="text-gray-600 mb-6">
                Filter and select products by category with customizable filters.
              </p>
              
              <Link
                to="/products"
                className="block w-full py-3 px-6 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors text-center"
              >
                Go to Product Selector
              </Link>
            </div>
          </div>
        </div>
        
        <div className="mt-16 text-gray-500 text-sm">
          <p>© 2025 Data Processing Tools. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;