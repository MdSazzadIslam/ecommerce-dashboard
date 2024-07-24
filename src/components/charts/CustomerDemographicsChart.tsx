import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';
import { CustomerDemographics } from '../../redux/types';

// Register the necessary components for the Bar chart
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

interface CustomerDemographicsProps {
    data: CustomerDemographics[];
    formatCurrency: {
        format: (value: number) => string;
        symbol: string;
    };

}

const CustomerDemographicsChart: React.FC<CustomerDemographicsProps> = ({ data, formatCurrency }) => {
    // Ensure data is available
    if (!data || data.length === 0) {
        return <div>No customer demographics data available</div>;
    }

    // Helper function to aggregate sales by a specified category
    const aggregateSales = (key: keyof CustomerDemographics) => {
        const categories = Array.from(new Set(data.map(demo => demo[key])));
        const salesByCategory = categories.map(category =>
            data
                .filter(demo => demo[key] === category)
                .reduce((acc, curr) => acc + curr.totalSales, 0)
        );
        return { categories, salesByCategory };
    };

    // Aggregate sales data
    const { categories: ageGroups, salesByCategory: salesByAgeGroup } = aggregateSales('ageGroup');
    const { categories: genders, salesByCategory: salesByGender } = aggregateSales('gender');
    const { categories: occupations, salesByCategory: salesByOccupation } = aggregateSales('occupation');

    // Determine the labels and datasets based on available categories
    const labels = ageGroups.length > 0 ? ageGroups : (genders.length > 0 ? genders : occupations);
    const datasets = [
        {
            label: 'Sales by Age Group',
            data: salesByAgeGroup,
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
            stack: 'Stack 0',
            hidden: ageGroups.length === 0
        },
        {
            label: 'Sales by Gender',
            data: salesByGender,
            backgroundColor: 'rgba(255, 99, 132, 0.6)',
            stack: 'Stack 1',
            hidden: genders.length === 0
        },
        {
            label: 'Sales by Occupation',
            data: salesByOccupation,
            backgroundColor: 'rgba(255, 206, 86, 0.6)',
            stack: 'Stack 2',
            hidden: occupations.length === 0
        }
    ].filter(dataset => dataset.data.length > 0); // Remove empty datasets

    // Prepare data for the Bar chart
    const chartData = {
        labels,
        datasets
    };

    // Render the Bar chart
    return (
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
                            label: (context) => {
                                let label = context.dataset.label || '';
                                if (label) {
                                    label += ': ';
                                }
                                if (context.parsed.y !== null) {
                                    label += context.parsed.y.toLocaleString();
                                }
                                return label;
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        stacked: true,
                        title: {
                            display: true,
                            text: 'Demographic Groups',
                        },
                    },
                    y: {
                        stacked: true,
                        title: {
                            display: true,
                            text: 'Total Sales',
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
    );
};

export default CustomerDemographicsChart;
