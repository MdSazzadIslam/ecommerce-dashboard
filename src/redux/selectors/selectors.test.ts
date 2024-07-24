import { selectSalesData, selectSalesLoading, selectSalesError } from '../selectors';
import { RootState } from '../store';
import { SalesData } from '../types';

describe('Sales Selectors', () => {
    // Mock state
    const mockState: RootState = {
        sales: {
            data: {
                salesByCategory: [], // Replace with actual structure
                salesTrendOverTime: [],
                salesByRegion: [],
                topSellingProducts: [],
                salesVsTarget: [],
                customerDemographics: [],
                revenueAndProfit: [],
                salesConversionRate: []
            },
            loading: false,
            error: null
        }
    };

    it('should select sales data from state', () => {
        const expectedData: SalesData = {
            salesByCategory: [],
            salesTrendOverTime: [],
            salesByRegion: [],
            topSellingProducts: [],
            salesVsTarget: [],
            customerDemographics: [],
            revenueAndProfit: [],
            salesConversionRate: []
        };

        expect(selectSalesData(mockState)).toEqual(expectedData);
    });

    it('should select sales loading state from state', () => {
        expect(selectSalesLoading(mockState)).toBe(false);
    });

    it('should select sales error from state', () => {
        expect(selectSalesError(mockState)).toBe(null);
    });

    // Additional test cases for edge cases
    it('should return null if sales data is undefined', () => {
        const stateWithNoSalesData: RootState = {
            sales: {
                data: null,
                loading: false,
                error: null
            }
        };
        expect(selectSalesData(stateWithNoSalesData)).toBe(null);
    });

    it('should return true if sales loading is true', () => {
        const stateWithLoading: RootState = {
            sales: {
                data: mockState.sales.data,
                loading: true,
                error: null
            }
        };
        expect(selectSalesLoading(stateWithLoading)).toBe(true);
    });

    it('should return error message if sales error is present', () => {
        const stateWithError: RootState = {
            sales: {
                data: mockState.sales.data,
                loading: false,
                error: 'Failed to fetch sales data'
            }
        };
        expect(selectSalesError(stateWithError)).toBe('Failed to fetch sales data');
    });
});
