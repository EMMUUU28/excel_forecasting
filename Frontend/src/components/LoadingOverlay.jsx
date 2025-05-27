// src/components/LoadingOverlay.jsx
import React from "react";

const LoadingOverlay = () => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 flex flex-col items-center">
        <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mb-4"></div>
        <p className="text-gray-700 font-medium">Processing...</p>
        <p className="text-gray-500 text-sm mt-1">
          Please wait while we load your data
        </p>
      </div>
    </div>
  );
};

export default LoadingOverlay;
