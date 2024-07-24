import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SalesData, SalesState, FetchSalesDataFailurePayload } from '../types';
import { fetchSalesDataStart, fetchSalesDataSuccess, fetchSalesDataFailure } from '../actions/salesActions';

// Initialize the state
const initialState: SalesState = {
    data: null,
    loading: false,
    error: null,
};

const salesSlice = createSlice({
    name: 'sales',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchSalesDataStart, (state) => {
                state.loading = true;
                state.error = null; // Reset error state on new fetch
            })
            .addCase(fetchSalesDataSuccess, (state, action: PayloadAction<SalesData>) => {
                state.data = action.payload; // Assign the SalesData object to state.data
                state.loading = false;
            })
            .addCase(fetchSalesDataFailure, (state, action: PayloadAction<FetchSalesDataFailurePayload>) => {
                state.error = action.payload.error; // Extract error message from payload
                state.loading = false;
            })
    },
});

export default salesSlice.reducer;
