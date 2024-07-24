import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { SalesByCategoryChart } from '../../components/charts';
import { SalesByCategory } from '../../redux/types';

// Mock the Pie component from react-chartjs-2
jest.mock('react-chartjs-2', () => ({
    Pie: () => <div>Pie Chart Mock</div>,
}));

describe('SalesByCategoryChart', () => {
    const formatCurrency = {
        format: (value: number) => `$${value.toFixed(2)}`,
        symbol: '$'
    };

    // Test case: Renders a message when no data is provided
    it('renders a message when no data is provided', () => {
        render(<SalesByCategoryChart data={[]} formatCurrency={formatCurrency} />);
        expect(screen.getByText('No sales data available')).toBeInTheDocument();
    });

    // Test case: Renders the Pie chart and category list with provided data
    it('renders the Pie chart and category list with data', () => {
        const data: SalesByCategory[] = [
            { category: 'Electronics', totalSales: 1200 },
            { category: 'Clothing', totalSales: 900 },
            { category: 'Toys', totalSales: 500 },
            { category: 'Books', totalSales: 300 },
        ];

        render(<SalesByCategoryChart data={data} formatCurrency={formatCurrency} />);

        // Check that the Pie chart mock is rendered
        expect(screen.getByText('Pie Chart Mock')).toBeInTheDocument();

        // Check that the category list is rendered correctly
        expect(screen.getByText('Electronics: $1,200')).toBeInTheDocument();
        expect(screen.getByText('Clothing: $900')).toBeInTheDocument();
        expect(screen.getByText('Toys: $500')).toBeInTheDocument();
        expect(screen.getByText('Books: $300')).toBeInTheDocument();
    });

    // Test case: Ensures proper rendering of the category list
    it('renders the category list with correct colors and data', () => {
        const data: SalesByCategory[] = [
            { category: 'Electronics', totalSales: 1200 },
            { category: 'Clothing', totalSales: 900 },
        ];

        render(<SalesByCategoryChart data={data} formatCurrency={formatCurrency} />);

        // Define the expected colors
        const expectedColors = [
            'rgba(255, 99, 132, 0.6)',
            'rgba(54, 162, 235, 0.6)',
            'rgba(255, 206, 86, 0.6)',
            'rgba(75, 192, 192, 0.6)',
        ];

        // Check for the correct number of list items
        const listItems = screen.getAllByRole('listitem');
        expect(listItems).toHaveLength(data.length); // The number of list items should match the number of categories

        // Check if the color is rendered correctly
        listItems.forEach((item, index) => {
            expect(item).toHaveTextContent(data[index].category);
            expect(item).toHaveTextContent(`$${data[index].totalSales.toLocaleString()}`);
            // eslint-disable-next-line testing-library/no-node-access
            const colorDiv = item.querySelector('div');
            expect(colorDiv).toHaveStyle(`background-color: ${expectedColors[index % expectedColors.length]}`);
        });
    });
});
