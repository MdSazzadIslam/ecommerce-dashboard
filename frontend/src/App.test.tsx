import React from 'react';
import { render } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { Provider } from 'react-redux';
import store from './redux/store';
import App from './App';
import { GET_SALES_DATA } from './redux/sagas';

const mocks = [
  {
    request: {
      query: GET_SALES_DATA,
      variables: { topSellingLimit: 10, period: 'daily' },
    },
    result: {
      data: {
        salesData: {
          customerDemographics: [],
          revenueAndProfit: [],
          salesByCategory: [],
          salesByRegion: [],
          salesConversionRate: [],
          salesTrendOverTime: [],
          salesVsTarget: [],
          topSellingProducts: [],
        },
      },
    },
  },
];

describe('App Component', () => {
  it('should render without crashing', () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Provider store={store}>
          <App />
        </Provider>
      </MockedProvider>
    );
  });
});
