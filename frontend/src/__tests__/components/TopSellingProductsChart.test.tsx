import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { TopSellingProductsChart } from '../../components/charts';
import { TopSellingProducts } from '../../redux/types';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';

// Mock the Bar component from react-chartjs-2
jest.mock('react-chartjs-2', () => ({
    Bar: jest.fn(() => <div>Bar Chart Mock</div>),
}));

// Ensure Chart.js components are registered
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

describe('TopSellingProductsChart', () => {
    const formatCurrency = {
        format: (value: number) => `$${value.toFixed(2)}`,
        symbol: '$'
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    // Test case: Renders a fallback message when no data is provided
    it('renders a fallback message when no data is provided', () => {
        render(<TopSellingProductsChart data={[]} formatCurrency={formatCurrency} />);
        expect(screen.getByText('No sales data available')).toBeInTheDocument();
    });

    // Test case: Renders the Bar chart with data
    it('renders the Bar chart with data', () => {
        const data: TopSellingProducts[] = [
            { product: 'Product A', totalSales: 5000 },
            { product: 'Product B', totalSales: 3000 },
            { product: 'Product C', totalSales: 7000 },
        ];

        render(<TopSellingProductsChart data={data} formatCurrency={formatCurrency} />);

        // Check if the Bar component was rendered
        const Bar = require('react-chartjs-2').Bar;
        expect(Bar).toHaveBeenCalled();

        // Verify that the Bar component is called with the correct data and options
        expect(Bar).toHaveBeenCalledWith(
            expect.objectContaining({
                data: {
                    labels: ['Product C', 'Product A', 'Product B'], // Sorted by totalSales in descending order
                    datasets: [
                        {
                            label: 'Top Selling Products',
                            data: [7000, 5000, 3000],
                            backgroundColor: 'rgba(75, 192, 192, 0.6)',
                            borderColor: 'rgba(75, 192, 192, 1)',
                            borderWidth: 1,
                        }
                    ]
                },
                options: expect.objectContaining({
                    responsive: true,
                    plugins: {
                        legend: {
                            position: 'top',
                            labels: {
                                font: {
                                    size: 14,
                                }
                            }
                        },
                        tooltip: {
                            callbacks: {
                                label: expect.any(Function), // Ensure callback function is present
                            }
                        }
                    },
                    scales: {
                        x: {
                            title: {
                                display: true,
                                text: 'Product',
                                font: {
                                    size: 14,
                                }
                            },
                            ticks: {
                                autoSkip: false,
                                maxRotation: 30,
                                minRotation: 30,
                            }
                        },
                        y: {
                            title: {
                                display: true,
                                text: 'Total Sales',
                                font: {
                                    size: 14,
                                }
                            },
                            beginAtZero: true,
                            ticks: {
                                callback: expect.any(Function),
                                font: {
                                    size: 12,
                                }
                            }
                        }
                    }
                }),
            }),
            {}
        );
    });
});
