import { selectSalesData, selectSalesLoading, selectSalesError } from '../../redux/selectors';
import { RootState } from '../../redux/store';

describe('Sales Selectors', () => {
    const mockState: RootState = {
        sales: {
            data: {
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
            },
            loading: true,
            error: 'Some error'
        }
    };

    it('should select sales data from state', () => {
        const result = selectSalesData(mockState);
        expect(result).toEqual(mockState.sales.data);
    });

    it('should select sales loading state from state', () => {
        const result = selectSalesLoading(mockState);
        expect(result).toBe(mockState.sales.loading);
    });

    it('should select sales error from state', () => {
        const result = selectSalesError(mockState);
        expect(result).toBe(mockState.sales.error);
    });
});
