import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import PrivateRoute from './PrivateRoute';

// dashboard routing

const DashboardHotel = Loadable(lazy(() => import("views/dashboard/hotelDashboard")))

// sample page routing

const RoomForm = Loadable(lazy(() => import("Forms/HotelRoomForm")))
const HotelBookings = Loadable(lazy(() => import("views/pages/hotelBookings/HotelBooking")))
const HotleRooms = Loadable(lazy(() => import("views/pages/hotelAdmin/HotelAdminRooms")))


// ==============================|| MAIN ROUTING ||============================== //

const HotelAdminRoutes = {
    path: '/',
    element: <PrivateRoute> <MainLayout /></PrivateRoute>,
    children: [
        {
            path: '/',
            element: <DashboardHotel />
        },
        {
            path: 'dashboard',
            children: [
                {
                    path: 'hotel-admin',
                    element: <DashboardHotel />
                }
            ]
        },

        {
            path: '/hotel-rooms-bookings',
            element: <HotelBookings />,
        },
        {
            path: '/rooms',
            element: <HotleRooms />,
        },

        {
            path: '/rooms/create',
            element: <RoomForm />,
        },
        {
            path: '/rooms/update/:id',
            element: <RoomForm />,
        },

    ]
};

export default HotelAdminRoutes;
