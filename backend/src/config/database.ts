import 'dotenv/config'
import mongoose from 'mongoose';
import { logger } from '../shared/utils';

// Environment variable validation
const DB_URL = process.env.DB_URL;
if (!DB_URL) {
    throw new Error('DB_URL environment variable is not set');
}

// MongoDB connection options
const mongooseOptions = {
    serverSelectionTimeoutMS: 5000, // Timeout after 5 seconds if the server is not available
};

// Connect to MongoDB
const connectDB = async () => {
    try {
        await mongoose.connect(DB_URL, mongooseOptions);
        logger.info('Database connected successfully');
    } catch (err) {
        logger.error('Database connection error:', err);
        process.exit(1); // Exit the process if connection fails
    }
};

// Close MongoDB connection
const closeDB = async () => {
    try {
        await mongoose.connection.close();
        logger.info('Database disconnected');
    } catch (err) {
        logger.error('Error disconnecting database:', err);
        process.exit(1); // Exit the process if disconnecting fails
    }
};

export { connectDB, closeDB };
