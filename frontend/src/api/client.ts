import { ApolloClient, InMemoryCache, HttpLink, ApolloLink } from '@apollo/client';
import { onError } from '@apollo/client/link/error';

// Function to create the Apollo Client instance
const createApolloClient = () => {
    // Handle errors globally
    const errorLink = onError(({ graphQLErrors, networkError }) => {
        if (graphQLErrors) {
            graphQLErrors.forEach(({ message, locations, path }) =>
                console.error(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`)
            );
        }
        if (networkError) {
            console.error(`[Network error]: ${networkError}`);
        }
    });

    // Create an HttpLink instance for making HTTP requests
    const httpLink = new HttpLink({
        uri: process.env.REACT_APP_API_URL || 'http://localhost:8000/graphql',
        credentials: 'include', // Use 'include' to include credentials (cookies, headers) with requests
    });

    // Create Apollo Client instance
    const client = new ApolloClient({
        link: ApolloLink.from([errorLink, httpLink]),
        cache: new InMemoryCache(),
        connectToDevTools: process.env.NODE_ENV === 'development', // Enable Apollo Client DevTools only in development mode
    });

    return client;
};

// Export the client instance
const client = createApolloClient();

export default client;
