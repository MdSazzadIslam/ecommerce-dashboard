import { gql } from 'apollo-server';

export const typeDefs = gql`
  type SalesData {
    id: ID!
    product: String!
    salesRevenue: Float!
    region: String!
    category: String!
    date: String!
    cost: Float!
    profit: Float!
    ageGroup: String!
    gender: String!
    occupation: String!
    createdAt: String!
    updatedAt: String!
  }


  type SalesTrend {
    period: String!
    totalSales: Float!
  }


  type SalesByRegion {
    region: String!
    totalSales: Float!
  }

  type SalesByCategory {
    category: String!
    totalSales: Float!
  }

  type TopSellingProduct {
    product: String!
    totalSales: Float!
  }

  type SalesVsTarget {
    product: String!
    actualSales: Float!
    targetSales: Float!
  }

  type CustomerDemographics {
    ageGroup: String!
    gender: String!
    occupation: String!
    totalSales: Float!
  }


  type RevenueAndProfit {
    date: String!
    totalRevenue: Float!
    totalProfit: Float!
  }

  type SalesConversionRate {
    period: String!
    totalSales: Float!
    totalRecords: Float!
    conversionRate: Float!
  }


  type SalesDataQueryResult {
    salesTrendOverTime(period: String!): [SalesTrend]
    salesByRegion: [SalesByRegion]
    salesByCategory: [SalesByCategory]
    topSellingProducts(limit: Int): [TopSellingProduct]
    salesVsTarget: [SalesVsTarget]
    revenueAndProfit: [RevenueAndProfit]
    customerDemographics: [CustomerDemographics]
    salesConversionRate(period: String!): [SalesConversionRate]
  }


  input SalesDataInput {
    product: String!
    salesRevenue: Float!
    region: String!
    category: String!
    date: String!
    cost: Float!
    profit: Float!
    ageGroup: String!
    gender: String!
    occupation: String!
  }  


  type MutationResult {
    success: Boolean!
    message: String
    data: SalesData
  }


  type Mutation {
    createSalesData(input: SalesDataInput!): MutationResult
    deleteSalesData(id: ID!): MutationResult
  }

  type Query {
    salesData(topSellingLimit: Int = 10, period: String!): SalesDataQueryResult
  }
`;
