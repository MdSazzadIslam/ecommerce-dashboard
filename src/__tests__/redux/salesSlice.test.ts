import { fetchSalesDataStart, fetchSalesDataSuccess, fetchSalesDataFailure } from '../../redux/actions';
import { FetchSalesDataStartPayload, FetchSalesDataFailurePayload, SalesData } from '../../redux/types';

describe('Sales Actions', () => {
    it('should create an action to start fetching sales data', () => {
        const payload: FetchSalesDataStartPayload = {
            period: 'monthly',
            topSellingLimit: 10
        };

        const expectedAction = {
            type: 'sales/fetchSalesDataStart',
            payload
        };

        expect(fetchSalesDataStart(payload)).toEqual(expectedAction);
    });

    it('should create an action for successful sales data fetch', () => {
        const salesData: SalesData = {
            salesByCategory: [], // Replace with valid sales data structure
            salesTrendOverTime: [],
            salesByRegion: [],
            topSellingProducts: [],
            salesVsTarget: [],
            customerDemographics: [],
            revenueAndProfit: [],
            salesConversionRate: []
        };

        const expectedAction = {
            type: 'sales/fetchSalesDataSuccess',
            payload: salesData
        };

        expect(fetchSalesDataSuccess(salesData)).toEqual(expectedAction);
    });

    it('should create an action for failed sales data fetch', () => {
        const errorPayload: FetchSalesDataFailurePayload = {
            error: 'Failed to fetch sales data' // Replace with valid error payload data
        };

        const expectedAction = {
            type: 'sales/fetchSalesDataFailure',
            payload: errorPayload
        };

        expect(fetchSalesDataFailure(errorPayload)).toEqual(expectedAction);
    });
});
