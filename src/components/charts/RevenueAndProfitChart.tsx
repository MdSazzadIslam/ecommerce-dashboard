import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';
import { RevenueAndProfit } from '../../redux/types'

// Register the necessary components
ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend);

interface RevenueAndProfitChartProps {
    data: RevenueAndProfit[];
    formatCurrency: {
        format: (value: number) => string;
        symbol: string;
    };
}

// Component to display revenue and profit chart
const RevenueAndProfitChart: React.FC<RevenueAndProfitChartProps> = ({ data, formatCurrency }) => {
    // If data is not available, return null or a fallback UI
    if (!data || data.length === 0) {
        return <div>No revenue and profit data available</div>;
    }

    // Prepare the data for the chart
    const chartData = {
        labels: data.map(item => new Date(item.date).toLocaleDateString()),
        datasets: [
            {
                label: 'Revenue',
                data: data.map(item => item.totalRevenue),
                borderColor: 'rgba(75, 192, 192, 0.6)',
                fill: false
            },
            {
                label: 'Profit',
                data: data.map(item => item.totalProfit),
                borderColor: 'rgba(255, 99, 132, 0.6)',
                fill: false
            }
        ]
    };

    // Render the chart
    return <Line data={chartData} options={{
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
                            label += context.parsed.y;
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
                    text: 'Time Period',
                },
            },
            y: {
                title: {
                    display: true,
                    text: 'Amount',
                },
                ticks: {
                    callback: (value) => {
                        const numberValue = typeof value === 'string' ? parseFloat(value) : value;
                        return numberValue !== undefined && !isNaN(numberValue) ? formatCurrency.format(numberValue) : '';
                    },
                },
            }
        }
    }} />;
};

export default RevenueAndProfitChart;