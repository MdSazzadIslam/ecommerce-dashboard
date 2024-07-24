import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend, ChartOptions, TooltipItem } from 'chart.js';
import { SalesVsTarget } from '../../redux/types';

// Register necessary components from Chart.js
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

interface SalesVsTargetChartProps {
    data: SalesVsTarget[];
    formatCurrency: {
        format: (value: number) => string;
        symbol: string;
    };
}

const SalesVsTargetChart: React.FC<SalesVsTargetChartProps> = ({ data, formatCurrency }) => {
    // Check if data is available
    if (!data || data.length === 0) {
        return <div>No sales data available</div>;
    }

    // Extract product names, actual sales, and target sales
    const products = data.map(item => item.product || 'Unknown Product');
    const actualSales = data.map(item => item.actualSales ?? 0);
    const targetSales = data.map(item => item.targetSales ?? 0);

    // Prepare data for the Bar chart
    const chartData = {
        labels: products,
        datasets: [
            {
                label: 'Actual Sales',
                data: actualSales,
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            },
            {
                label: 'Target Sales',
                data: targetSales,
                backgroundColor: 'rgba(255, 99, 132, 0.6)',
                borderColor: 'rgba(255, 99, 132, 1)',
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
                        size: 14 // Adjust font size for the axis title
                    }
                },
                ticks: {
                    autoSkip: true,
                    maxRotation: 45,
                    minRotation: 0,
                    font: {
                        size: 12 // Adjust font size for the axis labels
                    }
                }
            },
            y: {
                title: {
                    display: true,
                    text: 'Sales',
                    font: {
                        size: 14 // Adjust font size for the axis title
                    }
                },
                ticks: {
                    callback: (value) => {
                        const numberValue = typeof value === 'string' ? parseFloat(value) : value;
                        return numberValue !== undefined && !isNaN(numberValue) ? formatCurrency.format(numberValue) : '';
                    },
                    font: {
                        size: 12 // Adjust font size for the axis labels
                    }
                }
            }
        }
    };

    // Render the Bar chart
    return <Bar data={chartData} options={options} />;
};

export default SalesVsTargetChart;
