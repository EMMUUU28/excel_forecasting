// import React, { useState, useEffect } from 'react';
// import { ChevronDown, ChevronRight } from 'lucide-react';

// const CombinedForecastComponent = () => {
//   // ---- FORECASTING TOOL STATE AND LOGIC ----
//   // Initial data for forecasting
//   const initialForecastData = {
//     monthlyPercentages: [13, 3, 7, 8, 5, 4, 8, 6, 8, 13, 23, 2],
//     fcByIndex: [99, 26, 55, 64, 38, 28, 63, 47, 60, 105, 183, 15],
//     fcByTrend: [23, 23, 76, 51, 36, 17, 16, 19, 14, 61, 93, 4],
//     recommendedFC: [75, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//     plannedFC: [75, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//     plannedShipments: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//     plannedEOH: [477, 477, 477, 477, 477, 477, 477, 477, 477, 477, 477, 477],
//     grossProjection: [0, 131, 150, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//     macysProjReceipts: [16, 46, 46, 42, 48, 49, 0, 0, 0, 0, 0, 0],
//     plannedSellThru: [14, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
//   };

//   // State for the forecasting table data
//   const [tableData, setTableData] = useState(initialForecastData);

//   // State for the forecasting controls
//   const [forecastingMethod, setForecastingMethod] = useState('fc by index');
//   const [currentFCIndex, setCurrentFCIndex] = useState('dia');
//   const [changeTrend, setChangeTrend] = useState('0');
//   const [twelveMonthFC, setTwelveMonthFC] = useState('783');

//   // Dropdown state management for forecasting controls
//   const [forecastDropdownOpen, setForecastDropdownOpen] = useState(false);
//   const [indexDropdownOpen, setIndexDropdownOpen] = useState(false);

//   // Method to update recommended FC based on controls
//   useEffect(() => {
//     let newRecommendedFC;

//     if (forecastingMethod === 'fc by index') {
//       // Use the fcByIndex values for recommended FC
//       newRecommendedFC = [...tableData.fcByIndex];
//     } else if (forecastingMethod === 'fc by trend') {
//       // Use the fcByTrend values for recommended FC
//       newRecommendedFC = [...tableData.fcByTrend];
//     } else if (forecastingMethod === 'average') {
//       // Average of fcByIndex and fcByTrend
//       newRecommendedFC = tableData.fcByIndex.map((val, idx) =>
//         Math.round((val + tableData.fcByTrend[idx]) / 2)
//       );
//     } else {
//       // Default to fcByIndex for other options
//       newRecommendedFC = [...tableData.fcByIndex];
//     }

//     // Apply the trend percentage adjustment if needed
//     if (changeTrend !== '0') {
//       const trendMultiplier = 1 + (parseFloat(changeTrend) / 100);
//       newRecommendedFC = newRecommendedFC.map(val => Math.round(val * trendMultiplier));
//     }

//     // Scale all values to match the desired 12M FC total
//     const currentTotal = newRecommendedFC.reduce((sum, val) => sum + val, 0);
//     const targetTotal = parseFloat(twelveMonthFC);

//     if (currentTotal > 0 && !isNaN(targetTotal)) {
//       const scaleFactor = targetTotal / currentTotal;
//       newRecommendedFC = newRecommendedFC.map(val => Math.round(val * scaleFactor));
//     }

//     // Update the table data with new recommended FC
//     setTableData(prev => ({
//       ...prev,
//       recommendedFC: newRecommendedFC
//     }));
//   }, [forecastingMethod, currentFCIndex, changeTrend, twelveMonthFC]);

//   // ---- SALES SUMMARY STATE AND LOGIC ----
//   // State for section expansion
//   const [year2025Expanded, setYear2025Expanded] = useState(true);
//   const [year2024Expanded, setYear2024Expanded] = useState(false);

//   // State for category dropdowns
//   const [selectedView2025, setSelectedView2025] = useState('All Categories');
//   const [selectedView2024, setSelectedView2024] = useState('All Categories');
//   const [dropdown2025Open, setDropdown2025Open] = useState(false);
//   const [dropdown2024Open, setDropdown2024Open] = useState(false);

//   // Dropdown options
//   const viewOptions = [
//     'All Categories',
//     'Bridge Gem',
//     'Fine Gold',
//     'Womens Silver',
//     'Mens Jewelry'
//   ];

//   // Sample data for 2025
//   const data2025 = {
//     totalSalesUnits: [75, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//     storeSalesUnits: [41, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//     comSalesUnits: [34, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//     comToTtlSales: [45, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//     totalEomOh: [476, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//     storeEomOh: [470, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//     comEomOh: [6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//     comToTtlEoh: [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//     omniSales: [11927, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//     comSales: [5486, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//     omniDiff: [159, -71, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//     omniSellThru: [14, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//     storeSellThru: [8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//     omniTurn: [0.2, 0.3, 0.5, 0.6, 0.8, 0.9, 1.1, 1.3, 1.4, 1.6, 1.7, 1.9],
//     storeTurn: [0.1, 0.2, 0.3, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0, 1.1],
//     tySalesVsLy: [-22, -100, -100, -100, -100, -100, -100, -100, -100, -100, -100, -100],
//     tyComVsLy: [386, -100, -100, -100, -100, -100, -100, -100, -100, -100, -100, -100],
//     tyStoreVsLy: [-28, -100, -100, -100, -100, -100, -100, -100, -100, -100, -100, -100],
//     omniOoUnits: [16, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//     comOoUnits: [10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//     omniReceipts: [8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
//   };

//   // Sample data for 2024
//   const data2024 = {
//     totalSalesUnits: [65, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60],
//     storeSalesUnits: [35, 5, 8, 10, 12, 15, 18, 20, 22, 25, 28, 30],
//     comSalesUnits: [30, 5, 7, 10, 13, 15, 17, 20, 23, 25, 27, 30],
//     comToTtlSales: [46, 50, 47, 50, 52, 50, 49, 50, 51, 50, 49, 50],
//     totalEomOh: [450, 445, 440, 435, 430, 425, 420, 415, 410, 405, 400, 395],
//     storeEomOh: [445, 440, 435, 430, 425, 420, 415, 410, 405, 400, 395, 390],
//     comEomOh: [5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
//     comToTtlEoh: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
//     omniSales: [10000, 1000, 1200, 1300, 1400, 1500, 1600, 1700, 1800, 1900, 2000, 2100],
//     comSales: [4500, 500, 600, 650, 700, 750, 800, 850, 900, 950, 1000, 1050],
//     omniDiff: [100, -50, -40, -30, -20, -10, 0, 10, 20, 30, 40, 50],
//     omniSellThru: [12, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
//     storeSellThru: [7, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
//     omniTurn: [0.1, 0.2, 0.4, 0.5, 0.7, 0.8, 1.0, 1.2, 1.3, 1.5, 1.6, 1.8],
//     storeTurn: [0.1, 0.1, 0.2, 0.3, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0],
//     tySalesVsLy: [0, 5, 8, 12, 15, 18, 22, 25, 28, 30, 32, 35],
//     tyComVsLy: [0, 8, 10, 15, 18, 20, 25, 28, 30, 32, 35, 38],
//     tyStoreVsLy: [0, 3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33],
//     omniOoUnits: [14, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
//     comOoUnits: [8, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6],
//     omniReceipts: [6, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6]
//   };

//   // ---- SHARED HELPER FUNCTIONS ----
//   // Calculate yearly totals
//   const calculateTotals = (dataArray) => {
//     const annual = dataArray.reduce((sum, val) => sum + val, 0);
//     const spring = dataArray.slice(1, 6).reduce((sum, val) => sum + val, 0); // MAR-JUL
//     const fall = dataArray.slice(6, 12).reduce((sum, val) => sum + val, 0); // AUG-JAN
//     return { annual, spring, fall };
//   };

//   // Table header months
//   const months = ['FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC', 'JAN'];

//   // Format totals for display in forecast table
//   const formatRowWithTotals = (row) => {
//     const { annual, spring, fall } = calculateTotals(row);
//     return [...row, annual, spring, fall];
//   };

//   // Format values for display in sales summary
//   const formatValue = (value, isPercent = false, isDollar = false, isRatio = false) => {
//     if (isPercent) {
//       return `${value}%`;
//     } else if (isDollar) {
//       return `$${value.toLocaleString()}`;
//     } else if (isRatio) {
//       return value.toFixed(1);
//     } else {
//       return value;
//     }
//   };

//   return (
//     <div className="w-full space-y-8">
//       {/* ---- FORECASTING TOOL SECTION ---- */}
//       <div className="bg-white p-4 rounded shadow-sm w-full">
//         {/* Top Control Bar */}
//         <div className="flex flex-wrap gap-3 mb-4 p-3 bg-gray-50 border border-gray-200 rounded">
//           {/* Forecasting Method Dropdown */}
//           <div className="relative">
//             <label className="block text-xs font-medium text-gray-700 mb-1">Forecasting Method</label>
//             <div
//               className="flex items-center justify-between w-40 px-3 py-2 border border-gray-300 rounded bg-white cursor-pointer"
//               onClick={() => setForecastDropdownOpen(!forecastDropdownOpen)}
//             >
//               <span className="text-sm">{forecastingMethod}</span>
//               <ChevronDown size={16} />
//             </div>
//             {forecastDropdownOpen && (
//               <div className="absolute z-10 mt-1 w-40 bg-white border border-gray-300 rounded shadow-lg">
//                 {['fc by index', 'fc by trend', 'average', 'current year', 'last year'].map((method) => (
//                   <div
//                     key={method}
//                     className="px-3 py-2 text-sm hover:bg-gray-100 cursor-pointer"
//                     onClick={() => {
//                       setForecastingMethod(method);
//                       setForecastDropdownOpen(false);
//                     }}
//                   >
//                     {method}
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>

//           {/* Current FC Index Dropdown */}
//           <div className="relative">
//             <label className="block text-xs font-medium text-gray-700 mb-1">Current FC Index</label>
//             <div
//               className="flex items-center justify-between w-32 px-3 py-2 border border-gray-300 rounded bg-white cursor-pointer"
//               onClick={() => setIndexDropdownOpen(!indexDropdownOpen)}
//             >
//               <span className="text-sm">{currentFCIndex}</span>
//               <ChevronDown size={16} />
//             </div>
//             {indexDropdownOpen && (
//               <div className="absolute z-10 mt-1 w-32 bg-white border border-gray-300 rounded shadow-lg">
//                 {['dia', 'cross', 'gem'].map((index) => (
//                   <div
//                     key={index}
//                     className="px-3 py-2 text-sm hover:bg-gray-100 cursor-pointer"
//                     onClick={() => {
//                       setCurrentFCIndex(index);
//                       setIndexDropdownOpen(false);
//                     }}
//                   >
//                     {index}
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>

//           {/* Change Trend Input */}
//           <div>
//             <label className="block text-xs font-medium text-gray-700 mb-1">Change Trend (%)</label>
//             <input
//               type="text"
//               value={changeTrend}
//               onChange={(e) => setChangeTrend(e.target.value)}
//               className="w-32 px-3 py-2 border border-gray-300 rounded text-sm"
//             />
//           </div>

//     {/* 12M FC by Index Input */}
//     <div>
//       <label className="block text-xs font-medium text-gray-700 mb-1">12M FC by Index</label>
//       <input
//         type="text"
//         value={twelveMonthFC}
//         onChange={(e) => setTwelveMonthFC(e.target.value)}
//         className="w-32 px-3 py-2 border border-gray-300 rounded text-sm"
//       />
//     </div>
//   </div>

//   {/* Forecast Table */}
//   <div className="overflow-x-auto">
//     <table className="min-w-full border-collapse">
//       <thead>
//         <tr>
//           <th className="border border-gray-300 bg-gray-100 px-4 py-2 text-left text-sm font-semibold">ROLLING 12M FC</th>
//           {months.map(month => (
//             <th key={month} className="border border-gray-300 bg-gray-100 px-4 py-2 text-center text-sm font-semibold">{month}</th>
//           ))}
//           <th className="border border-gray-300 bg-gray-100 px-4 py-2 text-center text-sm font-semibold">ANNUAL</th>
//           <th className="border border-gray-300 bg-gray-100 px-4 py-2 text-center text-sm font-semibold">SPRING</th>
//           <th className="border border-gray-300 bg-gray-100 px-4 py-2 text-center text-sm font-semibold">FALL</th>
//         </tr>
//       </thead>
//       <tbody>
//         {/* Index Row */}
//         <tr>
//           <td className="border border-gray-300 px-4 py-2 text-sm font-medium">Index</td>
//           {formatRowWithTotals(tableData.monthlyPercentages).map((value, i) => (
//             <td key={i} className={`border border-gray-300 px-4 py-2 text-center text-sm ${i > 11 ? 'font-semibold' : ''}`}>
//               {i > 11 ? `${value}%` : `${value}%`}
//             </td>
//           ))}
//         </tr>

//         {/* FC by Index Row */}
//         <tr>
//           <td className="border border-gray-300 px-4 py-2 text-sm font-medium">FC by Index</td>
//           {formatRowWithTotals(tableData.fcByIndex).map((value, i) => (
//             <td key={i} className={`border border-gray-300 px-4 py-2 text-center text-sm ${i > 11 ? 'font-semibold' : ''}`}>
//               {value}
//             </td>
//           ))}
//         </tr>

//         {/* FC by Trend Row */}
//         <tr>
//           <td className="border border-gray-300 px-4 py-2 text-sm font-medium">FC by Trend</td>
//           {formatRowWithTotals(tableData.fcByTrend).map((value, i) => (
//             <td key={i} className={`border border-gray-300 px-4 py-2 text-center text-sm ${i > 11 ? 'font-semibold' : ''}`}>
//               {value}
//             </td>
//           ))}
//         </tr>

//         {/* Recommended FC Row - Highlighted */}
//         <tr className="bg-yellow-50">
//           <td className="border border-gray-300 px-4 py-2 text-sm font-medium">Recommended FC</td>
//           {formatRowWithTotals(tableData.recommendedFC).map((value, i) => (
//             <td key={i} className={`border border-gray-300 px-4 py-2 text-center text-sm ${i > 11 ? 'font-semibold' : ''}`}>
//               {value}
//             </td>
//           ))}
//         </tr>

//         {/* Planned FC Row */}
//         <tr>
//           <td className="border border-gray-300 px-4 py-2 text-sm font-medium">Planned FC</td>
//           {formatRowWithTotals(tableData.plannedFC).map((value, i) => (
//             <td key={i} className={`border border-gray-300 px-4 py-2 text-center text-sm ${i > 11 ? 'font-semibold' : ''}`}>
//               {value}
//             </td>
//           ))}
//         </tr>

//         {/* Planned Shipments Row */}
//         <tr>
//           <td className="border border-gray-300 px-4 py-2 text-sm font-medium">Planned Shipments</td>
//           {formatRowWithTotals(tableData.plannedShipments).map((value, i) => (
//             <td key={i} className={`border border-gray-300 px-4 py-2 text-center text-sm ${i > 11 ? 'font-semibold' : ''}`}>
//               {value}
//             </td>
//           ))}
//         </tr>

//         {/* Planned EOH Row */}
//         <tr>
//           <td className="border border-gray-300 px-4 py-2 text-sm font-medium">Planned EOH (Cal)</td>
//           {formatRowWithTotals(tableData.plannedEOH).map((value, i) => (
//             <td key={i} className={`border border-gray-300 px-4 py-2 text-center text-sm ${i > 11 ? 'font-semibold' : ''}`}>
//               {value}
//             </td>
//           ))}
//         </tr>

//         {/* Gross Projection Row */}
//         <tr>
//           <td className="border border-gray-300 px-4 py-2 text-sm font-medium">Gross Projection (Nav)</td>
//           {formatRowWithTotals(tableData.grossProjection).map((value, i) => (
//             <td key={i} className={`border border-gray-300 px-4 py-2 text-center text-sm ${i > 11 ? 'font-semibold' : ''} ${value > 0 && i < 12 ? 'bg-yellow-100' : ''}`}>
//               {value}
//             </td>
//           ))}
//         </tr>

//         {/* Macy's Proj Receipts Row */}
//         <tr>
//           <td className="border border-gray-300 px-4 py-2 text-sm font-medium">Macys Proj Receipts</td>
//           {formatRowWithTotals(tableData.macysProjReceipts).map((value, i) => (
//             <td key={i} className={`border border-gray-300 px-4 py-2 text-center text-sm ${i > 11 ? 'font-semibold' : ''} ${value > 0 && i < 12 ? 'bg-red-50 text-red-600' : ''}`}>
//               {value}
//             </td>
//           ))}
//         </tr>

//         {/* Planned Sell Thru % Row */}
//         <tr>
//           <td className="border border-gray-300 px-4 py-2 text-sm font-medium">Planned Sell thru %</td>
//           {formatRowWithTotals(tableData.plannedSellThru).map((value, i) => (
//             <td key={i} className={`border border-gray-300 px-4 py-2 text-center text-sm ${i > 11 ? 'font-semibold' : ''}`}>
//               {value > 0 ? `${value}%` : `${value}%`}
//             </td>
//           ))}
//         </tr>
//       </tbody>
//     </table>
//   </div>
// </div>

// {/* ---- SALES SUMMARY SECTION ---- */}
// <div className="w-full border border-gray-300 rounded-md overflow-hidden mt-8">
//   {/* 2025 Section */}
//   <div>
//     {/* 2025 Header with dropdown and expand/collapse button */}
//     <div className="flex items-center bg-gray-200 p-2">
//       <button
//         className="mr-2 text-gray-700 focus:outline-none"
//         onClick={() => setYear2025Expanded(!year2025Expanded)}
//       >
//         {year2025Expanded ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
//       </button>
//       <h2 className="font-bold text-gray-800 text-sm">TOTAL 2025</h2>

//       {/* Dropdown taking remaining width */}
//       <div className="ml-auto relative">
//         <button
//           className="flex items-center justify-between bg-white border border-gray-300 px-3 py-1 rounded text-sm w-48"
//           onClick={() => setDropdown2025Open(!dropdown2025Open)}
//         >
//           <span>{selectedView2025}</span>
//           <ChevronDown size={14} />
//         </button>

//         {dropdown2025Open && (
//           <div className="absolute right-0 top-full mt-1 w-48 bg-white border border-gray-300 rounded shadow-lg z-10">
//             {viewOptions.map((option) => (
//               <div
//                 key={option}
//                 className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm"
//                 onClick={() => {
//                   setSelectedView2025(option);
//                   setDropdown2025Open(false);
//                 }}
//               >
//                 {option}
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>

//     {/* 2025 Table - only shown when expanded */}
//     {year2025Expanded && (
//       <div className="overflow-x-auto">
//         <table className="min-w-full border-collapse text-sm">
//           <thead>
//             <tr className="bg-gray-100">
//               <th className="border border-gray-300 px-4 py-2 text-left font-semibold">TOTAL 2025</th>
//               {months.map(month => (
//                 <th key={month} className="border border-gray-300 px-4 py-2 text-center font-semibold">{month}</th>
//               ))}
//               <th className="border border-gray-300 px-4 py-2 text-center font-semibold">ANNUAL</th>
//               <th className="border border-gray-300 px-4 py-2 text-center font-semibold">SPRING</th>
//               <th className="border border-gray-300 px-4 py-2 text-center font-semibold">FALL</th>
//             </tr>
//           </thead>
//           <tbody>
//             {/* Total Sales Units */}
//             <tr className="bg-gray-50">
//               <td className="border border-gray-300 px-4 py-2 font-medium">Total Sales Units</td>
//               {data2025.totalSalesUnits.map((value, index) => (
//                 <td key={index} className="border border-gray-300 px-4 py-2 text-center">{value}</td>
//               ))}
//               <td className="border border-gray-300 px-4 py-2 text-center font-medium">{calculateTotals(data2025.totalSalesUnits).annual}</td>
//               <td className="border border-gray-300 px-4 py-2 text-center font-medium">{calculateTotals(data2025.totalSalesUnits).spring}</td>
//               <td className="border border-gray-300 px-4 py-2 text-center font-medium">{calculateTotals(data2025.totalSalesUnits).fall}</td>
//             </tr>

//             {/* Store Sales Units */}
//             <tr>
//               <td className="border border-gray-300 px-4 py-2 font-medium">Store Sales Units</td>
//               {data2025.storeSalesUnits.map((value, index) => (
//                 <td key={index} className="border border-gray-300 px-4 py-2 text-center">{value}</td>
//               ))}
//              <td className="border border-gray-300 px-4 py-2 text-center font-medium">{calculateTotals(data2025.storeSalesUnits).spring}</td>
//               <td className="border border-gray-300 px-4 py-2 text-center font-medium">{calculateTotals(data2025.storeSalesUnits).fall}</td>
//             </tr>

//             {/* COM Sales Units */}
//             <tr>
//               <td className="border border-gray-300 px-4 py-2 font-medium">COM Sales Units</td>
//               {data2025.comSalesUnits.map((value, index) => (
//                 <td key={index} className="border border-gray-300 px-4 py-2 text-center">{value}</td>
//               ))}
//               <td className="border border-gray-300 px-4 py-2 text-center font-medium">{calculateTotals(data2025.comSalesUnits).annual}</td>
//               <td className="border border-gray-300 px-4 py-2 text-center font-medium">{calculateTotals(data2025.comSalesUnits).spring}</td>
//               <td className="border border-gray-300 px-4 py-2 text-center font-medium">{calculateTotals(data2025.comSalesUnits).fall}</td>
//             </tr>

//             {/* COM % to TTL (Sales) */}
//             <tr className="bg-yellow-50">
//               <td className="border border-gray-300 px-4 py-2 font-medium">COM % to TTL (Sales)</td>
//               {data2025.comToTtlSales.map((value, index) => (
//                 <td key={index} className="border border-gray-300 px-4 py-2 text-center">{formatValue(value, true)}</td>
//               ))}
//               <td className="border border-gray-300 px-4 py-2 text-center font-medium">{formatValue(calculateTotals(data2025.comToTtlSales).annual, true)}</td>
//               <td className="border border-gray-300 px-4 py-2 text-center font-medium">{formatValue(calculateTotals(data2025.comToTtlSales).spring, true)}</td>
//               <td className="border border-gray-300 px-4 py-2 text-center font-medium">{formatValue(calculateTotals(data2025.comToTtlSales).fall, true)}</td>
//             </tr>

//             {/* TOTAL EOM OH */}
//             <tr>
//               <td className="border border-gray-300 px-4 py-2 font-medium">TOTAL EOM OH</td>
//               {data2025.totalEomOh.map((value, index) => (
//                 <td key={index} className="border border-gray-300 px-4 py-2 text-center">{value}</td>
//               ))}
//               <td className="border border-gray-300 px-4 py-2 text-center font-medium">{calculateTotals(data2025.totalEomOh).annual}</td>
//               <td className="border border-gray-300 px-4 py-2 text-center font-medium">{calculateTotals(data2025.totalEomOh).spring}</td>
//               <td className="border border-gray-300 px-4 py-2 text-center font-medium">{calculateTotals(data2025.totalEomOh).fall}</td>
//             </tr>

//             {/* More rows for 2025 would be added here */}

//           </tbody>
//         </table>
//       </div>
//     )}
//   </div>

//         {/* 2024 Section */}
//         <div>
//           {/* 2024 Header with dropdown and expand/collapse button */}
//           <div className="flex items-center bg-gray-200 p-2 border-t border-gray-300">
//             <button
//               className="mr-2 text-gray-700 focus:outline-none"
//               onClick={() => setYear2024Expanded(!year2024Expanded)}
//             >
//               {year2024Expanded ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
//             </button>
//             <h2 className="font-bold text-gray-800 text-sm">TOTAL 2024</h2>

//             {/* Dropdown taking remaining width */}
//             <div className="ml-auto relative">
//               <button
//                 className="flex items-center justify-between bg-white border border-gray-300 px-3 py-1 rounded text-sm w-48"
//                 onClick={() => setDropdown2024Open(!dropdown2024Open)}
//               >
//                 <span>{selectedView2024}</span>
//                 <ChevronDown size={14} />
//               </button>

//               {dropdown2024Open && (
//                 <div className="absolute right-0 top-full mt-1 w-48 bg-white border border-gray-300 rounded shadow-lg z-10">
//                   {viewOptions.map((option) => (
//                     <div
//                       key={option}
//                       className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm"
//                       onClick={() => {
//                         setSelectedView2024(option);
//                         setDropdown2024Open(false);
//                       }}
//                     >
//                       {option}
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* 2024 Table - only shown when expanded */}
//           {year2024Expanded && (
//             <div className="overflow-x-auto">
//               <table className="min-w-full border-collapse text-sm">
//                 <thead>
//                   <tr className="bg-gray-100">
//                     <th className="border border-gray-300 px-4 py-2 text-left font-semibold">TOTAL 2024</th>
//                     {months.map(month => (
//                       <th key={month} className="border border-gray-300 px-4 py-2 text-center font-semibold">{month}</th>
//                     ))}
//                     <th className="border border-gray-300 px-4 py-2 text-center font-semibold">ANNUAL</th>
//                     <th className="border border-gray-300 px-4 py-2 text-center font-semibold">SPRING</th>
//                     <th className="border border-gray-300 px-4 py-2 text-center font-semibold">FALL</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {/* Total Sales Units */}
//                   <tr className="bg-gray-50">
//                     <td className="border border-gray-300 px-4 py-2 font-medium">Total Sales Units</td>
//                     {data2024.totalSalesUnits.map((value, index) => (
//                       <td key={index} className="border border-gray-300 px-4 py-2 text-center">{value}</td>
//                     ))}
//                     <td className="border border-gray-300 px-4 py-2 text-center font-medium">{calculateTotals(data2024.totalSalesUnits).annual}</td>
//                     <td className="border border-gray-300 px-4 py-2 text-center font-medium">{calculateTotals(data2024.totalSalesUnits).spring}</td>
//                     <td className="border border-gray-300 px-4 py-2 text-center font-medium">{calculateTotals(data2024.totalSalesUnits).fall}</td>
//                   </tr>

//                   {/* More rows for 2024 would be added here */}

//                 </tbody>
//               </table>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CombinedForecastComponent;

// import React, { useState } from "react";
// import { ArrowLeft, Edit, Save, X, ChevronDown, Info } from "lucide-react";
// import { useDispatch } from "react-redux";
// import { resetSelectedProduct } from "../redux/productSlice";
// import { useGetProductDetailsQuery, useUpdateProductDetailsMutation } from "../services/api";

// const ImportantDetailsCards = ({ product, isEditing, editedData, handleChange }) => {
//   const [isExpanded, setIsExpanded] = useState(false);

//   const toggleExpand = () => {
//     setIsExpanded(!isExpanded);
//   };

//   return (
//     <div className="bg-white p-6 rounded-lg border border-gray-200">
//       <div
//         className="flex items-center justify-between cursor-pointer"
//         onClick={toggleExpand}
//       >
//         <h2 className="text-xl font-semibold text-gray-800 flex items-center">
//           <Info size={20} className="mr-2 text-indigo-600" />
//           Important Product Details
//         </h2>
//         <ChevronDown
//           size={20}
//           className={`text-gray-700 transition-transform duration-200 ${isExpanded ? "transform rotate-180" : ""}`}
//         />
//       </div>

//       {isExpanded && (
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-4">
//           {/* KPI Door Count */}
//           <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-4 rounded-lg border border-indigo-100 shadow-sm">
//             <div className="text-sm text-indigo-600 font-medium mb-1">KPI Door Count</div>
//             <div className="flex items-end gap-2">
//               {isEditing ? (
//                 <input
//                   type="number"
//                   className="w-full px-3 py-2 border border-indigo-200 rounded bg-white text-lg font-semibold"
//                   value={editedData.product_details?.kpi_door_count || 0}
//                   onChange={(e) => handleChange('product_details.kpi_door_count', parseInt(e.target.value))}
//                 />
//               ) : (
//                 <div className="text-2xl font-bold text-gray-800">
//                   {product.product_details.kpi_door_count || 0}
//                 </div>
//               )}
//               <div className="text-xs text-gray-500">locations</div>
//             </div>
//           </div>

//           {/* In Transit */}
//           <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-4 rounded-lg border border-emerald-100 shadow-sm">
//             <div className="text-sm text-emerald-600 font-medium mb-1">In Transit</div>
//             <div className="flex items-end gap-2">
//               {isEditing ? (
//                 <input
//                   type="number"
//                   className="w-full px-3 py-2 border border-emerald-200 rounded bg-white text-lg font-semibold"
//                   value={editedData.product_details?.in_transit || 0}
//                   onChange={(e) => handleChange('product_details.in_transit', parseInt(e.target.value))}
//                 />
//               ) : (
//                 <div className="text-2xl font-bold text-gray-800">
//                   {product.product_details.in_transit || 0}
//                 </div>
//               )}
//               <div className="text-xs text-gray-500">units</div>
//             </div>
//           </div>

//           {/* Min Order */}
//           <div className="bg-gradient-to-br from-purple-50 to-fuchsia-50 p-4 rounded-lg border border-purple-100 shadow-sm">
//             <div className="text-sm text-purple-600 font-medium mb-1">Min Order</div>
//             <div className="flex items-end gap-2">
//               {isEditing ? (
//                 <input
//                   type="number"
//                   className="w-full px-3 py-2 border border-purple-200 rounded bg-white text-lg font-semibold"
//                   value={editedData.product_details?.min_order || 0}
//                   onChange={(e) => handleChange('product_details.min_order', parseInt(e.target.value))}
//                 />
//               ) : (
//                 <div className="text-2xl font-bold text-gray-800">
//                   {product.product_details.min_order || 0}
//                 </div>
//               )}
//               <div className="text-xs text-gray-500">units</div>
//             </div>
//           </div>

//           {/* Item Price */}
//           <div className="bg-gradient-to-br from-amber-50 to-yellow-50 p-4 rounded-lg border border-amber-100 shadow-sm">
//             <div className="text-sm text-amber-600 font-medium mb-1">Item Price</div>
//             <div className="flex items-end gap-2">
//               {isEditing ? (
//                 <input
//                   type="text"
//                   className="w-full px-3 py-2 border border-amber-200 rounded bg-white text-lg font-semibold"
//                   value={editedData.product_details?.macys_owned_retail || 0}
//                   onChange={(e) => handleChange('product_details.this_year_last_cost', parseFloat(e.target.value))}
//                 />
//               ) : (
//                 <div className="text-2xl font-bold text-gray-800">
//                   ${product.product_details.this_year_last_cost?.toFixed(2) || "0.00"}
//                 </div>
//               )}
//               <div className="text-xs text-gray-500">cost</div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// const ForecastTable = ({ forecasts, isEditing, editedData, handleChange }) => {
//   const [expandedYear, setExpandedYear] = useState("2025");

//   // Group forecasts by year
//   const forecastsByYear = forecasts.reduce((acc, forecast) => {
//     if (!acc[forecast.year]) {
//       acc[forecast.year] = [];
//     }
//     acc[forecast.year].push(forecast);
//     return acc;
//   }, {});

//   // Predefined rows we want to show in the order we want to show them
//   const rowTypes = [
//     { id: "TY_Unit_Sales", label: "Total Sales Units" },
//     { id: "LY_Unit_Sales", label: "Store Sales Units" },
//     { id: "TY_MCOM_Unit_Sales", label: "COM Sales Units" },
//     { id: "MCOM_PTD_TY_Sales", label: "COM % to TTL (Sales)" },
//     { id: "TY_OH_Units", label: "TOTAL EOM OH" },
//     { id: "MacysProjectionReciepts", label: "Macys Projection Receipts" }
//   ];

//   const toggleYear = (year) => {
//     setExpandedYear(expandedYear === year ? null : year);
//   };

//   const renderForecastTable = (year) => {
//     const yearForecasts = forecastsByYear[year] || [];

//     return (
//       <div className="mb-8">
//         <div
//           className="flex items-center bg-gray-100 p-3 rounded-t-lg cursor-pointer"
//           onClick={() => toggleYear(year)}
//         >
//           <ChevronDown
//             size={18}
//             className={`mr-2 transition-transform duration-200 ${expandedYear === year ? "transform rotate-180" : ""}`}
//           />
//           <h3 className="text-lg font-semibold">TOTAL {year}</h3>
//         </div>

//         {expandedYear === year && (
//           <div className="overflow-x-auto">
//             <table className="min-w-full border-collapse">
//               <thead>
//                 <tr className="bg-white border-b">
//                   <th className="py-3 px-4 text-left text-sm font-medium text-gray-700 w-48">TOTAL {year}</th>
//                   <th className="py-3 px-4 text-center text-sm font-medium text-gray-700">FEB</th>
//                   <th className="py-3 px-4 text-center text-sm font-medium text-gray-700">MAR</th>
//                   <th className="py-3 px-4 text-center text-sm font-medium text-gray-700">APR</th>
//                   <th className="py-3 px-4 text-center text-sm font-medium text-gray-700">MAY</th>
//                   <th className="py-3 px-4 text-center text-sm font-medium text-gray-700">JUN</th>
//                   <th className="py-3 px-4 text-center text-sm font-medium text-gray-700">JUL</th>
//                   <th className="py-3 px-4 text-center text-sm font-medium text-gray-700">AUG</th>
//                   <th className="py-3 px-4 text-center text-sm font-medium text-gray-700">SEP</th>
//                   <th className="py-3 px-4 text-center text-sm font-medium text-gray-700">OCT</th>
//                   <th className="py-3 px-4 text-center text-sm font-medium text-gray-700">NOV</th>
//                   <th className="py-3 px-4 text-center text-sm font-medium text-gray-700">DEC</th>
//                   <th className="py-3 px-4 text-center text-sm font-medium text-gray-700">JAN</th>
//                   <th className="py-3 px-4 text-center text-sm font-medium text-gray-700">ANNUAL</th>
//                   <th className="py-3 px-4 text-center text-sm font-medium text-gray-700">SPRING</th>
//                   <th className="py-3 px-4 text-center text-sm font-medium text-gray-700">FALL</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {rowTypes.map((rowType, rowIndex) => {
//                   const forecast = yearForecasts.find(f => f.variable_name === rowType.id);

//                   // For COM % to TTL, calculate percentage
//                   const isPercentage = rowType.id === "MCOM_PTD_TY_Sales";

//                   // Get total sales and COM sales forecasts for percentage calculation
//                   const totalSales = yearForecasts.find(f => f.variable_name === "TY_Unit_Sales");
//                   const comSales = yearForecasts.find(f => f.variable_name === "TY_MCOM_Unit_Sales");

//                   // Calculate annual total (sum of all months)
//                   const calculateAnnualTotal = (forecast) => {
//                     if (!forecast) return 0;
//                     return (forecast.feb || 0) +
//                            (forecast.mar || 0) +
//                            (forecast.apr || 0) +
//                            (forecast.may || 0) +
//                            (forecast.jun || 0) +
//                            (forecast.jul || 0) +
//                            (forecast.aug || 0) +
//                            (forecast.sep || 0) +
//                            (forecast.oct || 0) +
//                            (forecast.nov || 0) +
//                            (forecast.dec || 0) +
//                            (forecast.jan || 0);
//                   };

//                   // Calculate spring total (Feb-Jul)
//                   const calculateSpringTotal = (forecast) => {
//                     if (!forecast) return 0;
//                     return (forecast.feb || 0) +
//                            (forecast.mar || 0) +
//                            (forecast.apr || 0) +
//                            (forecast.may || 0) +
//                            (forecast.jun || 0) +
//                            (forecast.jul || 0);
//                   };

//                   // Calculate fall total (Aug-Jan)
//                   const calculateFallTotal = (forecast) => {
//                     if (!forecast) return 0;
//                     return (forecast.aug || 0) +
//                            (forecast.sep || 0) +
//                            (forecast.oct || 0) +
//                            (forecast.nov || 0) +
//                            (forecast.dec || 0) +
//                            (forecast.jan || 0);
//                   };

//                   // Helper to format cell values
//                   const formatCellValue = (value, isPercentage) => {
//                     if (isPercentage) {
//                       return `${value}%`;
//                     }
//                     return value;
//                   };

//                   // Calculate percentage if needed
//                   const calculatePercentage = (month) => {
//                     if (!totalSales || !comSales || !totalSales[month] || totalSales[month] === 0) {
//                       return 0;
//                     }
//                     return Math.round((comSales[month] / totalSales[month]) * 100);
//                   };

//                   // Background color for percentage row
//                   const getRowClass = (isPercentage) => {
//                     return isPercentage ? "bg-yellow-50" : (rowIndex % 2 === 0 ? "bg-white" : "bg-gray-50");
//                   };

//                   return (
//                     <tr key={rowType.id} className={getRowClass(isPercentage)}>
//                       <td className="py-3 px-4 border text-sm font-medium">{rowType.label}</td>

//                       {/* February */}
//                       <td className="py-3 px-4 border text-center text-sm">
//                         {isEditing ? (
//                           <input
//                             type="text"
//                             className="w-16 px-2 py-1 border rounded text-center"
//                             value={editedData.monthly_forecast?.[yearForecasts.indexOf(forecast)]?.feb || forecast?.feb || 0}
//                             onChange={(e) => {
//                               const value = isPercentage ? parseInt(e.target.value) : parseFloat(e.target.value);
//                               const newForecast = [...editedData.monthly_forecast];
//                               const index = yearForecasts.indexOf(forecast);
//                               if (index >= 0) {
//                                 newForecast[index] = {
//                                   ...newForecast[index],
//                                   feb: value
//                                 };
//                                 handleChange('monthly_forecast', newForecast);
//                               }
//                             }}
//                           />
//                         ) : (
//                           isPercentage ?
//                           formatCellValue(calculatePercentage('feb'), true) :
//                           (forecast?.feb || 0)
//                         )}
//                       </td>

//                       {/* March */}
//                       <td className="py-3 px-4 border text-center text-sm">
//                         {isEditing ? (
//                           <input
//                             type="text"
//                             className="w-16 px-2 py-1 border rounded text-center"
//                             value={editedData.monthly_forecast?.[yearForecasts.indexOf(forecast)]?.mar || forecast?.mar || 0}
//                             onChange={(e) => {
//                               const value = isPercentage ? parseInt(e.target.value) : parseFloat(e.target.value);
//                               const newForecast = [...editedData.monthly_forecast];
//                               const index = yearForecasts.indexOf(forecast);
//                               if (index >= 0) {
//                                 newForecast[index] = {
//                                   ...newForecast[index],
//                                   mar: value
//                                 };
//                                 handleChange('monthly_forecast', newForecast);
//                               }
//                             }}
//                           />
//                         ) : (
//                           isPercentage ?
//                           formatCellValue(calculatePercentage('mar'), true) :
//                           (forecast?.mar || 0)
//                         )}
//                       </td>

//                       {/* April */}
//                       <td className="py-3 px-4 border text-center text-sm">
//                         {isEditing ? (
//                           <input
//                             type="text"
//                             className="w-16 px-2 py-1 border rounded text-center"
//                             value={editedData.monthly_forecast?.[yearForecasts.indexOf(forecast)]?.apr || forecast?.apr || 0}
//                             onChange={(e) => {
//                               const value = isPercentage ? parseInt(e.target.value) : parseFloat(e.target.value);
//                               const newForecast = [...editedData.monthly_forecast];
//                               const index = yearForecasts.indexOf(forecast);
//                               if (index >= 0) {
//                                 newForecast[index] = {
//                                   ...newForecast[index],
//                                   apr: value
//                                 };
//                                 handleChange('monthly_forecast', newForecast);
//                               }
//                             }}
//                           />
//                         ) : (
//                           isPercentage ?
//                           formatCellValue(calculatePercentage('apr'), true) :
//                           (forecast?.apr || 0)
//                         )}
//                       </td>

//                       {/* May */}
//                       <td className="py-3 px-4 border text-center text-sm">
//                         {isEditing ? (
//                           <input
//                             type="text"
//                             className="w-16 px-2 py-1 border rounded text-center"
//                             value={editedData.monthly_forecast?.[yearForecasts.indexOf(forecast)]?.may || forecast?.may || 0}
//                             onChange={(e) => {
//                               const value = isPercentage ? parseInt(e.target.value) : parseFloat(e.target.value);
//                               const newForecast = [...editedData.monthly_forecast];
//                               const index = yearForecasts.indexOf(forecast);
//                               if (index >= 0) {
//                                 newForecast[index] = {
//                                   ...newForecast[index],
//                                   may: value
//                                 };
//                                 handleChange('monthly_forecast', newForecast);
//                               }
//                             }}
//                           />
//                         ) : (
//                           isPercentage ?
//                           formatCellValue(calculatePercentage('may'), true) :
//                           (forecast?.may || 0)
//                         )}
//                       </td>

//                       {/* June */}
//                       <td className="py-3 px-4 border text-center text-sm">
//                         {isEditing ? (
//                           <input
//                             type="text"
//                             className="w-16 px-2 py-1 border rounded text-center"
//                             value={editedData.monthly_forecast?.[yearForecasts.indexOf(forecast)]?.jun || forecast?.jun || 0}
//                             onChange={(e) => {
//                               const value = isPercentage ? parseInt(e.target.value) : parseFloat(e.target.value);
//                               const newForecast = [...editedData.monthly_forecast];
//                               const index = yearForecasts.indexOf(forecast);
//                               if (index >= 0) {
//                                 newForecast[index] = {
//                                   ...newForecast[index],
//                                   jun: value
//                                 };
//                                 handleChange('monthly_forecast', newForecast);
//                               }
//                             }}
//                           />
//                         ) : (
//                           isPercentage ?
//                           formatCellValue(calculatePercentage('jun'), true) :
//                           (forecast?.jun || 0)
//                         )}
//                       </td>

//                       {/* July */}
//                       <td className="py-3 px-4 border text-center text-sm">
//                         {isEditing ? (
//                           <input
//                             type="text"
//                             className="w-16 px-2 py-1 border rounded text-center"
//                             value={editedData.monthly_forecast?.[yearForecasts.indexOf(forecast)]?.jul || forecast?.jul || 0}
//                             onChange={(e) => {
//                               const value = isPercentage ? parseInt(e.target.value) : parseFloat(e.target.value);
//                               const newForecast = [...editedData.monthly_forecast];
//                               const index = yearForecasts.indexOf(forecast);
//                               if (index >= 0) {
//                                 newForecast[index] = {
//                                   ...newForecast[index],
//                                   jul: value
//                                 };
//                                 handleChange('monthly_forecast', newForecast);
//                               }
//                             }}
//                           />
//                         ) : (
//                           isPercentage ?
//                           formatCellValue(calculatePercentage('jul'), true) :
//                           (forecast?.jul || 0)
//                         )}
//                       </td>

//                       {/* August */}
//                       <td className="py-3 px-4 border text-center text-sm">
//                         {isEditing ? (
//                           <input
//                             type="text"
//                             className="w-16 px-2 py-1 border rounded text-center"
//                             value={editedData.monthly_forecast?.[yearForecasts.indexOf(forecast)]?.aug || forecast?.aug || 0}
//                             onChange={(e) => {
//                               const value = isPercentage ? parseInt(e.target.value) : parseFloat(e.target.value);
//                               const newForecast = [...editedData.monthly_forecast];
//                               const index = yearForecasts.indexOf(forecast);
//                               if (index >= 0) {
//                                 newForecast[index] = {
//                                   ...newForecast[index],
//                                   aug: value
//                                 };
//                                 handleChange('monthly_forecast', newForecast);
//                               }
//                             }}
//                           />
//                         ) : (
//                           isPercentage ?
//                           formatCellValue(calculatePercentage('aug'), true) :
//                           (forecast?.aug || 0)
//                         )}
//                       </td>

//                       {/* September */}
//                       <td className="py-3 px-4 border text-center text-sm">
//                         {isEditing ? (
//                           <input
//                             type="text"
//                             className="w-16 px-2 py-1 border rounded text-center"
//                             value={editedData.monthly_forecast?.[yearForecasts.indexOf(forecast)]?.sep || forecast?.sep || 0}
//                             onChange={(e) => {
//                               const value = isPercentage ? parseInt(e.target.value) : parseFloat(e.target.value);
//                               const newForecast = [...editedData.monthly_forecast];
//                               const index = yearForecasts.indexOf(forecast);
//                               if (index >= 0) {
//                                 newForecast[index] = {
//                                   ...newForecast[index],
//                                   sep: value
//                                 };
//                                 handleChange('monthly_forecast', newForecast);
//                               }
//                             }}
//                           />
//                         ) : (
//                           isPercentage ?
//                           formatCellValue(calculatePercentage('sep'), true) :
//                           (forecast?.sep || 0)
//                         )}
//                       </td>

//                       {/* October */}
//                       <td className="py-3 px-4 border text-center text-sm">
//                         {isEditing ? (
//                           <input
//                             type="text"
//                             className="w-16 px-2 py-1 border rounded text-center"
//                             value={editedData.monthly_forecast?.[yearForecasts.indexOf(forecast)]?.oct || forecast?.oct || 0}
//                             onChange={(e) => {
//                               const value = isPercentage ? parseInt(e.target.value) : parseFloat(e.target.value);
//                               const newForecast = [...editedData.monthly_forecast];
//                               const index = yearForecasts.indexOf(forecast);
//                               if (index >= 0) {
//                                 newForecast[index] = {
//                                   ...newForecast[index],
//                                   oct: value
//                                 };
//                                 handleChange('monthly_forecast', newForecast);
//                               }
//                             }}
//                           />
//                         ) : (
//                           isPercentage ?
//                           formatCellValue(calculatePercentage('oct'), true) :
//                           (forecast?.oct || 0)
//                         )}
//                       </td>

//                       {/* November */}
//                       <td className="py-3 px-4 border text-center text-sm">
//                         {isEditing ? (
//                           <input
//                             type="text"
//                             className="w-16 px-2 py-1 border rounded text-center"
//                             value={editedData.monthly_forecast?.[yearForecasts.indexOf(forecast)]?.nov || forecast?.nov || 0}
//                             onChange={(e) => {
//                               const value = isPercentage ? parseInt(e.target.value) : parseFloat(e.target.value);
//                               const newForecast = [...editedData.monthly_forecast];
//                               const index = yearForecasts.indexOf(forecast);
//                               if (index >= 0) {
//                                 newForecast[index] = {
//                                   ...newForecast[index],
//                                   nov: value
//                                 };
//                                 handleChange('monthly_forecast', newForecast);
//                               }
//                             }}
//                           />
//                         ) : (
//                           isPercentage ?
//                           formatCellValue(calculatePercentage('nov'), true) :
//                           (forecast?.nov || 0)
//                         )}
//                       </td>

//                       {/* December */}
//                       <td className="py-3 px-4 border text-center text-sm">
//                         {isEditing ? (
//                           <input
//                             type="text"
//                             className="w-16 px-2 py-1 border rounded text-center"
//                             value={editedData.monthly_forecast?.[yearForecasts.indexOf(forecast)]?.dec || forecast?.dec || 0}
//                             onChange={(e) => {
//                               const value = isPercentage ? parseInt(e.target.value) : parseFloat(e.target.value);
//                               const newForecast = [...editedData.monthly_forecast];
//                               const index = yearForecasts.indexOf(forecast);
//                               if (index >= 0) {
//                                 newForecast[index] = {
//                                   ...newForecast[index],
//                                   dec: value
//                                 };
//                                 handleChange('monthly_forecast', newForecast);
//                               }
//                             }}
//                           />
//                         ) : (
//                           isPercentage ?
//                           formatCellValue(calculatePercentage('dec'), true) :
//                           (forecast?.dec || 0)
//                         )}
//                       </td>

//                       {/* January */}
//                       <td className="py-3 px-4 border text-center text-sm">
//                         {isEditing ? (
//                           <input
//                             type="text"
//                             className="w-16 px-2 py-1 border rounded text-center"
//                             value={editedData.monthly_forecast?.[yearForecasts.indexOf(forecast)]?.jan || forecast?.jan || 0}
//                             onChange={(e) => {
//                               const value = isPercentage ? parseInt(e.target.value) : parseFloat(e.target.value);
//                               const newForecast = [...editedData.monthly_forecast];
//                               const index = yearForecasts.indexOf(forecast);
//                               if (index >= 0) {
//                                 newForecast[index] = {
//                                   ...newForecast[index],
//                                   jan: value
//                                 };
//                                 handleChange('monthly_forecast', newForecast);
//                               }
//                             }}
//                           />
//                         ) : (
//                           isPercentage ?
//                           formatCellValue(calculatePercentage('jan'), true) :
//                           (forecast?.jan || 0)
//                         )}
//                       </td>

//                       {/* Annual total */}
//                       <td className="py-3 px-4 border text-center text-sm font-medium">
//                         {isPercentage ?
//                           formatCellValue(Math.round(calculateAnnualTotal(comSales) / calculateAnnualTotal(totalSales) * 100), true) :
//                           calculateAnnualTotal(forecast)}
//                       </td>

//                       {/* Spring total */}
//                       <td className="py-3 px-4 border text-center text-sm">
//                         {isPercentage ?
//                           formatCellValue(Math.round(calculateSpringTotal(comSales) / calculateSpringTotal(totalSales) * 100), true) :
//                           calculateSpringTotal(forecast)}
//                       </td>

//                       {/* Fall total */}
//                       <td className="py-3 px-4 border text-center text-sm">
//                         {isPercentage ?
//                           formatCellValue(Math.round(calculateFallTotal(comSales) / calculateFallTotal(totalSales) * 100), true) :
//                           calculateFallTotal(forecast)}
//                       </td>
//                     </tr>
//                   );
//                 })}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </div>
//     );
//   };

//   const years = Object.keys(forecastsByYear).sort((a, b) => b - a); // Sort years in descending order

//   return (
//     <div>
//       {years.map(year => renderForecastTable(year))}
//     </div>
//   );
// };

// const ProductDetailsView = ({ productId, category }) => {
//   const dispatch = useDispatch();
//   const [isEditing, setIsEditing] = React.useState(false);
//   const [editedData, setEditedData] = React.useState({});

//   // Fetch product details from API
//   const {
//     data: productDetails,
//     isLoading,
//     isError
//   } = useGetProductDetailsQuery(productId);

//   // Mutation for updating product details
//   const [updateProductDetails, { isLoading: isUpdating }] = useUpdateProductDetailsMutation();

//   // Initialize edited data when product details are loaded
//   React.useEffect(() => {
//     if (productDetails) {
//       setEditedData(productDetails);
//     }
//   }, [productDetails]);

//   // Handle going back to product list
//   const handleBack = () => {
//     dispatch(resetSelectedProduct());
//   };

//   // Handle editing mode toggle
//   const toggleEditMode = () => {
//     setIsEditing(!isEditing);
//   };

//   // Handle save changes
//   const handleSave = async () => {
//     try {
//       await updateProductDetails({
//         productId,
//         productData: editedData
//       }).unwrap();
//       setIsEditing(false);
//     } catch (error) {
//       console.error("Failed to save product details:", error);
//       // You could add error handling UI here
//     }
//   };

//   // Handle input changes
//   const handleChange = (field, value) => {
//     setEditedData(prev => ({
//       ...prev,
//       [field]: value
//     }));
//   };

//   // Handle form submission
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     handleSave();
//   };

//   if (isLoading) {
//     return (
//       <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-lg p-8">
//         <div className="animate-pulse flex flex-col space-y-4">
//           <div className="h-8 bg-gray-200 rounded w-1/3"></div>
//           <div className="h-4 bg-gray-200 rounded w-1/2"></div>
//           <div className="h-64 bg-gray-200 rounded w-full"></div>
//         </div>
//       </div>
//     );
//   }

//   if (isError) {
//     return (
//       <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-lg p-8">
//         <div className="flex items-center mb-6">
//           <button
//             onClick={handleBack}
//             className="flex items-center text-indigo-600 hover:text-indigo-800"
//           >
//             <ArrowLeft size={16} className="mr-2" /> Back to products
//           </button>
//         </div>
//         <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg">
//           <p>Failed to load product details. Please try again later.</p>
//         </div>
//       </div>
//     );
//   }

//   // Default to mock data structure if API data is not available
//   const product = productDetails || {
//     product_details: {
//       product_id: productId,
//       product_description: "Product Description",
//       price: "$0.00",
//       material: "Unknown",
//       category: category,
//       stock: 0,
//       tags: []
//     },
//     monthly_forecast: []
//   };

//   return (
//     <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
//       {/* Header */}
//       <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 p-6">
//         <div className="flex justify-between items-center">
//           <div>
//             <button
//               onClick={handleBack}
//               className="flex items-center text-white opacity-80 hover:opacity-100 mb-2"
//             >
//               <ArrowLeft size={16} className="mr-2" /> Back to products
//             </button>
//             <h1 className="text-2xl font-bold text-white">
//               {isEditing ? "Edit Product Details" : product.product_details.product_description || productId}
//             </h1>
//           </div>
//           <div>
//             {isEditing ? (
//               <div className="flex space-x-2">
//                 <button
//                   onClick={handleSave}
//                   disabled={isUpdating}
//                   className="bg-white text-indigo-700 px-4 py-2 rounded-lg flex items-center"
//                 >
//                   <Save size={16} className="mr-2" />
//                   {isUpdating ? "Saving..." : "Save"}
//                 </button>
//                 <button
//                   onClick={toggleEditMode}
//                   className="bg-white bg-opacity-20 text-white px-4 py-2 rounded-lg flex items-center"
//                 >
//                   <X size={16} className="mr-2" />
//                   Cancel
//                 </button>
//               </div>
//             ) : (
//               <button
//                 onClick={toggleEditMode}
//                 className="bg-white text-indigo-700 px-4 py-2 rounded-lg flex items-center"
//               >
//                 <Edit size={16} className="mr-2" />
//                 Edit
//               </button>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Content */}
//       <div className="p-6">
//         <form onSubmit={handleSubmit}>
//           <div className="space-y-6">
//             {/* Product Details Section */}
//             <div className="bg-white p-6 rounded-lg border border-gray-200">
//               <h2 className="text-xl font-semibold text-gray-800 mb-4">Product Information</h2>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Product ID
//                   </label>
//                   <input
//                     type="text"
//                     value={productId}
//                     disabled
//                     className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Description
//                   </label>
//                   <input
//                     type="text"
//                     value={isEditing ? editedData.product_details?.product_description : product.product_details.product_description}
//                     onChange={(e) => handleChange('product_details.product_description', e.target.value)}
//                     disabled={!isEditing}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-md"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     BLU
//                   </label>
//                   <input
//                     type="text"
//                     value={isEditing ? editedData.product_details?.blu : product.product_details.blu}
//                     onChange={(e) => handleChange('product_details.blu', e.target.value)}
//                     disabled={!isEditing}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-md"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     MKST
//                   </label>
//                   <input
//                     type="text"
//                     value={isEditing ? editedData.product_details?.mkst : product.product_details.mkst}
//                     onChange={(e) => handleChange('product_details.mkst', e.target.value)}
//                     disabled={!isEditing}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-md"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Current FC Index
//                   </label>
//                   <input
//                     type="text"
//                     value={isEditing ? editedData.product_details?.currect_fc_index : product.product_details.currect_fc_index}
//                     onChange={(e) => handleChange('product_details.currect_fc_index', e.target.value)}
//                     disabled={!isEditing}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-md"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Retail Price
//                   </label>
//                   <input
//                     type="text"
//                     value={isEditing ? editedData.product_details?.macys_owned_retail : product.product_details.macys_owned_retail}
//                     onChange={(e) => handleChange('product_details.macys_owned_retail', e.target.value)}
//                     disabled={!isEditing}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-md"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Current Stock
//                   </label>
//                   <input
//                     type="number"
//                     value={isEditing ? editedData.product_details?.macys_onhand : product.product_details.macys_onhand}
//                     onChange={(e) => handleChange('product_details.macys_onhand', parseInt(e.target.value))}
//                     disabled={!isEditing}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-md"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Vendor
//                   </label>
//                   <input
//                     type="text"
//                     value={isEditing ? editedData.product_details?.vendor_name : product.product_details.vendor_name}
//                     onChange={(e) => handleChange('product_details.vendor_name', e.target.value)}
//                     disabled={!isEditing}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-md"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Department
//                   </label>
//                   <input
//                     type="text"
//                     value={isEditing ? editedData.product_details?.department_description : product.product_details.department_description}
//                     disabled
//                     className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Holiday Build
//                   </label>
//                   <input
//                     type="number"
//                     value={isEditing ? editedData.product_details?.holiday_build_fc : product.product_details.holiday_build_fc}
//                     onChange={(e) => handleChange('product_details.holiday_build_fc', parseInt(e.target.value))}
//                     disabled={!isEditing}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-md"
//                   />
//                 </div>
//               </div>
//             </div>

//             {/* Important Details Cards */}
//             <ImportantDetailsCards
//               product={product}
//               isEditing={isEditing}
//               editedData={editedData}
//               handleChange={handleChange}
//             />

//             {/* Monthly Forecast */}
//             <div className="bg-white p-6 rounded-lg border border-gray-200">
//               <h2 className="text-xl font-semibold text-gray-800 mb-4">Monthly Forecast</h2>

//               {product.monthly_forecast && product.monthly_forecast.length > 0 ? (
//                 <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
//                   <ForecastTable
//                     forecasts={product.monthly_forecast}
//                     isEditing={isEditing}
//                     editedData={editedData}
//                     handleChange={handleChange}
//                   />
//                 </div>
//               ) : (
//                 <div className="text-center py-8 text-gray-500">
//                   No forecast data available for this product.
//                 </div>
//               )}
//             </div>
//           </div>

//           {isEditing && (
//             <div className="mt-6 flex justify-end">
//               <button
//                 type="button"
//                 onClick={toggleEditMode}
//                 className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 mr-2"
//               >
//                 Cancel
//               </button>
//               <button
//                 type="submit"
//                 disabled={isUpdating}
//                 className="px-4 py-2 bg-indigo-600 text-white rounded-md"
//               >
//                 {isUpdating ? "Saving..." : "Save Changes"}
//               </button>
//             </div>
//           )}
//         </form>
//       </div>
//     </div>
//   );
// };

// export default ProductDetailsView;

import React, { useState } from "react";
import { ArrowLeft, Edit, Save, X, ChevronDown, Info } from "lucide-react";
import { useDispatch } from "react-redux";
import { resetSelectedProduct } from "../redux/productSlice";
import {
  useGetProductDetailsQuery,
  useUpdateProductDetailsMutation,
} from "../services/api";

const ImportantDetailsCards = ({
  product,
  isEditing,
  editedData,
  handleChange,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200">
      <div
        className="flex items-center justify-between cursor-pointer"
        onClick={toggleExpand}
      >
        <h2 className="text-xl font-semibold text-gray-800 flex items-center">
          <Info size={20} className="mr-2 text-indigo-600" />
          Important Product Details
        </h2>
        <ChevronDown
          size={20}
          className={`text-gray-700 transition-transform duration-200 ${
            isExpanded ? "transform rotate-180" : ""
          }`}
        />
      </div>

      {isExpanded && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-4">
          {/* KPI Door Count */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-4 rounded-lg border border-indigo-100 shadow-sm">
            <div className="text-sm text-indigo-600 font-medium mb-1">
              KPI Door Count
            </div>
            <div className="flex items-end gap-2">
              {isEditing ? (
                <input
                  type="number"
                  className="w-full px-3 py-2 border border-indigo-200 rounded bg-white text-lg font-semibold"
                  value={editedData.product_details?.kpi_door_count || 0}
                  onChange={(e) =>
                    handleChange(
                      "product_details.kpi_door_count",
                      parseInt(e.target.value)
                    )
                  }
                />
              ) : (
                <div className="text-2xl font-bold text-gray-800">
                  {product.product_details.kpi_door_count || 0}
                </div>
              )}
              <div className="text-xs text-gray-500">locations</div>
            </div>
          </div>

          {/* In Transit */}
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-4 rounded-lg border border-emerald-100 shadow-sm">
            <div className="text-sm text-emerald-600 font-medium mb-1">
              In Transit
            </div>
            <div className="flex items-end gap-2">
              {isEditing ? (
                <input
                  type="number"
                  className="w-full px-3 py-2 border border-emerald-200 rounded bg-white text-lg font-semibold"
                  value={editedData.product_details?.in_transit || 0}
                  onChange={(e) =>
                    handleChange(
                      "product_details.in_transit",
                      parseInt(e.target.value)
                    )
                  }
                />
              ) : (
                <div className="text-2xl font-bold text-gray-800">
                  {product.product_details.in_transit || 0}
                </div>
              )}
              <div className="text-xs text-gray-500">units</div>
            </div>
          </div>

          {/* Min Order */}
          <div className="bg-gradient-to-br from-purple-50 to-fuchsia-50 p-4 rounded-lg border border-purple-100 shadow-sm">
            <div className="text-sm text-purple-600 font-medium mb-1">
              Min Order
            </div>
            <div className="flex items-end gap-2">
              {isEditing ? (
                <input
                  type="number"
                  className="w-full px-3 py-2 border border-purple-200 rounded bg-white text-lg font-semibold"
                  value={editedData.product_details?.min_order || 0}
                  onChange={(e) =>
                    handleChange(
                      "product_details.min_order",
                      parseInt(e.target.value)
                    )
                  }
                />
              ) : (
                <div className="text-2xl font-bold text-gray-800">
                  {product.product_details.min_order || 0}
                </div>
              )}
              <div className="text-xs text-gray-500">units</div>
            </div>
          </div>

          {/* Item Price */}
          <div className="bg-gradient-to-br from-amber-50 to-yellow-50 p-4 rounded-lg border border-amber-100 shadow-sm">
            <div className="text-sm text-amber-600 font-medium mb-1">
              Item Price
            </div>
            <div className="flex items-end gap-2">
              {isEditing ? (
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-amber-200 rounded bg-white text-lg font-semibold"
                  value={editedData.product_details?.macys_owned_retail || 0}
                  onChange={(e) =>
                    handleChange(
                      "product_details.this_year_last_cost",
                      parseFloat(e.target.value)
                    )
                  }
                />
              ) : (
                <div className="text-2xl font-bold text-gray-800">
                  $
                  {product.product_details.this_year_last_cost?.toFixed(2) ||
                    "0.00"}
                </div>
              )}
              <div className="text-xs text-gray-500">cost</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const RollingForecastTable = ({
  tableData,
  twelveMonthFC,
  setTwelveMonthFC,
  isEditing,
  handleTableDataChange,
}) => {
  const months = [
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

  // Format row data with totals (Annual, Spring, Fall)
  const formatRowWithTotals = (rowData) => {
    if (!rowData || !Array.isArray(rowData) || rowData.length !== 12) {
      // Return array of 15 elements (12 months + 3 totals) with default values
      return Array(15).fill(0);
    }

    const annual = rowData.reduce(
      (sum, val) => sum + (parseFloat(val) || 0),
      0
    );
    const spring = rowData
      .slice(0, 6)
      .reduce((sum, val) => sum + (parseFloat(val) || 0), 0); // Feb-Jul
    const fall = rowData
      .slice(6)
      .reduce((sum, val) => sum + (parseFloat(val) || 0), 0); // Aug-Jan

    return [...rowData, annual, spring, fall];
  };

  // Default table data structure
  const defaultTableData = {
    monthlyPercentages: [13, 3, 7, 8, 5, 4, 8, 6, 8, 13, 23, 2], // Index percentages from image
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

  const currentTableData = tableData || defaultTableData;

  const handleCellChange = (rowKey, monthIndex, value) => {
    if (!isEditing || !handleTableDataChange) return;

    const newData = { ...currentTableData };
    if (!newData[rowKey]) {
      newData[rowKey] = Array(12).fill(0);
    }
    newData[rowKey][monthIndex] = parseFloat(value) || 0;
    handleTableDataChange(newData);
  };

  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200">
      {/* Top controls section */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Forecasting Method
          </label>
          <select className="w-full px-3 py-2 border border-gray-300 rounded text-sm">
            <option>fc by index</option>
          </select>
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Current FC Index
          </label>
          <input
            type="text"
            value="dia"
            className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
            disabled={!isEditing}
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Change Trend (%)
          </label>
          <input
            type="number"
            value="0"
            className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
            disabled={!isEditing}
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">
            12M FC by Index
          </label>
          <input
            type="text"
            value={twelveMonthFC || "783"}
            onChange={(e) =>
              setTwelveMonthFC && setTwelveMonthFC(e.target.value)
            }
            disabled={!isEditing}
            className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
          />
        </div>
      </div>

      {/* Forecast Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-50">
              <th className="border border-gray-300 px-3 py-2 text-left text-xs font-medium text-gray-700 w-40">
                ROLLING 12M FC
              </th>
              {months.map((month) => (
                <th
                  key={month}
                  className="border border-gray-300 px-3 py-2 text-center text-xs font-medium text-gray-700 w-16"
                >
                  {month}
                </th>
              ))}
              <th className="border border-gray-300 px-3 py-2 text-center text-xs font-medium text-gray-700 w-20">
                ANNUAL
              </th>
              <th className="border border-gray-300 px-3 py-2 text-center text-xs font-medium text-gray-700 w-20">
                SPRING
              </th>
              <th className="border border-gray-300 px-3 py-2 text-center text-xs font-medium text-gray-700 w-20">
                FALL
              </th>
            </tr>
          </thead>
          <tbody>
            {/* Index Row */}
            <tr className="bg-white">
              <td className="border border-gray-300 px-3 py-1 text-xs font-medium text-gray-800">
                Index
              </td>
              {formatRowWithTotals(currentTableData.monthlyPercentages).map(
                (value, i) => (
                  <td
                    key={i}
                    className={`border border-gray-300 px-2 py-1 text-center text-xs ${
                      i > 11 ? "font-medium bg-gray-50" : ""
                    }`}
                  >
                    {isEditing && i < 12 ? (
                      <input
                        type="number"
                        step="1"
                        className="w-full text-center text-xs border-0 p-0 bg-transparent"
                        value={value}
                        onChange={(e) =>
                          handleCellChange(
                            "monthlyPercentages",
                            i,
                            e.target.value
                          )
                        }
                      />
                    ) : (
                      `${value}%`
                    )}
                  </td>
                )
              )}
            </tr>

            {/* FC by Index Row */}
            <tr className="bg-white">
              <td className="border border-gray-300 px-3 py-1 text-xs font-medium text-gray-800">
                FC by Index
              </td>
              {formatRowWithTotals(currentTableData.fcByIndex).map(
                (value, i) => (
                  <td
                    key={i}
                    className={`border border-gray-300 px-2 py-1 text-center text-xs ${
                      i > 11 ? "font-medium bg-gray-50" : ""
                    }`}
                  >
                    {isEditing && i < 12 ? (
                      <input
                        type="number"
                        className="w-full text-center text-xs border-0 p-0 bg-transparent"
                        value={value}
                        onChange={(e) =>
                          handleCellChange("fcByIndex", i, e.target.value)
                        }
                      />
                    ) : (
                      value
                    )}
                  </td>
                )
              )}
            </tr>

            {/* FC by Trend Row */}
            <tr className="bg-white">
              <td className="border border-gray-300 px-3 py-1 text-xs font-medium text-gray-800">
                FC by Trend
              </td>
              {formatRowWithTotals(currentTableData.fcByTrend).map(
                (value, i) => (
                  <td
                    key={i}
                    className={`border border-gray-300 px-2 py-1 text-center text-xs ${
                      i > 11 ? "font-medium bg-gray-50" : ""
                    }`}
                  >
                    {isEditing && i < 12 ? (
                      <input
                        type="number"
                        className="w-full text-center text-xs border-0 p-0 bg-transparent"
                        value={value}
                        onChange={(e) =>
                          handleCellChange("fcByTrend", i, e.target.value)
                        }
                      />
                    ) : (
                      value
                    )}
                  </td>
                )
              )}
            </tr>

            {/* Recommended FC Row - Highlighted */}
            <tr className="bg-yellow-100">
              <td className="border border-gray-300 px-3 py-1 text-xs font-medium text-gray-800">
                Recommended FC
              </td>
              {formatRowWithTotals(currentTableData.recommendedFC).map(
                (value, i) => (
                  <td
                    key={i}
                    className={`border border-gray-300 px-2 py-1 text-center text-xs ${
                      i > 11 ? "font-medium bg-yellow-200" : ""
                    }`}
                  >
                    {isEditing && i < 12 ? (
                      <input
                        type="number"
                        className="w-full text-center text-xs border-0 p-0 bg-transparent"
                        value={value}
                        onChange={(e) =>
                          handleCellChange("recommendedFC", i, e.target.value)
                        }
                      />
                    ) : (
                      value
                    )}
                  </td>
                )
              )}
            </tr>

            {/* Planned FC Row */}
            <tr className="bg-white">
              <td className="border border-gray-300 px-3 py-1 text-xs font-medium text-gray-800">
                Planned FC
              </td>
              {formatRowWithTotals(currentTableData.plannedFC).map(
                (value, i) => (
                  <td
                    key={i}
                    className={`border border-gray-300 px-2 py-1 text-center text-xs ${
                      i > 11 ? "font-medium bg-gray-50" : ""
                    }`}
                  >
                    {isEditing && i < 12 ? (
                      <input
                        type="number"
                        className="w-full text-center text-xs border-0 p-0 bg-transparent"
                        value={value}
                        onChange={(e) =>
                          handleCellChange("plannedFC", i, e.target.value)
                        }
                      />
                    ) : (
                      value
                    )}
                  </td>
                )
              )}
            </tr>

            {/* Planned Shipments Row */}
            <tr className="bg-white">
              <td className="border border-gray-300 px-3 py-1 text-xs font-medium text-gray-800">
                Planned Shipments
              </td>
              {formatRowWithTotals(currentTableData.plannedShipments).map(
                (value, i) => (
                  <td
                    key={i}
                    className={`border border-gray-300 px-2 py-1 text-center text-xs ${
                      i > 11 ? "font-medium bg-gray-50" : ""
                    }`}
                  >
                    {isEditing && i < 12 ? (
                      <input
                        type="number"
                        className="w-full text-center text-xs border-0 p-0 bg-transparent"
                        value={value}
                        onChange={(e) =>
                          handleCellChange(
                            "plannedShipments",
                            i,
                            e.target.value
                          )
                        }
                      />
                    ) : (
                      value
                    )}
                  </td>
                )
              )}
            </tr>

            {/* Planned EOH Row */}
            <tr className="bg-white">
              <td className="border border-gray-300 px-3 py-1 text-xs font-medium text-gray-800">
                Planned EOH (Cal)
              </td>
              {formatRowWithTotals(currentTableData.plannedEOH).map(
                (value, i) => (
                  <td
                    key={i}
                    className={`border border-gray-300 px-2 py-1 text-center text-xs ${
                      i > 11 ? "font-medium bg-gray-50" : ""
                    }`}
                  >
                    {isEditing && i < 12 ? (
                      <input
                        type="number"
                        className="w-full text-center text-xs border-0 p-0 bg-transparent"
                        value={value}
                        onChange={(e) =>
                          handleCellChange("plannedEOH", i, e.target.value)
                        }
                      />
                    ) : (
                      value
                    )}
                  </td>
                )
              )}
            </tr>

            {/* Gross Projection Row */}
            <tr className="bg-white">
              <td className="border border-gray-300 px-3 py-1 text-xs font-medium text-gray-800">
                Gross Projection (Nav)
              </td>
              {formatRowWithTotals(currentTableData.grossProjection).map(
                (value, i) => (
                  <td
                    key={i}
                    className={`border border-gray-300 px-2 py-1 text-center text-xs ${
                      i > 11 ? "font-medium bg-gray-50" : ""
                    } ${value > 0 && i < 12 ? "bg-yellow-100" : ""}`}
                  >
                    {isEditing && i < 12 ? (
                      <input
                        type="number"
                        className="w-full text-center text-xs border-0 p-0 bg-transparent"
                        value={value}
                        onChange={(e) =>
                          handleCellChange("grossProjection", i, e.target.value)
                        }
                      />
                    ) : (
                      value
                    )}
                  </td>
                )
              )}
            </tr>

            {/* Macy's Proj Receipts Row */}
            <tr className="bg-white">
              <td className="border border-gray-300 px-3 py-1 text-xs font-medium text-gray-800">
                Macys Proj Receipts
              </td>
              {formatRowWithTotals(currentTableData.macysProjReceipts).map(
                (value, i) => (
                  <td
                    key={i}
                    className={`border border-gray-300 px-2 py-1 text-center text-xs ${
                      i > 11 ? "font-medium bg-gray-50" : ""
                    } ${value > 0 && i < 12 ? "bg-red-100 text-red-700" : ""}`}
                  >
                    {isEditing && i < 12 ? (
                      <input
                        type="number"
                        className="w-full text-center text-xs border-0 p-0 bg-transparent"
                        value={value}
                        onChange={(e) =>
                          handleCellChange(
                            "macysProjReceipts",
                            i,
                            e.target.value
                          )
                        }
                      />
                    ) : (
                      value
                    )}
                  </td>
                )
              )}
            </tr>

            {/* Planned Sell Thru % Row */}
            <tr className="bg-white">
              <td className="border border-gray-300 px-3 py-1 text-xs font-medium text-gray-800">
                Planned Sell thru %
              </td>
              {formatRowWithTotals(currentTableData.plannedSellThru).map(
                (value, i) => (
                  <td
                    key={i}
                    className={`border border-gray-300 px-2 py-1 text-center text-xs ${
                      i > 11 ? "font-medium bg-gray-50" : ""
                    }`}
                  >
                    {isEditing && i < 12 ? (
                      <input
                        type="number"
                        step="1"
                        className="w-full text-center text-xs border-0 p-0 bg-transparent"
                        value={value}
                        onChange={(e) =>
                          handleCellChange("plannedSellThru", i, e.target.value)
                        }
                      />
                    ) : (
                      `${value}%`
                    )}
                  </td>
                )
              )}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
const ForecastTable = ({ forecasts, isEditing, editedData, handleChange }) => {
  const [expandedYear, setExpandedYear] = useState("2025");

  // Group forecasts by year
  const forecastsByYear = forecasts.reduce((acc, forecast) => {
    if (!acc[forecast.year]) {
      acc[forecast.year] = [];
    }
    acc[forecast.year].push(forecast);
    return acc;
  }, {});

  // Predefined rows we want to show in the order we want to show them
  const rowTypes = [
    { id: "TY_Unit_Sales", label: "Total Sales Units" },
    { id: "LY_Unit_Sales", label: "Store Sales Units" },
    { id: "TY_MCOM_Unit_Sales", label: "COM Sales Units" },
    { id: "MCOM_PTD_TY_Sales", label: "COM % to TTL (Sales)" },
    { id: "TY_OH_Units", label: "TOTAL EOM OH" },
    { id: "MacysProjectionReciepts", label: "Macys Projection Receipts" },
  ];

  const toggleYear = (year) => {
    setExpandedYear(expandedYear === year ? null : year);
  };

  const renderForecastTable = (year) => {
    const yearForecasts = forecastsByYear[year] || [];

    return (
      <div className="mb-8">
        <div
          className="flex items-center bg-gray-100 p-3 rounded-t-lg cursor-pointer"
          onClick={() => toggleYear(year)}
        >
          <ChevronDown
            size={18}
            className={`mr-2 transition-transform duration-200 ${
              expandedYear === year ? "transform rotate-180" : ""
            }`}
          />
          <h3 className="text-lg font-semibold">TOTAL {year}</h3>
        </div>

        {expandedYear === year && (
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse">
              <thead>
                <tr className="bg-white border-b">
                  <th className="py-3 px-4 text-left text-sm font-medium text-gray-700 w-48">
                    TOTAL {year}
                  </th>
                  <th className="py-3 px-4 text-center text-sm font-medium text-gray-700">
                    FEB
                  </th>
                  <th className="py-3 px-4 text-center text-sm font-medium text-gray-700">
                    MAR
                  </th>
                  <th className="py-3 px-4 text-center text-sm font-medium text-gray-700">
                    APR
                  </th>
                  <th className="py-3 px-4 text-center text-sm font-medium text-gray-700">
                    MAY
                  </th>
                  <th className="py-3 px-4 text-center text-sm font-medium text-gray-700">
                    JUN
                  </th>
                  <th className="py-3 px-4 text-center text-sm font-medium text-gray-700">
                    JUL
                  </th>
                  <th className="py-3 px-4 text-center text-sm font-medium text-gray-700">
                    AUG
                  </th>
                  <th className="py-3 px-4 text-center text-sm font-medium text-gray-700">
                    SEP
                  </th>
                  <th className="py-3 px-4 text-center text-sm font-medium text-gray-700">
                    OCT
                  </th>
                  <th className="py-3 px-4 text-center text-sm font-medium text-gray-700">
                    NOV
                  </th>
                  <th className="py-3 px-4 text-center text-sm font-medium text-gray-700">
                    DEC
                  </th>
                  <th className="py-3 px-4 text-center text-sm font-medium text-gray-700">
                    JAN
                  </th>
                  <th className="py-3 px-4 text-center text-sm font-medium text-gray-700">
                    ANNUAL
                  </th>
                  <th className="py-3 px-4 text-center text-sm font-medium text-gray-700">
                    SPRING
                  </th>
                  <th className="py-3 px-4 text-center text-sm font-medium text-gray-700">
                    FALL
                  </th>
                </tr>
              </thead>
              <tbody>
                {rowTypes.map((rowType, rowIndex) => {
                  const forecast = yearForecasts.find(
                    (f) => f.variable_name === rowType.id
                  );

                  // For COM % to TTL, calculate percentage
                  const isPercentage = rowType.id === "MCOM_PTD_TY_Sales";

                  // Get total sales and COM sales forecasts for percentage calculation
                  const totalSales = yearForecasts.find(
                    (f) => f.variable_name === "TY_Unit_Sales"
                  );
                  const comSales = yearForecasts.find(
                    (f) => f.variable_name === "TY_MCOM_Unit_Sales"
                  );

                  // Calculate annual total (sum of all months)
                  const calculateAnnualTotal = (forecast) => {
                    if (!forecast) return 0;
                    return (
                      (forecast.feb || 0) +
                      (forecast.mar || 0) +
                      (forecast.apr || 0) +
                      (forecast.may || 0) +
                      (forecast.jun || 0) +
                      (forecast.jul || 0) +
                      (forecast.aug || 0) +
                      (forecast.sep || 0) +
                      (forecast.oct || 0) +
                      (forecast.nov || 0) +
                      (forecast.dec || 0) +
                      (forecast.jan || 0)
                    );
                  };

                  // Calculate spring total (Feb-Jul)
                  const calculateSpringTotal = (forecast) => {
                    if (!forecast) return 0;
                    return (
                      (forecast.feb || 0) +
                      (forecast.mar || 0) +
                      (forecast.apr || 0) +
                      (forecast.may || 0) +
                      (forecast.jun || 0) +
                      (forecast.jul || 0)
                    );
                  };

                  // Calculate fall total (Aug-Jan)
                  const calculateFallTotal = (forecast) => {
                    if (!forecast) return 0;
                    return (
                      (forecast.aug || 0) +
                      (forecast.sep || 0) +
                      (forecast.oct || 0) +
                      (forecast.nov || 0) +
                      (forecast.dec || 0) +
                      (forecast.jan || 0)
                    );
                  };

                  // Helper to format cell values
                  const formatCellValue = (value, isPercentage) => {
                    if (isPercentage) {
                      return `${value}%`;
                    }
                    return value;
                  };

                  // Calculate percentage if needed
                  const calculatePercentage = (month) => {
                    if (
                      !totalSales ||
                      !comSales ||
                      !totalSales[month] ||
                      totalSales[month] === 0
                    ) {
                      return 0;
                    }
                    return Math.round(
                      (comSales[month] / totalSales[month]) * 100
                    );
                  };

                  // Background color for percentage row
                  const getRowClass = (isPercentage) => {
                    return isPercentage
                      ? "bg-yellow-50"
                      : rowIndex % 2 === 0
                      ? "bg-white"
                      : "bg-gray-50";
                  };

                  return (
                    <tr key={rowType.id} className={getRowClass(isPercentage)}>
                      <td className="py-3 px-4 border text-sm font-medium">
                        {rowType.label}
                      </td>

                      {/* February */}
                      <td className="py-3 px-4 border text-center text-sm">
                        {isEditing ? (
                          <input
                            type="text"
                            className="w-16 px-2 py-1 border rounded text-center"
                            value={
                              editedData.monthly_forecast?.[
                                yearForecasts.indexOf(forecast)
                              ]?.feb ||
                              forecast?.feb ||
                              0
                            }
                            onChange={(e) => {
                              const value = isPercentage
                                ? parseInt(e.target.value)
                                : parseFloat(e.target.value);
                              const newForecast = [
                                ...editedData.monthly_forecast,
                              ];
                              const index = yearForecasts.indexOf(forecast);
                              if (index >= 0) {
                                newForecast[index] = {
                                  ...newForecast[index],
                                  feb: value,
                                };
                                handleChange("monthly_forecast", newForecast);
                              }
                            }}
                          />
                        ) : isPercentage ? (
                          formatCellValue(calculatePercentage("feb"), true)
                        ) : (
                          forecast?.feb || 0
                        )}
                      </td>

                      {/* March */}
                      <td className="py-3 px-4 border text-center text-sm">
                        {isEditing ? (
                          <input
                            type="text"
                            className="w-16 px-2 py-1 border rounded text-center"
                            value={
                              editedData.monthly_forecast?.[
                                yearForecasts.indexOf(forecast)
                              ]?.mar ||
                              forecast?.mar ||
                              0
                            }
                            onChange={(e) => {
                              const value = isPercentage
                                ? parseInt(e.target.value)
                                : parseFloat(e.target.value);
                              const newForecast = [
                                ...editedData.monthly_forecast,
                              ];
                              const index = yearForecasts.indexOf(forecast);
                              if (index >= 0) {
                                newForecast[index] = {
                                  ...newForecast[index],
                                  mar: value,
                                };
                                handleChange("monthly_forecast", newForecast);
                              }
                            }}
                          />
                        ) : isPercentage ? (
                          formatCellValue(calculatePercentage("mar"), true)
                        ) : (
                          forecast?.mar || 0
                        )}
                      </td>

                      {/* April */}
                      <td className="py-3 px-4 border text-center text-sm">
                        {isEditing ? (
                          <input
                            type="text"
                            className="w-16 px-2 py-1 border rounded text-center"
                            value={
                              editedData.monthly_forecast?.[
                                yearForecasts.indexOf(forecast)
                              ]?.apr ||
                              forecast?.apr ||
                              0
                            }
                            onChange={(e) => {
                              const value = isPercentage
                                ? parseInt(e.target.value)
                                : parseFloat(e.target.value);
                              const newForecast = [
                                ...editedData.monthly_forecast,
                              ];
                              const index = yearForecasts.indexOf(forecast);
                              if (index >= 0) {
                                newForecast[index] = {
                                  ...newForecast[index],
                                  apr: value,
                                };
                                handleChange("monthly_forecast", newForecast);
                              }
                            }}
                          />
                        ) : isPercentage ? (
                          formatCellValue(calculatePercentage("apr"), true)
                        ) : (
                          forecast?.apr || 0
                        )}
                      </td>

                      {/* May */}
                      <td className="py-3 px-4 border text-center text-sm">
                        {isEditing ? (
                          <input
                            type="text"
                            className="w-16 px-2 py-1 border rounded text-center"
                            value={
                              editedData.monthly_forecast?.[
                                yearForecasts.indexOf(forecast)
                              ]?.may ||
                              forecast?.may ||
                              0
                            }
                            onChange={(e) => {
                              const value = isPercentage
                                ? parseInt(e.target.value)
                                : parseFloat(e.target.value);
                              const newForecast = [
                                ...editedData.monthly_forecast,
                              ];
                              const index = yearForecasts.indexOf(forecast);
                              if (index >= 0) {
                                newForecast[index] = {
                                  ...newForecast[index],
                                  may: value,
                                };
                                handleChange("monthly_forecast", newForecast);
                              }
                            }}
                          />
                        ) : isPercentage ? (
                          formatCellValue(calculatePercentage("may"), true)
                        ) : (
                          forecast?.may || 0
                        )}
                      </td>

                      {/* June */}
                      <td className="py-3 px-4 border text-center text-sm">
                        {isEditing ? (
                          <input
                            type="text"
                            className="w-16 px-2 py-1 border rounded text-center"
                            value={
                              editedData.monthly_forecast?.[
                                yearForecasts.indexOf(forecast)
                              ]?.jun ||
                              forecast?.jun ||
                              0
                            }
                            onChange={(e) => {
                              const value = isPercentage
                                ? parseInt(e.target.value)
                                : parseFloat(e.target.value);
                              const newForecast = [
                                ...editedData.monthly_forecast,
                              ];
                              const index = yearForecasts.indexOf(forecast);
                              if (index >= 0) {
                                newForecast[index] = {
                                  ...newForecast[index],
                                  jun: value,
                                };
                                handleChange("monthly_forecast", newForecast);
                              }
                            }}
                          />
                        ) : isPercentage ? (
                          formatCellValue(calculatePercentage("jun"), true)
                        ) : (
                          forecast?.jun || 0
                        )}
                      </td>

                      {/* July */}
                      <td className="py-3 px-4 border text-center text-sm">
                        {isEditing ? (
                          <input
                            type="text"
                            className="w-16 px-2 py-1 border rounded text-center"
                            value={
                              editedData.monthly_forecast?.[
                                yearForecasts.indexOf(forecast)
                              ]?.jul ||
                              forecast?.jul ||
                              0
                            }
                            onChange={(e) => {
                              const value = isPercentage
                                ? parseInt(e.target.value)
                                : parseFloat(e.target.value);
                              const newForecast = [
                                ...editedData.monthly_forecast,
                              ];
                              const index = yearForecasts.indexOf(forecast);
                              if (index >= 0) {
                                newForecast[index] = {
                                  ...newForecast[index],
                                  jul: value,
                                };
                                handleChange("monthly_forecast", newForecast);
                              }
                            }}
                          />
                        ) : isPercentage ? (
                          formatCellValue(calculatePercentage("jul"), true)
                        ) : (
                          forecast?.jul || 0
                        )}
                      </td>

                      {/* August */}
                      <td className="py-3 px-4 border text-center text-sm">
                        {isEditing ? (
                          <input
                            type="text"
                            className="w-16 px-2 py-1 border rounded text-center"
                            value={
                              editedData.monthly_forecast?.[
                                yearForecasts.indexOf(forecast)
                              ]?.aug ||
                              forecast?.aug ||
                              0
                            }
                            onChange={(e) => {
                              const value = isPercentage
                                ? parseInt(e.target.value)
                                : parseFloat(e.target.value);
                              const newForecast = [
                                ...editedData.monthly_forecast,
                              ];
                              const index = yearForecasts.indexOf(forecast);
                              if (index >= 0) {
                                newForecast[index] = {
                                  ...newForecast[index],
                                  aug: value,
                                };
                                handleChange("monthly_forecast", newForecast);
                              }
                            }}
                          />
                        ) : isPercentage ? (
                          formatCellValue(calculatePercentage("aug"), true)
                        ) : (
                          forecast?.aug || 0
                        )}
                      </td>

                      {/* September */}
                      <td className="py-3 px-4 border text-center text-sm">
                        {isEditing ? (
                          <input
                            type="text"
                            className="w-16 px-2 py-1 border rounded text-center"
                            value={
                              editedData.monthly_forecast?.[
                                yearForecasts.indexOf(forecast)
                              ]?.sep ||
                              forecast?.sep ||
                              0
                            }
                            onChange={(e) => {
                              const value = isPercentage
                                ? parseInt(e.target.value)
                                : parseFloat(e.target.value);
                              const newForecast = [
                                ...editedData.monthly_forecast,
                              ];
                              const index = yearForecasts.indexOf(forecast);
                              if (index >= 0) {
                                newForecast[index] = {
                                  ...newForecast[index],
                                  sep: value,
                                };
                                handleChange("monthly_forecast", newForecast);
                              }
                            }}
                          />
                        ) : isPercentage ? (
                          formatCellValue(calculatePercentage("sep"), true)
                        ) : (
                          forecast?.sep || 0
                        )}
                      </td>

                      {/* October */}
                      <td className="py-3 px-4 border text-center text-sm">
                        {isEditing ? (
                          <input
                            type="text"
                            className="w-16 px-2 py-1 border rounded text-center"
                            value={
                              editedData.monthly_forecast?.[
                                yearForecasts.indexOf(forecast)
                              ]?.oct ||
                              forecast?.oct ||
                              0
                            }
                            onChange={(e) => {
                              const value = isPercentage
                                ? parseInt(e.target.value)
                                : parseFloat(e.target.value);
                              const newForecast = [
                                ...editedData.monthly_forecast,
                              ];
                              const index = yearForecasts.indexOf(forecast);
                              if (index >= 0) {
                                newForecast[index] = {
                                  ...newForecast[index],
                                  oct: value,
                                };
                                handleChange("monthly_forecast", newForecast);
                              }
                            }}
                          />
                        ) : isPercentage ? (
                          formatCellValue(calculatePercentage("oct"), true)
                        ) : (
                          forecast?.oct || 0
                        )}
                      </td>

                      {/* November */}
                      <td className="py-3 px-4 border text-center text-sm">
                        {isEditing ? (
                          <input
                            type="text"
                            className="w-16 px-2 py-1 border rounded text-center"
                            value={
                              editedData.monthly_forecast?.[
                                yearForecasts.indexOf(forecast)
                              ]?.nov ||
                              forecast?.nov ||
                              0
                            }
                            onChange={(e) => {
                              const value = isPercentage
                                ? parseInt(e.target.value)
                                : parseFloat(e.target.value);
                              const newForecast = [
                                ...editedData.monthly_forecast,
                              ];
                              const index = yearForecasts.indexOf(forecast);
                              if (index >= 0) {
                                newForecast[index] = {
                                  ...newForecast[index],
                                  nov: value,
                                };
                                handleChange("monthly_forecast", newForecast);
                              }
                            }}
                          />
                        ) : isPercentage ? (
                          formatCellValue(calculatePercentage("nov"), true)
                        ) : (
                          forecast?.nov || 0
                        )}
                      </td>

                      {/* December */}
                      <td className="py-3 px-4 border text-center text-sm">
                        {isEditing ? (
                          <input
                            type="text"
                            className="w-16 px-2 py-1 border rounded text-center"
                            value={
                              editedData.monthly_forecast?.[
                                yearForecasts.indexOf(forecast)
                              ]?.dec ||
                              forecast?.dec ||
                              0
                            }
                            onChange={(e) => {
                              const value = isPercentage
                                ? parseInt(e.target.value)
                                : parseFloat(e.target.value);
                              const newForecast = [
                                ...editedData.monthly_forecast,
                              ];
                              const index = yearForecasts.indexOf(forecast);
                              if (index >= 0) {
                                newForecast[index] = {
                                  ...newForecast[index],
                                  dec: value,
                                };
                                handleChange("monthly_forecast", newForecast);
                              }
                            }}
                          />
                        ) : isPercentage ? (
                          formatCellValue(calculatePercentage("dec"), true)
                        ) : (
                          forecast?.dec || 0
                        )}
                      </td>

                      {/* January */}
                      <td className="py-3 px-4 border text-center text-sm">
                        {isEditing ? (
                          <input
                            type="text"
                            className="w-16 px-2 py-1 border rounded text-center"
                            value={
                              editedData.monthly_forecast?.[
                                yearForecasts.indexOf(forecast)
                              ]?.jan ||
                              forecast?.jan ||
                              0
                            }
                            onChange={(e) => {
                              const value = isPercentage
                                ? parseInt(e.target.value)
                                : parseFloat(e.target.value);
                              const newForecast = [
                                ...editedData.monthly_forecast,
                              ];
                              const index = yearForecasts.indexOf(forecast);
                              if (index >= 0) {
                                newForecast[index] = {
                                  ...newForecast[index],
                                  jan: value,
                                };
                                handleChange("monthly_forecast", newForecast);
                              }
                            }}
                          />
                        ) : isPercentage ? (
                          formatCellValue(calculatePercentage("jan"), true)
                        ) : (
                          forecast?.jan || 0
                        )}
                      </td>

                      {/* Annual total */}
                      <td className="py-3 px-4 border text-center text-sm font-medium">
                        {isPercentage
                          ? formatCellValue(
                              Math.round(
                                (calculateAnnualTotal(comSales) /
                                  calculateAnnualTotal(totalSales)) *
                                  100
                              ),
                              true
                            )
                          : calculateAnnualTotal(forecast)}
                      </td>

                      {/* Spring total */}
                      <td className="py-3 px-4 border text-center text-sm">
                        {isPercentage
                          ? formatCellValue(
                              Math.round(
                                (calculateSpringTotal(comSales) /
                                  calculateSpringTotal(totalSales)) *
                                  100
                              ),
                              true
                            )
                          : calculateSpringTotal(forecast)}
                      </td>

                      {/* Fall total */}
                      <td className="py-3 px-4 border text-center text-sm">
                        {isPercentage
                          ? formatCellValue(
                              Math.round(
                                (calculateFallTotal(comSales) /
                                  calculateFallTotal(totalSales)) *
                                  100
                              ),
                              true
                            )
                          : calculateFallTotal(forecast)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    );
  };

  const years = Object.keys(forecastsByYear).sort((a, b) => b - a); // Sort years in descending order

  return <div>{years.map((year) => renderForecastTable(year))}</div>;
};
const ProductDetailsView = ({ productId, category }) => {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = React.useState(false);
  const [editedData, setEditedData] = React.useState({});
  const [twelveMonthFC, setTwelveMonthFC] = React.useState("");
  const [rollingForecastData, setRollingForecastData] = React.useState(null);

  // Fetch product details from API
  const {
    data: productDetails,
    isLoading,
    isError,
  } = useGetProductDetailsQuery(productId);

  // Mutation for updating product details
  const [updateProductDetails, { isLoading: isUpdating }] =
    useUpdateProductDetailsMutation();

  // Initialize edited data when product details are loaded
  React.useEffect(() => {
    if (productDetails) {
      setEditedData(productDetails);
      // Initialize rolling forecast data if it exists
      if (productDetails.rolling_forecast_data) {
        setRollingForecastData(productDetails.rolling_forecast_data);
      }
      if (productDetails.twelve_month_fc) {
        setTwelveMonthFC(productDetails.twelve_month_fc);
      }
    }
  }, [productDetails]);

  // Handle going back to product list
  const handleBack = () => {
    dispatch(resetSelectedProduct());
  };

  // Handle editing mode toggle
  const toggleEditMode = () => {
    setIsEditing(!isEditing);
  };

  // Handle save changes
  const handleSave = async () => {
    try {
      const dataToSave = {
        ...editedData,
        rolling_forecast_data: rollingForecastData,
        twelve_month_fc: twelveMonthFC,
      };

      await updateProductDetails({
        productId,
        productData: dataToSave,
      }).unwrap();
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to save product details:", error);
      // You could add error handling UI here
    }
  };

  // Handle input changes
  const handleChange = (field, value) => {
    setEditedData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Handle rolling forecast table data changes
  const handleTableDataChange = (newTableData) => {
    setRollingForecastData(newTableData);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    handleSave();
  };

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-lg p-8">
        <div className="animate-pulse flex flex-col space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/3"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          <div className="h-64 bg-gray-200 rounded w-full"></div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-lg p-8">
        <div className="flex items-center mb-6">
          <button
            onClick={handleBack}
            className="flex items-center text-indigo-600 hover:text-indigo-800"
          >
            <ArrowLeft size={16} className="mr-2" /> Back to products
          </button>
        </div>
        <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg">
          <p>Failed to load product details. Please try again later.</p>
        </div>
      </div>
    );
  }

  // Default to mock data structure if API data is not available
  const product = productDetails || {
    product_details: {
      product_id: productId,
      product_description: "Product Description",
      price: "$0.00",
      material: "Unknown",
      category: category,
      stock: 0,
      tags: [],
    },
    monthly_forecast: [],
  };

  return (
    <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 p-6">
        <div className="flex justify-between items-center">
          <div>
            <button
              onClick={handleBack}
              className="flex items-center text-white opacity-80 hover:opacity-100 mb-2"
            >
              <ArrowLeft size={16} className="mr-2" /> Back to products
            </button>
            <h1 className="text-2xl font-bold text-white">
              {isEditing
                ? "Edit Product Details"
                : product.product_details.product_description || productId}
            </h1>
          </div>
          <div>
            {isEditing ? (
              <div className="flex space-x-2">
                <button
                  onClick={handleSave}
                  disabled={isUpdating}
                  className="bg-white text-indigo-700 px-4 py-2 rounded-lg flex items-center"
                >
                  <Save size={16} className="mr-2" />
                  {isUpdating ? "Saving..." : "Save"}
                </button>
                <button
                  onClick={toggleEditMode}
                  className="bg-white bg-opacity-20 text-white px-4 py-2 rounded-lg flex items-center"
                >
                  <X size={16} className="mr-2" />
                  Cancel
                </button>
              </div>
            ) : (
              <button
                onClick={toggleEditMode}
                className="bg-white text-indigo-700 px-4 py-2 rounded-lg flex items-center"
              >
                <Edit size={16} className="mr-2" />
                Edit
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            {/* Product Details Section */}
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Product Information
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Product ID
                  </label>
                  <input
                    type="text"
                    value={productId}
                    disabled
                    className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <input
                    type="text"
                    value={
                      isEditing
                        ? editedData.product_details?.product_description
                        : product.product_details.product_description
                    }
                    onChange={(e) =>
                      handleChange(
                        "product_details.product_description",
                        e.target.value
                      )
                    }
                    disabled={!isEditing}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    BLU
                  </label>
                  <input
                    type="text"
                    value={
                      isEditing
                        ? editedData.product_details?.blu
                        : product.product_details.blu
                    }
                    onChange={(e) =>
                      handleChange("product_details.blu", e.target.value)
                    }
                    disabled={!isEditing}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    MKST
                  </label>
                  <input
                    type="text"
                    value={
                      isEditing
                        ? editedData.product_details?.mkst
                        : product.product_details.mkst
                    }
                    onChange={(e) =>
                      handleChange("product_details.mkst", e.target.value)
                    }
                    disabled={!isEditing}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Current FC Index
                  </label>
                  <input
                    type="text"
                    value={
                      isEditing
                        ? editedData.product_details?.currect_fc_index
                        : product.product_details.currect_fc_index
                    }
                    onChange={(e) =>
                      handleChange(
                        "product_details.currect_fc_index",
                        e.target.value
                      )
                    }
                    disabled={!isEditing}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Retail Price
                  </label>
                  <input
                    type="text"
                    value={
                      isEditing
                        ? editedData.product_details?.macys_owned_retail
                        : product.product_details.macys_owned_retail
                    }
                    onChange={(e) =>
                      handleChange(
                        "product_details.macys_owned_retail",
                        e.target.value
                      )
                    }
                    disabled={!isEditing}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Current Stock
                  </label>
                  <input
                    type="number"
                    value={
                      isEditing
                        ? editedData.product_details?.macys_onhand
                        : product.product_details.macys_onhand
                    }
                    onChange={(e) =>
                      handleChange(
                        "product_details.macys_onhand",
                        parseInt(e.target.value)
                      )
                    }
                    disabled={!isEditing}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Vendor
                  </label>
                  <input
                    type="text"
                    value={
                      isEditing
                        ? editedData.product_details?.vendor_name
                        : product.product_details.vendor_name
                    }
                    onChange={(e) =>
                      handleChange(
                        "product_details.vendor_name",
                        e.target.value
                      )
                    }
                    disabled={!isEditing}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Department
                  </label>
                  <input
                    type="text"
                    value={
                      isEditing
                        ? editedData.product_details?.department_description
                        : product.product_details.department_description
                    }
                    disabled
                    className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Holiday Build
                  </label>
                  <input
                    type="number"
                    value={
                      isEditing
                        ? editedData.product_details?.holiday_build_fc
                        : product.product_details.holiday_build_fc
                    }
                    onChange={(e) =>
                      handleChange(
                        "product_details.holiday_build_fc",
                        parseInt(e.target.value)
                      )
                    }
                    disabled={!isEditing}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
              </div>
            </div>

            {/* Important Details Cards */}
            <ImportantDetailsCards
              product={product}
              isEditing={isEditing}
              editedData={editedData}
              handleChange={handleChange}
            />

            {/* 12 Month Rolling Forecast Table */}
            <RollingForecastTable
              tableData={rollingForecastData}
              twelveMonthFC={twelveMonthFC}
              setTwelveMonthFC={setTwelveMonthFC}
              isEditing={isEditing}
              handleTableDataChange={handleTableDataChange}
            />

            {/* Monthly Forecast */}
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Monthly Forecast
              </h2>

              {product.monthly_forecast &&
              product.monthly_forecast.length > 0 ? (
                <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                  <ForecastTable
                    forecasts={product.monthly_forecast}
                    isEditing={isEditing}
                    editedData={editedData}
                    handleChange={handleChange}
                  />
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  No forecast data available for this product.
                </div>
              )}
            </div>
          </div>

          {isEditing && (
            <div className="mt-6 flex justify-end">
              <button
                type="button"
                onClick={toggleEditMode}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 mr-2"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isUpdating}
                className="px-4 py-2 bg-indigo-600 text-white rounded-md"
              >
                {isUpdating ? "Saving..." : "Save Changes"}
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default ProductDetailsView;
