import 'dotenv/config'
import { faker } from '@faker-js/faker';
import { connectDB, closeDB } from '../config/database';
import { SalesData } from '../domain/sales';
import { SalesData as SalesDataType, logger } from '../shared';

// Helper function to generate random age groups
const getRandomAgeGroup = (): string => {
    const ageGroups = ['18-24', '25-34', '35-44', '45-54', '55-64', '65+'];
    return ageGroups[Math.floor(Math.random() * ageGroups.length)];
};

// Helper function to generate random gender
const getRandomGender = (): string => {
    return Math.random() > 0.5 ? 'Male' : 'Female';
};

// Helper function to generate random occupation
const getRandomOccupation = (): string => {
    const occupations = ['Engineer', 'Doctor', 'Teacher', 'Artist', 'Manager', 'Salesperson'];
    return occupations[Math.floor(Math.random() * occupations.length)];
};

// Generate and insert sales data into the database
const seedDatabase = async () => {
    try {
        // Connect to MongoDB
        await connectDB();

        // Check if there are any existing documents in the collection
        const existingDataCount = await SalesData.countDocuments();
        if (existingDataCount > 0) {
            logger.info('Existing data found. Clearing collection...');
            // Clear existing data from the SalesData collection
            await SalesData.deleteMany({});
            logger.info('Existing data cleared.');
        } else {
            logger.info('No existing data found.');
        }

        const salesData: SalesDataType[] = [];
        for (let i = 0; i < 100; i++) {
            salesData.push({
                product: faker.commerce.productName(),
                salesRevenue: parseFloat(faker.commerce.price({ min: 50, max: 500, dec: 2 })),
                region: faker.location.country(),
                category: faker.commerce.department(),
                date: faker.date.past(),
                cost: parseFloat(faker.commerce.price({ min: 20, max: 400, dec: 2 })),
                profit: parseFloat(faker.commerce.price({ min: 30, max: 600, dec: 2 })),
                ageGroup: getRandomAgeGroup(),
                gender: getRandomGender(),
                occupation: getRandomOccupation()
            });
        }

        // Insert the data into MongoDB
        await SalesData.insertMany(salesData);
        logger.info('Data inserted successfully.');
    } catch (err) {
        logger.error('Error during database seeding:', err);
    } finally {
        // Ensure the database connection is closed regardless of success or failure
        try {
            await closeDB();
        } catch (closeError) {
            logger.error('Error closing the database connection:', closeError);
        }
    }
};

// Run the seeding process
seedDatabase();
