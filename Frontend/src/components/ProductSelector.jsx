// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { ChevronDown, Filter, Check, X, List, Eye } from "lucide-react";
// import ProductDetailsView from "./ProductDetailsView";
// import {
//   setSelectedCategory,
//   toggleFilter,
//   clearFilters,
//   setSelectedProduct,
//   selectCategory,
//   selectActiveFilters,
//   selectSelectedProduct,
//   selectDisplayedProducts,
//   setProductData
// } from "../redux/productSlice";
// import { getMockProductData } from "../services/productService";

// // Define allFilters outside the component to avoid reference errors
// const allFilters = [
//   "Pid_to_review",
//   "Pid_to_best_selling",
//   "Pid_to_min_order",
//   "Pid_to_birthstone",
//   "Pid_to_notify_to_macy",
//   "Pid_to_Store_product",
//   "Pid_to_com_product"
// ];

// function ProductSelector() {
//   const dispatch = useDispatch();

//   // Redux state
//   const selectedCategory = useSelector(selectCategory);
//   const activeFilters = useSelector(selectActiveFilters);
//   const selectedProduct = useSelector(selectSelectedProduct);
//   const displayedProducts = useSelector(selectDisplayedProducts);

//   // Get all filter counts at once to avoid hooks in loops
//   const filterCounts = useSelector(state => {
//     const categoryData = state.products.productData[selectedCategory];
//     if (!categoryData) return {};

//     const counts = {};
//     allFilters.forEach(filter => {
//       counts[filter] = categoryData[filter] ? categoryData[filter].length : 0;
//     });
//     return counts;
//   });

//   // Local state
//   const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = React.useState(false);
//   const [categories, setCategories] = React.useState([]);

//   // On component mount, initialize with mock data
//   // In a real app, this would fetch from API
//   useEffect(() => {
//     const productData = getMockProductData();
//     dispatch(setProductData(productData));
//     setCategories(Object.keys(productData));
//   }, [dispatch]);

//   // Handle category selection
//   const handleCategoryChange = (category) => {
//     dispatch(setSelectedCategory(category));
//     setIsCategoryDropdownOpen(false);
//   };

//   // Toggle filter selection
//   const handleToggleFilter = (filter) => {
//     dispatch(toggleFilter(filter));
//   };

//   // Handle product selection
//   const handleProductSelect = (productId) => {
//     dispatch(setSelectedProduct({
//       productId,
//       category: selectedCategory
//     }));
//   };

//   // Handle clearing filters
//   const handleClearFilters = () => {
//     dispatch(clearFilters());
//   };

//   // If a product is selected, show its details
//   if (selectedProduct) {
//     return (
//       <ProductDetailsView
//         productId={selectedProduct.productId}
//         category={selectedProduct.category}
//       />
//     );
//   }

//   return (
//     <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
//       {/* Header */}
//       <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 p-6">
//         <h1 className="text-2xl font-bold text-white">Product Selector</h1>
//         <p className="text-indigo-100 mt-1">
//           Select a category and apply filters to find products
//         </p>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-12 gap-0">
//         {/* Category Column */}
//         <div className="md:col-span-3 bg-gray-50 p-4 border-r border-gray-200">
//           <div className="mb-6">
//             <h2 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
//               <List size={18} className="mr-2 text-indigo-600" />
//               Categories
//             </h2>

//             <div className="relative">
//               <button
//                 className="w-full text-left flex items-center justify-between p-3 border border-gray-300 rounded-lg bg-white hover:border-indigo-300 transition-colors"
//                 onClick={() => setIsCategoryDropdownOpen(!isCategoryDropdownOpen)}
//               >
//                 <span className={selectedCategory ? "text-gray-800" : "text-gray-500"}>
//                   {selectedCategory || "Select Category"}
//                 </span>
//                 <ChevronDown
//                   size={18}
//                   className={`text-gray-500 transition-transform duration-200 ${
//                     isCategoryDropdownOpen ? "rotate-180" : ""
//                   }`}
//                 />
//               </button>

//               {isCategoryDropdownOpen && (
//                 <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-80 overflow-y-auto">
//                   {categories.map((category) => (
//                     <button
//                       key={category}
//                       className={`w-full text-left p-3 hover:bg-indigo-50 transition-colors ${
//                         selectedCategory === category ? "bg-indigo-50 text-indigo-700" : ""
//                       }`}
//                       onClick={() => handleCategoryChange(category)}
//                     >
//                       {category}
//                     </button>
//                   ))}
//                 </div>
//               )}
//             </div>
//           </div>

//           {selectedCategory && (
//             <div>
//               <h3 className="text-sm font-medium text-gray-600 mb-2 flex items-center">
//                 <Filter size={16} className="mr-2 text-indigo-500" />
//                 Filters
//               </h3>
//               <div className="space-y-2">
//                 {allFilters.map((filter) => (
//                   <div
//                     key={filter}
//                     className={`flex items-center p-2 rounded-lg cursor-pointer transition-colors ${
//                       activeFilters.includes(filter)
//                         ? "bg-indigo-50 border border-indigo-200"
//                         : "hover:bg-gray-100 border border-transparent"
//                     }`}
//                     onClick={() => handleToggleFilter(filter)}
//                   >
//                     <div
//                       className={`w-5 h-5 rounded flex items-center justify-center mr-3 ${
//                         activeFilters.includes(filter)
//                           ? "bg-indigo-600 text-white"
//                           : "border border-gray-300"
//                       }`}
//                     >
//                       {activeFilters.includes(filter) && <Check size={14} />}
//                     </div>
//                     <span className="text-sm">{filter.replace("Pid_to_", "")}</span>
//                     <span className="ml-auto text-xs text-gray-500">
//                       {filterCounts[filter] || 0}
//                     </span>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}
//         </div>

//         {/* Products Column */}
//         <div className="md:col-span-9 p-6">
//           {selectedCategory ? (
//             <>
//               <div className="flex justify-between items-center mb-6">
//                 <h2 className="text-xl font-semibold text-gray-800">
//                   {selectedCategory} Products
//                 </h2>
//                 <div className="flex items-center text-sm text-gray-500">
//                   <span className="mr-2">Products:</span>
//                   <span className="font-medium text-indigo-700">
//                     {displayedProducts.length}
//                   </span>
//                   {activeFilters.length > 0 && (
//                     <button
//                       className="ml-4 text-indigo-600 hover:text-indigo-800 flex items-center"
//                       onClick={handleClearFilters}
//                     >
//                       <X size={14} className="mr-1" /> Clear filters
//                     </button>
//                   )}
//                 </div>
//               </div>

//               {activeFilters.length > 0 && (
//                 <div className="mb-6 flex flex-wrap items-center gap-2">
//                   <span className="text-sm text-gray-600">Active filters:</span>
//                   {activeFilters.map((filter) => (
//                     <div key={filter} className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-sm flex items-center">
//                       {filter.replace("Pid_to_", "")}
//                       <button
//                         className="ml-2 text-indigo-400 hover:text-indigo-600"
//                         onClick={() => handleToggleFilter(filter)}
//                       >
//                         <X size={14} />
//                       </button>
//                     </div>
//                   ))}
//                 </div>
//               )}

//               {displayedProducts.length > 0 ? (
//                 <div className="bg-white rounded-lg border border-gray-200">
//                   <ul className="divide-y divide-gray-200 max-h-[60vh] overflow-y-auto">
//                     {displayedProducts.map((product, index) => (
//                       <li
//                         key={`${product}-${index}`}
//                         className="px-4 py-3 hover:bg-gray-50 transition-colors flex justify-between items-center"
//                       >
//                         <span className="text-gray-800 font-medium">{product}</span>
//                         <button
//                           onClick={() => handleProductSelect(product)}
//                           className="text-indigo-600 hover:text-indigo-800 flex items-center"
//                         >
//                           <Eye size={18} className="mr-2" /> View Details
//                         </button>
//                       </li>
//                     ))}
//                   </ul>
//                 </div>
//               ) : (
//                 <div className="text-center p-8 bg-gray-50 rounded-lg border border-gray-200">
//                   <p className="text-gray-500">
//                     {activeFilters.length > 0
//                       ? "No products match the selected filters"
//                       : "No products available for this category"}
//                   </p>
//                 </div>
//               )}
//             </>
//           ) : (
//             <div className="text-center p-12 bg-gray-50 rounded-lg border border-gray-200">
//               <h2 className="text-xl font-semibold text-gray-700 mb-2">
//                 Please Select a Category
//               </h2>
//               <p className="text-gray-500">
//                 Choose a category from the left sidebar to view products
//               </p>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
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

// function ProductSelector() {
//   const navigate = useNavigate();
//   const location = useLocation();

//   // State for product types and filters
//   const [selectedProductType, setSelectedProductType] = useState("store");
//   const [selectedFilters, setSelectedFilters] = useState({
//     category: "",
//     birthstone: "",
//     red_box_item: "",
//     vdf_status: "",
//   });

//   // State for products and loading
//   const [productData, setProductData] = useState({
//     store_products: [],
//     com_products: [],
//     omni_products: [],
//   });
//   const [productsLoading, setProductsLoading] = useState(false);

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

//   // Available categories for filter dropdown
//   const categoryOptions = [
//     "Bridge Gem",
//     "Gold",
//     "Womens Silver",
//     "Precious",
//     "Fine Pearl",
//     "Semi",
//     "Diamond",
//     "Bridal",
//     "Men's",
//   ];

//   // Load forecast data on component mount
//   useEffect(() => {
//     const storedForecastData = localStorage.getItem("forecastData");
//     if (storedForecastData) {
//       const parsedData = JSON.parse(storedForecastData);
//       setForecastData(parsedData);
//       setShowForecastInfo(true);
//       // Auto-select first category if available
//       if (
//         parsedData.selectedCategories &&
//         parsedData.selectedCategories.length > 0
//       ) {
//         setSelectedFilters((prev) => ({
//           ...prev,
//           category: parsedData.selectedCategories[0].name,
//         }));
//       }
//     }
//   }, []);

//   // Fetch products when filters or product type change
//   useEffect(() => {
//     fetchProducts();
//   }, [selectedProductType, selectedFilters]);

//   // Fetch products from API
//   const fetchProducts = async () => {
//     setProductsLoading(true);
//     try {
//       const params = new URLSearchParams();

//       // Add filters to API request
//       if (selectedFilters.category)
//         params.append("category", selectedFilters.category);
//       if (selectedFilters.birthstone)
//         params.append("birthstone", selectedFilters.birthstone);
//       if (selectedFilters.red_box_item)
//         params.append("red_box_item", selectedFilters.red_box_item);
//       if (selectedFilters.vdf_status)
//         params.append("vdf_status", selectedFilters.vdf_status);
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

//   // Handle filter changes
//   const handleFilterChange = (filterKey, value) => {
//     setSelectedFilters((prev) => ({
//       ...prev,
//       [filterKey]: value,
//     }));
//   };

//   // Clear specific filter
//   const clearFilter = (filterKey) => {
//     setSelectedFilters((prev) => ({
//       ...prev,
//       [filterKey]: "",
//     }));
//   };

//   // Clear all filters
//   const clearAllFilters = () => {
//     setSelectedFilters({
//       category: "",
//       birthstone: "",
//       red_box_item: "",
//       vdf_status: "",
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
//     // Navigate to product details or open modal
//     console.log("View details for product:", product.pid);
//     // You can implement this based on your routing needs
//   };

//   // Navigate back to forecast
//   const handleBackToForecast = () => {
//     navigate("/forecast");
//   };

//   // Check if any filters are active
//   const hasActiveFilters = Object.values(selectedFilters).some(
//     (value) => value !== ""
//   );

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
//               Filter and explore products across different channels
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
//           <div className="flex flex-wrap items-center gap-4">
//             <div className="flex items-center gap-2">
//               <Filter size={16} className="text-gray-600" />
//               <span className="text-sm font-medium text-gray-700">
//                 Filters:
//               </span>
//             </div>

//             {/* Category Filter */}
//             <div className="flex items-center gap-2">
//               <label className="text-xs text-gray-600 font-medium">
//                 Category:
//               </label>
//               <select
//                 value={selectedFilters.category}
//                 onChange={(e) => handleFilterChange("category", e.target.value)}
//                 className="px-3 py-1 border border-gray-300 rounded-md text-sm bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
//               >
//                 <option value="">All Categories</option>
//                 {categoryOptions.map((category) => (
//                   <option key={category} value={category}>
//                     {category}
//                   </option>
//                 ))}
//               </select>
//               {selectedFilters.category && (
//                 <button
//                   onClick={() => clearFilter("category")}
//                   className="text-gray-400 hover:text-gray-600 p-1"
//                 >
//                   <X size={14} />
//                 </button>
//               )}
//             </div>

//             {/* Birthstone Filter (for store and omni) */}
//             {(selectedProductType === "store" ||
//               selectedProductType === "omni") && (
//               <div className="flex items-center gap-2">
//                 <label className="text-xs text-gray-600 font-medium">
//                   Birthstone:
//                 </label>
//                 <select
//                   value={selectedFilters.birthstone}
//                   onChange={(e) =>
//                     handleFilterChange("birthstone", e.target.value)
//                   }
//                   className="px-3 py-1 border border-gray-300 rounded-md text-sm bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
//                 >
//                   <option value="">All</option>
//                   <option value="Yes">Yes</option>
//                   <option value="No">No</option>
//                 </select>
//                 {selectedFilters.birthstone && (
//                   <button
//                     onClick={() => clearFilter("birthstone")}
//                     className="text-gray-400 hover:text-gray-600 p-1"
//                   >
//                     <X size={14} />
//                   </button>
//                 )}
//               </div>
//             )}

//             {/* Red Box Item Filter */}
//             <div className="flex items-center gap-2">
//               <label className="text-xs text-gray-600 font-medium">
//                 Red Box:
//               </label>
//               <select
//                 value={selectedFilters.red_box_item}
//                 onChange={(e) =>
//                   handleFilterChange("red_box_item", e.target.value)
//                 }
//                 className="px-3 py-1 border border-gray-300 rounded-md text-sm bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
//               >
//                 <option value="">All</option>
//                 <option value="true">Yes</option>
//                 <option value="false">No</option>
//               </select>
//               {selectedFilters.red_box_item && (
//                 <button
//                   onClick={() => clearFilter("red_box_item")}
//                   className="text-gray-400 hover:text-gray-600 p-1"
//                 >
//                   <X size={14} />
//                 </button>
//               )}
//             </div>

//             {/* VDF Status Filter (for com products) */}
//             {selectedProductType === "com" && (
//               <div className="flex items-center gap-2">
//                 <label className="text-xs text-gray-600 font-medium">
//                   VDF Status:
//                 </label>
//                 <select
//                   value={selectedFilters.vdf_status}
//                   onChange={(e) =>
//                     handleFilterChange("vdf_status", e.target.value)
//                   }
//                   className="px-3 py-1 border border-gray-300 rounded-md text-sm bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
//                 >
//                   <option value="">All</option>
//                   <option value="true">Active</option>
//                   <option value="false">Inactive</option>
//                 </select>
//                 {selectedFilters.vdf_status && (
//                   <button
//                     onClick={() => clearFilter("vdf_status")}
//                     className="text-gray-400 hover:text-gray-600 p-1"
//                   >
//                     <X size={14} />
//                   </button>
//                 )}
//               </div>
//             )}

//             {/* Clear All Filters */}
//             {hasActiveFilters && (
//               <button
//                 onClick={clearAllFilters}
//                 className="ml-auto text-sm text-indigo-600 hover:text-indigo-800 font-medium"
//               >
//                 Clear All Filters
//               </button>
//             )}
//           </div>
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
//           ) : (
//             renderProductTable()
//           )}
//         </div>
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
//           <p>
//             No products match the current filters. Try adjusting your filters or
//             select a different product type.
//           </p>
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
//         {
//           key: "forecast_month_required_quantity",
//           label: "Required Qty",
//           width: "w-32",
//         },
//         { key: "total_added_qty", label: "Added Qty", width: "w-28" },
//       ];

//       if (selectedProductType === "store") {
//         baseColumns.splice(
//           5,
//           0,
//           { key: "door_count", label: "Door Count", width: "w-28" },
//           { key: "birthstone", label: "Birthstone", width: "w-28" },
//           { key: "trend", label: "Trend", width: "w-24" }
//         );
//       } else if (selectedProductType === "com") {
//         baseColumns.splice(
//           5,
//           0,
//           { key: "vdf_status", label: "VDF Status", width: "w-28" },
//           { key: "minimum_required_oh_for_com", label: "Min OH", width: "w-28" }
//         );
//       } else if (selectedProductType === "omni") {
//         baseColumns.splice(
//           5,
//           0,
//           { key: "door_count", label: "Door Count", width: "w-28" },
//           { key: "birthstone", label: "Birthstone", width: "w-28" },
//           { key: "com_trend", label: "COM Trend", width: "w-28" },
//           {
//             key: "store_month_12_fc_index",
//             label: "Store FC Index",
//             width: "w-32",
//           }
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
//       </div>
//     );
//   }

//   // Format cell values based on column type
//   function formatCellValue(value, columnKey) {
//     // Handle boolean values for status/item columns
//     if (
//       columnKey.includes("status") ||
//       columnKey.includes("item") ||
//       columnKey === "red_box_item"
//     ) {
//       if (value === true || value === "true") {
//         return (
//           <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
//             Yes
//           </span>
//         );
//       } else if (value === false || value === "false") {
//         return (
//           <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
//             No
//           </span>
//         );
//       }
//     }

//     // Handle numeric values
//     if (typeof value === "number") {
//       if (columnKey.includes("trend") || columnKey.includes("index")) {
//         return parseFloat(value).toFixed(2);
//       }
//       return value.toLocaleString();
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

// function ProductSelector() {
//   const navigate = useNavigate();
//   const location = useLocation();

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
//   };

//   // Navigate back to forecast
//   const handleBackToForecast = () => {
//     navigate("/forecast");
//   };

//   // Check if any filters are active
//   const hasActiveFilters = Object.values(selectedFilters).some(
//     (filterArray) => filterArray.length > 0
//   );

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

import React, { useEffect, useState } from "react";
import axios from "axios";
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
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import ProductDetailsView from "./ProductDetailsView"; // Import the ProductDetailsView component

function ProductSelector() {
  const navigate = useNavigate();
  const location = useLocation();

  // State for view management
  const [currentView, setCurrentView] = useState("selector"); // "selector" or "details"
  const [selectedProductId, setSelectedProductId] = useState(null);

  // State for product types and filters
  const [selectedProductType, setSelectedProductType] = useState("store");
  const [selectedFilters, setSelectedFilters] = useState({
    category: [],
    birthstone: [],
    red_box_item: [],
    vdf_status: [],
  });

  // State for available filter options (from API)
  const [availableFilters, setAvailableFilters] = useState({
    categories: [],
    birthstones: [],
    red_box_items: [],
    vdf_statuses: [],
  });

  // State for products and loading
  const [productData, setProductData] = useState({
    store_products: [],
    com_products: [],
    omni_products: [],
  });
  const [productsLoading, setProductsLoading] = useState(false);
  const [filtersLoading, setFiltersLoading] = useState(true);

  // State for forecast data
  const [forecastData, setForecastData] = useState(null);
  const [showForecastInfo, setShowForecastInfo] = useState(false);

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

  // Load forecast data on component mount
  useEffect(() => {
    const storedForecastData = localStorage.getItem("forecastData");
    if (storedForecastData) {
      const parsedData = JSON.parse(storedForecastData);
      setForecastData(parsedData);
      setShowForecastInfo(true);

      // Extract selected categories from forecast data
      if (
        parsedData.selectedCategories &&
        parsedData.selectedCategories.length > 0
      ) {
        const selectedCategoryNames = parsedData.selectedCategories.map(
          (cat) => cat.name
        );
        setSelectedFilters((prev) => ({
          ...prev,
          category: selectedCategoryNames, // Pre-select forecast categories
        }));
      }
    }

    // Load available filters from API
    loadAvailableFilters();
  }, []);

  // Fetch products when filters or product type change
  useEffect(() => {
    if (!filtersLoading) {
      fetchProducts();
    }
  }, [selectedProductType, selectedFilters, filtersLoading]);

  // Load available filter options from API
  const loadAvailableFilters = async () => {
    setFiltersLoading(true);
    try {
      // Fetch all products to extract unique filter values
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/forecast/query/filter_products/`
      );

      const allProducts = [
        ...(response.data.store_products || []),
        ...(response.data.com_products || []),
        ...(response.data.omni_products || []),
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

      // If we have forecast data, filter categories to only selected ones
      const storedForecastData = localStorage.getItem("forecastData");
      let filteredCategories = categories;

      if (storedForecastData) {
        const parsedData = JSON.parse(storedForecastData);
        if (
          parsedData.selectedCategories &&
          parsedData.selectedCategories.length > 0
        ) {
          const selectedCategoryNames = parsedData.selectedCategories.map(
            (cat) => cat.name
          );
          filteredCategories = categories.filter((cat) =>
            selectedCategoryNames.includes(cat)
          );
        }
      }

      setAvailableFilters({
        categories: filteredCategories,
        birthstones: [...new Set(birthstones)],
        red_box_items: [...new Set(redBoxItems)],
        vdf_statuses: [...new Set(vdfStatuses)],
      });
    } catch (error) {
      console.error("Error loading filter options:", error);
      setAvailableFilters({
        categories: [],
        birthstones: [],
        red_box_items: [],
        vdf_statuses: [],
      });
    } finally {
      setFiltersLoading(false);
    }
  };

  // Fetch products from API
  const fetchProducts = async () => {
    setProductsLoading(true);
    try {
      const params = new URLSearchParams();

      // Add filters to API request
      if (selectedFilters.category.length > 0) {
        selectedFilters.category.forEach((cat) =>
          params.append("category", cat)
        );
      }
      if (selectedFilters.birthstone.length > 0) {
        selectedFilters.birthstone.forEach((bs) =>
          params.append("birthstone", bs)
        );
      }
      if (selectedFilters.red_box_item.length > 0) {
        selectedFilters.red_box_item.forEach((rb) => {
          params.append("red_box_item", rb === "Yes" ? "true" : "false");
        });
      }
      if (selectedFilters.vdf_status.length > 0) {
        selectedFilters.vdf_status.forEach((vdf) => {
          params.append("vdf_status", vdf === "Active" ? "true" : "false");
        });
      }

      params.append("product_type", selectedProductType);

      const response = await axios.get(
        `${
          import.meta.env.VITE_API_BASE_URL
        }/forecast/query/filter_products/?${params}`
      );

      setProductData(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
      setProductData({
        store_products: [],
        com_products: [],
        omni_products: [],
      });
    } finally {
      setProductsLoading(false);
    }
  };

  // Handle checkbox filter changes
  const handleFilterChange = (filterKey, value, checked) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [filterKey]: checked
        ? [...prev[filterKey], value]
        : prev[filterKey].filter((item) => item !== value),
    }));
  };

  // Clear specific filter
  const clearFilter = (filterKey) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [filterKey]: [],
    }));
  };

  // Clear all filters
  const clearAllFilters = () => {
    setSelectedFilters({
      category: [],
      birthstone: [],
      red_box_item: [],
      vdf_status: [],
    });
  };

  // Get current products based on selected type
  const getCurrentProducts = () => {
    switch (selectedProductType) {
      case "store":
        return productData.store_products || [];
      case "com":
        return productData.com_products || [];
      case "omni":
        return productData.omni_products || [];
      default:
        return [];
    }
  };

  // Handle product details view
  const handleViewDetails = (product) => {
    console.log("View details for product:", product.pid);
    setSelectedProductId(product.pid);
    setCurrentView("details");
  };

  // Handle back to product selector
  const handleBackToSelector = () => {
    setCurrentView("selector");
    setSelectedProductId(null);
  };

  // Navigate back to forecast
  const handleBackToForecast = () => {
    navigate("/forecast");
  };

  // Check if any filters are active
  const hasActiveFilters = Object.values(selectedFilters).some(
    (filterArray) => filterArray.length > 0
  );

  // If we're in details view, show the ProductDetailsView component
  if (currentView === "details" && selectedProductId) {
    return (
      <ProductDetailsView
        productId={selectedProductId}
        onBack={handleBackToSelector}
      />
    );
  }

  // Render filter checkboxes
  const renderFilterCheckboxes = (filterKey, options, label) => {
    if (!options || options.length === 0) return null;

    return (
      <div className="flex flex-wrap items-center gap-2">
        <label className="text-xs text-gray-600 font-medium min-w-fit">
          {label}:
        </label>
        <div className="flex flex-wrap gap-2">
          {options.map((option) => (
            <label
              key={option}
              className="inline-flex items-center gap-1 text-sm"
            >
              <input
                type="checkbox"
                checked={selectedFilters[filterKey].includes(option)}
                onChange={(e) =>
                  handleFilterChange(filterKey, option, e.target.checked)
                }
                className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
              />
              <span className="text-gray-700">{option}</span>
            </label>
          ))}
        </div>
        {selectedFilters[filterKey].length > 0 && (
          <button
            onClick={() => clearFilter(filterKey)}
            className="text-gray-400 hover:text-gray-600 p-1"
            title={`Clear ${label} filters`}
          >
            <X size={14} />
          </button>
        )}
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 p-6">
        <div className="flex justify-between items-start">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <button
                onClick={handleBackToForecast}
                className="text-white opacity-80 hover:opacity-100 flex items-center gap-2"
              >
                <ArrowLeft size={16} />
                Back to Forecast
              </button>
              {forecastData?.downloadUrl && (
                <a
                  href={forecastData.downloadUrl}
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
        </div>
      </div>

      <div className="p-6">
        {/* Forecast Information Banner */}
        {showForecastInfo && forecastData && (
          <div className="mb-6 bg-indigo-50 border border-indigo-200 rounded-lg p-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-sm font-medium text-indigo-800 mb-2">
                  Forecast Generated Successfully
                </h3>
                <div className="text-sm text-indigo-700 space-y-1">
                  <p>
                    <strong>Selected Categories:</strong>{" "}
                    {forecastData.selectedCategories
                      ?.map((cat) => `${cat.name} (${cat.value})`)
                      .join(", ")}
                  </p>
                  <p>
                    <strong>Period:</strong> {forecastData.monthFrom} to{" "}
                    {forecastData.monthTo} ({forecastData.percentage}%)
                  </p>
                  <p>
                    <strong>Generated:</strong>{" "}
                    {new Date(forecastData.timestamp).toLocaleString()}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowForecastInfo(false)}
                className="text-indigo-400 hover:text-indigo-600"
              >
                <X size={20} />
              </button>
            </div>
          </div>
        )}

        {/* Product Type Tabs */}
        <div className="border-b border-gray-200 mb-6">
          <nav className="-mb-px flex space-x-8">
            {Object.entries(productTypeConfig).map(([type, config]) => {
              const IconComponent = config.icon;
              return (
                <button
                  key={type}
                  onClick={() => setSelectedProductType(type)}
                  className={`flex items-center gap-2 py-3 px-1 border-b-2 font-medium text-sm transition-colors ${
                    selectedProductType === type
                      ? "border-indigo-500 text-indigo-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  <IconComponent size={18} />
                  {config.label}
                  <span className="ml-1 bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full text-xs">
                    {getCurrentProducts().length}
                  </span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Horizontal Filters */}
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          {filtersLoading ? (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
              <span className="text-sm text-gray-600">Loading filters...</span>
            </div>
          ) : (
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

              {/* Category Filter - Only from selected forecast categories */}
              {renderFilterCheckboxes(
                "category",
                availableFilters.categories,
                "Categories"
              )}

              {/* Birthstone Filter (for store and omni) */}
              {(selectedProductType === "store" ||
                selectedProductType === "omni") &&
                renderFilterCheckboxes(
                  "birthstone",
                  availableFilters.birthstones,
                  "Birthstone"
                )}

              {/* Red Box Item Filter */}
              {renderFilterCheckboxes(
                "red_box_item",
                availableFilters.red_box_items,
                "Red Box Item"
              )}

              {/* VDF Status Filter (for com products) */}
              {selectedProductType === "com" &&
                renderFilterCheckboxes(
                  "vdf_status",
                  availableFilters.vdf_statuses,
                  "VDF Status"
                )}
            </div>
          )}
        </div>

        {/* Product Table */}
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
                {getCurrentProducts().length} products found
              </span>
              {productsLoading && (
                <div className="w-5 h-5 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
              )}
            </div>
          </div>

          {productsLoading ? (
            <div className="flex justify-center items-center py-12">
              <div className="text-center">
                <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-gray-600">Loading products...</p>
              </div>
            </div>
          ) : filtersLoading ? (
            <div className="flex justify-center items-center py-12">
              <div className="text-center">
                <div className="w-12 h-12 border-4 border-gray-200 border-t-gray-600 rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-gray-600">Loading filters...</p>
              </div>
            </div>
          ) : (
            renderProductTable()
          )}
        </div>

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
            </div>
          </div>
        )}
      </div>
    </div>
  );

  // Render product table function
  function renderProductTable() {
    const products = getCurrentProducts();
    const config = productTypeConfig[selectedProductType];
    const IconComponent = config.icon;

    if (products.length === 0) {
      return (
        <div className="text-center py-12 text-gray-500">
          <IconComponent size={64} className="mx-auto mb-4 text-gray-300" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No {config.label} Found
          </h3>
          <p className="mb-4">No products match the current filters.</p>
          {hasActiveFilters && (
            <button
              onClick={clearAllFilters}
              className="text-indigo-600 hover:text-indigo-800 font-medium"
            >
              Clear all filters to see all products
            </button>
          )}
        </div>
      );
    }

    // Dynamic columns based on product type
    const getColumns = () => {
      const baseColumns = [
        { key: "category", label: "Category", width: "w-32" },
        { key: "pid", label: "Product ID", width: "w-40" },
        { key: "forecast_month", label: "Forecast Month", width: "w-32" },
        { key: "lead_time", label: "Lead Time", width: "w-24" },
        { key: "red_box_item", label: "Red Box", width: "w-24" },
      ];

      if (selectedProductType === "store") {
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
      } else if (selectedProductType === "com") {
        baseColumns.push(
          { key: "vdf_status", label: "VDF Status", width: "w-28" },
          {
            key: "minimum_required_oh_for_com",
            label: "Min OH",
            width: "w-28",
          },
          {
            key: "forecast_month_required_quantity",
            label: "Required Qty",
            width: "w-32",
          },
          { key: "total_added_qty", label: "Added Qty", width: "w-28" }
        );
      } else if (selectedProductType === "omni") {
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

    const columns = getColumns();

    return (
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  className={`${column.width} px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider`}
                >
                  {column.label}
                </th>
              ))}
              <th className="w-24 px-4 py-3 text-center text-xs font-medium text-gray-600 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {products.map((product, index) => (
              <tr
                key={`${product.pid}-${index}`}
                className="hover:bg-gray-50 transition-colors"
              >
                {columns.map((column) => (
                  <td
                    key={column.key}
                    className="px-4 py-3 text-sm text-gray-900"
                  >
                    {formatCellValue(product[column.key], column.key)}
                  </td>
                ))}
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

        {/* Pagination info */}
        {products.length > 0 && (
          <div className="px-6 py-3 bg-gray-50 border-t border-gray-200">
            <div className="flex justify-between items-center">
              <p className="text-sm text-gray-700">
                Showing <span className="font-medium">{products.length}</span>{" "}
                products
              </p>
              <div className="text-sm text-gray-500">
                Product Type:{" "}
                <span className="font-medium">{config.label}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Format cell values based on column type
  function formatCellValue(value, columnKey) {
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
  }
}

export default ProductSelector;
