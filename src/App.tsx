import React from 'react';
import { ApolloProvider } from '@apollo/client';
import client from './api/client';
import { Provider } from 'react-redux';
import store from './redux/store';
import Dashboard from './components/dashboard';
import ErrorBoundary from './components/errorBoundary';

const App: React.FC = () => (
  <ApolloProvider client={client}>
    <Provider store={store}>
      <ErrorBoundary>
        <Dashboard />
      </ErrorBoundary>
    </Provider>
  </ApolloProvider>
);

export default App;
