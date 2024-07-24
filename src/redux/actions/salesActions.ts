import { createAction } from '@reduxjs/toolkit';
import { FetchSalesDataFailurePayload, FetchSalesDataStartPayload, SalesData } from '../types';



// Action creators with typed payloads
export const fetchSalesDataStart = createAction<FetchSalesDataStartPayload>('sales/fetchSalesDataStart');

/**
 * Action dispatched when sales data fetch succeeds.
 * @param data - The sales data returned from the API.
 */
export const fetchSalesDataSuccess = createAction<SalesData>('sales/fetchSalesDataSuccess');

/**
 * Action dispatched when sales data fetch fails.
 * @param payload - Contains error information about the failure.
 */
export const fetchSalesDataFailure = createAction<FetchSalesDataFailurePayload>('sales/fetchSalesDataFailure');