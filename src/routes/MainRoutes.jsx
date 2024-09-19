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
const Properties = Loadable(lazy(() => import("views/pages/hotel/Properties")))
const GuidPage = Loadable(lazy(() => import('views/guid')));
const NearBy = Loadable(lazy(() => import('views/NearBy/NearBy')));
const Advertisement = Loadable(lazy(() => import('views/pages/advertisement/Advertisement')));
const Blog = Loadable(lazy(() => import('views/blog/Blog')));
const BlogForm = Loadable(lazy(() => import('Forms/BlogForm')));
const EventTours = Loadable(lazy(() => import("views/pages/EventTour/EventTour")))

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
      path: '/guid',
      element: <GuidPage />
    },
    {
      path: '/blogs',
      element: <Blog />
    },
    {
      path: '/create-blogs',
      element: <BlogForm />
    },
    {
      path: '/edit-blogs/:id',
      element: <BlogForm />
    },
    {
      path: '/nearby',
      element: <NearBy />
    },
    {
      path: '/advertisement',
      element: <Advertisement />
    },
    {
      path: '/event-tours',
      element: <EventTours />
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

    },
    {
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
    },
    {
      path: '/',
      children: [
        {
          path: 'pages/hotel/roomcategory',
          element: <RoomCategory />,
        }
      ]
    },
    {
      path: '/',
      children: [
        {
          path: 'pages/hotel/aminities',
          element: <Aminities />,
        }
      ]
    },
    {
      path: '/',
      children: [
        {
          path: 'pages/hotel/properties',
          element: <Properties />,
        }
      ]
    },
    {
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
