import React from 'react';
import { Line } from 'react-chartjs-2';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { Chart as ChartJS, LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend, ChartOptions, TooltipItem } from 'chart.js';
import { SalesTrendOverTime } from '../../redux/types';

// Register necessary components from Chart.js
ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend);

interface SalesTrendChartProps {
    data: SalesTrendOverTime[];
    formatCurrency: {
        format: (value: number) => string;
        symbol: string;
    };
}

// Component to display sales trend over time
const SalesTrendChart: React.FC<SalesTrendChartProps> = ({ data, formatCurrency }) => {
    // Select sales data from the Redux store
    const salesData = useSelector((state: RootState) => state.sales.data);

    // Check if sales data and props data are available
    if (!salesData || !data || data.length === 0) {
        return <div>No sales data available</div>;
    }

    // Prepare data for the chart
    const chartData = {
        labels: data.map((item) => new Date(item.period).toLocaleDateString('en-US')),
        datasets: [
            {
                label: 'Sales Revenue Over Time',
                data: data.map((item) => item.totalSales),
                fill: false,
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                tension: 0.1,
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
                        const value = context.parsed.y !== null ? `$${context.parsed.y.toFixed(2)}` : '';
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
                    text: 'Sales Revenue',
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

    // Render the Line chart
    return <Line data={chartData} options={options} />;
};

export default SalesTrendChart;
