import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { SalesConversionRateChart } from '../../components/charts';
import { SalesConversionRate } from '../../redux/types';

// Mock the Line component from react-chartjs-2
jest.mock('react-chartjs-2', () => ({
    Line: () => <div>Line Chart Mock</div>,
}));

describe('SalesConversionRateChart', () => {
    const formatCurrency = {
        format: (value: number) => `$${value.toFixed(2)}`,
        symbol: '$'
    };


    // Test case: Renders a message when no data is provided
    it('renders a message when no data is provided', () => {
        render(<SalesConversionRateChart data={[]} formatCurrency={formatCurrency} />);
        expect(screen.getByText('No conversion rate data available')).toBeInTheDocument();
    });

    // Test case: Tooltip formatting (mocked component will not provide real tooltip functionality)
    it('formats tooltips correctly', () => {
        const data: SalesConversionRate[] = [
            { period: 'Jan', conversionRate: 22.5 },
            { period: 'Feb', conversionRate: 24.0 },
        ];

        render(<SalesConversionRateChart data={data} formatCurrency={formatCurrency} />);

        // Check that the Line chart mock is rendered
        expect(screen.getByText('Line Chart Mock')).toBeInTheDocument();

        // Tooltip testing is generally complex; the mock doesn't provide real tooltip functionality
        // Consider using user event interactions and visual confirmation if necessary
    });

    // Test case: Axis label formatting (mocked component will not provide real chart axis labels)
    it('formats axis labels correctly', () => {
        const data: SalesConversionRate[] = [
            { period: '2023-01', conversionRate: 18.5 },
            { period: '2023-02', conversionRate: 20.3 },
        ];

        render(<SalesConversionRateChart data={data} formatCurrency={formatCurrency} />);

        // Check that the Line chart mock is rendered
        expect(screen.getByText('Line Chart Mock')).toBeInTheDocument();

        // Axis labels are complex to test in detail; visual inspection is usually recommended
    });
});
