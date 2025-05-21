import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  ArrowLeft,
  ChevronDown,
  Calendar,
  TrendingUp,
  Package,
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
    fetchProductDetails();
  }, [productId]);

  const fetchProductDetails = async () => {
    setLoading(true);
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

  const formatValue = (value, isPercentage = false) => {
    if (value === null || value === undefined || value === "") return "-";
    if (isPercentage) return `${value}%`;
    return typeof value === "number" ? value.toLocaleString() : value;
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

  const calculateTotals = (forecast) => {
    if (!forecast) return { annual: 0, spring: 0, fall: 0 };

    const values = months.map((month) => forecast[month] || 0);
    const annual = values.reduce((sum, val) => sum + val, 0);
    const spring = values.slice(0, 6).reduce((sum, val) => sum + val, 0); // Feb-Jul
    const fall = values.slice(6).reduce((sum, val) => sum + val, 0); // Aug-Jan

    return { annual, spring, fall };
  };

  // Mock rolling forecast data (you can replace this with API data)
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

  const renderRollingForecastTable = () => {
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
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-50">
              <th className="border border-gray-300 px-3 py-2 text-left text-sm font-medium text-gray-700">
                ROLLING 12M FC
              </th>
              {monthLabels.map((month) => (
                <th
                  key={month}
                  className="border border-gray-300 px-3 py-2 text-center text-sm font-medium text-gray-700"
                >
                  {month}
                </th>
              ))}
              <th className="border border-gray-300 px-3 py-2 text-center text-sm font-medium text-gray-700">
                ANNUAL
              </th>
              <th className="border border-gray-300 px-3 py-2 text-center text-sm font-medium text-gray-700">
                SPRING
              </th>
              <th className="border border-gray-300 px-3 py-2 text-center text-sm font-medium text-gray-700">
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
                  className={row.highlight ? "bg-yellow-50" : "bg-white"}
                >
                  <td className="border border-gray-300 px-3 py-2 text-sm font-medium">
                    {row.label}
                  </td>
                  {row.data.map((value, i) => (
                    <td
                      key={i}
                      className={`border border-gray-300 px-3 py-2 text-center text-sm ${
                        row.redHighlight && value > 0
                          ? "bg-red-50 text-red-600"
                          : ""
                      }`}
                    >
                      {formatValue(value, row.isPercentage)}
                    </td>
                  ))}
                  <td className="border border-gray-300 px-3 py-2 text-center text-sm font-medium">
                    {formatValue(totals.annual, row.isPercentage)}
                  </td>
                  <td className="border border-gray-300 px-3 py-2 text-center text-sm font-medium">
                    {formatValue(totals.spring, row.isPercentage)}
                  </td>
                  <td className="border border-gray-300 px-3 py-2 text-center text-sm font-medium">
                    {formatValue(totals.fall, row.isPercentage)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  };

  const renderMonthlyForecastTable = (year) => {
    if (!productData?.monthly_forecast) return null;

    const yearForecasts = productData.monthly_forecast.filter(
      (f) => f.year === year
    );

    const forecastRows = [
      { key: "TY_Unit_Sales", label: "Total Sales Units" },
      { key: "LY_Unit_Sales", label: "Store Sales Units" },
      { key: "TY_MCOM_Unit_Sales", label: "COM Sales Units" },
      {
        key: "MCOM_PTD_TY_Sales",
        label: "COM % to TTL (Sales)",
        isPercentage: true,
      },
      { key: "TY_OH_Units", label: "TOTAL EOM OH" },
      { key: "MacysProjectionReciepts", label: "Macys Projection Receipts" },
    ];

    return (
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-50">
              <th className="border border-gray-300 px-3 py-2 text-left text-sm font-medium text-gray-700">
                TOTAL {year}
              </th>
              {monthLabels.map((month) => (
                <th
                  key={month}
                  className="border border-gray-300 px-3 py-2 text-center text-sm font-medium text-gray-700"
                >
                  {month}
                </th>
              ))}
              <th className="border border-gray-300 px-3 py-2 text-center text-sm font-medium text-gray-700">
                ANNUAL
              </th>
              <th className="border border-gray-300 px-3 py-2 text-center text-sm font-medium text-gray-700">
                SPRING
              </th>
              <th className="border border-gray-300 px-3 py-2 text-center text-sm font-medium text-gray-700">
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
                    <td className="border border-gray-300 px-3 py-2 text-sm font-medium">
                      {row.label}
                    </td>
                    {monthLabels.map((_, i) => (
                      <td
                        key={i}
                        className="border border-gray-300 px-3 py-2 text-center text-sm"
                      >
                        -
                      </td>
                    ))}
                    <td className="border border-gray-300 px-3 py-2 text-center text-sm font-medium">
                      -
                    </td>
                    <td className="border border-gray-300 px-3 py-2 text-center text-sm">
                      -
                    </td>
                    <td className="border border-gray-300 px-3 py-2 text-center text-sm">
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
                  className={
                    isPercentageRow
                      ? "bg-yellow-50"
                      : index % 2 === 0
                      ? "bg-white"
                      : "bg-gray-50"
                  }
                >
                  <td className="border border-gray-300 px-3 py-2 text-sm font-medium">
                    {row.label}
                  </td>
                  {months.map((month) => (
                    <td
                      key={month}
                      className="border border-gray-300 px-3 py-2 text-center text-sm"
                    >
                      {formatValue(forecast[month], row.isPercentage)}
                    </td>
                  ))}
                  <td className="border border-gray-300 px-3 py-2 text-center text-sm font-medium">
                    {formatValue(totals.annual, row.isPercentage)}
                  </td>
                  <td className="border border-gray-300 px-3 py-2 text-center text-sm">
                    {formatValue(totals.spring, row.isPercentage)}
                  </td>
                  <td className="border border-gray-300 px-3 py-2 text-center text-sm">
                    {formatValue(totals.fall, row.isPercentage)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading product details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-600">{error}</p>
        <button
          onClick={onBack}
          className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-indigo-600 hover:text-indigo-800"
        >
          <ArrowLeft size={20} />
          Back to Products
        </button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Product Details: {productId}
          </h1>
          <p className="text-gray-600">
            Comprehensive forecast and performance data
          </p>
        </div>
      </div>

      {/* Product Basic Info */}
      {productData?.product_details && (
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h2 className="text-lg font-semibold mb-4">Product Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-600">
                Product ID
              </label>
              <p className="font-semibold">
                {productData.product_details.product_id}
              </p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">
                Description
              </label>
              <p className="font-semibold">
                {productData.product_details.product_description || "-"}
              </p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">
                Department
              </label>
              <p className="font-semibold">
                {productData.product_details.department_description || "-"}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Rolling 12M Forecast */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div
          className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex justify-between items-center cursor-pointer"
          onClick={() => toggleSection("rollingForecast")}
        >
          <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            <TrendingUp size={20} className="text-indigo-600" />
            Rolling 12M Forecast
          </h3>
          <ChevronDown
            size={20}
            className={`text-gray-500 transition-transform ${
              expandedSections.rollingForecast ? "rotate-180" : ""
            }`}
          />
        </div>
        {expandedSections.rollingForecast && (
          <div className="p-6">{renderRollingForecastTable()}</div>
        )}
      </div>

      {/* Monthly Forecast */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div
          className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex justify-between items-center cursor-pointer"
          onClick={() => toggleSection("monthlyForecast")}
        >
          <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            <Calendar size={20} className="text-indigo-600" />
            Monthly Forecast
          </h3>
          <ChevronDown
            size={20}
            className={`text-gray-500 transition-transform ${
              expandedSections.monthlyForecast ? "rotate-180" : ""
            }`}
          />
        </div>
        {expandedSections.monthlyForecast && (
          <div className="p-6 space-y-6">
            {/* 2025 Data */}
            <div>
              <h4 className="text-md font-semibold text-gray-700 mb-4">
                TOTAL 2025
              </h4>
              {renderMonthlyForecastTable(2025)}
            </div>

            {/* 2024 Data */}
            <div>
              <h4 className="text-md font-semibold text-gray-700 mb-4">
                TOTAL 2024
              </h4>
              {renderMonthlyForecastTable(2024)}
            </div>
          </div>
        )}
      </div>

      {/* Additional Forecast Types */}
      {productData?.store_forecast && productData.store_forecast.length > 0 && (
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div
            className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex justify-between items-center cursor-pointer"
            onClick={() => toggleSection("storeForecast")}
          >
            <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
              <Package size={20} className="text-blue-600" />
              Store Forecast Data
            </h3>
            <ChevronDown
              size={20}
              className={`text-gray-500 transition-transform ${
                expandedSections.storeForecast ? "rotate-180" : ""
              }`}
            />
          </div>
          {expandedSections.storeForecast && (
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-600">
                    Door Count
                  </label>
                  <p className="font-semibold">
                    {productData.store_forecast[0]?.door_count || "-"}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">
                    Lead Time
                  </label>
                  <p className="font-semibold">
                    {productData.store_forecast[0]?.lead_time || "-"}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">
                    Trend
                  </label>
                  <p className="font-semibold">
                    {productData.store_forecast[0]?.trend || "-"}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ProductDetailsView;
