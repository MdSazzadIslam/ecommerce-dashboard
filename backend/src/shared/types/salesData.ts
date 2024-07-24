import mongoose from "mongoose";

/**
 * Represents sales data for a specific product.
 */
export interface SalesData {
    _id?: mongoose.Types.ObjectId;
    product: string;
    salesRevenue: number;
    region: string;
    category: string;
    date: Date;
    cost: number;
    profit: number;
    ageGroup: string;
    gender: string;
    occupation: string;
    createdAt?: Date;
    updatedAt?: Date;
}

/**
 * Represents the sales trend over a specific period.
 */
export interface SalesTrend {
    period: string;
    totalSales: number;
}

/**
 * Represents the total sales by region.
 */
export interface SalesByRegionResult {
    region: string;
    totalSales: number;
}

/**
 * Represents the total sales by product category.
 */
export interface SalesByCategoryResult {
    category: string;
    totalSales: number;
}

/**
 * Represents the top-selling products.
 */
export interface TopSellingProductsResult {
    product: string;
    totalSales: number;
}

/**
 * Represents the sales versus target data for a product.
 */
export interface SalesVsTargetResult {
    /** The name of the product. */
    product: string;
    actualSales: number;
    targetSales: number;
}

/**
 * Represents the total revenue and profit for a specific date.
 */
export interface RevenueAndProfitResult {
    date: string;
    totalRevenue: number;
    totalProfit: number;
}

/**
 * Represents customer demographics data.
 */
export interface CustomerDemographicsResult {
    ageGroup: string;
    gender: string;
    occupation: string;
    totalSales: number;
}

/**
 * Represents the sales conversion rate over a specific period.
 */
export interface SalesConversionRateResult {
    period: string;
    totalSales: number;
    totalRecords: number;
    conversionRate: number;
}
