import { RootState } from '../store';
import { SalesData } from '../types';

// Selector to get sales data from the state
export const selectSalesData = (state: RootState): SalesData | null => {
    return state.sales?.data ?? null;
};

// Selector to get sales loading state from the state
export const selectSalesLoading = (state: RootState): boolean => {
    return state.sales?.loading ?? false;
};

// Selector to get sales error from the state
export const selectSalesError = (state: RootState): string | null => {
    return state.sales?.error ?? null;
};
