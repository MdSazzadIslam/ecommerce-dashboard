import { fetchSalesDataStart, fetchSalesDataSuccess, fetchSalesDataFailure } from '../../redux/actions';
import { FetchSalesDataStartPayload, FetchSalesDataFailurePayload, SalesData } from '../../redux/types';

describe('Sales Actions', () => {
    it('should create an action to start fetching sales data', () => {
        const payload: FetchSalesDataStartPayload = {
            topSellingLimit: 10,
            period: 'monthly'
        };

        const expectedAction = {
            type: 'sales/fetchSalesDataStart',
            payload
        };

        expect(fetchSalesDataStart(payload)).toEqual(expectedAction);
    });

    it('should create an action for successful sales data fetch', () => {
        const salesData: SalesData = {
            salesTrendOverTime: [
                { period: '2024-01', totalSales: 1000 },
                { period: '2024-02', totalSales: 1500 }
            ],
            salesByRegion: [
                { region: 'North America', totalSales: 5000 },
                { region: 'Europe', totalSales: 4000 }
            ],
            salesByCategory: [
                { category: 'Electronics', totalSales: 3000 },
                { category: 'Clothing', totalSales: 2000 }
            ],
            topSellingProducts: [
                { product: 'Product A', totalSales: 2000 },
                { product: 'Product B', totalSales: 1500 }
            ],
            salesVsTarget: [
                { product: 'Product A', actualSales: 2000, targetSales: 1800 },
                { product: 'Product B', actualSales: 1500, targetSales: 1600 }
            ],
            customerDemographics: [
                { ageGroup: '18-24', gender: 'Female', occupation: 'Student', totalSales: 1200 },
                { ageGroup: '25-34', gender: 'Male', occupation: 'Professional', totalSales: 2500 }
            ],
            revenueAndProfit: [
                { date: '2024-01-01', totalProfit: 500, totalRevenue: 3000 },
                { date: '2024-02-01', totalProfit: 700, totalRevenue: 3500 }
            ],
            salesConversionRate: [
                { period: 'monthly', conversionRate: 2.5 }
            ]
        };

        const expectedAction = {
            type: 'sales/fetchSalesDataSuccess',
            payload: salesData
        };

        expect(fetchSalesDataSuccess(salesData)).toEqual(expectedAction);
    });

    it('should create an action for failed sales data fetch', () => {
        const payload: FetchSalesDataFailurePayload = {
            error: 'Unable to fetch sales data'
        };

        const expectedAction = {
            type: 'sales/fetchSalesDataFailure',
            payload
        };

        expect(fetchSalesDataFailure(payload)).toEqual(expectedAction);
    });
});
