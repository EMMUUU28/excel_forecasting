// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import {
//   ArrowLeft,
//   ChevronDown,
//   Calendar,
//   TrendingUp,
//   Package,
// } from "lucide-react";

// const ProductDetailsView = ({ productId, onBack }) => {
//   const [productData, setProductData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [expandedSections, setExpandedSections] = useState({
//     rollingForecast: true,
//     monthlyForecast: true,
//     storeForecast: false,
//     comForecast: false,
//     omniForecast: false,
//   });

//   useEffect(() => {
//     fetchProductDetails();
//   }, [productId]);

//   const fetchProductDetails = async () => {
//     setLoading(true);
//     try {
//       const response = await axios.get(
//         `${
//           import.meta.env.VITE_API_BASE_URL
//         }/forecast/api/product/${productId}/`
//       );
//       setProductData(response.data);
//     } catch (error) {
//       console.error("Error fetching product details:", error);
//       setError("Failed to load product details");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const toggleSection = (section) => {
//     setExpandedSections((prev) => ({
//       ...prev,
//       [section]: !prev[section],
//     }));
//   };

//   const formatValue = (value, isPercentage = false) => {
//     if (value === null || value === undefined || value === "") return "-";
//     if (isPercentage) return `${value}%`;
//     return typeof value === "number" ? value.toLocaleString() : value;
//   };

//   const months = [
//     "feb",
//     "mar",
//     "apr",
//     "may",
//     "jun",
//     "jul",
//     "aug",
//     "sep",
//     "oct",
//     "nov",
//     "dec",
//     "jan",
//   ];
//   const monthLabels = [
//     "FEB",
//     "MAR",
//     "APR",
//     "MAY",
//     "JUN",
//     "JUL",
//     "AUG",
//     "SEP",
//     "OCT",
//     "NOV",
//     "DEC",
//     "JAN",
//   ];

//   const calculateTotals = (forecast) => {
//     if (!forecast) return { annual: 0, spring: 0, fall: 0 };

//     const values = months.map((month) => forecast[month] || 0);
//     const annual = values.reduce((sum, val) => sum + val, 0);
//     const spring = values.slice(0, 6).reduce((sum, val) => sum + val, 0); // Feb-Jul
//     const fall = values.slice(6).reduce((sum, val) => sum + val, 0); // Aug-Jan

//     return { annual, spring, fall };
//   };

//   // Mock rolling forecast data (you can replace this with API data)
//   const rollingForecastData = {
//     index: [13, 3, 7, 8, 5, 4, 8, 6, 8, 13, 23, 2],
//     fcByIndex: [99, 26, 55, 64, 38, 28, 63, 47, 60, 105, 183, 15],
//     fcByTrend: [23, 23, 76, 51, 36, 17, 16, 19, 14, 61, 93, 4],
//     recommendedFC: [99, 26, 55, 64, 38, 28, 63, 47, 60, 105, 183, 15],
//     plannedFC: [75, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//     plannedShipments: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//     plannedEOH: [477, 477, 477, 477, 477, 477, 477, 477, 477, 477, 477, 477],
//     grossProjection: [0, 131, 150, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//     macysProjReceipts: [16, 46, 46, 42, 48, 49, 0, 0, 0, 0, 0, 0],
//     plannedSellThru: [14, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   };

//   const renderRollingForecastTable = () => {
//     const rows = [
//       { label: "Index", data: rollingForecastData.index, isPercentage: true },
//       { label: "FC by Index", data: rollingForecastData.fcByIndex },
//       { label: "FC by Trend", data: rollingForecastData.fcByTrend },
//       {
//         label: "Recommended FC",
//         data: rollingForecastData.recommendedFC,
//         highlight: true,
//       },
//       { label: "Planned FC", data: rollingForecastData.plannedFC },
//       {
//         label: "Planned Shipments",
//         data: rollingForecastData.plannedShipments,
//       },
//       { label: "Planned EOH (Cal)", data: rollingForecastData.plannedEOH },
//       {
//         label: "Gross Projection (Nav)",
//         data: rollingForecastData.grossProjection,
//       },
//       {
//         label: "Macys Proj Receipts",
//         data: rollingForecastData.macysProjReceipts,
//         redHighlight: true,
//       },
//       {
//         label: "Planned Sell thru %",
//         data: rollingForecastData.plannedSellThru,
//         isPercentage: true,
//       },
//     ];

//     return (
//       <div className="overflow-x-auto">
//         <table className="min-w-full border-collapse border border-gray-300">
//           <thead>
//             <tr className="bg-gray-50">
//               <th className="border border-gray-300 px-3 py-2 text-left text-sm font-medium text-gray-700">
//                 ROLLING 12M FC
//               </th>
//               {monthLabels.map((month) => (
//                 <th
//                   key={month}
//                   className="border border-gray-300 px-3 py-2 text-center text-sm font-medium text-gray-700"
//                 >
//                   {month}
//                 </th>
//               ))}
//               <th className="border border-gray-300 px-3 py-2 text-center text-sm font-medium text-gray-700">
//                 ANNUAL
//               </th>
//               <th className="border border-gray-300 px-3 py-2 text-center text-sm font-medium text-gray-700">
//                 SPRING
//               </th>
//               <th className="border border-gray-300 px-3 py-2 text-center text-sm font-medium text-gray-700">
//                 FALL
//               </th>
//             </tr>
//           </thead>
//           <tbody>
//             {rows.map((row, index) => {
//               const totals = {
//                 annual: row.data.reduce((sum, val) => sum + val, 0),
//                 spring: row.data.slice(0, 6).reduce((sum, val) => sum + val, 0),
//                 fall: row.data.slice(6).reduce((sum, val) => sum + val, 0),
//               };

//               return (
//                 <tr
//                   key={index}
//                   className={row.highlight ? "bg-yellow-50" : "bg-white"}
//                 >
//                   <td className="border border-gray-300 px-3 py-2 text-sm font-medium">
//                     {row.label}
//                   </td>
//                   {row.data.map((value, i) => (
//                     <td
//                       key={i}
//                       className={`border border-gray-300 px-3 py-2 text-center text-sm ${
//                         row.redHighlight && value > 0
//                           ? "bg-red-50 text-red-600"
//                           : ""
//                       }`}
//                     >
//                       {formatValue(value, row.isPercentage)}
//                     </td>
//                   ))}
//                   <td className="border border-gray-300 px-3 py-2 text-center text-sm font-medium">
//                     {formatValue(totals.annual, row.isPercentage)}
//                   </td>
//                   <td className="border border-gray-300 px-3 py-2 text-center text-sm font-medium">
//                     {formatValue(totals.spring, row.isPercentage)}
//                   </td>
//                   <td className="border border-gray-300 px-3 py-2 text-center text-sm font-medium">
//                     {formatValue(totals.fall, row.isPercentage)}
//                   </td>
//                 </tr>
//               );
//             })}
//           </tbody>
//         </table>
//       </div>
//     );
//   };

//   const renderMonthlyForecastTable = (year) => {
//     if (!productData?.monthly_forecast) return null;

//     const yearForecasts = productData.monthly_forecast.filter(
//       (f) => f.year === year
//     );

//     const forecastRows = [
//       { key: "TY_Unit_Sales", label: "Total Sales Units" },
//       { key: "LY_Unit_Sales", label: "Store Sales Units" },
//       { key: "TY_MCOM_Unit_Sales", label: "COM Sales Units" },
//       {
//         key: "MCOM_PTD_TY_Sales",
//         label: "COM % to TTL (Sales)",
//         isPercentage: true,
//       },
//       { key: "TY_OH_Units", label: "TOTAL EOM OH" },
//       { key: "MacysProjectionReciepts", label: "Macys Projection Receipts" },
//     ];

//     return (
//       <div className="overflow-x-auto">
//         <table className="min-w-full border-collapse border border-gray-300">
//           <thead>
//             <tr className="bg-gray-50">
//               <th className="border border-gray-300 px-3 py-2 text-left text-sm font-medium text-gray-700">
//                 TOTAL {year}
//               </th>
//               {monthLabels.map((month) => (
//                 <th
//                   key={month}
//                   className="border border-gray-300 px-3 py-2 text-center text-sm font-medium text-gray-700"
//                 >
//                   {month}
//                 </th>
//               ))}
//               <th className="border border-gray-300 px-3 py-2 text-center text-sm font-medium text-gray-700">
//                 ANNUAL
//               </th>
//               <th className="border border-gray-300 px-3 py-2 text-center text-sm font-medium text-gray-700">
//                 SPRING
//               </th>
//               <th className="border border-gray-300 px-3 py-2 text-center text-sm font-medium text-gray-700">
//                 FALL
//               </th>
//             </tr>
//           </thead>
//           <tbody>
//             {forecastRows.map((row, index) => {
//               const forecast = yearForecasts.find(
//                 (f) => f.variable_name === row.key
//               );

//               if (!forecast) {
//                 return (
//                   <tr
//                     key={row.key}
//                     className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
//                   >
//                     <td className="border border-gray-300 px-3 py-2 text-sm font-medium">
//                       {row.label}
//                     </td>
//                     {monthLabels.map((_, i) => (
//                       <td
//                         key={i}
//                         className="border border-gray-300 px-3 py-2 text-center text-sm"
//                       >
//                         -
//                       </td>
//                     ))}
//                     <td className="border border-gray-300 px-3 py-2 text-center text-sm font-medium">
//                       -
//                     </td>
//                     <td className="border border-gray-300 px-3 py-2 text-center text-sm">
//                       -
//                     </td>
//                     <td className="border border-gray-300 px-3 py-2 text-center text-sm">
//                       -
//                     </td>
//                   </tr>
//                 );
//               }

//               const totals = calculateTotals(forecast);
//               const isPercentageRow = row.key === "MCOM_PTD_TY_Sales";

//               return (
//                 <tr
//                   key={row.key}
//                   className={
//                     isPercentageRow
//                       ? "bg-yellow-50"
//                       : index % 2 === 0
//                       ? "bg-white"
//                       : "bg-gray-50"
//                   }
//                 >
//                   <td className="border border-gray-300 px-3 py-2 text-sm font-medium">
//                     {row.label}
//                   </td>
//                   {months.map((month) => (
//                     <td
//                       key={month}
//                       className="border border-gray-300 px-3 py-2 text-center text-sm"
//                     >
//                       {formatValue(forecast[month], row.isPercentage)}
//                     </td>
//                   ))}
//                   <td className="border border-gray-300 px-3 py-2 text-center text-sm font-medium">
//                     {formatValue(totals.annual, row.isPercentage)}
//                   </td>
//                   <td className="border border-gray-300 px-3 py-2 text-center text-sm">
//                     {formatValue(totals.spring, row.isPercentage)}
//                   </td>
//                   <td className="border border-gray-300 px-3 py-2 text-center text-sm">
//                     {formatValue(totals.fall, row.isPercentage)}
//                   </td>
//                 </tr>
//               );
//             })}
//           </tbody>
//         </table>
//       </div>
//     );
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center py-12">
//         <div className="text-center">
//           <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mx-auto mb-4"></div>
//           <p className="text-gray-600">Loading product details...</p>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="text-center py-8">
//         <p className="text-red-600">{error}</p>
//         <button
//           onClick={onBack}
//           className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
//         >
//           Go Back
//         </button>
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-6">
//       {/* Header */}
//       <div className="flex items-center gap-4 mb-6">
//         <button
//           onClick={onBack}
//           className="flex items-center gap-2 text-indigo-600 hover:text-indigo-800"
//         >
//           <ArrowLeft size={20} />
//           Back to Products
//         </button>
//         <div>
//           <h1 className="text-2xl font-bold text-gray-900">
//             Product Details: {productId}
//           </h1>
//           <p className="text-gray-600">
//             Comprehensive forecast and performance data
//           </p>
//         </div>
//       </div>

//       {/* Product Basic Info */}
//       {productData?.product_details && (
//         <div className="bg-white p-6 rounded-lg border border-gray-200">
//           <h2 className="text-lg font-semibold mb-4">Product Information</h2>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//             <div>
//               <label className="text-sm font-medium text-gray-600">
//                 Product ID
//               </label>
//               <p className="font-semibold">
//                 {productData.product_details.product_id}
//               </p>
//             </div>
//             <div>
//               <label className="text-sm font-medium text-gray-600">
//                 Description
//               </label>
//               <p className="font-semibold">
//                 {productData.product_details.product_description || "-"}
//               </p>
//             </div>
//             <div>
//               <label className="text-sm font-medium text-gray-600">
//                 Department
//               </label>
//               <p className="font-semibold">
//                 {productData.product_details.department_description || "-"}
//               </p>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Rolling 12M Forecast */}
//       <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
//         <div
//           className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex justify-between items-center cursor-pointer"
//           onClick={() => toggleSection("rollingForecast")}
//         >
//           <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
//             <TrendingUp size={20} className="text-indigo-600" />
//             Rolling 12M Forecast
//           </h3>
//           <ChevronDown
//             size={20}
//             className={`text-gray-500 transition-transform ${
//               expandedSections.rollingForecast ? "rotate-180" : ""
//             }`}
//           />
//         </div>
//         {expandedSections.rollingForecast && (
//           <div className="p-6">{renderRollingForecastTable()}</div>
//         )}
//       </div>

//       {/* Monthly Forecast */}
//       <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
//         <div
//           className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex justify-between items-center cursor-pointer"
//           onClick={() => toggleSection("monthlyForecast")}
//         >
//           <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
//             <Calendar size={20} className="text-indigo-600" />
//             Monthly Forecast
//           </h3>
//           <ChevronDown
//             size={20}
//             className={`text-gray-500 transition-transform ${
//               expandedSections.monthlyForecast ? "rotate-180" : ""
//             }`}
//           />
//         </div>
//         {expandedSections.monthlyForecast && (
//           <div className="p-6 space-y-6">
//             {/* 2025 Data */}
//             <div>
//               <h4 className="text-md font-semibold text-gray-700 mb-4">
//                 TOTAL 2025
//               </h4>
//               {renderMonthlyForecastTable(2025)}
//             </div>

//             {/* 2024 Data */}
//             <div>
//               <h4 className="text-md font-semibold text-gray-700 mb-4">
//                 TOTAL 2024
//               </h4>
//               {renderMonthlyForecastTable(2024)}
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Additional Forecast Types */}
//       {productData?.store_forecast && productData.store_forecast.length > 0 && (
//         <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
//           <div
//             className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex justify-between items-center cursor-pointer"
//             onClick={() => toggleSection("storeForecast")}
//           >
//             <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
//               <Package size={20} className="text-blue-600" />
//               Store Forecast Data
//             </h3>
//             <ChevronDown
//               size={20}
//               className={`text-gray-500 transition-transform ${
//                 expandedSections.storeForecast ? "rotate-180" : ""
//               }`}
//             />
//           </div>
//           {expandedSections.storeForecast && (
//             <div className="p-6">
//               <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                 <div>
//                   <label className="text-sm font-medium text-gray-600">
//                     Door Count
//                   </label>
//                   <p className="font-semibold">
//                     {productData.store_forecast[0]?.door_count || "-"}
//                   </p>
//                 </div>
//                 <div>
//                   <label className="text-sm font-medium text-gray-600">
//                     Lead Time
//                   </label>
//                   <p className="font-semibold">
//                     {productData.store_forecast[0]?.lead_time || "-"}
//                   </p>
//                 </div>
//                 <div>
//                   <label className="text-sm font-medium text-gray-600">
//                     Trend
//                   </label>
//                   <p className="font-semibold">
//                     {productData.store_forecast[0]?.trend || "-"}
//                   </p>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default ProductDetailsView;

// Enhanced ProductDetailsView.jsx with dynamic data fetching
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import {
//   ArrowLeft,
//   ChevronDown,
//   Calendar,
//   TrendingUp,
//   Package,
//   Gem,
//   Clock,
//   BarChart3,
//   Plus,
//   Minus,
//   DollarSign,
//   Target,
//   Truck,
//   AlertCircle,
//   CheckCircle,
//   Info,
//   Star,
//   Building2,
//   Tag,
//   Box,
//   Activity,
// } from "lucide-react";

// const ProductDetailsView = ({ productId, onBack }) => {
//   const [productData, setProductData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [expandedSections, setExpandedSections] = useState({
//     rollingForecast: true,
//     monthlyForecast: true,
//     storeForecast: false,
//     comForecast: false,
//     omniForecast: false,
//   });

//   useEffect(() => {
//     if (productId) {
//       fetchProductDetails();
//     }
//   }, [productId]);

//   const fetchProductDetails = async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       const response = await axios.get(
//         `${
//           import.meta.env.VITE_API_BASE_URL
//         }/forecast/api/product/${productId}/`
//       );
//       setProductData(response.data);
//     } catch (error) {
//       console.error("Error fetching product details:", error);
//       setError("Failed to load product details");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const toggleSection = (section) => {
//     setExpandedSections((prev) => ({
//       ...prev,
//       [section]: !prev[section],
//     }));
//   };

//   const formatValue = (value, isPercentage = false, isCurrency = false) => {
//     if (value === null || value === undefined || value === "") return "-";
//     if (isPercentage) return `${value}%`;
//     if (isCurrency)
//       return `$${typeof value === "number" ? value.toLocaleString() : value}`;
//     return typeof value === "number" ? value.toLocaleString() : value;
//   };

//   // Get product card data dynamically from different sources
//   const getProductCardData = () => {
//     if (!productData) return null;

//     const { product_details, store_forecast, com_forecast, omni_forecast } =
//       productData;

//     // Try to get data from the most relevant forecast type first
//     const forecastData =
//       store_forecast?.[0] || com_forecast?.[0] || omni_forecast?.[0] || {};

//     return {
//       // Basic product info
//       category:
//         product_details?.department_description ||
//         product_details?.subclass_decription ||
//         forecastData?.category ||
//         "Unknown",

//       productId: product_details?.product_id || productId,

//       // Forecast and timing data
//       forecastMonth:
//         forecastData?.forecast_month ||
//         forecastData?.next_forecast_month ||
//         "N/A",

//       leadTime: forecastData?.lead_time || product_details?.lead_time || 0,

//       // Status and flags
//       redBox: forecastData?.red_box_item || false,

//       // Store/location data
//       doorCount:
//         forecastData?.door_count || product_details?.current_door_count || 0,

//       // Product attributes
//       birthstone:
//         forecastData?.birthstone || product_details?.birthstone || null,

//       // Performance metrics
//       trend:
//         forecastData?.trend ||
//         forecastData?.com_trend ||
//         forecastData?.store_trend ||
//         0,

//       // Quantity data
//       requiredQty:
//         forecastData?.forecast_month_required_quantity ||
//         forecastData?.next_forecast_month_required_quantity ||
//         0,

//       addedQty:
//         forecastData?.total_added_qty || forecastData?.added_qty_macys_soq || 0,

//       // Additional useful data
//       vendor: forecastData?.vendor || product_details?.vendor_name || "N/A",
//       minOrder: forecastData?.Min_order || product_details?.min_order || 0,
//       plannedOH:
//         forecastData?.forecast_month_planned_oh ||
//         forecastData?.next_forecast_month_planned_oh ||
//         0,
//       vdfStatus: forecastData?.vdf_status || null,
//       macysSOQ: forecastData?.Macys_SOQ || 0,
//     };
//   };

//   const cardData = getProductCardData();

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
//         <div className="max-w-7xl mx-auto p-6">
//           <div className="flex justify-center items-center py-20">
//             <div className="text-center">
//               <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mx-auto mb-6"></div>
//               <h3 className="text-lg font-medium text-gray-900 mb-2">
//                 Loading Product Details
//               </h3>
//               <p className="text-gray-600">
//                 Please wait while we fetch the product information...
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
//         <div className="max-w-7xl mx-auto p-6">
//           <div className="text-center py-20">
//             <AlertCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
//             <h3 className="text-lg font-medium text-gray-900 mb-2">
//               Error Loading Product
//             </h3>
//             <p className="text-red-600 mb-6">{error}</p>
//             <div className="space-x-4">
//               <button
//                 onClick={fetchProductDetails}
//                 className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
//               >
//                 Try Again
//               </button>
//               <button
//                 onClick={onBack}
//                 className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
//               >
//                 Go Back
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
//       <div className="max-w-7xl mx-auto p-6 space-y-8">
//         {/* Header Section */}
//         <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
//           <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 px-8 py-6">
//             <div className="flex items-center gap-4">
//               <button
//                 onClick={onBack}
//                 className="flex items-center gap-2 text-white opacity-90 hover:opacity-100 transition-opacity"
//               >
//                 <ArrowLeft size={20} />
//                 <span className="font-medium">Back to Products</span>
//               </button>
//             </div>
//             <div className="mt-4">
//               <h1 className="text-3xl font-bold text-white mb-2">
//                 Product Details: {cardData?.productId}
//               </h1>
//               <p className="text-indigo-100">
//                 Comprehensive forecast and performance analytics
//               </p>
//             </div>
//           </div>
//         </div>

//         {/* Key Metrics Cards */}
//         {cardData && (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
//             {/* Category Card */}
//             <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
//               <div className="flex items-center gap-3 mb-4">
//                 <div className="p-2 bg-blue-100 rounded-lg">
//                   <Tag className="text-blue-600" size={20} />
//                 </div>
//                 <div>
//                   <p className="text-sm font-medium text-gray-600">Category</p>
//                   <p className="text-lg font-bold text-gray-900">
//                     {cardData.category}
//                   </p>
//                 </div>
//               </div>
//             </div>

//             {/* Forecast Month Card */}
//             <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
//               <div className="flex items-center gap-3 mb-4">
//                 <div className="p-2 bg-green-100 rounded-lg">
//                   <Calendar className="text-green-600" size={20} />
//                 </div>
//                 <div>
//                   <p className="text-sm font-medium text-gray-600">
//                     Forecast Month
//                   </p>
//                   <p className="text-lg font-bold text-gray-900">
//                     {cardData.forecastMonth}
//                   </p>
//                 </div>
//               </div>
//             </div>

//             {/* Lead Time Card */}
//             <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
//               <div className="flex items-center gap-3 mb-4">
//                 <div className="p-2 bg-orange-100 rounded-lg">
//                   <Clock className="text-orange-600" size={20} />
//                 </div>
//                 <div>
//                   <p className="text-sm font-medium text-gray-600">Lead Time</p>
//                   <p className="text-lg font-bold text-gray-900">
//                     {cardData.leadTime} days
//                   </p>
//                 </div>
//               </div>
//             </div>

//             {/* Red Box Status Card */}
//             <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
//               <div className="flex items-center gap-3 mb-4">
//                 <div
//                   className={`p-2 rounded-lg ${
//                     cardData.redBox ? "bg-red-100" : "bg-gray-100"
//                   }`}
//                 >
//                   <Box
//                     className={
//                       cardData.redBox ? "text-red-600" : "text-gray-600"
//                     }
//                     size={20}
//                   />
//                 </div>
//                 <div>
//                   <p className="text-sm font-medium text-gray-600">Red Box</p>
//                   <p
//                     className={`text-lg font-bold ${
//                       cardData.redBox ? "text-red-600" : "text-gray-600"
//                     }`}
//                   >
//                     {cardData.redBox ? "Yes" : "No"}
//                   </p>
//                 </div>
//               </div>
//             </div>

//             {/* Door Count Card */}
//             <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
//               <div className="flex items-center gap-3 mb-4">
//                 <div className="p-2 bg-purple-100 rounded-lg">
//                   <Building2 className="text-purple-600" size={20} />
//                 </div>
//                 <div>
//                   <p className="text-sm font-medium text-gray-600">
//                     Door Count
//                   </p>
//                   <p className="text-lg font-bold text-gray-900">
//                     {formatValue(cardData.doorCount)}
//                   </p>
//                 </div>
//               </div>
//             </div>

//             {/* Birthstone Card */}
//             {cardData.birthstone && (
//               <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
//                 <div className="flex items-center gap-3 mb-4">
//                   <div className="p-2 bg-pink-100 rounded-lg">
//                     <Gem className="text-pink-600" size={20} />
//                   </div>
//                   <div>
//                     <p className="text-sm font-medium text-gray-600">
//                       Birthstone
//                     </p>
//                     <p className="text-lg font-bold text-gray-900">
//                       {cardData.birthstone}
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             )}

//             {/* Trend Card */}
//             <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
//               <div className="flex items-center gap-3 mb-4">
//                 <div
//                   className={`p-2 rounded-lg ${
//                     cardData.trend >= 0 ? "bg-green-100" : "bg-red-100"
//                   }`}
//                 >
//                   <TrendingUp
//                     className={
//                       cardData.trend >= 0 ? "text-green-600" : "text-red-600"
//                     }
//                     size={20}
//                   />
//                 </div>
//                 <div>
//                   <p className="text-sm font-medium text-gray-600">Trend</p>
//                   <p
//                     className={`text-lg font-bold ${
//                       cardData.trend >= 0 ? "text-green-600" : "text-red-600"
//                     }`}
//                   >
//                     {cardData.trend >= 0 ? "+" : ""}
//                     {formatValue(cardData.trend, false, false)}
//                   </p>
//                 </div>
//               </div>
//             </div>

//             {/* Required Qty Card */}
//             <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
//               <div className="flex items-center gap-3 mb-4">
//                 <div className="p-2 bg-indigo-100 rounded-lg">
//                   <Target className="text-indigo-600" size={20} />
//                 </div>
//                 <div>
//                   <p className="text-sm font-medium text-gray-600">
//                     Required Qty
//                   </p>
//                   <p className="text-lg font-bold text-gray-900">
//                     {formatValue(cardData.requiredQty)}
//                   </p>
//                 </div>
//               </div>
//             </div>

//             {/* Added Qty Card */}
//             <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
//               <div className="flex items-center gap-3 mb-4">
//                 <div className="p-2 bg-cyan-100 rounded-lg">
//                   <Plus className="text-cyan-600" size={20} />
//                 </div>
//                 <div>
//                   <p className="text-sm font-medium text-gray-600">Added Qty</p>
//                   <p className="text-lg font-bold text-gray-900">
//                     {formatValue(cardData.addedQty)}
//                   </p>
//                 </div>
//               </div>
//             </div>

//             {/* Vendor Card */}
//             {cardData.vendor && cardData.vendor !== "N/A" && (
//               <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
//                 <div className="flex items-center gap-3 mb-4">
//                   <div className="p-2 bg-yellow-100 rounded-lg">
//                     <Truck className="text-yellow-600" size={20} />
//                   </div>
//                   <div>
//                     <p className="text-sm font-medium text-gray-600">Vendor</p>
//                     <p
//                       className="text-lg font-bold text-gray-900 truncate"
//                       title={cardData.vendor}
//                     >
//                       {cardData.vendor}
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             )}
//           </div>
//         )}

//         {/* Additional Info Cards Row */}
//         {cardData && (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//             {/* Min Order Card */}
//             {cardData.minOrder > 0 && (
//               <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
//                 <div className="flex items-center justify-between mb-2">
//                   <span className="text-sm font-medium text-gray-600">
//                     Min Order
//                   </span>
//                   <Package className="text-gray-400" size={16} />
//                 </div>
//                 <p className="text-2xl font-bold text-gray-900">
//                   {formatValue(cardData.minOrder)}
//                 </p>
//               </div>
//             )}

//             {/* Planned OH Card */}
//             {cardData.plannedOH > 0 && (
//               <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
//                 <div className="flex items-center justify-between mb-2">
//                   <span className="text-sm font-medium text-gray-600">
//                     Planned OH
//                   </span>
//                   <BarChart3 className="text-gray-400" size={16} />
//                 </div>
//                 <p className="text-2xl font-bold text-gray-900">
//                   {formatValue(cardData.plannedOH)}
//                 </p>
//               </div>
//             )}

//             {/* VDF Status Card */}
//             {cardData.vdfStatus !== null && (
//               <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
//                 <div className="flex items-center justify-between mb-2">
//                   <span className="text-sm font-medium text-gray-600">
//                     VDF Status
//                   </span>
//                   {cardData.vdfStatus ? (
//                     <CheckCircle className="text-green-500" size={16} />
//                   ) : (
//                     <AlertCircle className="text-red-500" size={16} />
//                   )}
//                 </div>
//                 <p
//                   className={`text-2xl font-bold ${
//                     cardData.vdfStatus ? "text-green-600" : "text-red-600"
//                   }`}
//                 >
//                   {cardData.vdfStatus ? "Active" : "Inactive"}
//                 </p>
//               </div>
//             )}

//             {/* Macy's SOQ Card */}
//             {cardData.macysSOQ > 0 && (
//               <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
//                 <div className="flex items-center justify-between mb-2">
//                   <span className="text-sm font-medium text-gray-600">
//                     Macy's SOQ
//                   </span>
//                   <Star className="text-gray-400" size={16} />
//                 </div>
//                 <p className="text-2xl font-bold text-gray-900">
//                   {formatValue(cardData.macysSOQ)}
//                 </p>
//               </div>
//             )}
//           </div>
//         )}

//         {/* Product Basic Info - Enhanced */}
//         {productData?.product_details && (
//           <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
//             <div className="bg-gray-50 px-8 py-4 border-b border-gray-200">
//               <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
//                 <Info className="text-indigo-600" size={24} />
//                 Product Information
//               </h2>
//             </div>
//             <div className="p-8">
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//                 <div className="space-y-2">
//                   <label className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
//                     Product ID
//                   </label>
//                   <p className="text-lg font-bold text-gray-900 bg-gray-50 px-4 py-2 rounded-lg">
//                     {productData.product_details.product_id}
//                   </p>
//                 </div>
//                 <div className="space-y-2">
//                   <label className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
//                     Description
//                   </label>
//                   <p className="text-lg font-bold text-gray-900 bg-gray-50 px-4 py-2 rounded-lg">
//                     {productData.product_details.product_description || "-"}
//                   </p>
//                 </div>
//                 <div className="space-y-2">
//                   <label className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
//                     Department
//                   </label>
//                   <p className="text-lg font-bold text-gray-900 bg-gray-50 px-4 py-2 rounded-lg">
//                     {productData.product_details.department_description || "-"}
//                   </p>
//                 </div>
//                 {productData.product_details.subclass_decription && (
//                   <div className="space-y-2">
//                     <label className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
//                       Subclass
//                     </label>
//                     <p className="text-lg font-bold text-gray-900 bg-gray-50 px-4 py-2 rounded-lg">
//                       {productData.product_details.subclass_decription}
//                     </p>
//                   </div>
//                 )}
//                 {productData.product_details.vendor_name && (
//                   <div className="space-y-2">
//                     <label className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
//                       Vendor
//                     </label>
//                     <p className="text-lg font-bold text-gray-900 bg-gray-50 px-4 py-2 rounded-lg">
//                       {productData.product_details.vendor_name}
//                     </p>
//                   </div>
//                 )}
//                 {productData.product_details.current_door_count && (
//                   <div className="space-y-2">
//                     <label className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
//                       Current Door Count
//                     </label>
//                     <p className="text-lg font-bold text-gray-900 bg-gray-50 px-4 py-2 rounded-lg">
//                       {formatValue(
//                         productData.product_details.current_door_count
//                       )}
//                     </p>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Rolling 12M Forecast - Enhanced */}
//         <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
//           <div
//             className="bg-gray-50 px-8 py-4 border-b border-gray-200 flex justify-between items-center cursor-pointer hover:bg-gray-100 transition-colors"
//             onClick={() => toggleSection("rollingForecast")}
//           >
//             <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
//               <TrendingUp className="text-indigo-600" size={24} />
//               Rolling 12M Forecast
//             </h3>
//             <ChevronDown
//               size={24}
//               className={`text-gray-500 transition-transform duration-200 ${
//                 expandedSections.rollingForecast ? "rotate-180" : ""
//               }`}
//             />
//           </div>
//           {expandedSections.rollingForecast && (
//             <div className="p-8">{renderRollingForecastTable()}</div>
//           )}
//         </div>

//         {/* Monthly Forecast - Enhanced */}
//         <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
//           <div
//             className="bg-gray-50 px-8 py-4 border-b border-gray-200 flex justify-between items-center cursor-pointer hover:bg-gray-100 transition-colors"
//             onClick={() => toggleSection("monthlyForecast")}
//           >
//             <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
//               <Calendar className="text-indigo-600" size={24} />
//               Monthly Forecast
//             </h3>
//             <ChevronDown
//               size={24}
//               className={`text-gray-500 transition-transform duration-200 ${
//                 expandedSections.monthlyForecast ? "rotate-180" : ""
//               }`}
//             />
//           </div>
//           {expandedSections.monthlyForecast && (
//             <div className="p-8 space-y-8">
//               {/* 2025 Data */}
//               <div>
//                 <h4 className="text-lg font-bold text-gray-700 mb-6 flex items-center gap-2">
//                   <Activity className="text-blue-600" size={20} />
//                   TOTAL 2025
//                 </h4>
//                 {renderMonthlyForecastTable(2025)}
//               </div>

//               {/* 2024 Data */}
//               <div>
//                 <h4 className="text-lg font-bold text-gray-700 mb-6 flex items-center gap-2">
//                   <Activity className="text-gray-600" size={20} />
//                   TOTAL 2024
//                 </h4>
//                 {renderMonthlyForecastTable(2024)}
//               </div>
//             </div>
//           )}
//         </div>

//         {/* Additional Forecast Types - Enhanced */}
//         {productData?.store_forecast &&
//           productData.store_forecast.length > 0 && (
//             <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
//               <div
//                 className="bg-gray-50 px-8 py-4 border-b border-gray-200 flex justify-between items-center cursor-pointer hover:bg-gray-100 transition-colors"
//                 onClick={() => toggleSection("storeForecast")}
//               >
//                 <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
//                   <Package className="text-blue-600" size={24} />
//                   Store Forecast Data
//                 </h3>
//                 <ChevronDown
//                   size={24}
//                   className={`text-gray-500 transition-transform duration-200 ${
//                     expandedSections.storeForecast ? "rotate-180" : ""
//                   }`}
//                 />
//               </div>
//               {expandedSections.storeForecast && (
//                 <div className="p-8">
//                   <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//                     <div className="bg-blue-50 rounded-xl p-6">
//                       <label className="text-sm font-semibold text-blue-600 uppercase tracking-wide">
//                         Door Count
//                       </label>
//                       <p className="text-2xl font-bold text-blue-900 mt-2">
//                         {formatValue(productData.store_forecast[0]?.door_count)}
//                       </p>
//                     </div>
//                     <div className="bg-green-50 rounded-xl p-6">
//                       <label className="text-sm font-semibold text-green-600 uppercase tracking-wide">
//                         Lead Time
//                       </label>
//                       <p className="text-2xl font-bold text-green-900 mt-2">
//                         {formatValue(productData.store_forecast[0]?.lead_time)}{" "}
//                         days
//                       </p>
//                     </div>
//                     <div className="bg-purple-50 rounded-xl p-6">
//                       <label className="text-sm font-semibold text-purple-600 uppercase tracking-wide">
//                         Trend
//                       </label>
//                       <p className="text-2xl font-bold text-purple-900 mt-2">
//                         {formatValue(productData.store_forecast[0]?.trend)}
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               )}
//             </div>
//           )}
//       </div>
//     </div>
//   );

//   // Enhanced Rolling Forecast Table with better styling
//   function renderRollingForecastTable() {
//     // Mock rolling forecast data - replace with actual API data
//     const rollingForecastData = {
//       index: [13, 3, 7, 8, 5, 4, 8, 6, 8, 13, 23, 2],
//       fcByIndex: [99, 26, 55, 64, 38, 28, 63, 47, 60, 105, 183, 15],
//       fcByTrend: [23, 23, 76, 51, 36, 17, 16, 19, 14, 61, 93, 4],
//       recommendedFC: [99, 26, 55, 64, 38, 28, 63, 47, 60, 105, 183, 15],
//       plannedFC: [75, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//       plannedShipments: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//       plannedEOH: [477, 477, 477, 477, 477, 477, 477, 477, 477, 477, 477, 477],
//       grossProjection: [0, 131, 150, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//       macysProjReceipts: [16, 46, 46, 42, 48, 49, 0, 0, 0, 0, 0, 0],
//       plannedSellThru: [14, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//     };

//     const months = [
//       "feb",
//       "mar",
//       "apr",
//       "may",
//       "jun",
//       "jul",
//       "aug",
//       "sep",
//       "oct",
//       "nov",
//       "dec",
//       "jan",
//     ];
//     const monthLabels = [
//       "FEB",
//       "MAR",
//       "APR",
//       "MAY",
//       "JUN",
//       "JUL",
//       "AUG",
//       "SEP",
//       "OCT",
//       "NOV",
//       "DEC",
//       "JAN",
//     ];

//     const rows = [
//       { label: "Index", data: rollingForecastData.index, isPercentage: true },
//       { label: "FC by Index", data: rollingForecastData.fcByIndex },
//       { label: "FC by Trend", data: rollingForecastData.fcByTrend },
//       {
//         label: "Recommended FC",
//         data: rollingForecastData.recommendedFC,
//         highlight: true,
//       },
//       { label: "Planned FC", data: rollingForecastData.plannedFC },
//       {
//         label: "Planned Shipments",
//         data: rollingForecastData.plannedShipments,
//       },
//       { label: "Planned EOH (Cal)", data: rollingForecastData.plannedEOH },
//       {
//         label: "Gross Projection (Nav)",
//         data: rollingForecastData.grossProjection,
//       },
//       {
//         label: "Macys Proj Receipts",
//         data: rollingForecastData.macysProjReceipts,
//         redHighlight: true,
//       },
//       {
//         label: "Planned Sell thru %",
//         data: rollingForecastData.plannedSellThru,
//         isPercentage: true,
//       },
//     ];

//     return (
//       <div className="overflow-x-auto rounded-xl border border-gray-200">
//         <table className="min-w-full border-collapse">
//           <thead>
//             <tr className="bg-gradient-to-r from-gray-100 to-gray-50">
//               <th className="border border-gray-300 px-4 py-3 text-left text-sm font-bold text-gray-700">
//                 ROLLING 12M FC
//               </th>
//               {monthLabels.map((month) => (
//                 <th
//                   key={month}
//                   className="border border-gray-300 px-4 py-3 text-center text-sm font-bold text-gray-700"
//                 >
//                   {month}
//                 </th>
//               ))}
//               <th className="border border-gray-300 px-4 py-3 text-center text-sm font-bold text-gray-700">
//                 ANNUAL
//               </th>
//               <th className="border border-gray-300 px-4 py-3 text-center text-sm font-bold text-gray-700">
//                 SPRING
//               </th>
//               <th className="border border-gray-300 px-4 py-3 text-center text-sm font-bold text-gray-700">
//                 FALL
//               </th>
//             </tr>
//           </thead>
//           <tbody>
//             {rows.map((row, index) => {
//               const totals = {
//                 annual: row.data.reduce((sum, val) => sum + val, 0),
//                 spring: row.data.slice(0, 6).reduce((sum, val) => sum + val, 0),
//                 fall: row.data.slice(6).reduce((sum, val) => sum + val, 0),
//               };

//               return (
//                 <tr
//                   key={index}
//                   className={`${
//                     row.highlight
//                       ? "bg-yellow-50 border-yellow-200"
//                       : index % 2 === 0
//                       ? "bg-white"
//                       : "bg-gray-50"
//                   } hover:bg-indigo-50 transition-colors`}
//                 >
//                   <td className="border border-gray-300 px-4 py-3 text-sm font-bold text-gray-800">
//                     {row.label}
//                   </td>
//                   {row.data.map((value, i) => (
//                     <td
//                       key={i}
//                       className={`border border-gray-300 px-4 py-3 text-center text-sm font-medium ${
//                         row.redHighlight && value > 0
//                           ? "bg-red-100 text-red-700 border-red-200"
//                           : "text-gray-800"
//                       }`}
//                     >
//                       {formatValue(value, row.isPercentage)}
//                     </td>
//                   ))}
//                   <td className="border border-gray-300 px-4 py-3 text-center text-sm font-bold text-gray-900 bg-blue-50">
//                     {formatValue(totals.annual, row.isPercentage)}
//                   </td>
//                   <td className="border border-gray-300 px-4 py-3 text-center text-sm font-bold text-gray-900 bg-green-50">
//                     {formatValue(totals.spring, row.isPercentage)}
//                   </td>
//                   <td className="border border-gray-300 px-4 py-3 text-center text-sm font-bold text-gray-900 bg-orange-50">
//                     {formatValue(totals.fall, row.isPercentage)}
//                   </td>
//                 </tr>
//               );
//             })}
//           </tbody>
//         </table>
//       </div>
//     );
//   }

//   // Enhanced Monthly Forecast Table with better styling
//   function renderMonthlyForecastTable(year) {
//     if (!productData?.monthly_forecast) {
//       return (
//         <div className="text-center py-8 bg-gray-50 rounded-xl">
//           <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
//           <p className="text-gray-600">
//             No monthly forecast data available for {year}
//           </p>
//         </div>
//       );
//     }

//     const yearForecasts = productData.monthly_forecast.filter(
//       (f) => f.year === year
//     );

//     if (yearForecasts.length === 0) {
//       return (
//         <div className="text-center py-8 bg-gray-50 rounded-xl">
//           <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
//           <p className="text-gray-600">No forecast data available for {year}</p>
//         </div>
//       );
//     }

//     const forecastRows = [
//       { key: "TY_Unit_Sales", label: "Total Sales Units", color: "blue" },
//       { key: "LY_Unit_Sales", label: "Store Sales Units", color: "green" },
//       { key: "TY_MCOM_Unit_Sales", label: "COM Sales Units", color: "purple" },
//       {
//         key: "MCOM_PTD_TY_Sales",
//         label: "COM % to TTL (Sales)",
//         isPercentage: true,
//         color: "yellow",
//       },
//       { key: "TY_OH_Units", label: "TOTAL EOM OH", color: "indigo" },
//       {
//         key: "MacysProjectionReciepts",
//         label: "Macys Projection Receipts",
//         color: "red",
//       },
//     ];

//     const months = [
//       "jan",
//       "feb",
//       "mar",
//       "apr",
//       "may",
//       "jun",
//       "jul",
//       "aug",
//       "sep",
//       "oct",
//       "nov",
//       "dec",
//     ];
//     const monthLabels = [
//       "JAN",
//       "FEB",
//       "MAR",
//       "APR",
//       "MAY",
//       "JUN",
//       "JUL",
//       "AUG",
//       "SEP",
//       "OCT",
//       "NOV",
//       "DEC",
//     ];

//     const calculateTotals = (forecast) => {
//       if (!forecast) return { annual: 0, spring: 0, fall: 0 };

//       const values = months.map((month) => forecast[month] || 0);
//       const annual = values.reduce((sum, val) => sum + val, 0);
//       const spring = values.slice(1, 7).reduce((sum, val) => sum + val, 0); // Feb-Jul
//       const fall = [...values.slice(7), values[0]].reduce(
//         (sum, val) => sum + val,
//         0
//       ); // Aug-Jan

//       return { annual, spring, fall };
//     };

//     return (
//       <div className="overflow-x-auto rounded-xl border border-gray-200">
//         <table className="min-w-full border-collapse">
//           <thead>
//             <tr className="bg-gradient-to-r from-gray-100 to-gray-50">
//               <th className="border border-gray-300 px-4 py-3 text-left text-sm font-bold text-gray-700">
//                 TOTAL {year}
//               </th>
//               {monthLabels.map((month) => (
//                 <th
//                   key={month}
//                   className="border border-gray-300 px-4 py-3 text-center text-sm font-bold text-gray-700"
//                 >
//                   {month}
//                 </th>
//               ))}
//               <th className="border border-gray-300 px-4 py-3 text-center text-sm font-bold text-gray-700">
//                 ANNUAL
//               </th>
//               <th className="border border-gray-300 px-4 py-3 text-center text-sm font-bold text-gray-700">
//                 SPRING
//               </th>
//               <th className="border border-gray-300 px-4 py-3 text-center text-sm font-bold text-gray-700">
//                 FALL
//               </th>
//             </tr>
//           </thead>
//           <tbody>
//             {forecastRows.map((row, index) => {
//               const forecast = yearForecasts.find(
//                 (f) => f.variable_name === row.key
//               );

//               if (!forecast) {
//                 return (
//                   <tr
//                     key={row.key}
//                     className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
//                   >
//                     <td className="border border-gray-300 px-4 py-3 text-sm font-bold text-gray-800">
//                       {row.label}
//                     </td>
//                     {monthLabels.map((_, i) => (
//                       <td
//                         key={i}
//                         className="border border-gray-300 px-4 py-3 text-center text-sm text-gray-400"
//                       >
//                         -
//                       </td>
//                     ))}
//                     <td className="border border-gray-300 px-4 py-3 text-center text-sm font-bold text-gray-400">
//                       -
//                     </td>
//                     <td className="border border-gray-300 px-4 py-3 text-center text-sm text-gray-400">
//                       -
//                     </td>
//                     <td className="border border-gray-300 px-4 py-3 text-center text-sm text-gray-400">
//                       -
//                     </td>
//                   </tr>
//                 );
//               }

//               const totals = calculateTotals(forecast);
//               const isPercentageRow = row.key === "MCOM_PTD_TY_Sales";

//               return (
//                 <tr
//                   key={row.key}
//                   className={`${
//                     isPercentageRow
//                       ? "bg-yellow-50 border-yellow-200"
//                       : index % 2 === 0
//                       ? "bg-white"
//                       : "bg-gray-50"
//                   } hover:bg-indigo-50 transition-colors`}
//                 >
//                   <td className="border border-gray-300 px-4 py-3 text-sm font-bold text-gray-800">
//                     {row.label}
//                   </td>
//                   {months.map((month) => (
//                     <td
//                       key={month}
//                       className="border border-gray-300 px-4 py-3 text-center text-sm font-medium text-gray-800"
//                     >
//                       {formatValue(forecast[month], row.isPercentage)}
//                     </td>
//                   ))}
//                   <td className="border border-gray-300 px-4 py-3 text-center text-sm font-bold text-gray-900 bg-blue-50">
//                     {formatValue(totals.annual, row.isPercentage)}
//                   </td>
//                   <td className="border border-gray-300 px-4 py-3 text-center text-sm font-bold text-gray-900 bg-green-50">
//                     {formatValue(totals.spring, row.isPercentage)}
//                   </td>
//                   <td className="border border-gray-300 px-4 py-3 text-center text-sm font-bold text-gray-900 bg-orange-50">
//                     {formatValue(totals.fall, row.isPercentage)}
//                   </td>
//                 </tr>
//               );
//             })}
//           </tbody>
//         </table>
//       </div>
//     );
//   }
// };

// export default ProductDetailsView;

// Complete ProductDetailsView.jsx with enhanced monthly forecast tables
import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  ArrowLeft,
  ChevronDown,
  Calendar,
  TrendingUp,
  Package,
  Gem,
  Clock,
  BarChart3,
  Plus,
  DollarSign,
  Target,
  Truck,
  AlertCircle,
  CheckCircle,
  Info,
  Star,
  Building2,
  Tag,
  Box,
  Activity,
} from "lucide-react";

const ProductDetailsView = ({ productId, onBack }) => {
  const [productData, setProductData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedSections, setExpandedSections] = useState({
    rollingForecast: true,
    monthlyForecast: true,
    storeForecast: false,
    comForecast: false,
    omniForecast: false,
  });

  useEffect(() => {
    if (productId) {
      fetchProductDetails();
    }
  }, [productId]);

  const fetchProductDetails = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `${
          import.meta.env.VITE_API_BASE_URL
        }/forecast/api/product/${productId}/`
      );
      setProductData(response.data);
    } catch (error) {
      console.error("Error fetching product details:", error);
      setError("Failed to load product details");
    } finally {
      setLoading(false);
    }
  };

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const formatValue = (value, isPercentage = false, isCurrency = false) => {
    if (value === null || value === undefined || value === "") return "-";
    if (isPercentage) return `${value}%`;
    if (isCurrency)
      return `$${typeof value === "number" ? value.toLocaleString() : value}`;
    return typeof value === "number" ? value.toLocaleString() : value;
  };

  // Get product card data dynamically from different sources
  const getProductCardData = () => {
    if (!productData) return null;

    const { product_details, store_forecast, com_forecast, omni_forecast } =
      productData;

    // Try to get data from the most relevant forecast type first
    const forecastData =
      store_forecast?.[0] || com_forecast?.[0] || omni_forecast?.[0] || {};

    return {
      // Basic product info
      category:
        product_details?.department_description ||
        product_details?.subclass_decription ||
        forecastData?.category ||
        "Unknown",

      productId: product_details?.product_id || productId,

      // Forecast and timing data
      forecastMonth:
        forecastData?.forecast_month ||
        forecastData?.next_forecast_month ||
        "N/A",

      leadTime: forecastData?.lead_time || product_details?.lead_time || 0,

      // Status and flags
      redBox: forecastData?.red_box_item || false,

      // Store/location data
      doorCount:
        forecastData?.door_count || product_details?.current_door_count || 0,

      // Product attributes
      birthstone:
        forecastData?.birthstone || product_details?.birthstone || null,

      // Performance metrics
      trend:
        forecastData?.trend ||
        forecastData?.com_trend ||
        forecastData?.store_trend ||
        0,

      // Quantity data
      requiredQty:
        forecastData?.forecast_month_required_quantity ||
        forecastData?.next_forecast_month_required_quantity ||
        0,

      addedQty:
        forecastData?.total_added_qty || forecastData?.added_qty_macys_soq || 0,

      // Additional useful data
      vendor: forecastData?.vendor || product_details?.vendor_name || "N/A",
      minOrder: forecastData?.Min_order || product_details?.min_order || 0,
      plannedOH:
        forecastData?.forecast_month_planned_oh ||
        forecastData?.next_forecast_month_planned_oh ||
        0,
      vdfStatus: forecastData?.vdf_status || null,
      macysSOQ: forecastData?.Macys_SOQ || 0,
    };
  };

  // Enhanced Rolling Forecast Table with better styling
  function renderRollingForecastTable() {
    // Mock rolling forecast data - replace with actual API data
    const rollingForecastData = {
      index: [13, 3, 7, 8, 5, 4, 8, 6, 8, 13, 23, 2],
      fcByIndex: [99, 26, 55, 64, 38, 28, 63, 47, 60, 105, 183, 15],
      fcByTrend: [23, 23, 76, 51, 36, 17, 16, 19, 14, 61, 93, 4],
      recommendedFC: [99, 26, 55, 64, 38, 28, 63, 47, 60, 105, 183, 15],
      plannedFC: [75, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      plannedShipments: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      plannedEOH: [477, 477, 477, 477, 477, 477, 477, 477, 477, 477, 477, 477],
      grossProjection: [0, 131, 150, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      macysProjReceipts: [16, 46, 46, 42, 48, 49, 0, 0, 0, 0, 0, 0],
      plannedSellThru: [14, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    };

    const months = [
      "feb",
      "mar",
      "apr",
      "may",
      "jun",
      "jul",
      "aug",
      "sep",
      "oct",
      "nov",
      "dec",
      "jan",
    ];
    const monthLabels = [
      "FEB",
      "MAR",
      "APR",
      "MAY",
      "JUN",
      "JUL",
      "AUG",
      "SEP",
      "OCT",
      "NOV",
      "DEC",
      "JAN",
    ];

    const rows = [
      { label: "Index", data: rollingForecastData.index, isPercentage: true },
      { label: "FC by Index", data: rollingForecastData.fcByIndex },
      { label: "FC by Trend", data: rollingForecastData.fcByTrend },
      {
        label: "Recommended FC",
        data: rollingForecastData.recommendedFC,
        highlight: true,
      },
      { label: "Planned FC", data: rollingForecastData.plannedFC },
      {
        label: "Planned Shipments",
        data: rollingForecastData.plannedShipments,
      },
      { label: "Planned EOH (Cal)", data: rollingForecastData.plannedEOH },
      {
        label: "Gross Projection (Nav)",
        data: rollingForecastData.grossProjection,
      },
      {
        label: "Macys Proj Receipts",
        data: rollingForecastData.macysProjReceipts,
        redHighlight: true,
      },
      {
        label: "Planned Sell thru %",
        data: rollingForecastData.plannedSellThru,
        isPercentage: true,
      },
    ];

    return (
      <div className="overflow-x-auto rounded-xl border border-gray-200">
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="bg-gradient-to-r from-gray-100 to-gray-50">
              <th className="border border-gray-300 px-4 py-3 text-left text-sm font-bold text-gray-700">
                ROLLING 12M FC
              </th>
              {monthLabels.map((month) => (
                <th
                  key={month}
                  className="border border-gray-300 px-4 py-3 text-center text-sm font-bold text-gray-700"
                >
                  {month}
                </th>
              ))}
              <th className="border border-gray-300 px-4 py-3 text-center text-sm font-bold text-gray-700">
                ANNUAL
              </th>
              <th className="border border-gray-300 px-4 py-3 text-center text-sm font-bold text-gray-700">
                SPRING
              </th>
              <th className="border border-gray-300 px-4 py-3 text-center text-sm font-bold text-gray-700">
                FALL
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => {
              const totals = {
                annual: row.data.reduce((sum, val) => sum + val, 0),
                spring: row.data.slice(0, 6).reduce((sum, val) => sum + val, 0),
                fall: row.data.slice(6).reduce((sum, val) => sum + val, 0),
              };

              return (
                <tr
                  key={index}
                  className={`${
                    row.highlight
                      ? "bg-yellow-50 border-yellow-200"
                      : index % 2 === 0
                      ? "bg-white"
                      : "bg-gray-50"
                  } hover:bg-indigo-50 transition-colors`}
                >
                  <td className="border border-gray-300 px-4 py-3 text-sm font-bold text-gray-800">
                    {row.label}
                  </td>
                  {row.data.map((value, i) => (
                    <td
                      key={i}
                      className={`border border-gray-300 px-4 py-3 text-center text-sm font-medium ${
                        row.redHighlight && value > 0
                          ? "bg-red-100 text-red-700 border-red-200"
                          : "text-gray-800"
                      }`}
                    >
                      {formatValue(value, row.isPercentage)}
                    </td>
                  ))}
                  <td className="border border-gray-300 px-4 py-3 text-center text-sm font-bold text-gray-900 bg-blue-50">
                    {formatValue(totals.annual, row.isPercentage)}
                  </td>
                  <td className="border border-gray-300 px-4 py-3 text-center text-sm font-bold text-gray-900 bg-green-50">
                    {formatValue(totals.spring, row.isPercentage)}
                  </td>
                  <td className="border border-gray-300 px-4 py-3 text-center text-sm font-bold text-gray-900 bg-orange-50">
                    {formatValue(totals.fall, row.isPercentage)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }

  // Current Year Forecast Table
  function renderCurrentYearForecastTable() {
    const year = new Date().getFullYear(); // Current year
    if (!productData?.monthly_forecast) {
      return (
        <div className="text-center py-8 bg-gray-50 rounded-xl">
          <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">
            No monthly forecast data available for {year}
          </p>
        </div>
      );
    }

    const yearForecasts = productData.monthly_forecast.filter(
      (f) => f.year === year
    );

    if (yearForecasts.length === 0) {
      return (
        <div className="text-center py-8 bg-gray-50 rounded-xl">
          <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">No forecast data available for {year}</p>
        </div>
      );
    }

    const forecastRows = [
      { key: "TY_Unit_Sales", label: "Total Sales Units" },
      { key: "TY_store_unit_sales", label: "Store Sales Units" },
      { key: "TY_MCOM_Unit_Sales", label: "COM Sales Units" },
      {
        key: "TY_COM_to_TTL",
        label: "COM % to TTL (Sales)",
        isPercentage: true,
      },
      { key: "TY_OH_Units", label: "TOTAL EOM OH" },
      { key: "TY_store_EOM_OH", label: "STORE EOM OH" },
      { key: "TY_OH_MCOM_Units", label: "COM EOH OH" },
      {
        key: "TY_COM_to_TTL_OH",
        label: "COM % to TTL (EOH)",
        isPercentage: true,
      },
      { key: "PTD_TY_Sales", label: "Omni Sales $" },
      { key: "MCOM_PTD_TY_Sales", label: "COM Sales $" },
      { key: "TY_Omni_AUR_Diff_Own", label: "Omni AUR/% Diff Own" },
      { key: "TY_Omni_sell_through", label: "Omni Sell Thru %" },
      { key: "TY_store_sell_through", label: "Store SellThru %" },
      { key: "TY_omni_turn", label: "Omni Turn" },
      { key: "TY_store_turn", label: "Store turn" },
      { key: "TY_store_unit_sales_diff", label: "TY Store Sales U vs LY" },
      { key: "TY_com_unit_sales_diff", label: "TY COM sales U vs LY" },
      { key: "TY_store_eom_oh_diff", label: "TY Store EOH vs LY" },
      { key: "OO_Total_Units", label: "Omni OO Units" },
      { key: "OO_MCOM_Total_Units", label: "COM OO Units" },
      { key: "TY_Receipts", label: "Omni Receipts" },

      // { key: "MacysProjectionReciepts", label: "Macys Projection Receipts" },
    ];

    const months = [
      "jan",
      "feb",
      "mar",
      "apr",
      "may",
      "jun",
      "jul",
      "aug",
      "sep",
      "oct",
      "nov",
      "dec",
    ];
    const monthLabels = [
      "JAN",
      "FEB",
      "MAR",
      "APR",
      "MAY",
      "JUN",
      "JUL",
      "AUG",
      "SEP",
      "OCT",
      "NOV",
      "DEC",
    ];

    const calculateTotals = (forecast) => {
      if (!forecast) return { annual: 0, spring: 0, fall: 0 };

      const values = months.map((month) => forecast[month] || 0);
      const annual = values.reduce((sum, val) => sum + val, 0);
      const spring = values.slice(1, 7).reduce((sum, val) => sum + val, 0); // Feb-Jul
      const fall = [...values.slice(7), values[0]].reduce(
        (sum, val) => sum + val,
        0
      ); // Aug-Jan

      return { annual, spring, fall };
    };

    return (
      <div className="overflow-x-auto rounded-xl border border-gray-200">
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="bg-gradient-to-r from-gray-100 to-gray-50">
              <th className="border border-gray-300 px-4 py-3 text-left text-sm font-bold text-gray-700">
                TOTAL {year}
              </th>
              {monthLabels.map((month) => (
                <th
                  key={month}
                  className="border border-gray-300 px-4 py-3 text-center text-sm font-bold text-gray-700"
                >
                  {month}
                </th>
              ))}
              <th className="border border-gray-300 px-4 py-3 text-center text-sm font-bold text-gray-700">
                ANNUAL
              </th>
              <th className="border border-gray-300 px-4 py-3 text-center text-sm font-bold text-gray-700">
                SPRING
              </th>
              <th className="border border-gray-300 px-4 py-3 text-center text-sm font-bold text-gray-700">
                FALL
              </th>
            </tr>
          </thead>
          <tbody>
            {forecastRows.map((row, index) => {
              const forecast = yearForecasts.find(
                (f) => f.variable_name === row.key
              );

              if (!forecast) {
                return (
                  <tr
                    key={row.key}
                    className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                  >
                    <td className="border border-gray-300 px-4 py-3 text-sm font-bold text-gray-800">
                      {row.label}
                    </td>
                    {monthLabels.map((_, i) => (
                      <td
                        key={i}
                        className="border border-gray-300 px-4 py-3 text-center text-sm text-gray-400"
                      >
                        -
                      </td>
                    ))}
                    <td className="border border-gray-300 px-4 py-3 text-center text-sm font-bold text-gray-400">
                      -
                    </td>
                    <td className="border border-gray-300 px-4 py-3 text-center text-sm text-gray-400">
                      -
                    </td>
                    <td className="border border-gray-300 px-4 py-3 text-center text-sm text-gray-400">
                      -
                    </td>
                  </tr>
                );
              }

              const totals = calculateTotals(forecast);
              const isPercentageRow = row.key === "MCOM_PTD_TY_Sales";

              return (
                <tr
                  key={row.key}
                  className={`${
                    isPercentageRow
                      ? "bg-yellow-50 border-yellow-200"
                      : index % 2 === 0
                      ? "bg-white"
                      : "bg-gray-50"
                  } hover:bg-indigo-50 transition-colors`}
                >
                  <td className="border border-gray-300 px-4 py-3 text-sm font-bold text-gray-800">
                    {row.label}
                  </td>
                  {months.map((month) => (
                    <td
                      key={month}
                      className="border border-gray-300 px-4 py-3 text-center text-sm font-medium text-gray-800"
                    >
                      {formatValue(forecast[month], row.isPercentage)}
                    </td>
                  ))}
                  <td className="border border-gray-300 px-4 py-3 text-center text-sm font-bold text-gray-900 bg-blue-50">
                    {formatValue(totals.annual, row.isPercentage)}
                  </td>
                  <td className="border border-gray-300 px-4 py-3 text-center text-sm font-bold text-gray-900 bg-green-50">
                    {formatValue(totals.spring, row.isPercentage)}
                  </td>
                  <td className="border border-gray-300 px-4 py-3 text-center text-sm font-bold text-gray-900 bg-orange-50">
                    {formatValue(totals.fall, row.isPercentage)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }

  // Last Year Forecast Table
  function renderLastYearForecastTable() {
    const year = new Date().getFullYear() - 1; // Last year
    if (!productData?.monthly_forecast) {
      return (
        <div className="text-center py-8 bg-gray-50 rounded-xl">
          <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">
            No monthly forecast data available for {year}
          </p>
        </div>
      );
    }

    const yearForecasts = productData.monthly_forecast.filter(
      (f) => f.year === year
    );

    if (yearForecasts.length === 0) {
      return (
        <div className="text-center py-8 bg-gray-50 rounded-xl">
          <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">No forecast data available for {year}</p>
        </div>
      );
    }

    const forecastRows = [
      { key: "LY_Unit_Sales", label: "Total Sales Units" },
      { key: "LY_store_unit_sales", label: "Store Sales Units" },
      { key: "LY_MCOM_Unit_Sales", label: "COM Sales Units" },
      {
        key: "LY_COM_to_TTL",
        label: "COM % to TTL (Sales)",
        isPercentage: true,
      },
      { key: "LY_OH_Units", label: "TOTAL EOM OH" },
      { key: "LY_store_EOM_OH", label: "STORE EOM OH" },

      { key: "LY_MCOM_OH_Units", label: "COM EOH OH" },

      {
        key: "LY_COM_to_TTL_OH",
        label: "COM % to TTL (EOH)",
        isPercentage: true,
      },
      { key: "LY_PTD_Sales", label: "Omni Sales $" },
      { key: "MCOM_PTD_LY_Sales", label: "COM Sales $" },
      { key: "LY_Omni_AUR_Diff_Own", label: "Omni AUR/% Diff Own" },
      { key: "LY_omni_sell_through", label: "Omni Sell Thru %" },
      { key: "LY_store_sell_through", label: "Store SellThru %" },
      { key: "LY_omni_turn", label: "Omni Turn" },
      { key: "LY_store_turn", label: "Store turn" },
      { key: "LY_Receipts", label: "Omni Receipts" },
      // { key: "MacysProjectionReciepts", label: "Macys Projection Receipts" },
    ];

    const months = [
      "jan",
      "feb",
      "mar",
      "apr",
      "may",
      "jun",
      "jul",
      "aug",
      "sep",
      "oct",
      "nov",
      "dec",
    ];
    const monthLabels = [
      "JAN",
      "FEB",
      "MAR",
      "APR",
      "MAY",
      "JUN",
      "JUL",
      "AUG",
      "SEP",
      "OCT",
      "NOV",
      "DEC",
    ];

    const calculateTotals = (forecast) => {
      if (!forecast) return { annual: 0, spring: 0, fall: 0 };

      const values = months.map((month) => forecast[month] || 0);
      const annual = values.reduce((sum, val) => sum + val, 0);
      const spring = values.slice(1, 7).reduce((sum, val) => sum + val, 0); // Feb-Jul
      const fall = [...values.slice(7), values[0]].reduce(
        (sum, val) => sum + val,
        0
      ); // Aug-Jan

      return { annual, spring, fall };
    };

    return (
      <div className="overflow-x-auto rounded-xl border border-gray-200">
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="bg-gradient-to-r from-gray-100 to-gray-50">
              <th className="border border-gray-300 px-4 py-3 text-left text-sm font-bold text-gray-700">
                TOTAL {year}
              </th>
              {monthLabels.map((month) => (
                <th
                  key={month}
                  className="border border-gray-300 px-4 py-3 text-center text-sm font-bold text-gray-700"
                >
                  {month}
                </th>
              ))}
              <th className="border border-gray-300 px-4 py-3 text-center text-sm font-bold text-gray-700">
                ANNUAL
              </th>
              <th className="border border-gray-300 px-4 py-3 text-center text-sm font-bold text-gray-700">
                SPRING
              </th>
              <th className="border border-gray-300 px-4 py-3 text-center text-sm font-bold text-gray-700">
                FALL
              </th>
            </tr>
          </thead>
          <tbody>
            {forecastRows.map((row, index) => {
              const forecast = yearForecasts.find(
                (f) => f.variable_name === row.key
              );

              if (!forecast) {
                return (
                  <tr
                    key={row.key}
                    className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                  >
                    <td className="border border-gray-300 px-4 py-3 text-sm font-bold text-gray-800">
                      {row.label}
                    </td>
                    {monthLabels.map((_, i) => (
                      <td
                        key={i}
                        className="border border-gray-300 px-4 py-3 text-center text-sm text-gray-400"
                      >
                        -
                      </td>
                    ))}
                    <td className="border border-gray-300 px-4 py-3 text-center text-sm font-bold text-gray-400">
                      -
                    </td>
                    <td className="border border-gray-300 px-4 py-3 text-center text-sm text-gray-400">
                      -
                    </td>
                    <td className="border border-gray-300 px-4 py-3 text-center text-sm text-gray-400">
                      -
                    </td>
                  </tr>
                );
              }

              const totals = calculateTotals(forecast);
              const isPercentageRow = row.key === "MCOM_PTD_LY_Sales";

              return (
                <tr
                  key={row.key}
                  className={`${
                    isPercentageRow
                      ? "bg-yellow-50 border-yellow-200"
                      : index % 2 === 0
                      ? "bg-white"
                      : "bg-gray-50"
                  } hover:bg-indigo-50 transition-colors`}
                >
                  <td className="border border-gray-300 px-4 py-3 text-sm font-bold text-gray-800">
                    {row.label}
                  </td>
                  {months.map((month) => (
                    <td
                      key={month}
                      className="border border-gray-300 px-4 py-3 text-center text-sm font-medium text-gray-800"
                    >
                      {formatValue(forecast[month], row.isPercentage)}
                    </td>
                  ))}
                  <td className="border border-gray-300 px-4 py-3 text-center text-sm font-bold text-gray-900 bg-blue-50">
                    {formatValue(totals.annual, row.isPercentage)}
                  </td>
                  <td className="border border-gray-300 px-4 py-3 text-center text-sm font-bold text-gray-900 bg-green-50">
                    {formatValue(totals.spring, row.isPercentage)}
                  </td>
                  <td className="border border-gray-300 px-4 py-3 text-center text-sm font-bold text-gray-900 bg-orange-50">
                    {formatValue(totals.fall, row.isPercentage)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }

  const cardData = getProductCardData();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-7xl mx-auto p-6">
          <div className="flex justify-center items-center py-20">
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mx-auto mb-6"></div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Loading Product Details
              </h3>
              <p className="text-gray-600">
                Please wait while we fetch the product information...
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-7xl mx-auto p-6">
          <div className="text-center py-20">
            <AlertCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Error Loading Product
            </h3>
            <p className="text-red-600 mb-6">{error}</p>
            <div className="space-x-4">
              <button
                onClick={fetchProductDetails}
                className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Try Again
              </button>
              <button
                onClick={onBack}
                className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                Go Back
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto p-6 space-y-8">
        {/* Header Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 px-8 py-6">
            <div className="flex items-center gap-4">
              <button
                onClick={onBack}
                className="flex items-center gap-2 text-white opacity-90 hover:opacity-100 transition-opacity"
              >
                <ArrowLeft size={20} />
                <span className="font-medium">Back to Products</span>
              </button>
            </div>
            <div className="mt-4">
              <h1 className="text-3xl font-bold text-white mb-2">
                Product Details: {cardData?.productId}
              </h1>
              <p className="text-indigo-100">
                Comprehensive forecast and performance analytics
              </p>
            </div>
          </div>
        </div>

        {/* Key Metrics Cards */}
        {cardData && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {/* Category Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Tag className="text-blue-600" size={20} />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Category</p>
                  <p className="text-lg font-bold text-gray-900">
                    {cardData.category}
                  </p>
                </div>
              </div>
            </div>

            {/* Forecast Month Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Calendar className="text-green-600" size={20} />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Forecast Month
                  </p>
                  <p className="text-lg font-bold text-gray-900">
                    {cardData.forecastMonth}
                  </p>
                </div>
              </div>
            </div>

            {/* Lead Time Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <Clock className="text-orange-600" size={20} />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Lead Time</p>
                  <p className="text-lg font-bold text-gray-900">
                    {cardData.leadTime} days
                  </p>
                </div>
              </div>
            </div>

            {/* Red Box Status Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <div
                  className={`p-2 rounded-lg ${
                    cardData.redBox ? "bg-red-100" : "bg-gray-100"
                  }`}
                >
                  <Box
                    className={
                      cardData.redBox ? "text-red-600" : "text-gray-600"
                    }
                    size={20}
                  />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Red Box</p>
                  <p
                    className={`text-lg font-bold ${
                      cardData.redBox ? "text-red-600" : "text-gray-600"
                    }`}
                  >
                    {cardData.redBox ? "Yes" : "No"}
                  </p>
                </div>
              </div>
            </div>

            {/* Door Count Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Building2 className="text-purple-600" size={20} />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Door Count
                  </p>
                  <p className="text-lg font-bold text-gray-900">
                    {formatValue(cardData.doorCount)}
                  </p>
                </div>
              </div>
            </div>

            {/* Birthstone Card */}
            {cardData.birthstone && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-pink-100 rounded-lg">
                    <Gem className="text-pink-600" size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Birthstone
                    </p>
                    <p className="text-lg font-bold text-gray-900">
                      {cardData.birthstone}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Trend Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <div
                  className={`p-2 rounded-lg ${
                    cardData.trend >= 0 ? "bg-green-100" : "bg-red-100"
                  }`}
                >
                  <TrendingUp
                    className={
                      cardData.trend >= 0 ? "text-green-600" : "text-red-600"
                    }
                    size={20}
                  />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Trend</p>
                  <p
                    className={`text-lg font-bold ${
                      cardData.trend >= 0 ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {cardData.trend >= 0 ? "+" : ""}
                    {formatValue(cardData.trend, false, false)}
                  </p>
                </div>
              </div>
            </div>

            {/* Required Qty Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-indigo-100 rounded-lg">
                  <Target className="text-indigo-600" size={20} />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Required Qty
                  </p>
                  <p className="text-lg font-bold text-gray-900">
                    {formatValue(cardData.requiredQty)}
                  </p>
                </div>
              </div>
            </div>

            {/* Added Qty Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-cyan-100 rounded-lg">
                  <Plus className="text-cyan-600" size={20} />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Added Qty</p>
                  <p className="text-lg font-bold text-gray-900">
                    {formatValue(cardData.addedQty)}
                  </p>
                </div>
              </div>
            </div>

            {/* Vendor Card */}
            {cardData.vendor && cardData.vendor !== "N/A" && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-yellow-100 rounded-lg">
                    <Truck className="text-yellow-600" size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Vendor</p>
                    <p
                      className="text-lg font-bold text-gray-900 truncate"
                      title={cardData.vendor}
                    >
                      {cardData.vendor}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Additional Info Cards Row */}
        {cardData && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Min Order Card */}
            {cardData.minOrder > 0 && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-600">
                    Min Order
                  </span>
                  <Package className="text-gray-400" size={16} />
                </div>
                <p className="text-2xl font-bold text-gray-900">
                  {formatValue(cardData.minOrder)}
                </p>
              </div>
            )}

            {/* Planned OH Card */}
            {cardData.plannedOH > 0 && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-600">
                    Planned OH
                  </span>
                  <BarChart3 className="text-gray-400" size={16} />
                </div>
                <p className="text-2xl font-bold text-gray-900">
                  {formatValue(cardData.plannedOH)}
                </p>
              </div>
            )}

            {/* VDF Status Card */}
            {cardData.vdfStatus !== null && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-600">
                    VDF Status
                  </span>
                  {cardData.vdfStatus ? (
                    <CheckCircle className="text-green-500" size={16} />
                  ) : (
                    <AlertCircle className="text-red-500" size={16} />
                  )}
                </div>
                <p
                  className={`text-2xl font-bold ${
                    cardData.vdfStatus ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {cardData.vdfStatus ? "Active" : "Inactive"}
                </p>
              </div>
            )}

            {/* Macy's SOQ Card */}
            {cardData.macysSOQ > 0 && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-600">
                    Macy's SOQ
                  </span>
                  <Star className="text-gray-400" size={16} />
                </div>
                <p className="text-2xl font-bold text-gray-900">
                  {formatValue(cardData.macysSOQ)}
                </p>
              </div>
            )}
          </div>
        )}

        {/* Product Basic Info - Enhanced */}
        {productData?.product_details && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="bg-gray-50 px-8 py-4 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <Info className="text-indigo-600" size={24} />
                Product Information
              </h2>
            </div>
            <div className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
                    Product ID
                  </label>
                  <p className="text-lg font-bold text-gray-900 bg-gray-50 px-4 py-2 rounded-lg">
                    {productData.product_details.product_id}
                  </p>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
                    Description
                  </label>
                  <p className="text-lg font-bold text-gray-900 bg-gray-50 px-4 py-2 rounded-lg">
                    {productData.product_details.product_description || "-"}
                  </p>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
                    Department
                  </label>
                  <p className="text-lg font-bold text-gray-900 bg-gray-50 px-4 py-2 rounded-lg">
                    {productData.product_details.department_description || "-"}
                  </p>
                </div>
                {productData.product_details.subclass_decription && (
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
                      Subclass
                    </label>
                    <p className="text-lg font-bold text-gray-900 bg-gray-50 px-4 py-2 rounded-lg">
                      {productData.product_details.subclass_decription}
                    </p>
                  </div>
                )}
                {productData.product_details.vendor_name && (
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
                      Vendor
                    </label>
                    <p className="text-lg font-bold text-gray-900 bg-gray-50 px-4 py-2 rounded-lg">
                      {productData.product_details.vendor_name}
                    </p>
                  </div>
                )}
                {productData.product_details.current_door_count && (
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
                      Current Door Count
                    </label>
                    <p className="text-lg font-bold text-gray-900 bg-gray-50 px-4 py-2 rounded-lg">
                      {formatValue(
                        productData.product_details.current_door_count
                      )}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Rolling 12M Forecast - Enhanced */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <div
            className="bg-gray-50 px-8 py-4 border-b border-gray-200 flex justify-between items-center cursor-pointer hover:bg-gray-100 transition-colors"
            onClick={() => toggleSection("rollingForecast")}
          >
            <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <TrendingUp className="text-indigo-600" size={24} />
              Rolling 12M Forecast
            </h3>
            <ChevronDown
              size={24}
              className={`text-gray-500 transition-transform duration-200 ${
                expandedSections.rollingForecast ? "rotate-180" : ""
              }`}
            />
          </div>
          {expandedSections.rollingForecast && (
            <div className="p-8">{renderRollingForecastTable()}</div>
          )}
        </div>

        {/* Monthly Forecast - Enhanced */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <div
            className="bg-gray-50 px-8 py-4 border-b border-gray-200 flex justify-between items-center cursor-pointer hover:bg-gray-100 transition-colors"
            onClick={() => toggleSection("monthlyForecast")}
          >
            <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <Calendar className="text-indigo-600" size={24} />
              Monthly Forecast
            </h3>
            <ChevronDown
              size={24}
              className={`text-gray-500 transition-transform duration-200 ${
                expandedSections.monthlyForecast ? "rotate-180" : ""
              }`}
            />
          </div>
          {expandedSections.monthlyForecast && (
            <div className="p-8 space-y-8">
              {/* Current Year Data */}
              <div>
                <h4 className="text-lg font-bold text-gray-700 mb-6 flex items-center gap-2">
                  <Activity className="text-blue-600" size={20} />
                  TOTAL {new Date().getFullYear()}
                </h4>
                {renderCurrentYearForecastTable()}
              </div>

              {/* Last Year Data */}
              <div>
                <h4 className="text-lg font-bold text-gray-700 mb-6 flex items-center gap-2">
                  <Activity className="text-gray-600" size={20} />
                  TOTAL {new Date().getFullYear() - 1}
                </h4>
                {renderLastYearForecastTable()}
              </div>
            </div>
          )}
        </div>

        {/* Additional Forecast Types - Enhanced */}
        {productData?.store_forecast &&
          productData.store_forecast.length > 0 && (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
              <div
                className="bg-gray-50 px-8 py-4 border-b border-gray-200 flex justify-between items-center cursor-pointer hover:bg-gray-100 transition-colors"
                onClick={() => toggleSection("storeForecast")}
              >
                <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <Package className="text-blue-600" size={24} />
                  Store Forecast Data
                </h3>
                <ChevronDown
                  size={24}
                  className={`text-gray-500 transition-transform duration-200 ${
                    expandedSections.storeForecast ? "rotate-180" : ""
                  }`}
                />
              </div>
              {expandedSections.storeForecast && (
                <div className="p-8">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-blue-50 rounded-xl p-6">
                      <label className="text-sm font-semibold text-blue-600 uppercase tracking-wide">
                        Door Count
                      </label>
                      <p className="text-2xl font-bold text-blue-900 mt-2">
                        {formatValue(productData.store_forecast[0]?.door_count)}
                      </p>
                    </div>
                    <div className="bg-green-50 rounded-xl p-6">
                      <label className="text-sm font-semibold text-green-600 uppercase tracking-wide">
                        Lead Time
                      </label>
                      <p className="text-2xl font-bold text-green-900 mt-2">
                        {formatValue(productData.store_forecast[0]?.lead_time)}{" "}
                        days
                      </p>
                    </div>
                    <div className="bg-purple-50 rounded-xl p-6">
                      <label className="text-sm font-semibold text-purple-600 uppercase tracking-wide">
                        Trend
                      </label>
                      <p className="text-2xl font-bold text-purple-900 mt-2">
                        {formatValue(productData.store_forecast[0]?.trend)}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
      </div>
    </div>
  );
};

export default ProductDetailsView;
