import { gql } from '@apollo/client';
import { call, put, takeEvery, ForkEffect } from 'redux-saga/effects';
import client from '../../api/client';
import { fetchSalesDataStart, fetchSalesDataSuccess, fetchSalesDataFailure } from '../actions';
import { SalesDataQueryResult, FetchSalesDataStartPayload } from '../types';

// Define the GraphQL query
export const GET_SALES_DATA = gql`
  query GetSalesData($topSellingLimit: Int, $period: String!) {
    salesData(topSellingLimit: $topSellingLimit, period: $period) {
      customerDemographics {
        ageGroup
        gender
        occupation
        totalSales
      }
      revenueAndProfit {
        date
        totalProfit
        totalRevenue
      }
      salesByCategory {
        category
        totalSales
      }
      salesByRegion {
        region
        totalSales
      }
      salesConversionRate(period: $period) {
        period
        totalSales
        totalRecords
        conversionRate
      }
      salesTrendOverTime(period: $period) {
        period
        totalSales
      }
      salesVsTarget {
        product
        actualSales
        targetSales
      }
      topSellingProducts {
        product
        totalSales
      }
    }
  }
`;
// Saga to fetch sales data
export function* fetchSalesData(action: ReturnType<typeof fetchSalesDataStart>): Generator {
  try {
    const { topSellingLimit, period }: FetchSalesDataStartPayload = action.payload;

    // Validate payload
    if (!period) {
      throw new Error('Period is required');
    }

    // Execute the GraphQL query
    const response = yield call(() =>
      client.query({
        query: GET_SALES_DATA,
        variables: { topSellingLimit, period },
        fetchPolicy: 'network-only',
      })
    );

    // Type assertion to ensure correct typing
    const typedResponse = response as { data: SalesDataQueryResult };

    // Ensure the response is valid
    if (typedResponse.data && typedResponse.data) {
      yield put(fetchSalesDataSuccess(typedResponse.data.salesData));
    } else {
      throw new Error('Invalid response structure or missing salesData');
    }
  } catch (error) {
    // Dispatch failure action with detailed error message
    yield put(fetchSalesDataFailure({
      error: error instanceof Error ? error.message : 'Unknown error',
    }));
  }
}

// Watcher saga for fetching sales data
export default function* watchFetchSalesData(): Generator<ForkEffect<never>> {
  yield takeEvery(fetchSalesDataStart.type, fetchSalesData);
}
