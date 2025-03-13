import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';

const CombinedForecastComponent = () => {
  // ---- FORECASTING TOOL STATE AND LOGIC ----
  // Initial data for forecasting
  const initialForecastData = {
    monthlyPercentages: [13, 3, 7, 8, 5, 4, 8, 6, 8, 13, 23, 2],
    fcByIndex: [99, 26, 55, 64, 38, 28, 63, 47, 60, 105, 183, 15],
    fcByTrend: [23, 23, 76, 51, 36, 17, 16, 19, 14, 61, 93, 4],
    recommendedFC: [75, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    plannedFC: [75, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    plannedShipments: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
    plannedEOH: [477, 477, 477, 477, 477, 477, 477, 477, 477, 477, 477, 477],
    grossProjection: [0, 131, 150, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    macysProjReceipts: [16, 46, 46, 42, 48, 49, 0, 0, 0, 0, 0, 0],
    plannedSellThru: [14, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  };

  // State for the forecasting table data
  const [tableData, setTableData] = useState(initialForecastData);
  
  // State for the forecasting controls
  const [forecastingMethod, setForecastingMethod] = useState('fc by index');
  const [currentFCIndex, setCurrentFCIndex] = useState('dia');
  const [changeTrend, setChangeTrend] = useState('0');
  const [twelveMonthFC, setTwelveMonthFC] = useState('783');
  
  // Dropdown state management for forecasting controls
  const [forecastDropdownOpen, setForecastDropdownOpen] = useState(false);
  const [indexDropdownOpen, setIndexDropdownOpen] = useState(false);

  // Method to update recommended FC based on controls
  useEffect(() => {
    let newRecommendedFC;
    
    if (forecastingMethod === 'fc by index') {
      // Use the fcByIndex values for recommended FC
      newRecommendedFC = [...tableData.fcByIndex];
    } else if (forecastingMethod === 'fc by trend') {
      // Use the fcByTrend values for recommended FC
      newRecommendedFC = [...tableData.fcByTrend];
    } else if (forecastingMethod === 'average') {
      // Average of fcByIndex and fcByTrend
      newRecommendedFC = tableData.fcByIndex.map((val, idx) => 
        Math.round((val + tableData.fcByTrend[idx]) / 2)
      );
    } else {
      // Default to fcByIndex for other options
      newRecommendedFC = [...tableData.fcByIndex];
    }
    
    // Apply the trend percentage adjustment if needed
    if (changeTrend !== '0') {
      const trendMultiplier = 1 + (parseFloat(changeTrend) / 100);
      newRecommendedFC = newRecommendedFC.map(val => Math.round(val * trendMultiplier));
    }
    
    // Scale all values to match the desired 12M FC total
    const currentTotal = newRecommendedFC.reduce((sum, val) => sum + val, 0);
    const targetTotal = parseFloat(twelveMonthFC);
    
    if (currentTotal > 0 && !isNaN(targetTotal)) {
      const scaleFactor = targetTotal / currentTotal;
      newRecommendedFC = newRecommendedFC.map(val => Math.round(val * scaleFactor));
    }

    // Update the table data with new recommended FC
    setTableData(prev => ({
      ...prev,
      recommendedFC: newRecommendedFC
    }));
  }, [forecastingMethod, currentFCIndex, changeTrend, twelveMonthFC]);

  // ---- SALES SUMMARY STATE AND LOGIC ----
  // State for section expansion
  const [year2025Expanded, setYear2025Expanded] = useState(true);
  const [year2024Expanded, setYear2024Expanded] = useState(false);
  
  // State for category dropdowns
  const [selectedView2025, setSelectedView2025] = useState('All Categories');
  const [selectedView2024, setSelectedView2024] = useState('All Categories');
  const [dropdown2025Open, setDropdown2025Open] = useState(false);
  const [dropdown2024Open, setDropdown2024Open] = useState(false);
  
  // Dropdown options
  const viewOptions = [
    'All Categories', 
    'Bridge Gem', 
    'Fine Gold', 
    'Womens Silver', 
    'Mens Jewelry'
  ];
  
  // Sample data for 2025
  const data2025 = {
    totalSalesUnits: [75, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    storeSalesUnits: [41, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    comSalesUnits: [34, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    comToTtlSales: [45, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    totalEomOh: [476, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    storeEomOh: [470, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    comEomOh: [6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    comToTtlEoh: [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    omniSales: [11927, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    comSales: [5486, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    omniDiff: [159, -71, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    omniSellThru: [14, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    storeSellThru: [8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    omniTurn: [0.2, 0.3, 0.5, 0.6, 0.8, 0.9, 1.1, 1.3, 1.4, 1.6, 1.7, 1.9],
    storeTurn: [0.1, 0.2, 0.3, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0, 1.1],
    tySalesVsLy: [-22, -100, -100, -100, -100, -100, -100, -100, -100, -100, -100, -100],
    tyComVsLy: [386, -100, -100, -100, -100, -100, -100, -100, -100, -100, -100, -100],
    tyStoreVsLy: [-28, -100, -100, -100, -100, -100, -100, -100, -100, -100, -100, -100],
    omniOoUnits: [16, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    comOoUnits: [10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    omniReceipts: [8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  };
  
  // Sample data for 2024
  const data2024 = {
    totalSalesUnits: [65, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60],
    storeSalesUnits: [35, 5, 8, 10, 12, 15, 18, 20, 22, 25, 28, 30],
    comSalesUnits: [30, 5, 7, 10, 13, 15, 17, 20, 23, 25, 27, 30],
    comToTtlSales: [46, 50, 47, 50, 52, 50, 49, 50, 51, 50, 49, 50],
    totalEomOh: [450, 445, 440, 435, 430, 425, 420, 415, 410, 405, 400, 395],
    storeEomOh: [445, 440, 435, 430, 425, 420, 415, 410, 405, 400, 395, 390],
    comEomOh: [5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
    comToTtlEoh: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    omniSales: [10000, 1000, 1200, 1300, 1400, 1500, 1600, 1700, 1800, 1900, 2000, 2100],
    comSales: [4500, 500, 600, 650, 700, 750, 800, 850, 900, 950, 1000, 1050],
    omniDiff: [100, -50, -40, -30, -20, -10, 0, 10, 20, 30, 40, 50],
    omniSellThru: [12, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
    storeSellThru: [7, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
    omniTurn: [0.1, 0.2, 0.4, 0.5, 0.7, 0.8, 1.0, 1.2, 1.3, 1.5, 1.6, 1.8],
    storeTurn: [0.1, 0.1, 0.2, 0.3, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0],
    tySalesVsLy: [0, 5, 8, 12, 15, 18, 22, 25, 28, 30, 32, 35],
    tyComVsLy: [0, 8, 10, 15, 18, 20, 25, 28, 30, 32, 35, 38],
    tyStoreVsLy: [0, 3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33],
    omniOoUnits: [14, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    comOoUnits: [8, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6],
    omniReceipts: [6, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6]
  };
  
  // ---- SHARED HELPER FUNCTIONS ----
  // Calculate yearly totals
  const calculateTotals = (dataArray) => {
    const annual = dataArray.reduce((sum, val) => sum + val, 0);
    const spring = dataArray.slice(1, 6).reduce((sum, val) => sum + val, 0); // MAR-JUL
    const fall = dataArray.slice(6, 12).reduce((sum, val) => sum + val, 0); // AUG-JAN
    return { annual, spring, fall };
  };
  
  // Table header months
  const months = ['FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC', 'JAN'];
  
  // Format totals for display in forecast table
  const formatRowWithTotals = (row) => {
    const { annual, spring, fall } = calculateTotals(row);
    return [...row, annual, spring, fall];
  };
  
  // Format values for display in sales summary
  const formatValue = (value, isPercent = false, isDollar = false, isRatio = false) => {
    if (isPercent) {
      return `${value}%`;
    } else if (isDollar) {
      return `$${value.toLocaleString()}`;
    } else if (isRatio) {
      return value.toFixed(1);
    } else {
      return value;
    }
  };

  return (
    <div className="w-full space-y-8">
      {/* ---- FORECASTING TOOL SECTION ---- */}
      <div className="bg-white p-4 rounded shadow-sm w-full">
        {/* Top Control Bar */}
        <div className="flex flex-wrap gap-3 mb-4 p-3 bg-gray-50 border border-gray-200 rounded">
          {/* Forecasting Method Dropdown */}
          <div className="relative">
            <label className="block text-xs font-medium text-gray-700 mb-1">Forecasting Method</label>
            <div 
              className="flex items-center justify-between w-40 px-3 py-2 border border-gray-300 rounded bg-white cursor-pointer"
              onClick={() => setForecastDropdownOpen(!forecastDropdownOpen)}
            >
              <span className="text-sm">{forecastingMethod}</span>
              <ChevronDown size={16} />
            </div>
            {forecastDropdownOpen && (
              <div className="absolute z-10 mt-1 w-40 bg-white border border-gray-300 rounded shadow-lg">
                {['fc by index', 'fc by trend', 'average', 'current year', 'last year'].map((method) => (
                  <div 
                    key={method}
                    className="px-3 py-2 text-sm hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      setForecastingMethod(method);
                      setForecastDropdownOpen(false);
                    }}
                  >
                    {method}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Current FC Index Dropdown */}
          <div className="relative">
            <label className="block text-xs font-medium text-gray-700 mb-1">Current FC Index</label>
            <div 
              className="flex items-center justify-between w-32 px-3 py-2 border border-gray-300 rounded bg-white cursor-pointer"
              onClick={() => setIndexDropdownOpen(!indexDropdownOpen)}
            >
              <span className="text-sm">{currentFCIndex}</span>
              <ChevronDown size={16} />
            </div>
            {indexDropdownOpen && (
              <div className="absolute z-10 mt-1 w-32 bg-white border border-gray-300 rounded shadow-lg">
                {['dia', 'cross', 'gem'].map((index) => (
                  <div 
                    key={index}
                    className="px-3 py-2 text-sm hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      setCurrentFCIndex(index);
                      setIndexDropdownOpen(false);
                    }}
                  >
                    {index}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Change Trend Input */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Change Trend (%)</label>
            <input
              type="text"
              value={changeTrend}
              onChange={(e) => setChangeTrend(e.target.value)}
              className="w-32 px-3 py-2 border border-gray-300 rounded text-sm"
            />
          </div>

          {/* 12M FC by Index Input */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">12M FC by Index</label>
            <input
              type="text"
              value={twelveMonthFC}
              onChange={(e) => setTwelveMonthFC(e.target.value)}
              className="w-32 px-3 py-2 border border-gray-300 rounded text-sm"
            />
          </div>
        </div>

        {/* Forecast Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse">
            <thead>
              <tr>
                <th className="border border-gray-300 bg-gray-100 px-4 py-2 text-left text-sm font-semibold">ROLLING 12M FC</th>
                {months.map(month => (
                  <th key={month} className="border border-gray-300 bg-gray-100 px-4 py-2 text-center text-sm font-semibold">{month}</th>
                ))}
                <th className="border border-gray-300 bg-gray-100 px-4 py-2 text-center text-sm font-semibold">ANNUAL</th>
                <th className="border border-gray-300 bg-gray-100 px-4 py-2 text-center text-sm font-semibold">SPRING</th>
                <th className="border border-gray-300 bg-gray-100 px-4 py-2 text-center text-sm font-semibold">FALL</th>
              </tr>
            </thead>
            <tbody>
              {/* Index Row */}
              <tr>
                <td className="border border-gray-300 px-4 py-2 text-sm font-medium">Index</td>
                {formatRowWithTotals(tableData.monthlyPercentages).map((value, i) => (
                  <td key={i} className={`border border-gray-300 px-4 py-2 text-center text-sm ${i > 11 ? 'font-semibold' : ''}`}>
                    {i > 11 ? `${value}%` : `${value}%`}
                  </td>
                ))}
              </tr>

              {/* FC by Index Row */}
              <tr>
                <td className="border border-gray-300 px-4 py-2 text-sm font-medium">FC by Index</td>
                {formatRowWithTotals(tableData.fcByIndex).map((value, i) => (
                  <td key={i} className={`border border-gray-300 px-4 py-2 text-center text-sm ${i > 11 ? 'font-semibold' : ''}`}>
                    {value}
                  </td>
                ))}
              </tr>

              {/* FC by Trend Row */}
              <tr>
                <td className="border border-gray-300 px-4 py-2 text-sm font-medium">FC by Trend</td>
                {formatRowWithTotals(tableData.fcByTrend).map((value, i) => (
                  <td key={i} className={`border border-gray-300 px-4 py-2 text-center text-sm ${i > 11 ? 'font-semibold' : ''}`}>
                    {value}
                  </td>
                ))}
              </tr>

              {/* Recommended FC Row - Highlighted */}
              <tr className="bg-yellow-50">
                <td className="border border-gray-300 px-4 py-2 text-sm font-medium">Recommended FC</td>
                {formatRowWithTotals(tableData.recommendedFC).map((value, i) => (
                  <td key={i} className={`border border-gray-300 px-4 py-2 text-center text-sm ${i > 11 ? 'font-semibold' : ''}`}>
                    {value}
                  </td>
                ))}
              </tr>

              {/* Planned FC Row */}
              <tr>
                <td className="border border-gray-300 px-4 py-2 text-sm font-medium">Planned FC</td>
                {formatRowWithTotals(tableData.plannedFC).map((value, i) => (
                  <td key={i} className={`border border-gray-300 px-4 py-2 text-center text-sm ${i > 11 ? 'font-semibold' : ''}`}>
                    {value}
                  </td>
                ))}
              </tr>

              {/* Planned Shipments Row */}
              <tr>
                <td className="border border-gray-300 px-4 py-2 text-sm font-medium">Planned Shipments</td>
                {formatRowWithTotals(tableData.plannedShipments).map((value, i) => (
                  <td key={i} className={`border border-gray-300 px-4 py-2 text-center text-sm ${i > 11 ? 'font-semibold' : ''}`}>
                    {value}
                  </td>
                ))}
              </tr>

              {/* Planned EOH Row */}
              <tr>
                <td className="border border-gray-300 px-4 py-2 text-sm font-medium">Planned EOH (Cal)</td>
                {formatRowWithTotals(tableData.plannedEOH).map((value, i) => (
                  <td key={i} className={`border border-gray-300 px-4 py-2 text-center text-sm ${i > 11 ? 'font-semibold' : ''}`}>
                    {value}
                  </td>
                ))}
              </tr>

              {/* Gross Projection Row */}
              <tr>
                <td className="border border-gray-300 px-4 py-2 text-sm font-medium">Gross Projection (Nav)</td>
                {formatRowWithTotals(tableData.grossProjection).map((value, i) => (
                  <td key={i} className={`border border-gray-300 px-4 py-2 text-center text-sm ${i > 11 ? 'font-semibold' : ''} ${value > 0 && i < 12 ? 'bg-yellow-100' : ''}`}>
                    {value}
                  </td>
                ))}
              </tr>

              {/* Macy's Proj Receipts Row */}
              <tr>
                <td className="border border-gray-300 px-4 py-2 text-sm font-medium">Macys Proj Receipts</td>
                {formatRowWithTotals(tableData.macysProjReceipts).map((value, i) => (
                  <td key={i} className={`border border-gray-300 px-4 py-2 text-center text-sm ${i > 11 ? 'font-semibold' : ''} ${value > 0 && i < 12 ? 'bg-red-50 text-red-600' : ''}`}>
                    {value}
                  </td>
                ))}
              </tr>

              {/* Planned Sell Thru % Row */}
              <tr>
                <td className="border border-gray-300 px-4 py-2 text-sm font-medium">Planned Sell thru %</td>
                {formatRowWithTotals(tableData.plannedSellThru).map((value, i) => (
                  <td key={i} className={`border border-gray-300 px-4 py-2 text-center text-sm ${i > 11 ? 'font-semibold' : ''}`}>
                    {value > 0 ? `${value}%` : `${value}%`}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* ---- SALES SUMMARY SECTION ---- */}
      <div className="w-full border border-gray-300 rounded-md overflow-hidden mt-8">
        {/* 2025 Section */}
        <div>
          {/* 2025 Header with dropdown and expand/collapse button */}
          <div className="flex items-center bg-gray-200 p-2">
            <button 
              className="mr-2 text-gray-700 focus:outline-none"
              onClick={() => setYear2025Expanded(!year2025Expanded)}
            >
              {year2025Expanded ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
            </button>
            <h2 className="font-bold text-gray-800 text-sm">TOTAL 2025</h2>
            
            {/* Dropdown taking remaining width */}
            <div className="ml-auto relative">
              <button 
                className="flex items-center justify-between bg-white border border-gray-300 px-3 py-1 rounded text-sm w-48"
                onClick={() => setDropdown2025Open(!dropdown2025Open)}
              >
                <span>{selectedView2025}</span>
                <ChevronDown size={14} />
              </button>
              
              {dropdown2025Open && (
                <div className="absolute right-0 top-full mt-1 w-48 bg-white border border-gray-300 rounded shadow-lg z-10">
                  {viewOptions.map((option) => (
                    <div 
                      key={option}
                      className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                      onClick={() => {
                        setSelectedView2025(option);
                        setDropdown2025Open(false);
                      }}
                    >
                      {option}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          
          {/* 2025 Table - only shown when expanded */}
          {year2025Expanded && (
            <div className="overflow-x-auto">
              <table className="min-w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-300 px-4 py-2 text-left font-semibold">TOTAL 2025</th>
                    {months.map(month => (
                      <th key={month} className="border border-gray-300 px-4 py-2 text-center font-semibold">{month}</th>
                    ))}
                    <th className="border border-gray-300 px-4 py-2 text-center font-semibold">ANNUAL</th>
                    <th className="border border-gray-300 px-4 py-2 text-center font-semibold">SPRING</th>
                    <th className="border border-gray-300 px-4 py-2 text-center font-semibold">FALL</th>
                  </tr>
                </thead>
                <tbody>
                  {/* Total Sales Units */}
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-4 py-2 font-medium">Total Sales Units</td>
                    {data2025.totalSalesUnits.map((value, index) => (
                      <td key={index} className="border border-gray-300 px-4 py-2 text-center">{value}</td>
                    ))}
                    <td className="border border-gray-300 px-4 py-2 text-center font-medium">{calculateTotals(data2025.totalSalesUnits).annual}</td>
                    <td className="border border-gray-300 px-4 py-2 text-center font-medium">{calculateTotals(data2025.totalSalesUnits).spring}</td>
                    <td className="border border-gray-300 px-4 py-2 text-center font-medium">{calculateTotals(data2025.totalSalesUnits).fall}</td>
                  </tr>
                  
                  {/* Store Sales Units */}
                  <tr>
                    <td className="border border-gray-300 px-4 py-2 font-medium">Store Sales Units</td>
                    {data2025.storeSalesUnits.map((value, index) => (
                      <td key={index} className="border border-gray-300 px-4 py-2 text-center">{value}</td>
                    ))}
                   <td className="border border-gray-300 px-4 py-2 text-center font-medium">{calculateTotals(data2025.storeSalesUnits).spring}</td>
                    <td className="border border-gray-300 px-4 py-2 text-center font-medium">{calculateTotals(data2025.storeSalesUnits).fall}</td>
                  </tr>
                  
                  {/* COM Sales Units */}
                  <tr>
                    <td className="border border-gray-300 px-4 py-2 font-medium">COM Sales Units</td>
                    {data2025.comSalesUnits.map((value, index) => (
                      <td key={index} className="border border-gray-300 px-4 py-2 text-center">{value}</td>
                    ))}
                    <td className="border border-gray-300 px-4 py-2 text-center font-medium">{calculateTotals(data2025.comSalesUnits).annual}</td>
                    <td className="border border-gray-300 px-4 py-2 text-center font-medium">{calculateTotals(data2025.comSalesUnits).spring}</td>
                    <td className="border border-gray-300 px-4 py-2 text-center font-medium">{calculateTotals(data2025.comSalesUnits).fall}</td>
                  </tr>
                  
                  {/* COM % to TTL (Sales) */}
                  <tr className="bg-yellow-50">
                    <td className="border border-gray-300 px-4 py-2 font-medium">COM % to TTL (Sales)</td>
                    {data2025.comToTtlSales.map((value, index) => (
                      <td key={index} className="border border-gray-300 px-4 py-2 text-center">{formatValue(value, true)}</td>
                    ))}
                    <td className="border border-gray-300 px-4 py-2 text-center font-medium">{formatValue(calculateTotals(data2025.comToTtlSales).annual, true)}</td>
                    <td className="border border-gray-300 px-4 py-2 text-center font-medium">{formatValue(calculateTotals(data2025.comToTtlSales).spring, true)}</td>
                    <td className="border border-gray-300 px-4 py-2 text-center font-medium">{formatValue(calculateTotals(data2025.comToTtlSales).fall, true)}</td>
                  </tr>
                  
                  {/* TOTAL EOM OH */}
                  <tr>
                    <td className="border border-gray-300 px-4 py-2 font-medium">TOTAL EOM OH</td>
                    {data2025.totalEomOh.map((value, index) => (
                      <td key={index} className="border border-gray-300 px-4 py-2 text-center">{value}</td>
                    ))}
                    <td className="border border-gray-300 px-4 py-2 text-center font-medium">{calculateTotals(data2025.totalEomOh).annual}</td>
                    <td className="border border-gray-300 px-4 py-2 text-center font-medium">{calculateTotals(data2025.totalEomOh).spring}</td>
                    <td className="border border-gray-300 px-4 py-2 text-center font-medium">{calculateTotals(data2025.totalEomOh).fall}</td>
                  </tr>
                  
                  {/* More rows for 2025 would be added here */}
                  
                </tbody>
              </table>
            </div>
          )}
        </div>
        
        {/* 2024 Section */}
        <div>
          {/* 2024 Header with dropdown and expand/collapse button */}
          <div className="flex items-center bg-gray-200 p-2 border-t border-gray-300">
            <button 
              className="mr-2 text-gray-700 focus:outline-none"
              onClick={() => setYear2024Expanded(!year2024Expanded)}
            >
              {year2024Expanded ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
            </button>
            <h2 className="font-bold text-gray-800 text-sm">TOTAL 2024</h2>
            
            {/* Dropdown taking remaining width */}
            <div className="ml-auto relative">
              <button 
                className="flex items-center justify-between bg-white border border-gray-300 px-3 py-1 rounded text-sm w-48"
                onClick={() => setDropdown2024Open(!dropdown2024Open)}
              >
                <span>{selectedView2024}</span>
                <ChevronDown size={14} />
              </button>
              
              {dropdown2024Open && (
                <div className="absolute right-0 top-full mt-1 w-48 bg-white border border-gray-300 rounded shadow-lg z-10">
                  {viewOptions.map((option) => (
                    <div 
                      key={option}
                      className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                      onClick={() => {
                        setSelectedView2024(option);
                        setDropdown2024Open(false);
                      }}
                    >
                      {option}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          
          {/* 2024 Table - only shown when expanded */}
          {year2024Expanded && (
            <div className="overflow-x-auto">
              <table className="min-w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-300 px-4 py-2 text-left font-semibold">TOTAL 2024</th>
                    {months.map(month => (
                      <th key={month} className="border border-gray-300 px-4 py-2 text-center font-semibold">{month}</th>
                    ))}
                    <th className="border border-gray-300 px-4 py-2 text-center font-semibold">ANNUAL</th>
                    <th className="border border-gray-300 px-4 py-2 text-center font-semibold">SPRING</th>
                    <th className="border border-gray-300 px-4 py-2 text-center font-semibold">FALL</th>
                  </tr>
                </thead>
                <tbody>
                  {/* Total Sales Units */}
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-4 py-2 font-medium">Total Sales Units</td>
                    {data2024.totalSalesUnits.map((value, index) => (
                      <td key={index} className="border border-gray-300 px-4 py-2 text-center">{value}</td>
                    ))}
                    <td className="border border-gray-300 px-4 py-2 text-center font-medium">{calculateTotals(data2024.totalSalesUnits).annual}</td>
                    <td className="border border-gray-300 px-4 py-2 text-center font-medium">{calculateTotals(data2024.totalSalesUnits).spring}</td>
                    <td className="border border-gray-300 px-4 py-2 text-center font-medium">{calculateTotals(data2024.totalSalesUnits).fall}</td>
                  </tr>
                  
                  {/* More rows for 2024 would be added here */}
                  
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CombinedForecastComponent;