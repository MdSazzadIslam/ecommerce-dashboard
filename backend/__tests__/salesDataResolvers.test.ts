import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import { SalesData, salesDataResolvers } from '../src/domain/sales';
import { CustomerDemographicsResult, roundToTwoDecimalPlaces, SalesVsTargetResult } from '../src/shared'; // Adjust the path as necessary

// Set up in-memory MongoDB server
let mongoServer: MongoMemoryServer;

// Generic sorting function
const sortArrayBy = <T>(arr: T[], compareFn: (a: T, b: T) => number): T[] =>
    arr.sort(compareFn);

// Comparison functions
const compareCustomerDemographics = (a: CustomerDemographicsResult, b: CustomerDemographicsResult): number =>
    a.ageGroup.localeCompare(b.ageGroup) ||
    a.gender.localeCompare(b.gender) ||
    a.occupation.localeCompare(b.occupation);

const compareSalesVsTarget = (a: SalesVsTargetResult, b: SalesVsTargetResult): number =>
    a.product.localeCompare(b.product);


beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    await mongoose.connect(uri, { serverSelectionTimeoutMS: 5000, });
});

afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
});

beforeEach(async () => {
    // Clear the database before each test
    await SalesData.deleteMany({});
});

describe('salesDataResolvers', () => {
    it('should return sales conversion rate', async () => {
        // Seed test data
        await SalesData.insertMany([
            { product: 'Product1', salesRevenue: 100, region: 'Region1', category: 'Category1', date: new Date(), cost: 50, profit: 50, ageGroup: '25-34', gender: 'Male', occupation: 'Engineer' },
            { product: 'Product2', salesRevenue: 200, region: 'Region2', category: 'Category2', date: new Date(), cost: 100, profit: 100, ageGroup: '35-44', gender: 'Female', occupation: 'Doctor' }
        ]);

        const result = await salesDataResolvers.Query.salesData(null, { topSellingLimit: 10, period: 'daily' });

        expect(result.salesConversionRate).toEqual([
            {
                period: expect.any(String),
                totalSales: roundToTwoDecimalPlaces(300),
                totalRecords: 2,
                conversionRate: roundToTwoDecimalPlaces(150) // This assumes a conversion rate based on average sales per record
            }
        ]);
    });

    it('should return sales by region', async () => {
        // Seed test data
        await SalesData.insertMany([
            { product: 'Product1', salesRevenue: 100, region: 'Region1', category: 'Category1', date: new Date(), cost: 50, profit: 50, ageGroup: '25-34', gender: 'Male', occupation: 'Engineer' },
            { product: 'Product2', salesRevenue: 200, region: 'Region1', category: 'Category2', date: new Date(), cost: 100, profit: 100, ageGroup: '35-44', gender: 'Female', occupation: 'Doctor' }
        ]);

        const result = await salesDataResolvers.Query.salesData(null, { topSellingLimit: 10, period: 'daily' });

        expect(result.salesByRegion).toEqual([
            {
                region: 'Region1',
                totalSales: roundToTwoDecimalPlaces(300)
            }
        ]);
    });

    it('should return sales by category', async () => {
        // Seed test data
        await SalesData.insertMany([
            { product: 'Product1', salesRevenue: 100, region: 'Region1', category: 'Category1', date: new Date(), cost: 50, profit: 50, ageGroup: '25-34', gender: 'Male', occupation: 'Engineer' },
            { product: 'Product2', salesRevenue: 200, region: 'Region2', category: 'Category1', date: new Date(), cost: 100, profit: 100, ageGroup: '35-44', gender: 'Female', occupation: 'Doctor' }
        ]);

        const result = await salesDataResolvers.Query.salesData(null, { topSellingLimit: 10, period: 'daily' });

        expect(result.salesByCategory).toEqual([
            {
                category: 'Category1',
                totalSales: roundToTwoDecimalPlaces(300)
            }
        ]);
    });

    it('should return top-selling products', async () => {
        // Seed test data
        await SalesData.insertMany([
            { product: 'Product1', salesRevenue: 100, region: 'Region1', category: 'Category1', date: new Date(), cost: 50, profit: 50, ageGroup: '25-34', gender: 'Male', occupation: 'Engineer' },
            { product: 'Product2', salesRevenue: 200, region: 'Region2', category: 'Category2', date: new Date(), cost: 100, profit: 100, ageGroup: '35-44', gender: 'Female', occupation: 'Doctor' }
        ]);

        const result = await salesDataResolvers.Query.salesData(null, { topSellingLimit: 1, period: 'daily' });

        expect(result.topSellingProducts).toEqual([
            {
                product: 'Product2',
                totalSales: roundToTwoDecimalPlaces(200)
            }
        ]);
    });

    it('should return sales vs target', async () => {
        // Seed test data
        await SalesData.insertMany([
            { product: 'Product1', salesRevenue: 100, region: 'Region1', category: 'Category1', date: new Date(), cost: 150, profit: 50, ageGroup: '25-34', gender: 'Male', occupation: 'Engineer' },
            { product: 'Product2', salesRevenue: 200, region: 'Region2', category: 'Category2', date: new Date(), cost: 250, profit: 100, ageGroup: '35-44', gender: 'Female', occupation: 'Doctor' }
        ]);

        const result = await salesDataResolvers.Query.salesData(null, { topSellingLimit: 10, period: 'daily' });
        const expected = [
            {
                product: 'Product1',
                actualSales: roundToTwoDecimalPlaces(100),
                targetSales: roundToTwoDecimalPlaces(150)
            },
            {
                product: 'Product2',
                actualSales: roundToTwoDecimalPlaces(200),
                targetSales: roundToTwoDecimalPlaces(250)
            }
        ];

        // Compare results with sorted order
        expect(sortArrayBy(result.salesVsTarget, compareSalesVsTarget))
            .toEqual(sortArrayBy(expected, compareSalesVsTarget));
    });

    it('should return revenue and profit', async () => {
        // Seed test data
        await SalesData.insertMany([
            { product: 'Product1', salesRevenue: 100, region: 'Region1', category: 'Category1', date: new Date(), cost: 50, profit: 50, ageGroup: '25-34', gender: 'Male', occupation: 'Engineer' },
            { product: 'Product2', salesRevenue: 200, region: 'Region2', category: 'Category2', date: new Date(), cost: 100, profit: 100, ageGroup: '35-44', gender: 'Female', occupation: 'Doctor' }
        ]);

        const result = await salesDataResolvers.Query.salesData(null, { topSellingLimit: 10, period: 'daily' });


        expect(result.revenueAndProfit).toEqual([
            {
                date: expect.any(String), // The date should be a string in ISO format
                totalRevenue: roundToTwoDecimalPlaces(300),
                totalProfit: roundToTwoDecimalPlaces(150)
            }
        ]);
    });

    it('should return customer demographics', async () => {
        // Seed test data
        await SalesData.insertMany([
            { product: 'Product1', salesRevenue: 100, region: 'Region1', category: 'Category1', date: new Date(), cost: 50, profit: 50, ageGroup: '25-34', gender: 'Male', occupation: 'Engineer' },
            { product: 'Product2', salesRevenue: 200, region: 'Region2', category: 'Category2', date: new Date(), cost: 100, profit: 100, ageGroup: '25-34', gender: 'Female', occupation: 'Doctor' }
        ]);

        const result = await salesDataResolvers.Query.salesData(null, { topSellingLimit: 10, period: 'daily' });

        // Expected result
        const expected: CustomerDemographicsResult[] = [
            {
                ageGroup: '25-34',
                gender: 'Male',
                occupation: 'Engineer',
                totalSales: roundToTwoDecimalPlaces(100)
            },
            {
                ageGroup: '25-34',
                gender: 'Female',
                occupation: 'Doctor',
                totalSales: roundToTwoDecimalPlaces(200)
            }
        ];


        // Compare results with sorted order
        // Compare results with sorted order
        expect(sortArrayBy(result.customerDemographics, compareCustomerDemographics))
            .toEqual(sortArrayBy(expected, compareCustomerDemographics));
    });

    it('should return sales trend over time', async () => {
        // Seed test data
        await SalesData.insertMany([
            { product: 'Product1', salesRevenue: 100, region: 'Region1', category: 'Category1', date: new Date('2023-07-01'), cost: 50, profit: 50, ageGroup: '25-34', gender: 'Male', occupation: 'Engineer' },
            { product: 'Product2', salesRevenue: 200, region: 'Region2', category: 'Category2', date: new Date('2023-07-01'), cost: 100, profit: 100, ageGroup: '35-44', gender: 'Female', occupation: 'Doctor' }
        ]);

        const result = await salesDataResolvers.Query.salesData(null, { topSellingLimit: 10, period: 'monthly' });

        expect(result.salesTrendOverTime).toEqual([
            {
                period: '2023-07', // Adjust according to your period format
                totalSales: roundToTwoDecimalPlaces(300)
            }
        ]);
    });
});
