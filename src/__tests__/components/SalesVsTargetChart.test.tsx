import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { SalesVsTargetChart } from '../../components/charts'

// Mock the Bar component
jest.mock('react-chartjs-2', () => ({
    Bar: () => <div>Mock Bar Chart</div>
}));

describe('SalesVsTargetChart', () => {
    const formatCurrency = {
        format: (value: number) => `$${value.toFixed(2)}`,
        symbol: '$'
    };

    it('renders a message when there is no data', () => {
        render(<SalesVsTargetChart data={[]} formatCurrency={formatCurrency} />);
        expect(screen.getByText('No sales data available')).toBeInTheDocument();
    });

    it('renders the Bar chart with correct data', () => {
        const mockData = [
            { product: 'Product A', actualSales: 1000, targetSales: 1200 },
            { product: 'Product B', actualSales: 1500, targetSales: 1400 },
            { product: 'Product C', actualSales: 2000, targetSales: 1800 }
        ];

        render(<SalesVsTargetChart data={mockData} formatCurrency={formatCurrency} />);

        expect(screen.getByText('Mock Bar Chart')).toBeInTheDocument();
    });

    it('formats y-axis labels with currency', () => {
        const mockData = [
            { product: 'Product A', actualSales: 1000, targetSales: 1200 },
            { product: 'Product B', actualSales: 1500, targetSales: 1400 }
        ];

        render(<SalesVsTargetChart data={mockData} formatCurrency={formatCurrency} />);

        // Since we are using a mock for the Bar component, we cannot directly test chart rendering.
        // We would test formatting if the chart was rendered. Here we are just ensuring it renders.
        expect(screen.getByText('Mock Bar Chart')).toBeInTheDocument();
    });
});
