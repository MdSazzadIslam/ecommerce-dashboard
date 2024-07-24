import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSalesDataStart } from '../../redux/actions';
import { selectSalesLoading, selectSalesData } from '../../redux/selectors';
import { Container, Grid, Typography, CircularProgress, Card, CardContent, Box, AppBar, Toolbar, useTheme } from '@mui/material';
import {
    SalesTrendChart,
    SalesByRegionChart,
    SalesByCategoryChart,
    TopSellingProductsChart,
    SalesVsTargetChart,
    RevenueAndProfitChart,
    CustomerDemographicsChart,
    SalesConversionRateChart
} from '../charts';
import { useCurrencyFormatter } from '../../hooks';

// Define default period and topSellingLimit for example
const defaultPeriod = 'daily';
const defaultTopSellingLimit = 10;

const chartHeight = 300; // Consistent height for charts
const chartWidth = '100%'; // Full width

const Dashboard: React.FC = () => {
    // Use the currency formatter hook
    const formatCurrency = useCurrencyFormatter();

    const dispatch = useDispatch();
    const loading = useSelector(selectSalesLoading);
    const salesData = useSelector(selectSalesData);
    const theme = useTheme();

    useEffect(() => {
        dispatch(fetchSalesDataStart({ period: defaultPeriod, topSellingLimit: defaultTopSellingLimit }));
    }, [dispatch]);

    if (loading) {
        return (
            <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CircularProgress />
            </Container>
        );
    }

    return (
        <>
            <AppBar
                position="sticky"
                sx={{ backgroundColor: theme.palette.primary.contrastText, color: 'black', mb: 3 }}
            >
                <Toolbar>
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                        Dashboard
                    </Typography>
                </Toolbar>
            </AppBar>

            <Container
                sx={{
                    minHeight: '100vh', // Full viewport height
                    backgroundColor: theme.palette.primary.light,
                    color: 'white',
                    pb: 3, // Padding Bottom for spacing at the bottom
                    px: { xs: 2, sm: 3 } // Padding X for responsive spacing on small screens
                }}
            >
                <Grid container spacing={3}>
                    {/* Full-width Sales By Category Chart */}
                    <Grid item xs={12}>
                        <Card sx={{ boxShadow: 3, borderRadius: '8px' }}>
                            <CardContent>
                                <Typography variant="h6" component="div" gutterBottom>
                                    Sales By Category
                                </Typography>
                                <Box sx={{ height: chartHeight, width: chartWidth }}>
                                    {salesData ? <SalesByCategoryChart data={salesData.salesByCategory} formatCurrency={formatCurrency} /> : <p>No data available</p>}
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>

                    {/* Two charts side-by-side */}
                    <Grid item xs={12} md={6}>
                        <Card sx={{ boxShadow: 3, borderRadius: '8px' }}>
                            <CardContent>
                                <Typography variant="h6" component="div" gutterBottom>
                                    Sales Trend Over Time
                                </Typography>
                                <Box sx={{ height: chartHeight, width: chartWidth }}>
                                    {salesData ? <SalesTrendChart data={salesData.salesTrendOverTime} formatCurrency={formatCurrency} /> : <p>No data available</p>}
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Card sx={{ boxShadow: 3, borderRadius: '8px' }}>
                            <CardContent>
                                <Typography variant="h6" component="div" gutterBottom>
                                    Sales By Region
                                </Typography>
                                <Box sx={{ height: chartHeight, width: chartWidth }}>
                                    {salesData ? <SalesByRegionChart data={salesData.salesByRegion} formatCurrency={formatCurrency} /> : <p>No data available</p>}
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>

                    {/* Full-width for Top Selling Products Chart */}
                    <Grid item xs={12}>
                        <Card sx={{ boxShadow: 3, borderRadius: '8px' }}>
                            <CardContent>
                                <Typography variant="h6" component="div" gutterBottom>
                                    Top Selling Products
                                </Typography>
                                <Box sx={{ height: chartHeight, width: chartWidth }}>
                                    {salesData ? <TopSellingProductsChart data={salesData.topSellingProducts} formatCurrency={formatCurrency} /> : <p>No data available</p>}
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>

                    {/* Side-by-side for Sales Vs Target and Customer Demographics */}
                    <Grid item xs={12} md={6}>
                        <Card sx={{ boxShadow: 3, borderRadius: '8px' }}>
                            <CardContent>
                                <Typography variant="h6" component="div" gutterBottom>
                                    Sales Vs Target
                                </Typography>
                                <Box sx={{ height: chartHeight, width: chartWidth }}>
                                    {salesData ? <SalesVsTargetChart data={salesData.salesVsTarget} formatCurrency={formatCurrency} /> : <p>No data available</p>}
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Card sx={{ boxShadow: 3, borderRadius: '8px' }}>
                            <CardContent>
                                <Typography variant="h6" component="div" gutterBottom>
                                    Customer Demographics
                                </Typography>
                                <Box sx={{ height: chartHeight, width: chartWidth }}>
                                    {salesData ? <CustomerDemographicsChart data={salesData.customerDemographics} formatCurrency={formatCurrency} /> : <p>No data available</p>}
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>

                    {/* Side-by-side for Revenue and Profit and Sales Conversion Rate */}
                    <Grid item xs={12} md={6}>
                        <Card sx={{ boxShadow: 3, borderRadius: '8px' }}>
                            <CardContent>
                                <Typography variant="h6" component="div" gutterBottom>
                                    Revenue and Profit
                                </Typography>
                                <Box sx={{ height: chartHeight, width: chartWidth }}>
                                    {salesData ? <RevenueAndProfitChart data={salesData.revenueAndProfit} formatCurrency={formatCurrency} /> : <p>No data available</p>}
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Card sx={{ boxShadow: 3, borderRadius: '8px' }}>
                            <CardContent>
                                <Typography variant="h6" component="div" gutterBottom>
                                    Sales Conversion Rate
                                </Typography>
                                <Box sx={{ height: chartHeight, width: chartWidth }}>
                                    {salesData ? <SalesConversionRateChart data={salesData.salesConversionRate} formatCurrency={formatCurrency} /> : <p>No data available</p>}
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Container>
        </>
    );
};

export default Dashboard;
