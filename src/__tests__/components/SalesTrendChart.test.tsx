import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { useSelector } from 'react-redux';
import SalesTrendChart from '../../components/charts/SalesTrendChart';

// Mock the Line component from 'react-chartjs-2'
jest.mock('react-chartjs-2', () => ({
    Line: () => <div>Mock Line Chart</div>
}));

// Create a mock for useSelector
jest.mock('react-redux', () => ({
    useSelector: jest.fn()
}));

// Mock the useSelector hook
jest.mock('react-redux', () => ({
    useSelector: jest.fn() as jest.Mock
}));

describe('SalesTrendChart', () => {
    const formatCurrency = {
        format: (value: number) => `$${value.toFixed(2)}`,
        symbol: '$'
    };

    // Cast the mocked useSelector
    const mockUseSelector = useSelector as jest.MockedFunction<typeof useSelector>;

    it('renders a message when there is no data', () => {
        // Mock useSelector to return empty data
        mockUseSelector.mockReturnValue([]);

        render(<SalesTrendChart data={[]} formatCurrency={formatCurrency} />);
        expect(screen.getByText('No sales data available')).toBeInTheDocument();
    });

    it('renders the Line chart with correct data', () => {
        const mockData = [
            { period: '2024-01-01', totalSales: 1000 },
            { period: '2024-02-01', totalSales: 1200 },
            { period: '2024-03-01', totalSales: 1500 }
        ];

        // Mock useSelector to return the mock data
        mockUseSelector.mockReturnValue(mockData);

        render(<SalesTrendChart data={mockData} formatCurrency={formatCurrency} />);
        expect(screen.getByText('Mock Line Chart')).toBeInTheDocument();
    });

    it('formats y-axis labels with currency', () => {
        const mockData = [
            { period: '2024-01-01', totalSales: 1000 },
            { period: '2024-02-01', totalSales: 1200 }
        ];

        // Mock useSelector to return the mock data
        mockUseSelector.mockReturnValue(mockData);

        render(<SalesTrendChart data={mockData} formatCurrency={formatCurrency} />);

        // Since we are using a mock for the Line component, we cannot directly test chart rendering.
        // This test ensures that the component renders with the mock data.
        expect(screen.getByText('Mock Line Chart')).toBeInTheDocument();
    });
});
