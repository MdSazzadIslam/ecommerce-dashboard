import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend, ChartOptions, TooltipItem } from 'chart.js';
import { TopSellingProducts } from '../../redux/types';
import { Box, Typography, Card, CardContent } from '@mui/material';

// Register Chart.js components
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

interface TopSellingProductsChartProps {
    data: TopSellingProducts[];
    formatCurrency: {
        format: (value: number) => string;
        symbol: string;
    };
}

// Component to display top-selling products chart
const TopSellingProductsChart: React.FC<TopSellingProductsChartProps> = ({ data, formatCurrency }) => {
    // Ensure topSellingProducts is available
    if (!data || data.length === 0) {
        return <Typography variant="body1" color="textSecondary" align="center">No sales data available</Typography>;
    }

    // Sort top-selling products by sales revenue (creating a new array to avoid mutating the original)
    const sortedProducts = [...data].sort((a, b) => b.totalSales - a.totalSales);

    // Prepare data for the Bar chart
    const chartData = {
        labels: sortedProducts.map(item => item.product),
        datasets: [
            {
                label: 'Top Selling Products',
                data: sortedProducts.map(item => item.totalSales),
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }
        ]
    };

    // Define chart options
    const options: ChartOptions<'bar'> = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
                labels: {
                    font: {
                        size: 14 // Adjust font size for the legend
                    }
                }
            },
            tooltip: {
                callbacks: {
                    label: (context: TooltipItem<'bar'>) => {
                        let label = context.dataset.label || '';
                        if (label) {
                            label += ': ';
                        }
                        if (context.parsed.y !== null) {
                            label += `$${context.parsed.y.toLocaleString()}`;
                        }
                        return label;
                    }
                }
            }
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Product',
                    font: {
                        size: 14 // Adjust font size for the x-axis title
                    }
                },
                ticks: {
                    autoSkip: false, // Prevent skipping labels on the x-axis
                    maxRotation: 30, // Rotate labels if necessary
                    minRotation: 30 // Minimum rotation for readability
                }
            },
            y: {
                title: {
                    display: true,
                    text: 'Total Sales',
                    font: {
                        size: 14 // Adjust font size for the y-axis title
                    }
                },
                beginAtZero: true, // Start y-axis at zero
                ticks: {
                    callback: (value) => {
                        const numberValue = typeof value === 'string' ? parseFloat(value) : value;
                        return numberValue !== undefined && !isNaN(numberValue) ? formatCurrency.format(numberValue) : '';
                    },
                    font: {
                        size: 12 // Adjust font size for the y-axis labels
                    }
                }
            }
        }
    };

    return (
        <Card sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%', // Full height for the card
            boxShadow: 'none', // Removed box shadow
            borderRadius: 1, // Subtle border radius for modern design
            bgcolor: 'background.paper', // Background color
            p: 2 // Padding for the card
        }}>
            <CardContent sx={{ width: '100%', p: 2 }}>
                <Typography variant="h6" component="div" gutterBottom align="center">
                    Top Selling Products
                </Typography>
                <Box sx={{ height: 300, width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Bar data={chartData} options={options} />
                </Box>
            </CardContent>
        </Card>
    );
};

export default TopSellingProductsChart;
