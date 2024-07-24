import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';
import { SalesByRegion } from '../../redux/types';
import { Box, Typography } from '@mui/material';

// Register Chart.js components
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

interface SalesByRegionChartProps {
    data: SalesByRegion[];
    formatCurrency: {
        format: (value: number) => string;
        symbol: string;
    };
}

// Component to display sales by region chart
const SalesByRegionChart: React.FC<SalesByRegionChartProps> = ({ data, formatCurrency }) => {
    // If data is not available or empty, return a fallback UI
    if (!data || data.length === 0) {
        return <Typography variant="body1" color="textSecondary">No sales data available</Typography>;
    }

    // Prepare the data for the chart
    const regions = data.map(item => item.region);
    const salesByRegion = data.map(item => item.totalSales);

    const chartData = {
        labels: regions,
        datasets: [
            {
                label: 'Sales by Region',
                data: salesByRegion,
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }
        ]
    };

    // Render the chart
    return (
        <Box
            sx={{
                width: '100%',
                height: '100%',
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <Typography variant="h6" component="div" gutterBottom>
                Sales by Region
            </Typography>
            <Bar
                data={chartData}
                options={{
                    responsive: true,
                    plugins: {
                        legend: {
                            position: 'top' as const,
                        },
                        tooltip: {
                            callbacks: {
                                label: function (context) {
                                    let label = context.dataset.label || '';
                                    if (label) {
                                        label += ': ';
                                    }
                                    if (context.parsed.y !== null) {
                                        label += `$${context.parsed.y}`;
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
                                text: 'Region',
                            },
                            grid: {
                                display: false,
                            },
                        },
                        y: {
                            title: {
                                display: true,
                                text: 'Sales',
                            },
                            ticks: {
                                callback: (value) => {
                                    const numberValue = typeof value === 'string' ? parseFloat(value) : value;
                                    return numberValue !== undefined && !isNaN(numberValue) ? formatCurrency.format(numberValue) : '';
                                },
                            },

                        }
                    }
                }}
            />
        </Box>
    );
};

export default SalesByRegionChart;
