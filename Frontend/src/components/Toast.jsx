// Toast Component
// src/components/Toast.jsx
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { removeToast } from "../redux/uiSlice";
import { CheckCircle, AlertCircle, Info, X } from "lucide-react";

const Toast = ({ id, type = "info", message, duration = 5000 }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(removeToast(id));
    }, duration);

    return () => clearTimeout(timer);
  }, [dispatch, id, duration]);

  const handleClose = () => {
    dispatch(removeToast(id));
  };

  const getToastStyles = () => {
    switch (type) {
      case "success":
        return "bg-green-50 border-green-200 text-green-800";
      case "error":
        return "bg-red-50 border-red-200 text-red-800";
      case "warning":
        return "bg-yellow-50 border-yellow-200 text-yellow-800";
      default:
        return "bg-blue-50 border-blue-200 text-blue-800";
    }
  };

  const getIcon = () => {
    switch (type) {
      case "success":
        return <CheckCircle size={20} className="text-green-600" />;
      case "error":
        return <AlertCircle size={20} className="text-red-600" />;
      case "warning":
        return <AlertCircle size={20} className="text-yellow-600" />;
      default:
        return <Info size={20} className="text-blue-600" />;
    }
  };

  return (
    <div
      className={`max-w-sm w-full border rounded-lg shadow-lg p-4 ${getToastStyles()} animate-slideIn`}
    >
      <div className="flex items-start">
        <div className="flex-shrink-0">{getIcon()}</div>
        <div className="ml-3 w-0 flex-1">
          <p className="text-sm font-medium">{message}</p>
        </div>
        <div className="ml-4 flex-shrink-0 flex">
          <button
            onClick={handleClose}
            className="inline-flex text-gray-400 hover:text-gray-600 focus:outline-none"
          >
            <X size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Toast;
