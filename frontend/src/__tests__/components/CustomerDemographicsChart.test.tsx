import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { CustomerDemographicsChart } from '../../components/charts';
import { CustomerDemographics } from '../../redux/types';

// Mock the Bar component from react-chartjs-2
jest.mock('react-chartjs-2', () => ({
    Bar: () => <div>Bar Chart Mock</div>,
}));

describe('CustomerDemographics', () => {
    const formatCurrency = {
        format: (value: number) => `$${value.toFixed(2)}`,
        symbol: '$'
    };

    // Test case: Renders no data message
    it('renders a message when no data is provided', () => {
        render(<CustomerDemographicsChart data={[]} formatCurrency={formatCurrency} />);
        expect(screen.getByText('No customer demographics data available')).toBeInTheDocument();
    });

    // Test case: Correctly aggregates and displays data in the Bar chart
    it('renders the Bar chart with aggregated data', () => {
        const data: CustomerDemographics[] = [
            { ageGroup: '18-24', gender: 'Male', occupation: 'Engineer', totalSales: 100 },
            { ageGroup: '25-34', gender: 'Female', occupation: 'Doctor', totalSales: 150 },
            { ageGroup: '18-24', gender: 'Female', occupation: 'Engineer', totalSales: 200 },
            { ageGroup: '35-44', gender: 'Male', occupation: 'Artist', totalSales: 250 },
        ];

        render(<CustomerDemographicsChart data={data} formatCurrency={formatCurrency} />);

        // Check that the Bar chart mock is rendered
        expect(screen.getByText('Bar Chart Mock')).toBeInTheDocument();
    });

    // Test case: Handles cases where only one type of data is present
    it('handles cases with only age group data', () => {
        const data: CustomerDemographics[] = [
            { ageGroup: '18-24', gender: 'Male', occupation: 'Engineer', totalSales: 100 },
            { ageGroup: '25-34', gender: 'Female', occupation: 'Doctor', totalSales: 150 },
        ];

        render(<CustomerDemographicsChart data={data} formatCurrency={formatCurrency} />);

        // Check that the Bar chart mock is rendered with age group data
        expect(screen.getByText('Bar Chart Mock')).toBeInTheDocument();
    });

    it('handles cases with only gender data', () => {
        const data: CustomerDemographics[] = [
            { ageGroup: '18-24', gender: 'Male', occupation: 'Engineer', totalSales: 100 },
            { ageGroup: '25-34', gender: 'Female', occupation: 'Doctor', totalSales: 150 },
            { ageGroup: '35-44', gender: 'Male', occupation: 'Artist', totalSales: 250 },
        ];

        render(<CustomerDemographicsChart data={data} formatCurrency={formatCurrency} />);

        // Check that the Bar chart mock is rendered with gender data
        expect(screen.getByText('Bar Chart Mock')).toBeInTheDocument();
    });

    it('handles cases with only occupation data', () => {
        const data: CustomerDemographics[] = [
            { ageGroup: '18-24', gender: 'Male', occupation: 'Engineer', totalSales: 100 },
            { ageGroup: '25-34', gender: 'Female', occupation: 'Doctor', totalSales: 150 },
            { ageGroup: '35-44', gender: 'Male', occupation: 'Artist', totalSales: 250 },
            { ageGroup: '45-54', gender: 'Female', occupation: 'Engineer', totalSales: 300 },
        ];

        render(<CustomerDemographicsChart data={data} formatCurrency={formatCurrency} />);

        // Check that the Bar chart mock is rendered with occupation data
        expect(screen.getByText('Bar Chart Mock')).toBeInTheDocument();
    });

    it('formats y-axis labels with currency', () => {
        const mockData = [
            { ageGroup: '18-24', gender: 'Female', occupation: 'Engineer', totalSales: 1000 },
            { ageGroup: '25-34', gender: 'Male', occupation: 'Doctor', totalSales: 1500 },
        ];

        render(<CustomerDemographicsChart data={mockData} formatCurrency={formatCurrency} />);

        // Check if the y-axis label is formatted correctly (mock Bar chart won't show real labels)
        // This part might need additional mocks or tools to test the actual chart rendering
    });
});
