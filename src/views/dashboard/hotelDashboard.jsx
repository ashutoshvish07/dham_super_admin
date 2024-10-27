import { useEffect, useState } from 'react';

// material-ui
import Grid from '@mui/material/Grid';

// project imports
import EarningCard from './EarningCard';
import PopularCard from './PopularCard';
import TotalOrderLineChartCard from './TotalOrderLineChartCard';
import TotalIncomeDarkCard from './TotalIncomeDarkCard';
import TotalIncomeLightCard from './TotalIncomeLightCard';
import TotalGrowthBarChart from './TotalGrowthBarChart';

import { gridSpacing } from 'store/constant';

// assets
import StorefrontTwoToneIcon from '@mui/icons-material/StorefrontTwoTone';
import { Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getDashboardAsync, getDashboardGraphDataAsync } from 'Redux/Slice/dashboardSlice';
import HotelAdminRooms from 'views/pages/hotelAdmin/hotelAdminRooms';

// ==============================|| DEFAULT DASHBOARD ||============================== //

const HotelDashboard = () => {
    const [isLoading, setLoading] = useState(true);

    const { dashboardData, graphData } = useSelector((state) => state?.dashboard)

    const dispatch = useDispatch()

    useEffect(() => {
        const fetchData = async () => {
            try {

                await Promise.all[
                    dispatch(getDashboardAsync()),
                    dispatch(getDashboardGraphDataAsync())
                ]
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }

        fetchData()

        // Cleanup function
        return () => {
            //
        }
    }, []);

    return (
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
                <Grid container spacing={gridSpacing}>
                    <Grid item xs={12} lg={8}>
                        <Grid container spacing={gridSpacing}>
                            <Grid item xs={12} md={12} lg={12}>
                                <HotelAdminRooms view="dashboard" />
                                {/* <TotalGrowthBarChart isLoading={isLoading} /> */}
                            </Grid>
                            {/* <Grid item xs={12} md={4}>
            <PopularCard isLoading={isLoading} />
          </Grid> */}
                        </Grid>
                    </Grid>
                    <Grid item lg={4} md={12} sm={12} xs={12}>
                        <Grid container spacing={gridSpacing}>
                            <Grid item sm={6} xs={12} md={6} lg={12}>
                                <TotalIncomeLightCard

                                    {...{
                                        isLoading: isLoading,
                                        total: dashboardData?.totalBookingsThisMonth,
                                        label: 'Total Bookings',
                                        icon: <StorefrontTwoToneIcon fontSize="inherit" />
                                    }}
                                />
                            </Grid>
                            <Grid item sm={6} xs={12} md={6} lg={12}>
                                <EarningCard isLoading={isLoading} totalRevenue={dashboardData?.totalRevenue} />
                            </Grid>
                            <Grid item sm={6} xs={12} md={6} lg={12}>
                                <TotalOrderLineChartCard isLoading={isLoading} thisMonthRevenue={dashboardData?.thisMonthRevenue} />
                            </Grid>
                        </Grid>
                    </Grid>

                </Grid>
            </Grid>

        </Grid>
    );
};

export default HotelDashboard;
