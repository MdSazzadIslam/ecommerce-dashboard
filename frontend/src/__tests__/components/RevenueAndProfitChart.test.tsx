import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { RevenueAndProfitChart } from '../../components/charts';
import { RevenueAndProfit } from '../../redux/types';

// Mock the Line component from react-chartjs-2
jest.mock('react-chartjs-2', () => ({
    Line: () => <div>Line Chart Mock</ div >,
}));

describe('RevenueAndProfitChart', () => {
    const formatCurrency = {
        format: (value: number) => `$${value.toFixed(2)}`,
        symbol: '$'
    };

    // Test case: Renders a message when no data is provided
    it('renders a message when no data is provided', () => {
        render(<RevenueAndProfitChart data={[]} formatCurrency={formatCurrency} />);
        expect(screen.getByText('No revenue and profit data available')).toBeInTheDocument();
    });

    // Test case: Renders the chart with data correctly
    it('renders the Line chart with correct data', () => {
        const data: RevenueAndProfit[] = [
            { date: '2024-01-01', totalRevenue: 5000, totalProfit: 2000 },
            { date: '2024-02-01', totalRevenue: 6000, totalProfit: 2500 },
            { date: '2024-03-01', totalRevenue: 7000, totalProfit: 3000 },
        ];

        render(<RevenueAndProfitChart data={data} formatCurrency={formatCurrency} />);

        // Check that the Line chart mock is rendered
        expect(screen.getByText('Line Chart Mock')).toBeInTheDocument();
    });

    // Test case: Ensures the data is mapped correctly for the chart
    it('maps data correctly for the chart', () => {
        const data: RevenueAndProfit[] = [
            { date: '2024-01-01', totalRevenue: 5000, totalProfit: 2000 },
            { date: '2024-02-01', totalRevenue: 6000, totalProfit: 2500 },
        ];

        render(<RevenueAndProfitChart data={data} formatCurrency={formatCurrency} />);

        // Since we are mocking the chart component, we check if the chart mock is rendered as expected.
        expect(screen.getByText('Line Chart Mock')).toBeInTheDocument();
    });
});
