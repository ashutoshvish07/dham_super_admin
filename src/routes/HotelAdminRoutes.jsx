import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import PrivateRoute from './PrivateRoute';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard')));


// sample page routing

const RoomCategory = Loadable(lazy(() => import("views/pages/hotel/RoomCategories")))
const Aminities = Loadable(lazy(() => import("views/pages/hotel/Aminities")))
const HotleRooms = Loadable(lazy(() => import("views/pages/hotel/HotelRooms")))
const Properties = Loadable(lazy(() => import("views/pages/hotel/Properties")))
const RoomForm = Loadable(lazy(() => import("Forms/HotelRoomForm")))



// ==============================|| MAIN ROUTING ||============================== //

const HotelAdminRoutes = {
    path: '/',
    element: <PrivateRoute> <MainLayout /></PrivateRoute>,
    children: [
        {
            path: '/',
            element: <DashboardDefault />
        },

        {
            path: 'dashboard',
            children: [
                {
                    path: 'hotel-admin',
                    element: <DashboardDefault />
                }
            ]
        },
        {
            path: '/',
            children: [
                {
                    path: '/hotel/aminities',
                    element: <Aminities />,
                }
            ]
        },

        {
            path: '/',
            children: [
                {
                    path: '/hotel/rooms',
                    element: <HotleRooms />,
                }
            ]
        },
        {
            path: '/',
            children: [
                {
                    path: '/hotel/rooms/create',
                    element: <RoomForm />,
                }
            ]
        },
        {
            path: '/',
            children: [
                {
                    path: '/hotel/rooms/update/:id',
                    element: <RoomForm />,
                }
            ]
        },


    ]
};

export default HotelAdminRoutes;
