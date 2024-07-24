import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { SalesByRegionChart } from '../../components/charts';
import { SalesByRegion } from '../../redux/types';

// Mock the Bar component from react-chartjs-2
jest.mock('react-chartjs-2', () => ({
    Bar: () => <div>Bar Chart Mock</div>,
}));

describe('SalesByRegionChart', () => {
    const formatCurrency = {
        format: (value: number) => `$${value.toFixed(2)}`,
        symbol: '$'
    };

    // Test case: Renders a message when no data is provided
    it('renders a message when no data is provided', () => {
        render(<SalesByRegionChart data={[]} formatCurrency={formatCurrency} />);
        expect(screen.getByText('No sales data available')).toBeInTheDocument();
    });

    // Test case: Renders the Bar chart with provided data
    it('renders the Bar chart with data', () => {
        const data: SalesByRegion[] = [
            { region: 'North America', totalSales: 12000 },
            { region: 'Europe', totalSales: 15000 },
            { region: 'Asia', totalSales: 8000 },
        ];

        render(<SalesByRegionChart data={data} formatCurrency={formatCurrency} />);

        // Check that the Bar chart mock is rendered
        expect(screen.getByText('Bar Chart Mock')).toBeInTheDocument();
    });
});
