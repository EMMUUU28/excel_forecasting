// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import {
//   ChevronDown,
//   Filter,
//   X,
//   Eye,
//   Package,
//   Store,
//   Globe,
//   FileDown,
//   ArrowLeft,
// } from "lucide-react";
// import { useNavigate, useLocation } from "react-router-dom";
// import ProductDetailsView from "./ProductDetailsView"; // Import the ProductDetailsView component

// function ProductSelector() {
//   const navigate = useNavigate();
//   const location = useLocation();

//   // State for view management
//   const [currentView, setCurrentView] = useState("selector"); // "selector" or "details"
//   const [selectedProductId, setSelectedProductId] = useState(null);

//   // State for product types and filters
//   const [selectedProductType, setSelectedProductType] = useState("store");
//   const [selectedFilters, setSelectedFilters] = useState({
//     category: [],
//     birthstone: [],
//     red_box_item: [],
//     vdf_status: [],
//   });

//   // State for available filter options (from API)
//   const [availableFilters, setAvailableFilters] = useState({
//     categories: [],
//     birthstones: [],
//     red_box_items: [],
//     vdf_statuses: [],
//   });

//   // State for products and loading
//   const [productData, setProductData] = useState({
//     store_products: [],
//     com_products: [],
//     omni_products: [],
//   });
//   const [productsLoading, setProductsLoading] = useState(false);
//   const [filtersLoading, setFiltersLoading] = useState(true);

//   // State for forecast data
//   const [forecastData, setForecastData] = useState(null);
//   const [showForecastInfo, setShowForecastInfo] = useState(false);

//   // Product type configuration
//   const productTypeConfig = {
//     store: {
//       icon: Store,
//       label: "Store Products",
//       color: "blue",
//     },
//     com: {
//       icon: Package,
//       label: "COM Products",
//       color: "green",
//     },
//     omni: {
//       icon: Globe,
//       label: "Omni Products",
//       color: "purple",
//     },
//   };

//   // Load forecast data on component mount
//   useEffect(() => {
//     const storedForecastData = localStorage.getItem("forecastData");
//     if (storedForecastData) {
//       const parsedData = JSON.parse(storedForecastData);
//       setForecastData(parsedData);
//       setShowForecastInfo(true);

//       // Extract selected categories from forecast data
//       if (
//         parsedData.selectedCategories &&
//         parsedData.selectedCategories.length > 0
//       ) {
//         const selectedCategoryNames = parsedData.selectedCategories.map(
//           (cat) => cat.name
//         );
//         setSelectedFilters((prev) => ({
//           ...prev,
//           category: selectedCategoryNames, // Pre-select forecast categories
//         }));
//       }
//     }

//     // Load available filters from API
//     loadAvailableFilters();
//   }, []);

//   // Fetch products when filters or product type change
//   useEffect(() => {
//     if (!filtersLoading) {
//       fetchProducts();
//     }
//   }, [selectedProductType, selectedFilters, filtersLoading]);

//   // Load available filter options from API
//   const loadAvailableFilters = async () => {
//     setFiltersLoading(true);
//     try {
//       // Fetch all products to extract unique filter values
//       const response = await axios.get(
//         `${import.meta.env.VITE_API_BASE_URL}/forecast/query/filter_products/`
//       );

//       const allProducts = [
//         ...(response.data.store_products || []),
//         ...(response.data.com_products || []),
//         ...(response.data.omni_products || []),
//       ];

//       // Extract unique values for each filter
//       const categories = [
//         ...new Set(allProducts.map((p) => p.category).filter(Boolean)),
//       ];
//       const birthstones = [
//         ...new Set(allProducts.map((p) => p.birthstone).filter(Boolean)),
//       ];
//       const redBoxItems = [
//         ...new Set(allProducts.map((p) => p.red_box_item)),
//       ].map((val) => (val ? "Yes" : "No"));
//       const vdfStatuses = [
//         ...new Set(allProducts.map((p) => p.vdf_status)),
//       ].map((val) => (val ? "Active" : "Inactive"));

//       // If we have forecast data, filter categories to only selected ones
//       const storedForecastData = localStorage.getItem("forecastData");
//       let filteredCategories = categories;

//       if (storedForecastData) {
//         const parsedData = JSON.parse(storedForecastData);
//         if (
//           parsedData.selectedCategories &&
//           parsedData.selectedCategories.length > 0
//         ) {
//           const selectedCategoryNames = parsedData.selectedCategories.map(
//             (cat) => cat.name
//           );
//           filteredCategories = categories.filter((cat) =>
//             selectedCategoryNames.includes(cat)
//           );
//         }
//       }

//       setAvailableFilters({
//         categories: filteredCategories,
//         birthstones: [...new Set(birthstones)],
//         red_box_items: [...new Set(redBoxItems)],
//         vdf_statuses: [...new Set(vdfStatuses)],
//       });
//     } catch (error) {
//       console.error("Error loading filter options:", error);
//       setAvailableFilters({
//         categories: [],
//         birthstones: [],
//         red_box_items: [],
//         vdf_statuses: [],
//       });
//     } finally {
//       setFiltersLoading(false);
//     }
//   };

//   // Fetch products from API
//   const fetchProducts = async () => {
//     setProductsLoading(true);
//     try {
//       const params = new URLSearchParams();

//       // Add filters to API request
//       if (selectedFilters.category.length > 0) {
//         selectedFilters.category.forEach((cat) =>
//           params.append("category", cat)
//         );
//       }
//       if (selectedFilters.birthstone.length > 0) {
//         selectedFilters.birthstone.forEach((bs) =>
//           params.append("birthstone", bs)
//         );
//       }
//       if (selectedFilters.red_box_item.length > 0) {
//         selectedFilters.red_box_item.forEach((rb) => {
//           params.append("red_box_item", rb === "Yes" ? "true" : "false");
//         });
//       }
//       if (selectedFilters.vdf_status.length > 0) {
//         selectedFilters.vdf_status.forEach((vdf) => {
//           params.append("vdf_status", vdf === "Active" ? "true" : "false");
//         });
//       }

//       params.append("product_type", selectedProductType);

//       const response = await axios.get(
//         `${
//           import.meta.env.VITE_API_BASE_URL
//         }/forecast/query/filter_products/?${params}`
//       );

//       setProductData(response.data);
//     } catch (error) {
//       console.error("Error fetching products:", error);
//       setProductData({
//         store_products: [],
//         com_products: [],
//         omni_products: [],
//       });
//     } finally {
//       setProductsLoading(false);
//     }
//   };

//   // Handle checkbox filter changes
//   const handleFilterChange = (filterKey, value, checked) => {
//     setSelectedFilters((prev) => ({
//       ...prev,
//       [filterKey]: checked
//         ? [...prev[filterKey], value]
//         : prev[filterKey].filter((item) => item !== value),
//     }));
//   };

//   // Clear specific filter
//   const clearFilter = (filterKey) => {
//     setSelectedFilters((prev) => ({
//       ...prev,
//       [filterKey]: [],
//     }));
//   };

//   // Clear all filters
//   const clearAllFilters = () => {
//     setSelectedFilters({
//       category: [],
//       birthstone: [],
//       red_box_item: [],
//       vdf_status: [],
//     });
//   };

//   // Get current products based on selected type
//   const getCurrentProducts = () => {
//     switch (selectedProductType) {
//       case "store":
//         return productData.store_products || [];
//       case "com":
//         return productData.com_products || [];
//       case "omni":
//         return productData.omni_products || [];
//       default:
//         return [];
//     }
//   };

//   // Handle product details view
//   const handleViewDetails = (product) => {
//     console.log("View details for product:", product.pid);
//     setSelectedProductId(product.pid);
//     setCurrentView("details");
//   };

//   // Handle back to product selector
//   const handleBackToSelector = () => {
//     setCurrentView("selector");
//     setSelectedProductId(null);
//   };

//   // Navigate back to forecast
//   const handleBackToForecast = () => {
//     navigate("/forecast");
//   };

//   // Check if any filters are active
//   const hasActiveFilters = Object.values(selectedFilters).some(
//     (filterArray) => filterArray.length > 0
//   );

//   // If we're in details view, show the ProductDetailsView component
//   if (currentView === "details" && selectedProductId) {
//     return (
//       <ProductDetailsView
//         productId={selectedProductId}
//         onBack={handleBackToSelector}
//       />
//     );
//   }

//   // Render filter checkboxes
//   const renderFilterCheckboxes = (filterKey, options, label) => {
//     if (!options || options.length === 0) return null;

//     return (
//       <div className="flex flex-wrap items-center gap-2">
//         <label className="text-xs text-gray-600 font-medium min-w-fit">
//           {label}:
//         </label>
//         <div className="flex flex-wrap gap-2">
//           {options.map((option) => (
//             <label
//               key={option}
//               className="inline-flex items-center gap-1 text-sm"
//             >
//               <input
//                 type="checkbox"
//                 checked={selectedFilters[filterKey].includes(option)}
//                 onChange={(e) =>
//                   handleFilterChange(filterKey, option, e.target.checked)
//                 }
//                 className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
//               />
//               <span className="text-gray-700">{option}</span>
//             </label>
//           ))}
//         </div>
//         {selectedFilters[filterKey].length > 0 && (
//           <button
//             onClick={() => clearFilter(filterKey)}
//             className="text-gray-400 hover:text-gray-600 p-1"
//             title={`Clear ${label} filters`}
//           >
//             <X size={14} />
//           </button>
//         )}
//       </div>
//     );
//   };

//   return (
//     <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
//       {/* Header */}
//       <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 p-6">
//         <div className="flex justify-between items-start">
//           <div>
//             <div className="flex items-center gap-3 mb-2">
//               <button
//                 onClick={handleBackToForecast}
//                 className="text-white opacity-80 hover:opacity-100 flex items-center gap-2"
//               >
//                 <ArrowLeft size={16} />
//                 Back to Forecast
//               </button>
//               {forecastData?.downloadUrl && (
//                 <a
//                   href={forecastData.downloadUrl}
//                   className="text-white opacity-80 hover:opacity-100 flex items-center gap-2 ml-4"
//                   download
//                 >
//                   <FileDown size={16} />
//                   Download Forecast
//                 </a>
//               )}
//             </div>
//             <h1 className="text-2xl font-bold text-white">Product Selector</h1>
//             <p className="text-indigo-100 mt-1">
//               Filter and explore products from your forecast selection
//             </p>
//           </div>
//         </div>
//       </div>

//       <div className="p-6">
//         {/* Forecast Information Banner */}
//         {showForecastInfo && forecastData && (
//           <div className="mb-6 bg-indigo-50 border border-indigo-200 rounded-lg p-4">
//             <div className="flex justify-between items-start">
//               <div>
//                 <h3 className="text-sm font-medium text-indigo-800 mb-2">
//                   Forecast Generated Successfully
//                 </h3>
//                 <div className="text-sm text-indigo-700 space-y-1">
//                   <p>
//                     <strong>Selected Categories:</strong>{" "}
//                     {forecastData.selectedCategories
//                       ?.map((cat) => `${cat.name} (${cat.value})`)
//                       .join(", ")}
//                   </p>
//                   <p>
//                     <strong>Period:</strong> {forecastData.monthFrom} to{" "}
//                     {forecastData.monthTo} ({forecastData.percentage}%)
//                   </p>
//                   <p>
//                     <strong>Generated:</strong>{" "}
//                     {new Date(forecastData.timestamp).toLocaleString()}
//                   </p>
//                 </div>
//               </div>
//               <button
//                 onClick={() => setShowForecastInfo(false)}
//                 className="text-indigo-400 hover:text-indigo-600"
//               >
//                 <X size={20} />
//               </button>
//             </div>
//           </div>
//         )}

//         {/* Product Type Tabs */}
//         <div className="border-b border-gray-200 mb-6">
//           <nav className="-mb-px flex space-x-8">
//             {Object.entries(productTypeConfig).map(([type, config]) => {
//               const IconComponent = config.icon;
//               return (
//                 <button
//                   key={type}
//                   onClick={() => setSelectedProductType(type)}
//                   className={`flex items-center gap-2 py-3 px-1 border-b-2 font-medium text-sm transition-colors ${
//                     selectedProductType === type
//                       ? "border-indigo-500 text-indigo-600"
//                       : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
//                   }`}
//                 >
//                   <IconComponent size={18} />
//                   {config.label}
//                   <span className="ml-1 bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full text-xs">
//                     {getCurrentProducts().length}
//                   </span>
//                 </button>
//               );
//             })}
//           </nav>
//         </div>

//         {/* Horizontal Filters */}
//         <div className="bg-gray-50 rounded-lg p-4 mb-6">
//           {filtersLoading ? (
//             <div className="flex items-center gap-2">
//               <div className="w-4 h-4 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
//               <span className="text-sm text-gray-600">Loading filters...</span>
//             </div>
//           ) : (
//             <div className="space-y-4">
//               <div className="flex items-center gap-2 mb-4">
//                 <Filter size={16} className="text-gray-600" />
//                 <span className="text-sm font-medium text-gray-700">
//                   Filters:
//                 </span>
//                 {hasActiveFilters && (
//                   <button
//                     onClick={clearAllFilters}
//                     className="ml-auto text-sm text-indigo-600 hover:text-indigo-800 font-medium"
//                   >
//                     Clear All Filters
//                   </button>
//                 )}
//               </div>

//               {/* Category Filter - Only from selected forecast categories */}
//               {renderFilterCheckboxes(
//                 "category",
//                 availableFilters.categories,
//                 "Categories"
//               )}

//               {/* Birthstone Filter (for store and omni) */}
//               {(selectedProductType === "store" ||
//                 selectedProductType === "omni") &&
//                 renderFilterCheckboxes(
//                   "birthstone",
//                   availableFilters.birthstones,
//                   "Birthstone"
//                 )}

//               {/* Red Box Item Filter */}
//               {renderFilterCheckboxes(
//                 "red_box_item",
//                 availableFilters.red_box_items,
//                 "Red Box Item"
//               )}

//               {/* VDF Status Filter (for com products) */}
//               {selectedProductType === "com" &&
//                 renderFilterCheckboxes(
//                   "vdf_status",
//                   availableFilters.vdf_statuses,
//                   "VDF Status"
//                 )}
//             </div>
//           )}
//         </div>

//         {/* Product Table */}
//         <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
//           <div className="px-6 py-4 bg-gray-50 border-b border-gray-200 flex justify-between items-center">
//             <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
//               {React.createElement(
//                 productTypeConfig[selectedProductType].icon,
//                 { size: 20 }
//               )}
//               {productTypeConfig[selectedProductType].label}
//             </h3>
//             <div className="flex items-center gap-4">
//               <span className="text-sm text-gray-500">
//                 {getCurrentProducts().length} products found
//               </span>
//               {productsLoading && (
//                 <div className="w-5 h-5 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
//               )}
//             </div>
//           </div>

//           {productsLoading ? (
//             <div className="flex justify-center items-center py-12">
//               <div className="text-center">
//                 <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mx-auto mb-4"></div>
//                 <p className="text-gray-600">Loading products...</p>
//               </div>
//             </div>
//           ) : filtersLoading ? (
//             <div className="flex justify-center items-center py-12">
//               <div className="text-center">
//                 <div className="w-12 h-12 border-4 border-gray-200 border-t-gray-600 rounded-full animate-spin mx-auto mb-4"></div>
//                 <p className="text-gray-600">Loading filters...</p>
//               </div>
//             </div>
//           ) : (
//             renderProductTable()
//           )}
//         </div>

//         {/* Active Filters Summary */}
//         {hasActiveFilters && (
//           <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
//             <h4 className="text-sm font-medium text-blue-800 mb-2">
//               Active Filters:
//             </h4>
//             <div className="flex flex-wrap gap-2">
//               {Object.entries(selectedFilters).map(
//                 ([filterKey, filterValues]) =>
//                   filterValues.length > 0 && (
//                     <div key={filterKey} className="flex flex-wrap gap-1">
//                       {filterValues.map((value) => (
//                         <span
//                           key={`${filterKey}-${value}`}
//                           className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
//                         >
//                           {filterKey.replace("_", " ")}: {value}
//                           <button
//                             onClick={() =>
//                               handleFilterChange(filterKey, value, false)
//                             }
//                             className="text-blue-600 hover:text-blue-800"
//                           >
//                             <X size={12} />
//                           </button>
//                         </span>
//                       ))}
//                     </div>
//                   )
//               )}
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );

//   // Render product table function
//   function renderProductTable() {
//     const products = getCurrentProducts();
//     const config = productTypeConfig[selectedProductType];
//     const IconComponent = config.icon;

//     if (products.length === 0) {
//       return (
//         <div className="text-center py-12 text-gray-500">
//           <IconComponent size={64} className="mx-auto mb-4 text-gray-300" />
//           <h3 className="text-lg font-medium text-gray-900 mb-2">
//             No {config.label} Found
//           </h3>
//           <p className="mb-4">No products match the current filters.</p>
//           {hasActiveFilters && (
//             <button
//               onClick={clearAllFilters}
//               className="text-indigo-600 hover:text-indigo-800 font-medium"
//             >
//               Clear all filters to see all products
//             </button>
//           )}
//         </div>
//       );
//     }

//     // Dynamic columns based on product type
//     const getColumns = () => {
//       const baseColumns = [
//         { key: "category", label: "Category", width: "w-32" },
//         { key: "pid", label: "Product ID", width: "w-40" },
//         { key: "forecast_month", label: "Forecast Month", width: "w-32" },
//         { key: "lead_time", label: "Lead Time", width: "w-24" },
//         { key: "red_box_item", label: "Red Box", width: "w-24" },
//       ];

//       if (selectedProductType === "store") {
//         baseColumns.push(
//           { key: "door_count", label: "Door Count", width: "w-28" },
//           { key: "birthstone", label: "Birthstone", width: "w-28" },
//           { key: "trend", label: "Trend", width: "w-24" },
//           {
//             key: "forecast_month_required_quantity",
//             label: "Required Qty",
//             width: "w-32",
//           },
//           { key: "total_added_qty", label: "Added Qty", width: "w-28" }
//         );
//       } else if (selectedProductType === "com") {
//         baseColumns.push(
//           { key: "vdf_status", label: "VDF Status", width: "w-28" },
//           {
//             key: "minimum_required_oh_for_com",
//             label: "Min OH",
//             width: "w-28",
//           },
//           {
//             key: "forecast_month_required_quantity",
//             label: "Required Qty",
//             width: "w-32",
//           },
//           { key: "total_added_qty", label: "Added Qty", width: "w-28" }
//         );
//       } else if (selectedProductType === "omni") {
//         baseColumns.push(
//           { key: "door_count", label: "Door Count", width: "w-28" },
//           { key: "birthstone", label: "Birthstone", width: "w-28" },
//           { key: "com_trend", label: "COM Trend", width: "w-28" },
//           {
//             key: "store_month_12_fc_index",
//             label: "Store FC Index",
//             width: "w-32",
//           },
//           {
//             key: "forecast_month_required_quantity",
//             label: "Required Qty",
//             width: "w-32",
//           },
//           { key: "total_added_qty", label: "Added Qty", width: "w-28" }
//         );
//       }

//       return baseColumns;
//     };

//     const columns = getColumns();

//     return (
//       <div className="overflow-x-auto">
//         <table className="min-w-full divide-y divide-gray-200">
//           <thead className="bg-gray-50">
//             <tr>
//               {columns.map((column) => (
//                 <th
//                   key={column.key}
//                   className={`${column.width} px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider`}
//                 >
//                   {column.label}
//                 </th>
//               ))}
//               <th className="w-24 px-4 py-3 text-center text-xs font-medium text-gray-600 uppercase tracking-wider">
//                 Actions
//               </th>
//             </tr>
//           </thead>
//           <tbody className="bg-white divide-y divide-gray-200">
//             {products.map((product, index) => (
//               <tr
//                 key={`${product.pid}-${index}`}
//                 className="hover:bg-gray-50 transition-colors"
//               >
//                 {columns.map((column) => (
//                   <td
//                     key={column.key}
//                     className="px-4 py-3 text-sm text-gray-900"
//                   >
//                     {formatCellValue(product[column.key], column.key)}
//                   </td>
//                 ))}
//                 <td className="px-4 py-3 text-center">
//                   <button
//                     onClick={() => handleViewDetails(product)}
//                     className="text-indigo-600 hover:text-indigo-900 inline-flex items-center text-sm font-medium transition-colors"
//                   >
//                     <Eye size={14} className="mr-1" />
//                     View
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>

//         {/* Pagination info */}
//         {products.length > 0 && (
//           <div className="px-6 py-3 bg-gray-50 border-t border-gray-200">
//             <div className="flex justify-between items-center">
//               <p className="text-sm text-gray-700">
//                 Showing <span className="font-medium">{products.length}</span>{" "}
//                 products
//               </p>
//               <div className="text-sm text-gray-500">
//                 Product Type:{" "}
//                 <span className="font-medium">{config.label}</span>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     );
//   }

//   // Format cell values based on column type
//   function formatCellValue(value, columnKey) {
//     // Handle boolean values for status/item columns
//     if (
//       columnKey.includes("status") ||
//       columnKey === "red_box_item" ||
//       columnKey === "vdf_status"
//     ) {
//       if (value === true || value === "true") {
//         return (
//           <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
//             {columnKey === "vdf_status" ? "Active" : "Yes"}
//           </span>
//         );
//       } else if (value === false || value === "false") {
//         return (
//           <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
//             {columnKey === "vdf_status" ? "Inactive" : "No"}
//           </span>
//         );
//       }
//     }

//     // Handle birthstone column
//     if (columnKey === "birthstone") {
//       if (value && value !== "") {
//         return (
//           <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
//             {value}
//           </span>
//         );
//       }
//       return <span className="text-gray-400">-</span>;
//     }

//     // Handle numeric values
//     if (typeof value === "number") {
//       if (columnKey.includes("trend") || columnKey.includes("index")) {
//         return (
//           <span className="font-medium">{parseFloat(value).toFixed(2)}</span>
//         );
//       }
//       return <span className="font-medium">{value.toLocaleString()}</span>;
//     }

//     // Handle null/undefined values
//     if (value === null || value === undefined || value === "") {
//       return <span className="text-gray-400">-</span>;
//     }

//     // Default string formatting
//     return String(value);
//   }
// }

// export default ProductSelector;

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import {
//   ChevronDown,
//   Filter,
//   X,
//   Eye,
//   Package,
//   Store,
//   Globe,
//   FileDown,
//   ArrowLeft,
// } from "lucide-react";
// import { useNavigate, useLocation } from "react-router-dom";
// import ProductDetailsView from "./ProductDetailsView"; // Import the ProductDetailsView component

// function ProductSelector() {
//   const navigate = useNavigate();
//   const location = useLocation();

//   // State for view management
//   const [currentView, setCurrentView] = useState("selector"); // "selector" or "details"
//   const [selectedProductId, setSelectedProductId] = useState(null);

//   // State for product types and filters
//   const [selectedProductType, setSelectedProductType] = useState("store");
//   const [selectedFilters, setSelectedFilters] = useState({
//     category: [],
//     birthstone: [],
//     red_box_item: [],
//     vdf_status: [],
//   });

//   // State for available filter options (from API)
//   const [availableFilters, setAvailableFilters] = useState({
//     categories: [],
//     birthstones: [],
//     red_box_items: [],
//     vdf_statuses: [],
//   });

//   // State for products and loading
//   const [productData, setProductData] = useState({
//     store_products: [],
//     com_products: [],
//     omni_products: [],
//   });
//   const [productsLoading, setProductsLoading] = useState(false);
//   const [filtersLoading, setFiltersLoading] = useState(true);

//   // State for forecast data
//   const [forecastData, setForecastData] = useState(null);
//   const [showForecastInfo, setShowForecastInfo] = useState(false);

//   // Product type configuration
//   const productTypeConfig = {
//     store: {
//       icon: Store,
//       label: "Store Products",
//       color: "blue",
//     },
//     com: {
//       icon: Package,
//       label: "COM Products",
//       color: "green",
//     },
//     omni: {
//       icon: Globe,
//       label: "Omni Products",
//       color: "purple",
//     },
//   };

//   // Load forecast data on component mount
//   useEffect(() => {
//     const storedForecastData = localStorage.getItem("forecastData");
//     if (storedForecastData) {
//       const parsedData = JSON.parse(storedForecastData);
//       setForecastData(parsedData);
//       setShowForecastInfo(true);

//       // Extract selected categories from forecast data
//       if (
//         parsedData.selectedCategories &&
//         parsedData.selectedCategories.length > 0
//       ) {
//         const selectedCategoryNames = parsedData.selectedCategories.map(
//           (cat) => cat.name
//         );
//         setSelectedFilters((prev) => ({
//           ...prev,
//           category: selectedCategoryNames, // Pre-select forecast categories
//         }));
//       }
//     }

//     // Load available filters from API
//     loadAvailableFilters();
//   }, []);

//   // Fetch products when filters or product type change
//   useEffect(() => {
//     if (!filtersLoading) {
//       fetchProducts();
//     }
//   }, [selectedProductType, selectedFilters, filtersLoading]);

//   // Load available filter options from API
//   const loadAvailableFilters = async () => {
//     setFiltersLoading(true);
//     try {
//       // Fetch all products to extract unique filter values
//       const response = await axios.get(
//         `${import.meta.env.VITE_API_BASE_URL}/forecast/query/filter_products/`
//       );

//       const allProducts = [
//         ...(response.data.store_products || []),
//         ...(response.data.com_products || []),
//         ...(response.data.omni_products || []),
//       ];

//       // Extract unique values for each filter
//       const categories = [
//         ...new Set(allProducts.map((p) => p.category).filter(Boolean)),
//       ];
//       const birthstones = [
//         ...new Set(allProducts.map((p) => p.birthstone).filter(Boolean)),
//       ];
//       const redBoxItems = [
//         ...new Set(allProducts.map((p) => p.red_box_item)),
//       ].map((val) => (val ? "Yes" : "No"));
//       const vdfStatuses = [
//         ...new Set(allProducts.map((p) => p.vdf_status)),
//       ].map((val) => (val ? "Active" : "Inactive"));

//       // If we have forecast data, filter categories to only selected ones
//       const storedForecastData = localStorage.getItem("forecastData");
//       let filteredCategories = categories;

//       if (storedForecastData) {
//         const parsedData = JSON.parse(storedForecastData);
//         if (
//           parsedData.selectedCategories &&
//           parsedData.selectedCategories.length > 0
//         ) {
//           const selectedCategoryNames = parsedData.selectedCategories.map(
//             (cat) => cat.name
//           );
//           filteredCategories = categories.filter((cat) =>
//             selectedCategoryNames.includes(cat)
//           );
//         }
//       }

//       setAvailableFilters({
//         categories: filteredCategories,
//         birthstones: [...new Set(birthstones)],
//         red_box_items: [...new Set(redBoxItems)],
//         vdf_statuses: [...new Set(vdfStatuses)],
//       });
//     } catch (error) {
//       console.error("Error loading filter options:", error);
//       setAvailableFilters({
//         categories: [],
//         birthstones: [],
//         red_box_items: [],
//         vdf_statuses: [],
//       });
//     } finally {
//       setFiltersLoading(false);
//     }
//   };

//   // Fetch products from API
//   const fetchProducts = async () => {
//     setProductsLoading(true);
//     try {
//       const params = new URLSearchParams();

//       // Add filters to API request - Categories and Birthstones support multiple
//       if (selectedFilters.category.length > 0) {
//         selectedFilters.category.forEach((cat) =>
//           params.append("category", cat)
//         );
//       }
//       if (selectedFilters.birthstone.length > 0) {
//         selectedFilters.birthstone.forEach((bs) =>
//           params.append("birthstone", bs)
//         );
//       }

//       // Red Box Item and VDF Status - can be single or multiple
//       if (selectedFilters.red_box_item.length > 0) {
//         selectedFilters.red_box_item.forEach((rb) => {
//           params.append("red_box_item", rb === "Yes" ? "true" : "false");
//         });
//       }
//       if (selectedFilters.vdf_status.length > 0) {
//         selectedFilters.vdf_status.forEach((vdf) => {
//           params.append("vdf_status", vdf === "Active" ? "true" : "false");
//         });
//       }

//       // Only add product_type if we want to filter by it
//       if (selectedProductType) {
//         params.append("product_type", selectedProductType);
//       }

//       console.log("API Request params:", params.toString()); // Debug log

//       const response = await axios.get(
//         `${
//           import.meta.env.VITE_API_BASE_URL
//         }/forecast/query/filter_products/?${params}`
//       );

//       setProductData(response.data);
//     } catch (error) {
//       console.error("Error fetching products:", error);
//       setProductData({
//         store_products: [],
//         com_products: [],
//         omni_products: [],
//       });
//     } finally {
//       setProductsLoading(false);
//     }
//   };

//   // Handle checkbox filter changes
//   const handleFilterChange = (filterKey, value, checked) => {
//     setSelectedFilters((prev) => ({
//       ...prev,
//       [filterKey]: checked
//         ? [...prev[filterKey], value]
//         : prev[filterKey].filter((item) => item !== value),
//     }));
//   };

//   // Clear specific filter
//   const clearFilter = (filterKey) => {
//     setSelectedFilters((prev) => ({
//       ...prev,
//       [filterKey]: [],
//     }));
//   };

//   // Clear all filters
//   const clearAllFilters = () => {
//     setSelectedFilters({
//       category: [],
//       birthstone: [],
//       red_box_item: [],
//       vdf_status: [],
//     });
//   };

//   // Get current products based on selected type
//   const getCurrentProducts = () => {
//     switch (selectedProductType) {
//       case "store":
//         return productData.store_products || [];
//       case "com":
//         return productData.com_products || [];
//       case "omni":
//         return productData.omni_products || [];
//       default:
//         return [];
//     }
//   };

//   // Handle product details view
//   const handleViewDetails = (product) => {
//     console.log("View details for product:", product.pid);
//     setSelectedProductId(product.pid);
//     setCurrentView("details");
//   };

//   // Handle back to product selector
//   const handleBackToSelector = () => {
//     setCurrentView("selector");
//     setSelectedProductId(null);
//   };

//   // Navigate back to forecast
//   const handleBackToForecast = () => {
//     navigate("/forecast");
//   };

//   // Check if any filters are active
//   const hasActiveFilters = Object.values(selectedFilters).some(
//     (filterArray) => filterArray.length > 0
//   );

//   // If we're in details view, show the ProductDetailsView component
//   if (currentView === "details" && selectedProductId) {
//     return (
//       <ProductDetailsView
//         productId={selectedProductId}
//         onBack={handleBackToSelector}
//       />
//     );
//   }

//   // Render filter checkboxes
//   const renderFilterCheckboxes = (
//     filterKey,
//     options,
//     label,
//     allowMultiple = true
//   ) => {
//     if (!options || options.length === 0) return null;

//     const handleSingleFilterChange = (value, checked) => {
//       if (!allowMultiple) {
//         // For single-select filters, clear others when selecting a new one
//         setSelectedFilters((prev) => ({
//           ...prev,
//           [filterKey]: checked ? [value] : [],
//         }));
//       } else {
//         // For multi-select filters, use the existing logic
//         handleFilterChange(filterKey, value, checked);
//       }
//     };

//     return (
//       <div className="flex flex-wrap items-center gap-2">
//         <label className="text-xs text-gray-600 font-medium min-w-fit">
//           {label}
//           {allowMultiple && " (multi)"}:
//         </label>
//         <div className="flex flex-wrap gap-2">
//           {options.map((option) => (
//             <label
//               key={option}
//               className="inline-flex items-center gap-1 text-sm"
//             >
//               <input
//                 type={allowMultiple ? "checkbox" : "radio"}
//                 name={allowMultiple ? undefined : filterKey}
//                 checked={selectedFilters[filterKey].includes(option)}
//                 onChange={(e) =>
//                   handleSingleFilterChange(option, e.target.checked)
//                 }
//                 className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
//               />
//               <span className="text-gray-700">{option}</span>
//             </label>
//           ))}
//         </div>
//         {selectedFilters[filterKey].length > 0 && (
//           <button
//             onClick={() => clearFilter(filterKey)}
//             className="text-gray-400 hover:text-gray-600 p-1"
//             title={`Clear ${label} filters`}
//           >
//             <X size={14} />
//           </button>
//         )}
//       </div>
//     );
//   };

//   return (
//     <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
//       {/* Header */}
//       <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 p-6">
//         <div className="flex justify-between items-start">
//           <div>
//             <div className="flex items-center gap-3 mb-2">
//               <button
//                 onClick={handleBackToForecast}
//                 className="text-white opacity-80 hover:opacity-100 flex items-center gap-2"
//               >
//                 <ArrowLeft size={16} />
//                 Back to Forecast
//               </button>
//               {forecastData?.downloadUrl && (
//                 <a
//                   href={forecastData.downloadUrl}
//                   className="text-white opacity-80 hover:opacity-100 flex items-center gap-2 ml-4"
//                   download
//                 >
//                   <FileDown size={16} />
//                   Download Forecast
//                 </a>
//               )}
//             </div>
//             <h1 className="text-2xl font-bold text-white">Product Selector</h1>
//             <p className="text-indigo-100 mt-1">
//               Filter and explore products from your forecast selection
//             </p>
//           </div>
//         </div>
//       </div>

//       <div className="p-6">
//         {/* Forecast Information Banner */}
//         {showForecastInfo && forecastData && (
//           <div className="mb-6 bg-indigo-50 border border-indigo-200 rounded-lg p-4">
//             <div className="flex justify-between items-start">
//               <div>
//                 <h3 className="text-sm font-medium text-indigo-800 mb-2">
//                   Forecast Generated Successfully
//                 </h3>
//                 <div className="text-sm text-indigo-700 space-y-1">
//                   <p>
//                     <strong>Selected Categories:</strong>{" "}
//                     {forecastData.selectedCategories
//                       ?.map((cat) => `${cat.name} (${cat.value})`)
//                       .join(", ")}
//                   </p>
//                   <p>
//                     <strong>Period:</strong> {forecastData.monthFrom} to{" "}
//                     {forecastData.monthTo} ({forecastData.percentage}%)
//                   </p>
//                   <p>
//                     <strong>Generated:</strong>{" "}
//                     {new Date(forecastData.timestamp).toLocaleString()}
//                   </p>
//                 </div>
//               </div>
//               <button
//                 onClick={() => setShowForecastInfo(false)}
//                 className="text-indigo-400 hover:text-indigo-600"
//               >
//                 <X size={20} />
//               </button>
//             </div>
//           </div>
//         )}

//         {/* Product Type Tabs */}
//         <div className="border-b border-gray-200 mb-6">
//           <nav className="-mb-px flex space-x-8">
//             {Object.entries(productTypeConfig).map(([type, config]) => {
//               const IconComponent = config.icon;
//               return (
//                 <button
//                   key={type}
//                   onClick={() => setSelectedProductType(type)}
//                   className={`flex items-center gap-2 py-3 px-1 border-b-2 font-medium text-sm transition-colors ${
//                     selectedProductType === type
//                       ? "border-indigo-500 text-indigo-600"
//                       : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
//                   }`}
//                 >
//                   <IconComponent size={18} />
//                   {config.label}
//                   <span className="ml-1 bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full text-xs">
//                     {getCurrentProducts().length}
//                   </span>
//                 </button>
//               );
//             })}
//           </nav>
//         </div>

//         {/* Horizontal Filters */}
//         <div className="bg-gray-50 rounded-lg p-4 mb-6">
//           {filtersLoading ? (
//             <div className="flex items-center gap-2">
//               <div className="w-4 h-4 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
//               <span className="text-sm text-gray-600">Loading filters...</span>
//             </div>
//           ) : (
//             <div className="space-y-4">
//               <div className="flex items-center gap-2 mb-4">
//                 <Filter size={16} className="text-gray-600" />
//                 <span className="text-sm font-medium text-gray-700">
//                   Filters:
//                 </span>
//                 {hasActiveFilters && (
//                   <button
//                     onClick={clearAllFilters}
//                     className="ml-auto text-sm text-indigo-600 hover:text-indigo-800 font-medium"
//                   >
//                     Clear All Filters
//                   </button>
//                 )}
//               </div>

//               {/* Category Filter - Only from selected forecast categories */}
//               {renderFilterCheckboxes(
//                 "category",
//                 availableFilters.categories,
//                 "Categories",
//                 true // Allow multiple selections
//               )}

//               {/* Birthstone Filter (for store and omni) */}
//               {(selectedProductType === "store" ||
//                 selectedProductType === "omni") &&
//                 renderFilterCheckboxes(
//                   "birthstone",
//                   availableFilters.birthstones,
//                   "Birthstone",
//                   true // Allow multiple selections
//                 )}

//               {/* Red Box Item Filter */}
//               {renderFilterCheckboxes(
//                 "red_box_item",
//                 availableFilters.red_box_items,
//                 "Red Box Item",
//                 true // Allow multiple selections
//               )}

//               {/* VDF Status Filter (for com products) */}
//               {selectedProductType === "com" &&
//                 renderFilterCheckboxes(
//                   "vdf_status",
//                   availableFilters.vdf_statuses,
//                   "VDF Status",
//                   true // Allow multiple selections
//                 )}
//             </div>
//           )}
//         </div>

//         {/* Product Table */}
//         <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
//           <div className="px-6 py-4 bg-gray-50 border-b border-gray-200 flex justify-between items-center">
//             <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
//               {React.createElement(
//                 productTypeConfig[selectedProductType].icon,
//                 { size: 20 }
//               )}
//               {productTypeConfig[selectedProductType].label}
//             </h3>
//             <div className="flex items-center gap-4">
//               <span className="text-sm text-gray-500">
//                 {getCurrentProducts().length} products found
//               </span>
//               {productsLoading && (
//                 <div className="w-5 h-5 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
//               )}
//             </div>
//           </div>

//           {productsLoading ? (
//             <div className="flex justify-center items-center py-12">
//               <div className="text-center">
//                 <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mx-auto mb-4"></div>
//                 <p className="text-gray-600">Loading products...</p>
//               </div>
//             </div>
//           ) : filtersLoading ? (
//             <div className="flex justify-center items-center py-12">
//               <div className="text-center">
//                 <div className="w-12 h-12 border-4 border-gray-200 border-t-gray-600 rounded-full animate-spin mx-auto mb-4"></div>
//                 <p className="text-gray-600">Loading filters...</p>
//               </div>
//             </div>
//           ) : (
//             renderProductTable()
//           )}
//         </div>

//         {/* Active Filters Summary */}
//         {hasActiveFilters && (
//           <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
//             <h4 className="text-sm font-medium text-blue-800 mb-2">
//               Active Filters:
//             </h4>
//             <div className="flex flex-wrap gap-2">
//               {Object.entries(selectedFilters).map(
//                 ([filterKey, filterValues]) =>
//                   filterValues.length > 0 && (
//                     <div key={filterKey} className="flex flex-wrap gap-1">
//                       {filterValues.map((value) => (
//                         <span
//                           key={`${filterKey}-${value}`}
//                           className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
//                         >
//                           {filterKey.replace("_", " ")}: {value}
//                           <button
//                             onClick={() =>
//                               handleFilterChange(filterKey, value, false)
//                             }
//                             className="text-blue-600 hover:text-blue-800"
//                           >
//                             <X size={12} />
//                           </button>
//                         </span>
//                       ))}
//                     </div>
//                   )
//               )}
//             </div>

//             {/* Debug Information - Remove this in production */}
//             <div className="mt-3 p-2 bg-gray-100 rounded text-xs">
//               <strong>Debug Info:</strong>
//               <div>Selected Product Type: {selectedProductType}</div>
//               <div>Current Products Count: {getCurrentProducts().length}</div>
//               <div>
//                 Selected Filters: {JSON.stringify(selectedFilters, null, 2)}
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );

//   // Render product table function
//   function renderProductTable() {
//     const products = getCurrentProducts();
//     const config = productTypeConfig[selectedProductType];
//     const IconComponent = config.icon;

//     if (products.length === 0) {
//       return (
//         <div className="text-center py-12 text-gray-500">
//           <IconComponent size={64} className="mx-auto mb-4 text-gray-300" />
//           <h3 className="text-lg font-medium text-gray-900 mb-2">
//             No {config.label} Found
//           </h3>
//           <p className="mb-4">No products match the current filters.</p>
//           {hasActiveFilters && (
//             <button
//               onClick={clearAllFilters}
//               className="text-indigo-600 hover:text-indigo-800 font-medium"
//             >
//               Clear all filters to see all products
//             </button>
//           )}
//         </div>
//       );
//     }

//     // Dynamic columns based on product type
//     const getColumns = () => {
//       const baseColumns = [
//         { key: "category", label: "Category", width: "w-32" },
//         { key: "pid", label: "Product ID", width: "w-40" },
//         { key: "forecast_month", label: "Forecast Month", width: "w-32" },
//         { key: "lead_time", label: "Lead Time", width: "w-24" },
//         { key: "red_box_item", label: "Red Box", width: "w-24" },
//       ];

//       if (selectedProductType === "store") {
//         baseColumns.push(
//           { key: "door_count", label: "Door Count", width: "w-28" },
//           { key: "birthstone", label: "Birthstone", width: "w-28" },
//           { key: "trend", label: "Trend", width: "w-24" },
//           {
//             key: "forecast_month_required_quantity",
//             label: "Required Qty",
//             width: "w-32",
//           },
//           { key: "total_added_qty", label: "Added Qty", width: "w-28" }
//         );
//       } else if (selectedProductType === "com") {
//         baseColumns.push(
//           { key: "vdf_status", label: "VDF Status", width: "w-28" },
//           {
//             key: "minimum_required_oh_for_com",
//             label: "Min OH",
//             width: "w-28",
//           },
//           {
//             key: "forecast_month_required_quantity",
//             label: "Required Qty",
//             width: "w-32",
//           },
//           { key: "total_added_qty", label: "Added Qty", width: "w-28" }
//         );
//       } else if (selectedProductType === "omni") {
//         baseColumns.push(
//           { key: "door_count", label: "Door Count", width: "w-28" },
//           { key: "birthstone", label: "Birthstone", width: "w-28" },
//           { key: "com_trend", label: "COM Trend", width: "w-28" },
//           {
//             key: "store_month_12_fc_index",
//             label: "Store FC Index",
//             width: "w-32",
//           },
//           {
//             key: "forecast_month_required_quantity",
//             label: "Required Qty",
//             width: "w-32",
//           },
//           { key: "total_added_qty", label: "Added Qty", width: "w-28" }
//         );
//       }

//       return baseColumns;
//     };

//     const columns = getColumns();

//     return (
//       <div className="overflow-x-auto">
//         <table className="min-w-full divide-y divide-gray-200">
//           <thead className="bg-gray-50">
//             <tr>
//               {columns.map((column) => (
//                 <th
//                   key={column.key}
//                   className={`${column.width} px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider`}
//                 >
//                   {column.label}
//                 </th>
//               ))}
//               <th className="w-24 px-4 py-3 text-center text-xs font-medium text-gray-600 uppercase tracking-wider">
//                 Actions
//               </th>
//             </tr>
//           </thead>
//           <tbody className="bg-white divide-y divide-gray-200">
//             {products.map((product, index) => (
//               <tr
//                 key={`${product.pid}-${index}`}
//                 className="hover:bg-gray-50 transition-colors"
//               >
//                 {columns.map((column) => (
//                   <td
//                     key={column.key}
//                     className="px-4 py-3 text-sm text-gray-900"
//                   >
//                     {formatCellValue(product[column.key], column.key)}
//                   </td>
//                 ))}
//                 <td className="px-4 py-3 text-center">
//                   <button
//                     onClick={() => handleViewDetails(product)}
//                     className="text-indigo-600 hover:text-indigo-900 inline-flex items-center text-sm font-medium transition-colors"
//                   >
//                     <Eye size={14} className="mr-1" />
//                     View
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>

//         {/* Pagination info */}
//         {products.length > 0 && (
//           <div className="px-6 py-3 bg-gray-50 border-t border-gray-200">
//             <div className="flex justify-between items-center">
//               <p className="text-sm text-gray-700">
//                 Showing <span className="font-medium">{products.length}</span>{" "}
//                 products
//               </p>
//               <div className="text-sm text-gray-500">
//                 Product Type:{" "}
//                 <span className="font-medium">{config.label}</span>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     );
//   }

//   // Format cell values based on column type
//   function formatCellValue(value, columnKey) {
//     // Handle boolean values for status/item columns
//     if (
//       columnKey.includes("status") ||
//       columnKey === "red_box_item" ||
//       columnKey === "vdf_status"
//     ) {
//       if (value === true || value === "true") {
//         return (
//           <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
//             {columnKey === "vdf_status" ? "Active" : "Yes"}
//           </span>
//         );
//       } else if (value === false || value === "false") {
//         return (
//           <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
//             {columnKey === "vdf_status" ? "Inactive" : "No"}
//           </span>
//         );
//       }
//     }

//     // Handle birthstone column
//     if (columnKey === "birthstone") {
//       if (value && value !== "") {
//         return (
//           <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
//             {value}
//           </span>
//         );
//       }
//       return <span className="text-gray-400">-</span>;
//     }

//     // Handle numeric values
//     if (typeof value === "number") {
//       if (columnKey.includes("trend") || columnKey.includes("index")) {
//         return (
//           <span className="font-medium">{parseFloat(value).toFixed(2)}</span>
//         );
//       }
//       return <span className="font-medium">{value.toLocaleString()}</span>;
//     }

//     // Handle null/undefined values
//     if (value === null || value === undefined || value === "") {
//       return <span className="text-gray-400">-</span>;
//     }

//     // Default string formatting
//     return String(value);
//   }
// }

// export default ProductSelector;

// ProductSelector.jsx - Complete with fixed product type counts
import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  ChevronDown,
  Filter,
  X,
  Eye,
  Package,
  Store,
  Globe,
  FileDown,
  ArrowLeft,
  Search,
  Grid,
  List,
  MoreVertical,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import ProductDetailsView from "./ProductDetailsView";

// Import Redux actions and selectors
import {
  fetchProducts,
  setSelectedProductType,
  setSelectedProduct,
  clearSelectedProduct,
  selectCurrentProducts,
  selectProductsLoading,
  selectSelectedProductType,
  selectSelectedProduct,
  selectStoreProducts,
  selectComProducts,
  selectOmniProducts,
} from "../redux/productSlice";

import { setCurrentView, addToast, selectCurrentView } from "../redux/uiSlice";

import { selectCurrentSession } from "../redux/forecastSlice";

function ProductSelector() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // ALL HOOKS MUST BE CALLED AT THE TOP - BEFORE ANY CONDITIONAL LOGIC
  // Redux state - ALL selectors must be here
  const products = useSelector(selectCurrentProducts);
  const loading = useSelector(selectProductsLoading);
  const selectedProductType = useSelector(selectSelectedProductType);
  const currentView = useSelector(selectCurrentView);
  const forecastSession = useSelector(selectCurrentSession);
  const selectedProduct = useSelector(selectSelectedProduct);

  // Individual product type selectors for correct counts
  const storeProducts = useSelector(selectStoreProducts);
  const comProducts = useSelector(selectComProducts);
  const omniProducts = useSelector(selectOmniProducts);

  // Local state
  const [selectedFilters, setSelectedFilters] = useState({
    category: [],
    birthstone: [],
    red_box_item: [],
    vdf_status: [],
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState("table");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProductsList, setSelectedProductsList] = useState(new Set());
  const [bulkActionMode, setBulkActionMode] = useState(false);
  const [availableFilters, setAvailableFilters] = useState({
    categories: [],
    birthstones: [],
    red_box_items: [],
    vdf_statuses: [],
  });

  const itemsPerPage = 50;
  const sortBy = "pid";
  const sortOrder = "asc";

  // Product type configuration
  const productTypeConfig = {
    store: {
      icon: Store,
      label: "Store Products",
      color: "blue",
    },
    com: {
      icon: Package,
      label: "COM Products",
      color: "green",
    },
    omni: {
      icon: Globe,
      label: "Omni Products",
      color: "purple",
    },
  };

  // Initialize data and filters
  useEffect(() => {
    const initializeData = async () => {
      try {
        // Load available filters
        await loadAvailableFilters();

        // Load products with current filters
        dispatch(
          fetchProducts({
            productType: selectedProductType,
            filters: selectedFilters,
          })
        );
      } catch (error) {
        dispatch(
          addToast({
            type: "error",
            message: "Failed to initialize data",
            duration: 5000,
          })
        );
      }
    };

    initializeData();
  }, [dispatch, selectedProductType]);

  // Refetch products when filters change
  useEffect(() => {
    if (Object.keys(availableFilters).length > 0) {
      dispatch(
        fetchProducts({
          productType: selectedProductType,
          filters: selectedFilters,
        })
      );
    }
  }, [dispatch, selectedProductType, selectedFilters, availableFilters]);

  // Load forecast data from session
  useEffect(() => {
    if (forecastSession?.selectedCategories) {
      const selectedCategoryNames = forecastSession.selectedCategories.map(
        (cat) => cat.name
      );
      setSelectedFilters((prev) => ({
        ...prev,
        category: selectedCategoryNames,
      }));
    }
  }, [forecastSession]);

  // Memoized filtered and sorted products
  const processedProducts = useMemo(() => {
    let filteredProducts = [...products];

    // Apply search filter
    if (searchQuery) {
      filteredProducts = filteredProducts.filter(
        (product) =>
          product.pid?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.category?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.birthstone?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply sorting
    filteredProducts.sort((a, b) => {
      let aValue = a[sortBy];
      let bValue = b[sortBy];

      // Handle null/undefined values
      if (aValue == null) aValue = "";
      if (bValue == null) bValue = "";

      // Convert to strings for comparison
      aValue = String(aValue).toLowerCase();
      bValue = String(bValue).toLowerCase();

      if (sortOrder === "asc") {
        return aValue.localeCompare(bValue);
      } else {
        return bValue.localeCompare(aValue);
      }
    });

    return filteredProducts;
  }, [products, searchQuery, sortBy, sortOrder]);

  // Pagination calculations
  const totalPages = Math.ceil(processedProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = processedProducts.slice(startIndex, endIndex);

  // Load available filter options
  const loadAvailableFilters = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/forecast/query/filter_products/`
      );
      const data = await response.json();

      const allProducts = [
        ...(data.store_products || []),
        ...(data.com_products || []),
        ...(data.omni_products || []),
      ];

      // Extract unique values for each filter
      const categories = [
        ...new Set(allProducts.map((p) => p.category).filter(Boolean)),
      ];
      const birthstones = [
        ...new Set(allProducts.map((p) => p.birthstone).filter(Boolean)),
      ];
      const redBoxItems = [
        ...new Set(allProducts.map((p) => p.red_box_item)),
      ].map((val) => (val ? "Yes" : "No"));
      const vdfStatuses = [
        ...new Set(allProducts.map((p) => p.vdf_status)),
      ].map((val) => (val ? "Active" : "Inactive"));

      // Filter categories based on forecast selection if available
      let filteredCategories = categories;
      if (forecastSession?.selectedCategories) {
        const selectedCategoryNames = forecastSession.selectedCategories.map(
          (cat) => cat.name
        );
        filteredCategories = categories.filter((cat) =>
          selectedCategoryNames.includes(cat)
        );
      }

      setAvailableFilters({
        categories: filteredCategories,
        birthstones: [...new Set(birthstones)],
        red_box_items: [...new Set(redBoxItems)],
        vdf_statuses: [...new Set(vdfStatuses)],
      });
    } catch (error) {
      console.error("Error loading filter options:", error);
      dispatch(
        addToast({
          type: "error",
          message: "Failed to load filter options",
          duration: 5000,
        })
      );
    }
  };

  // Handle product type change
  const handleProductTypeChange = (productType) => {
    dispatch(setSelectedProductType(productType));
    setCurrentPage(1);
    setSelectedProductsList(new Set());
  };

  // Handle filter changes
  const handleFilterChange = (filterKey, value, checked) => {
    const currentValues = selectedFilters[filterKey] || [];
    const newValues = checked
      ? [...currentValues, value]
      : currentValues.filter((item) => item !== value);

    setSelectedFilters((prev) => ({
      ...prev,
      [filterKey]: newValues,
    }));
    setCurrentPage(1);
  };

  // Handle search
  const handleSearch = (query) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  // Handle view details
  const handleViewDetails = (product) => {
    dispatch(setSelectedProduct(product));
    dispatch(setCurrentView("details"));
  };

  // Handle back to selector
  const handleBackToSelector = () => {
    dispatch(clearSelectedProduct());
    dispatch(setCurrentView("selector"));
  };

  // Handle bulk selection
  const handleBulkSelect = (productId, checked) => {
    const newSelection = new Set(selectedProductsList);
    if (checked) {
      newSelection.add(productId);
    } else {
      newSelection.delete(productId);
    }
    setSelectedProductsList(newSelection);
  };

  // Handle select all
  const handleSelectAll = (checked) => {
    if (checked) {
      const allIds = new Set(currentProducts.map((p) => p.pid));
      setSelectedProductsList(allIds);
    } else {
      setSelectedProductsList(new Set());
    }
  };

  // Clear all filters
  const clearAllFilters = () => {
    setSelectedFilters({
      category: [],
      birthstone: [],
      red_box_item: [],
      vdf_status: [],
    });
    setSearchQuery("");
  };

  // Format cell values based on column type
  const formatCellValue = (value, columnKey) => {
    // Handle boolean values for status/item columns
    if (
      columnKey.includes("status") ||
      columnKey === "red_box_item" ||
      columnKey === "vdf_status"
    ) {
      if (value === true || value === "true") {
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            {columnKey === "vdf_status" ? "Active" : "Yes"}
          </span>
        );
      } else if (value === false || value === "false") {
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            {columnKey === "vdf_status" ? "Inactive" : "No"}
          </span>
        );
      }
    }

    // Handle birthstone column
    if (columnKey === "birthstone") {
      if (value && value !== "") {
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
            {value}
          </span>
        );
      }
      return <span className="text-gray-400">-</span>;
    }

    // Handle numeric values
    if (typeof value === "number") {
      if (columnKey.includes("trend") || columnKey.includes("index")) {
        return (
          <span className="font-medium">{parseFloat(value).toFixed(2)}</span>
        );
      }
      return <span className="font-medium">{value.toLocaleString()}</span>;
    }

    // Handle null/undefined values
    if (value === null || value === undefined || value === "") {
      return <span className="text-gray-400">-</span>;
    }

    // Default string formatting
    return String(value);
  };

  // Get columns based on product type
  const getColumnsForProductType = (productType) => {
    const baseColumns = [
      { key: "category", label: "Category", width: "w-32" },
      { key: "pid", label: "Product ID", width: "w-40" },
      { key: "forecast_month", label: "Forecast Month", width: "w-32" },
      { key: "lead_time", label: "Lead Time", width: "w-24" },
      { key: "red_box_item", label: "Red Box", width: "w-24" },
    ];

    if (productType === "store") {
      baseColumns.push(
        { key: "door_count", label: "Door Count", width: "w-28" },
        { key: "birthstone", label: "Birthstone", width: "w-28" },
        { key: "trend", label: "Trend", width: "w-24" },
        {
          key: "forecast_month_required_quantity",
          label: "Required Qty",
          width: "w-32",
        },
        { key: "total_added_qty", label: "Added Qty", width: "w-28" }
      );
    } else if (productType === "com") {
      baseColumns.push(
        { key: "vdf_status", label: "VDF Status", width: "w-28" },
        { key: "minimum_required_oh_for_com", label: "Min OH", width: "w-28" },
        {
          key: "forecast_month_required_quantity",
          label: "Required Qty",
          width: "w-32",
        },
        { key: "total_added_qty", label: "Added Qty", width: "w-28" }
      );
    } else if (productType === "omni") {
      baseColumns.push(
        { key: "door_count", label: "Door Count", width: "w-28" },
        { key: "birthstone", label: "Birthstone", width: "w-28" },
        { key: "com_trend", label: "COM Trend", width: "w-28" },
        {
          key: "store_month_12_fc_index",
          label: "Store FC Index",
          width: "w-32",
        },
        {
          key: "forecast_month_required_quantity",
          label: "Required Qty",
          width: "w-32",
        },
        { key: "total_added_qty", label: "Added Qty", width: "w-28" }
      );
    }

    return baseColumns;
  };

  // Get the correct count for each product type
  const getProductCount = (productType) => {
    switch (productType) {
      case "store":
        return storeProducts.length;
      case "com":
        return comProducts.length;
      case "omni":
        return omniProducts.length;
      default:
        return 0;
    }
  };

  // Check if filters have active values
  const hasActiveFilters =
    Object.values(selectedFilters).some(
      (filterArray) => filterArray.length > 0
    ) || searchQuery.length > 0;

  // CONDITIONAL RETURN MUST BE AFTER ALL HOOKS
  // Show details view if in details mode - NO HOOKS INSIDE THIS CONDITION
  if (currentView === "details") {
    return (
      <ProductDetailsView
        productId={selectedProduct?.pid}
        onBack={handleBackToSelector}
      />
    );
  }

  return (
    <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 p-6">
        <div className="flex justify-between items-start">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <button
                onClick={() => navigate("/forecast")}
                className="text-white opacity-80 hover:opacity-100 flex items-center gap-2"
              >
                <ArrowLeft size={16} />
                Back to Forecast
              </button>
              {forecastSession?.downloadUrl && (
                <a
                  href={forecastSession.downloadUrl}
                  className="text-white opacity-80 hover:opacity-100 flex items-center gap-2 ml-4"
                  download
                >
                  <FileDown size={16} />
                  Download Forecast
                </a>
              )}
            </div>
            <h1 className="text-2xl font-bold text-white">Product Selector</h1>
            <p className="text-indigo-100 mt-1">
              Filter and explore products from your forecast selection
            </p>
          </div>

          {/* View controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={() =>
                setViewMode(viewMode === "table" ? "grid" : "table")
              }
              className="text-white opacity-80 hover:opacity-100 p-2 rounded-lg hover:bg-white/10"
            >
              {viewMode === "table" ? <Grid size={18} /> : <List size={18} />}
            </button>
            <button
              onClick={() => setBulkActionMode(!bulkActionMode)}
              className={`p-2 rounded-lg transition-colors ${
                bulkActionMode
                  ? "bg-white/20 text-white"
                  : "text-white opacity-80 hover:opacity-100 hover:bg-white/10"
              }`}
            >
              <MoreVertical size={18} />
            </button>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Forecast Information Banner */}
        {forecastSession && (
          <div className="mb-6 bg-indigo-50 border border-indigo-200 rounded-lg p-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-sm font-medium text-indigo-800 mb-2">
                  Active Forecast Session
                </h3>
                <div className="text-sm text-indigo-700 space-y-1">
                  <p>
                    <strong>Categories:</strong>{" "}
                    {forecastSession.selectedCategories
                      ?.map((cat) => `${cat.name} (${cat.value})`)
                      .join(", ")}
                  </p>
                  <p>
                    <strong>Period:</strong> {forecastSession.monthFrom} to{" "}
                    {forecastSession.monthTo} ({forecastSession.percentage}%)
                  </p>
                  <p>
                    <strong>Generated:</strong>{" "}
                    {new Date(forecastSession.timestamp).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Search products by ID, category, or birthstone..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
        </div>

        {/* Product Type Tabs - FIXED WITH CORRECT COUNTS */}
        <div className="border-b border-gray-200 mb-6">
          <nav className="-mb-px flex space-x-8">
            {Object.entries(productTypeConfig).map(([type, config]) => {
              const IconComponent = config.icon;

              return (
                <button
                  key={type}
                  onClick={() => handleProductTypeChange(type)}
                  className={`flex items-center gap-2 py-3 px-1 border-b-2 font-medium text-sm transition-colors ${
                    selectedProductType === type
                      ? "border-indigo-500 text-indigo-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  <IconComponent size={18} />
                  {config.label}
                  <span className="ml-1 bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full text-xs">
                    {getProductCount(type)}
                  </span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Filters Section */}
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <Filter size={16} className="text-gray-600" />
              <span className="text-sm font-medium text-gray-700">
                Filters:
              </span>
              {hasActiveFilters && (
                <button
                  onClick={clearAllFilters}
                  className="ml-auto text-sm text-indigo-600 hover:text-indigo-800 font-medium"
                >
                  Clear All Filters
                </button>
              )}
            </div>

            {/* Category Filter */}
            {availableFilters.categories.length > 0 && (
              <div className="flex flex-wrap items-center gap-2">
                <label className="text-xs text-gray-600 font-medium min-w-fit">
                  Categories:
                </label>
                <div className="flex flex-wrap gap-2">
                  {availableFilters.categories.map((option) => (
                    <label
                      key={option}
                      className="inline-flex items-center gap-1 text-sm"
                    >
                      <input
                        type="checkbox"
                        checked={
                          selectedFilters.category?.includes(option) || false
                        }
                        onChange={(e) =>
                          handleFilterChange(
                            "category",
                            option,
                            e.target.checked
                          )
                        }
                        className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                      />
                      <span className="text-gray-700">{option}</span>
                    </label>
                  ))}
                </div>
                {selectedFilters.category?.length > 0 && (
                  <button
                    onClick={() =>
                      setSelectedFilters((prev) => ({ ...prev, category: [] }))
                    }
                    className="text-gray-400 hover:text-gray-600 p-1"
                    title="Clear category filters"
                  >
                    <X size={14} />
                  </button>
                )}
              </div>
            )}

            {/* Birthstone Filter (for store and omni) */}
            {(selectedProductType === "store" ||
              selectedProductType === "omni") &&
              availableFilters.birthstones.length > 0 && (
                <div className="flex flex-wrap items-center gap-2">
                  <label className="text-xs text-gray-600 font-medium min-w-fit">
                    Birthstone:
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {availableFilters.birthstones.map((option) => (
                      <label
                        key={option}
                        className="inline-flex items-center gap-1 text-sm"
                      >
                        <input
                          type="checkbox"
                          checked={
                            selectedFilters.birthstone?.includes(option) ||
                            false
                          }
                          onChange={(e) =>
                            handleFilterChange(
                              "birthstone",
                              option,
                              e.target.checked
                            )
                          }
                          className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                        />
                        <span className="text-gray-700">{option}</span>
                      </label>
                    ))}
                  </div>
                  {selectedFilters.birthstone?.length > 0 && (
                    <button
                      onClick={() =>
                        setSelectedFilters((prev) => ({
                          ...prev,
                          birthstone: [],
                        }))
                      }
                      className="text-gray-400 hover:text-gray-600 p-1"
                      title="Clear birthstone filters"
                    >
                      <X size={14} />
                    </button>
                  )}
                </div>
              )}

            {/* Red Box Item Filter */}
            {availableFilters.red_box_items.length > 0 && (
              <div className="flex flex-wrap items-center gap-2">
                <label className="text-xs text-gray-600 font-medium min-w-fit">
                  Red Box Item:
                </label>
                <div className="flex flex-wrap gap-2">
                  {availableFilters.red_box_items.map((option) => (
                    <label
                      key={option}
                      className="inline-flex items-center gap-1 text-sm"
                    >
                      <input
                        type="checkbox"
                        checked={
                          selectedFilters.red_box_item?.includes(option) ||
                          false
                        }
                        onChange={(e) =>
                          handleFilterChange(
                            "red_box_item",
                            option,
                            e.target.checked
                          )
                        }
                        className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                      />
                      <span className="text-gray-700">{option}</span>
                    </label>
                  ))}
                </div>
                {selectedFilters.red_box_item?.length > 0 && (
                  <button
                    onClick={() =>
                      setSelectedFilters((prev) => ({
                        ...prev,
                        red_box_item: [],
                      }))
                    }
                    className="text-gray-400 hover:text-gray-600 p-1"
                    title="Clear red box item filters"
                  >
                    <X size={14} />
                  </button>
                )}
              </div>
            )}

            {/* VDF Status Filter (for com products) */}
            {selectedProductType === "com" &&
              availableFilters.vdf_statuses.length > 0 && (
                <div className="flex flex-wrap items-center gap-2">
                  <label className="text-xs text-gray-600 font-medium min-w-fit">
                    VDF Status:
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {availableFilters.vdf_statuses.map((option) => (
                      <label
                        key={option}
                        className="inline-flex items-center gap-1 text-sm"
                      >
                        <input
                          type="checkbox"
                          checked={
                            selectedFilters.vdf_status?.includes(option) ||
                            false
                          }
                          onChange={(e) =>
                            handleFilterChange(
                              "vdf_status",
                              option,
                              e.target.checked
                            )
                          }
                          className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                        />
                        <span className="text-gray-700">{option}</span>
                      </label>
                    ))}
                  </div>
                  {selectedFilters.vdf_status?.length > 0 && (
                    <button
                      onClick={() =>
                        setSelectedFilters((prev) => ({
                          ...prev,
                          vdf_status: [],
                        }))
                      }
                      className="text-gray-400 hover:text-gray-600 p-1"
                      title="Clear VDF status filters"
                    >
                      <X size={14} />
                    </button>
                  )}
                </div>
              )}
          </div>
        </div>

        {/* Products Display */}
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
          <div className="px-6 py-4 bg-gray-50 border-b border-gray-200 flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
              {React.createElement(
                productTypeConfig[selectedProductType].icon,
                { size: 20 }
              )}
              {productTypeConfig[selectedProductType].label}
            </h3>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-500">
                {processedProducts.length} products found
              </span>
              {loading && (
                <div className="w-5 h-5 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
              )}
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="text-center">
                <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-gray-600">Loading products...</p>
              </div>
            </div>
          ) : currentProducts.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <Package size={64} className="mx-auto mb-4 text-gray-300" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No Products Found
              </h3>
              <p className="mb-4">
                {hasActiveFilters || searchQuery
                  ? "No products match the current filters or search query."
                  : "No products available for this category."}
              </p>
              {(hasActiveFilters || searchQuery) && (
                <button
                  onClick={clearAllFilters}
                  className="text-indigo-600 hover:text-indigo-800 font-medium"
                >
                  Clear all filters and search
                </button>
              )}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    {getColumnsForProductType(selectedProductType).map(
                      (column) => (
                        <th
                          key={column.key}
                          className={`${column.width} px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider`}
                        >
                          {column.label}
                        </th>
                      )
                    )}
                    <th className="w-24 px-4 py-3 text-center text-xs font-medium text-gray-600 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {currentProducts.map((product, index) => (
                    <tr
                      key={`${product.pid}-${index}`}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      {getColumnsForProductType(selectedProductType).map(
                        (column) => (
                          <td
                            key={column.key}
                            className="px-4 py-3 text-sm text-gray-900"
                          >
                            {formatCellValue(product[column.key], column.key)}
                          </td>
                        )
                      )}
                      <td className="px-4 py-3 text-center">
                        <button
                          onClick={() => handleViewDetails(product)}
                          className="text-indigo-600 hover:text-indigo-900 inline-flex items-center text-sm font-medium transition-colors"
                        >
                          <Eye size={14} className="mr-1" />
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-6 flex items-center justify-between">
            <div className="text-sm text-gray-500">
              Showing {startIndex + 1} to{" "}
              {Math.min(endIndex, processedProducts.length)} of{" "}
              {processedProducts.length} products
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 border border-gray-300 rounded text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
              >
                Previous
              </button>

              {/* Page numbers */}
              {[...Array(Math.min(5, totalPages))].map((_, i) => {
                const pageNum = Math.max(1, currentPage - 2) + i;
                if (pageNum > totalPages) return null;

                return (
                  <button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`px-3 py-1 border rounded text-sm ${
                      currentPage === pageNum
                        ? "border-indigo-500 bg-indigo-50 text-indigo-600"
                        : "border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}

              <button
                onClick={() =>
                  setCurrentPage(Math.min(totalPages, currentPage + 1))
                }
                disabled={currentPage === totalPages}
                className="px-3 py-1 border border-gray-300 rounded text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
              >
                Next
              </button>
            </div>
          </div>
        )}

        {/* Active Filters Summary */}
        {hasActiveFilters && (
          <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h4 className="text-sm font-medium text-blue-800 mb-2">
              Active Filters:
            </h4>
            <div className="flex flex-wrap gap-2">
              {Object.entries(selectedFilters).map(
                ([filterKey, filterValues]) =>
                  filterValues.length > 0 && (
                    <div key={filterKey} className="flex flex-wrap gap-1">
                      {filterValues.map((value) => (
                        <span
                          key={`${filterKey}-${value}`}
                          className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                        >
                          {filterKey.replace("_", " ")}: {value}
                          <button
                            onClick={() =>
                              handleFilterChange(filterKey, value, false)
                            }
                            className="text-blue-600 hover:text-blue-800"
                          >
                            <X size={12} />
                          </button>
                        </span>
                      ))}
                    </div>
                  )
              )}
              {searchQuery && (
                <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                  search: {searchQuery}
                  <button
                    onClick={() => setSearchQuery("")}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <X size={12} />
                  </button>
                </span>
              )}
            </div>
          </div>
        )}

        {/* Debug Info */}
        <div className="mt-4 p-3 bg-gray-100 rounded text-xs">
          <strong>Debug Info:</strong>
          <div>Selected Product Type: {selectedProductType}</div>
          <div>Current Products Count: {products.length}</div>
          <div>Store Products Count: {storeProducts.length}</div>
          <div>COM Products Count: {comProducts.length}</div>
          <div>Omni Products Count: {omniProducts.length}</div>
          <div>Loading: {loading ? "Yes" : "No"}</div>
          <div>Current View: {currentView}</div>
          <div>Selected Product ID: {selectedProduct?.pid || "None"}</div>
          <div>Has Active Filters: {hasActiveFilters ? "Yes" : "No"}</div>
          <div>Search Query: {searchQuery || "None"}</div>
        </div>
      </div>
    </div>
  );
}

export default ProductSelector;
