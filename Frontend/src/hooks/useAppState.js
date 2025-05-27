// src/hooks/useAppState.js
import { useSelector, useDispatch } from "react-redux";
import { useCallback } from "react";

// Products hook
export const useProducts = () => {
  const dispatch = useDispatch();

  const products = useSelector(selectCurrentProducts);
  const loading = useSelector(selectProductsLoading);
  const error = useSelector((state) => state.products.errors.products);
  const selectedProductType = useSelector(
    (state) => state.products.selectedProductType
  );

  const fetchProductsAction = useCallback(
    (filters = {}) => {
      dispatch(
        fetchProducts({
          productType: selectedProductType,
          filters,
        })
      );
    },
    [dispatch, selectedProductType]
  );

  const setProductType = useCallback(
    (productType) => {
      dispatch(setSelectedProductType(productType));
    },
    [dispatch]
  );

  return {
    products,
    loading,
    error,
    selectedProductType,
    fetchProducts: fetchProductsAction,
    setProductType,
  };
};

// Filters hook
export const useFilters = () => {
  const dispatch = useDispatch();

  const selectedFilters = useSelector(selectSelectedFilters);
  const availableFilters = useSelector(selectAvailableFilters);
  const hasActiveFilters = useSelector(selectHasActiveFilters);

  const updateFilters = useCallback(
    (filters) => {
      dispatch(updateSelectedFilters(filters));
    },
    [dispatch]
  );

  const clearFilters = useCallback(() => {
    dispatch(clearAllFilters());
  }, [dispatch]);

  return {
    selectedFilters,
    availableFilters,
    hasActiveFilters,
    updateFilters,
    clearFilters,
  };
};

// Forecast hook
export const useForecast = () => {
  const dispatch = useDispatch();

  const formData = useSelector((state) => state.forecast.formData);
  const uploadStatus = useSelector((state) => state.forecast.uploadStatus);
  const currentSession = useSelector((state) => state.forecast.currentSession);
  const error = useSelector((state) => state.forecast.error);

  const updateForm = useCallback(
    (data) => {
      dispatch(updateFormData(data));
    },
    [dispatch]
  );

  const uploadForecastAction = useCallback(() => {
    dispatch(uploadForecast(formData));
  }, [dispatch, formData]);

  return {
    formData,
    uploadStatus,
    currentSession,
    error,
    updateForm,
    uploadForecast: uploadForecastAction,
  };
};
