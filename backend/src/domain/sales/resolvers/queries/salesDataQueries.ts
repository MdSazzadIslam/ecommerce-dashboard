import { SalesData } from '../../models';
import {
    SalesTrend,
    SalesByRegionResult,
    SalesByCategoryResult,
    TopSellingProductsResult,
    SalesVsTargetResult,
    RevenueAndProfitResult,
    CustomerDemographicsResult,
    SalesConversionRateResult
} from '../../../../shared/types';
import { logger, roundToTwoDecimalPlaces } from '../../../../shared/utils';

// Helper function to create the MongoDB date grouping format based on the period
const getGroupByPeriod = (period: string) => {
    switch (period) {
        case 'monthly':
            return { $dateToString: { format: "%Y-%m", date: "$date" } };
        case 'quarterly':
            return {
                $concat: [
                    { $dateToString: { format: "%Y", date: "$date" } },
                    "-Q",
                    {
                        $toString: {
                            $cond: [
                                { $lte: [{ $month: "$date" }, 3] }, "1",
                                {
                                    $cond: [
                                        { $lte: [{ $month: "$date" }, 6] }, "2",
                                        {
                                            $cond: [
                                                { $lte: [{ $month: "$date" }, 9] }, "3", "4"
                                            ]
                                        }
                                    ]
                                }
                            ]
                        }
                    }
                ]
            };
        case 'annually':
            return { $dateToString: { format: "%Y", date: "$date" } };
        case 'daily':
        default:
            return { $dateToString: { format: "%Y-%m-%d", date: "$date" } };
    }
};


// Generic transformation function
const transformData = <T, U>(data: T[], transform: (item: T) => U): U[] =>
    data.map(transform);

export const salesDataQueries = {
    salesData: async (_: any, { topSellingLimit = 10, period = 'daily' }: { topSellingLimit: number, period: string }) => {
        try {
            // Define the aggregation pipeline
            const pipeline: any[] = [
                {
                    $facet: {
                        salesConversionRate: [
                            {
                                $group: {
                                    _id: getGroupByPeriod(period), // Default to daily period
                                    totalSales: { $sum: "$salesRevenue" },
                                    totalRecords: { $sum: 1 } // Count of records
                                }
                            },
                            {
                                $project: {
                                    _id: 0,
                                    period: "$_id",
                                    totalSales: { $round: ["$totalSales", 2] },
                                    totalRecords: { $round: ["$totalRecords", 2] },
                                    conversionRate: {
                                        $cond: [
                                            { $gt: ["$totalRecords", 0] },
                                            { $divide: ["$totalSales", "$totalRecords"] },
                                            0
                                        ]
                                    }
                                }
                            }
                        ],
                        salesByRegion: [
                            { $group: { _id: "$region", totalSales: { $sum: "$salesRevenue" } } }
                        ],
                        salesByCategory: [
                            { $group: { _id: "$category", totalSales: { $sum: "$salesRevenue" } } }
                        ],
                        topSellingProducts: [
                            { $group: { _id: "$product", totalSales: { $sum: "$salesRevenue" } } },
                            { $sort: { totalSales: -1 } }, // Sort by total sales in descending order
                            { $limit: topSellingLimit } // Limit to top-selling products
                        ],
                        salesVsTarget: [
                            { $group: { _id: "$product", actualSales: { $sum: "$salesRevenue" }, targetSales: { $sum: "$cost" } } }
                        ],
                        revenueAndProfit: [
                            { $group: { _id: "$date", totalRevenue: { $sum: "$salesRevenue" }, totalProfit: { $sum: "$profit" } } },
                            { $sort: { _id: 1 } } // Sort by date in ascending order
                        ],
                        customerDemographics: [
                            { $group: { _id: { ageGroup: "$ageGroup", gender: "$gender", occupation: "$occupation" }, totalSales: { $sum: "$salesRevenue" } } }
                        ],
                        salesTrendOverTime: [
                            {
                                $group: {
                                    _id: getGroupByPeriod(period),
                                    totalSales: { $sum: "$salesRevenue" }
                                }
                            },
                            {
                                $project: {
                                    _id: 0,
                                    period: "$_id",
                                    totalSales: { $round: ["$totalSales", 2] }
                                }
                            }
                        ]
                    }
                }
            ];

            // Execute the aggregation pipeline
            const [result] = await SalesData.aggregate(pipeline).exec();

            // Ensure `result` contains the expected facets
            if (!result) {
                logger.error('No results returned from aggregation');
                throw new Error('No results returned from aggregation');
            }

            // Map and return results with correct types
            return {
                salesConversionRate: transformData(result.salesConversionRate, ({ period, totalSales, totalRecords, conversionRate }: { period: string, totalSales: number, totalRecords: number, conversionRate: number }) => ({
                    period,
                    totalSales: roundToTwoDecimalPlaces(totalSales),
                    totalRecords: roundToTwoDecimalPlaces(totalRecords),
                    conversionRate: roundToTwoDecimalPlaces(conversionRate)
                })) as SalesConversionRateResult[],

                salesByRegion: transformData(result.salesByRegion, ({ _id: region, totalSales }: { _id: string, totalSales: number }) => ({
                    region,
                    totalSales: roundToTwoDecimalPlaces(totalSales)
                })) as SalesByRegionResult[],

                salesByCategory: transformData(result.salesByCategory, ({ _id: category, totalSales }: { _id: string, totalSales: number }) => ({
                    category,
                    totalSales: roundToTwoDecimalPlaces(totalSales)
                })) as SalesByCategoryResult[],

                topSellingProducts: transformData(result.topSellingProducts, ({ _id: product, totalSales }: { _id: string, totalSales: number }) => ({
                    product,
                    totalSales: roundToTwoDecimalPlaces(totalSales)
                })) as TopSellingProductsResult[],

                salesVsTarget: transformData(result.salesVsTarget, ({ _id: product, actualSales, targetSales }: { _id: string, actualSales: number, targetSales: number }) => ({
                    product,
                    actualSales: roundToTwoDecimalPlaces(actualSales),
                    targetSales: roundToTwoDecimalPlaces(targetSales)
                })) as SalesVsTargetResult[],

                revenueAndProfit: transformData(result.revenueAndProfit, ({ _id: date, totalRevenue, totalProfit }: { _id: string, totalRevenue: number, totalProfit: number }) => ({
                    date: new Date(date).toISOString(), // Convert to ISO string
                    totalRevenue: roundToTwoDecimalPlaces(totalRevenue),
                    totalProfit: roundToTwoDecimalPlaces(totalProfit)
                })) as RevenueAndProfitResult[],

                customerDemographics: transformData(result.customerDemographics, ({ _id: { ageGroup, gender, occupation }, totalSales }: { _id: { ageGroup: string, gender: string, occupation: string }, totalSales: number }) => ({
                    ageGroup,
                    gender,
                    occupation,
                    totalSales: roundToTwoDecimalPlaces(totalSales)
                })) as CustomerDemographicsResult[],

                salesTrendOverTime: transformData(result.salesTrendOverTime, ({ period, totalSales }: { period: string, totalSales: number }) => ({
                    period,
                    totalSales: roundToTwoDecimalPlaces(totalSales)
                })) as SalesTrend[]
            };

        } catch (error) {
            logger.error('Error in salesData query:', error);
            throw new Error('Failed to fetch sales data');
        }
    }
};
