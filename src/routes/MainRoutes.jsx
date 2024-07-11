import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import PrivateRoute from './PrivateRoute';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard')));


// sample page routing
const SamplePage = Loadable(lazy(() => import('views/sample-page')));
// import Country from 'views/pages/location/Country';
const Country = Loadable(lazy(() => import("views/pages/location/Country")))
const State = Loadable(lazy(() => import("views/pages/location/State")))
const City = Loadable(lazy(() => import("views/pages/location/City")))
const Hotel = Loadable(lazy(() => import("views/pages/hotel/Hotel")))
const RoomCategory = Loadable(lazy(() => import("views/pages/hotel/RoomCategories")))
const Aminities = Loadable(lazy(() => import("views/pages/hotel/Aminities")))
const HotleRooms = Loadable(lazy(() => import("views/pages/hotel/HotelRooms")))
// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
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
          path: 'default',
          element: <DashboardDefault />
        }
      ]
    },
    {
      path: '/',
      children: [
        {
          path: 'pages/location/country',
          element: <Country />,
        }
      ]

    }, {
      path: '/',
      children: [
        {
          path: 'pages/location/state',
          element: <State />,
        }
      ]

    },
    {
      path: '/',
      children: [
        {
          path: 'pages/location/city',
          element: <City />,
        }
      ]
    },
    {
      path: '/',
      children: [
        {
          path: 'pages/hotel/hotels',
          element: <Hotel />,
        }
      ]
    }, {
      path: '/',
      children: [
        {
          path: 'pages/hotel/roomcategory',
          element: <RoomCategory />,
        }
      ]
    }, {
      path: '/',
      children: [
        {
          path: 'pages/hotel/aminities',
          element: <Aminities />,
        }
      ]
    }, {
      path: '/',
      children: [
        {
          path: 'pages/hotel/rooms',
          element: <HotleRooms />,
        }
      ]
    },

  ]
};

export default MainRoutes;
