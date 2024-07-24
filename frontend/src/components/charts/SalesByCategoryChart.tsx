import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { SalesByCategory } from '../../redux/types';
import { Box, Typography, List, ListItem, Divider } from '@mui/material';

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

interface SalesByCategoryChartProps {
    data: SalesByCategory[];
    formatCurrency: {
        format: (value: number) => string;
        symbol: string;
    };
}

// Component to display sales by category chart
const SalesByCategoryChart: React.FC<SalesByCategoryChartProps> = ({ data, formatCurrency }) => {
    // If data is not available, return a fallback UI
    if (!data || data.length === 0) {
        return <Typography variant="body1" color="textSecondary">No sales data available</Typography>;
    }

    // Prepare the data for the chart
    const categories = data.map(item => item.category);
    const salesByCategory = data.map(item => item.totalSales);

    const chartData = {
        labels: categories,
        datasets: [
            {
                label: 'Sales by Category',
                data: salesByCategory,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.6)',
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(255, 206, 86, 0.6)',
                    'rgba(75, 192, 192, 0.6)',
                ],
            }
        ]
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'row', // Arrange items side-by-side
                alignItems: 'flex-start',
                justifyContent: 'space-between', // Adjust alignment
                gap: 2, // Add space between chart and legend
                width: '100%',
                height: '100%',
                overflow: 'hidden',
                p: 2, // Add padding to avoid content sticking to edges
            }}
        >
            <Box
                sx={{
                    flex: 1, // Take remaining space
                    maxWidth: '40%', // Limit width for legend
                    maxHeight: 400, // Set max height for legend box
                    overflowY: 'auto', // Enable vertical scroll if content overflows
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    p: 2,
                    bgcolor: 'white',
                    borderRadius: '8px',
                    boxShadow: 1, // Add shadow for better separation
                }}
            >
                <Typography variant="h6" component="div" gutterBottom sx={{ fontWeight: 'bold', mb: 2 }}>
                    Sales by Category
                </Typography>
                <List sx={{ width: '100%', bgcolor: 'background.paper', borderRadius: '8px' }}>
                    {categories.map((category, index) => (
                        <React.Fragment key={category}>
                            <ListItem sx={{ paddingLeft: 0, paddingRight: 0, mb: 1, display: 'flex', alignItems: 'center' }}>
                                <Box
                                    sx={{
                                        width: 14,
                                        height: 14,
                                        backgroundColor: chartData.datasets[0].backgroundColor[index % chartData.datasets[0].backgroundColor.length],
                                        borderRadius: '50%',
                                        marginRight: 1,
                                    }}
                                />
                                <Typography variant="body2" sx={{ fontWeight: 'medium', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                    {category}: ${salesByCategory[index].toLocaleString()}
                                </Typography>
                            </ListItem>
                            <Divider />
                        </React.Fragment>
                    ))}
                </List>
            </Box>
            <Box
                sx={{
                    flex: 2, // Take more space for the chart
                    maxWidth: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: "90%"
                }}
            >
                <Pie
                    data={chartData}
                    options={{
                        responsive: true,
                        plugins: {
                            legend: {
                                display: false, // Hide the default legend
                            },
                            tooltip: {
                                callbacks: {
                                    label: function (context) {
                                        let label = context.label || '';
                                        if (context.parsed && context.parsed !== null) {
                                            label += `: ${formatCurrency.format(context.parsed)}`
                                        }
                                        return label;
                                    }
                                }
                            }
                        }
                    }}
                />
            </Box>
        </Box>
    );
};

export default SalesByCategoryChart;
