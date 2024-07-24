// Represents the sales trend over time with period and total sales.
export interface SalesTrendOverTime {
    period: string; // The time period (e.g., "daily", "monthly")
    totalSales: number; // Total sales amount for the period
}

// Represents sales data categorized by region.
export interface SalesByRegion {
    region: string; // The name of the region
    totalSales: number; // Total sales amount for the region
}

// Represents sales data categorized by product category.
export interface SalesByCategory {
    category: string; // The product category name
    totalSales: number; // Total sales amount for the category
}

// Represents the top-selling products.
export interface TopSellingProducts {
    product: string; // The name of the product
    totalSales: number; // Total sales amount for the product
}

// Represents sales vs target data.
export interface SalesVsTarget {
    product: string; // The name of the product
    actualSales: number; // Actual sales amount
    targetSales: number; // Target sales amount
}

// Represents customer demographics data.
export interface CustomerDemographics {
    ageGroup: string; // The age group of customers
    gender: string; // The gender of customers
    occupation: string; // The occupation of customers
    totalSales: number; // Total sales amount from this demographic
}

// Represents revenue and profit data.
export interface RevenueAndProfit {
    date: string; // The date of the data
    totalProfit: number; // Total profit amount
    totalRevenue: number; // Total revenue amount
}

// Represents the sales conversion rate.
export interface SalesConversionRate {
    period: string; // The time period (e.g., "daily", "monthly")
    conversionRate: number; // Conversion rate percentage
}

// Represents the overall sales data.
export interface SalesData {
    salesTrendOverTime: SalesTrendOverTime[]; // Array of sales trends over time
    salesByRegion: SalesByRegion[]; // Array of sales data by region
    salesByCategory: SalesByCategory[]; // Array of sales data by category
    topSellingProducts: TopSellingProducts[]; // Array of top-selling products
    salesVsTarget: SalesVsTarget[]; // Array of sales vs target data
    customerDemographics: CustomerDemographics[]; // Array of customer demographics data
    revenueAndProfit: RevenueAndProfit[]; // Array of revenue and profit data
    salesConversionRate: SalesConversionRate[]; // Array of sales conversion rates
}

// Represents the response shape for the sales data query.
export interface SalesDataQueryResult {
    salesData: SalesData; // The sales data returned from the query
}

// Represents the state of sales data in the Redux store.
export interface SalesState {
    data: SalesData | null; // The sales data or null if not loaded
    loading: boolean; // Whether data is currently being loaded
    error: string | null; // Any error message or null if no error
}

// Represents the payload for starting the fetch sales data action.
export interface FetchSalesDataStartPayload {
    topSellingLimit?: number; // Optional limit for top-selling products
    period: string; // The time period for fetching data (e.g., "daily", "monthly")
}

// Represents the payload for the fetch sales data failure action.
export interface FetchSalesDataFailurePayload {
    error: string; // The error message describing the failure
}

export interface SalesDataInput {
    id?: string
    /** The name of the product. */
    product: string;

    /** The total revenue generated from sales of the product. */
    salesRevenue: number;

    /** The region where the sales occurred. */
    region: string;

    /** The category to which the product belongs. */
    category: string;

    /** The date when the sales data was recorded. */
    date: Date;

    /** The cost incurred in producing or procuring the product. */
    cost: number;

    /** The profit made from selling the product. */
    profit: number;

    /** The age group of the customer base. */
    ageGroup: string;

    /** The gender of the customer base. */
    gender: string;

    /** The occupation of the customer base. */
    occupation: string;

    /** The date when the record was created. */
    createdAt?: Date;

    /** The date when the record was last updated. */
    updatedAt?: Date;
}