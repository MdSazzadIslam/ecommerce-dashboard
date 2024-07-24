import { ApolloServer, ApolloServerPlugin } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import { typeDefs, salesDataResolvers } from './domain/sales';
import { connectDB, closeDB } from './config/database';
import { logger, Limiter } from './shared';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';

// Initialize the Express application
const app = express();

// Apply middleware
app.use(express.json());
app.use(cors({
    origin: process.env.CLIENT_ORIGIN || 'http://localhost:3000', // Use environment variable for client origin
    credentials: true, // Allow cookies and other credentials
}));

app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            scriptSrc: ["'self'", "https:", "'unsafe-inline'"],
            styleSrc: ["'self'", "https:", "'unsafe-inline'"],
            imgSrc: ["'self'", "data:", "https:"],
            connectSrc: ["'self'", "https:"],
            frameSrc: ["'self'", "sandbox.embed.apollographql.com"],
            manifestSrc: ["'self'"],
        },
    },
}));

app.use(compression());

// Singleton pattern to ensure ApolloServer is only started once
let server: ApolloServer | null = null;

const getServerInstance = async () => {
    if (server) return server;

    const isProduction = process.env.NODE_ENV === 'production';

    const plugins = [
        // Only add the plugin if not in production
        !isProduction && ApolloServerPluginLandingPageLocalDefault({
            footer: false,
            headers: {
                'Content-Security-Policy': "default-src 'self'; script-src 'self' https: 'unsafe-inline'; style-src 'self' https: 'unsafe-inline'; img-src 'self' data: https:; connect-src 'self' https:; frame-src 'self' sandbox.embed.apollographql.com; manifest-src 'self';",
            },
        })
    ].filter((plugin): plugin is ApolloServerPlugin<any> => plugin !== false);

    server = new ApolloServer({
        typeDefs,
        resolvers: salesDataResolvers,
        plugins,
        introspection: !isProduction, // Disable introspection in production
        formatError: (error) => {
            logger.error('GraphQL Error:', error);
            return {
                message: error.message,
                code: error.extensions?.code || 'INTERNAL_SERVER_ERROR',
            };
        },
    });

    await server.start();

    return server;
};

// Start server
export const startServer = async () => {
    try {
        await connectDB();

        const serverInstance = await getServerInstance();

        app.use(
            '/graphql',
            Limiter,
            expressMiddleware(serverInstance)
        );

        const port = process.env.PORT || 8000;

        app.listen(port, () => {
            logger.info(`Server ready at http://localhost:${port}/graphql`);
        });
    } catch (error) {
        logger.error('Error starting server:', error);
        process.exit(1); // Exit the process with an error code
    }
};

// Graceful shutdown
const gracefulShutdown = async () => {
    try {
        await closeDB();
        logger.info('Database connection closed.');
        process.exit(0);
    } catch (err) {
        logger.error('Error during graceful shutdown:', err);
        process.exit(1);
    }
};

process.on('SIGINT', gracefulShutdown);
process.on('SIGTERM', gracefulShutdown);

// Handle uncaught exceptions and unhandled rejections
process.on('uncaughtException', (error) => {
    logger.error('Uncaught Exception:', error);
    gracefulShutdown();
});

process.on('unhandledRejection', (reason, promise) => {
    logger.error('Unhandled Rejection at:', promise, 'reason:', reason);
    gracefulShutdown();
});
