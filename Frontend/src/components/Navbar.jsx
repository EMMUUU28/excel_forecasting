import React from "react";
import { Link, useLocation } from "react-router-dom";
import { HomeIcon, FileSpreadsheet, TrendingUp, List } from "lucide-react";

function Navbar() {
  const location = useLocation();

  // Determine if a link is active
  const isActive = (path) => {
    return location.pathname === path ? "text-indigo-600 border-indigo-600" : "text-gray-600 border-transparent hover:text-indigo-600 hover:border-indigo-300";
  };

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <span className="text-indigo-600">
                  <HomeIcon size={24} />
                </span>
                Dashboard
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link
                to="/pricing"
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors ${isActive('/pricing')}`}
              >
                <FileSpreadsheet className="mr-2" size={18} />
                Pricing Tool
              </Link>
              <Link
                to="/forecast"
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors ${isActive('/forecast')}`}
              >
                <TrendingUp className="mr-2" size={18} />
                Forecast
              </Link>
              <Link
                to="/products"
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors ${isActive('/products')}`}
              >
                <List className="mr-2" size={18} />
                Product Selector
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu - shows at bottom of screen on small devices */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-3">
        <div className="flex justify-around">
          <Link
            to="/"
            className={`flex flex-col items-center px-3 py-2 rounded-md text-xs font-medium ${location.pathname === '/products' ? 'text-indigo-600' : 'text-gray-600'}`}
          >
            <List size={20} />
            <span className="mt-1">Products</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;