import React from 'react';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    LineElement,
    PointElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend,
    ChartOptions,
    TooltipItem,
} from 'chart.js';
import { SalesConversionRate } from '../../redux/types';

// Register necessary components for the Line chart
ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend);

interface SalesConversionRateChartProps {
    data: SalesConversionRate[];
    formatCurrency: {
        format: (value: number) => string;
        symbol: string;
    };
}

// Component to display the sales conversion rate chart
const SalesConversionRateChart: React.FC<SalesConversionRateChartProps> = ({ data, formatCurrency }) => {
    // Ensure data is available
    if (!data || data.length === 0) {
        return <div>No conversion rate data available</div>;
    }

    // Prepare the data for the chart
    const chartData = {
        labels: data.map(item => item.period),
        datasets: [
            {
                label: 'Conversion Rate (%)',
                data: data.map(item => item.conversionRate),
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                fill: true,
                tension: 0.1, // Smooth lines
            }
        ]
    };

    // Define chart options
    const options: ChartOptions<'line'> = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
                labels: {
                    font: {
                        size: 14, // Adjust font size for the legend
                    }
                }
            },
            tooltip: {
                callbacks: {
                    label: (context: TooltipItem<'line'>) => {
                        const label = context.dataset.label || '';
                        const value = context.parsed.y !== null ? `${context.parsed.y.toFixed(2)}%` : '';
                        return label ? `${label}: ${value}` : value;
                    }
                }
            }
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Time Period',
                    font: {
                        size: 14, // Adjust font size for the axis title
                    }
                },
                ticks: {
                    autoSkip: true, // Skip some labels if there are too many
                    maxRotation: 45, // Rotate labels to fit better
                    minRotation: 0, // Minimum rotation for labels
                    font: {
                        size: 12, // Adjust font size for the axis labels
                    }
                }
            },
            y: {
                title: {
                    display: true,
                    text: 'Conversion Rate (%)',
                    font: {
                        size: 14, // Adjust font size for the axis title
                    }
                },
                ticks: {
                    callback: (value) => {
                        const numberValue = typeof value === 'string' ? parseFloat(value) : value;
                        return numberValue !== undefined && !isNaN(numberValue) ? formatCurrency.format(numberValue) : '';
                    },
                    font: {
                        size: 12, // Adjust font size for the axis labels
                    }
                }
            }
        }
    };

    return <Line data={chartData} options={options} />;
};

export default SalesConversionRateChart;
