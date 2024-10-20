import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import PrivateRoute from './PrivateRoute';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard')));

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
const FoodAndDining = Loadable(lazy(() => import("views/pages/hotel/FoodAndDining")))
const HotelFrom = Loadable(lazy(() => import("Forms/HotelForm")))
const EventFrom = Loadable(lazy(() => import("Forms/EventTourForm")))
const RoomForm = Loadable(lazy(() => import("Forms/HotelRoomForm")))
const Booking = Loadable(lazy(() => import('views/pages/bookings/Bookings')))
const GuidBookingDetailsPagle = Loadable(lazy(() => import('views/pages/bookings/GuidBookingDetailsPagle')))
const AdvertisementForm = Loadable(lazy(() => import("Forms/AdvertisementForm")))
const GuidFrom = Loadable(lazy(() => import("Forms/GuidForm")))

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
      path: '/booking',
      element: <Booking />
    },
    {
      path: '/guid-booking',
      element: <GuidBookingDetailsPagle />
    },

    {
      path: '/guid/create-guid',
      element: <GuidFrom />
    },
    {
      path: '/guid/update-guid/:id',
      element: <GuidFrom />
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
      path: '/advertisement/create',
      element: <AdvertisementForm />
    },
    {
      path: '/advertisement/update/:id',
      element: <AdvertisementForm />
    },
    {
      path: '/event-tours',
      element: <EventTours />
    },
    {
      path: '/event-tours/create',
      element: <EventFrom />
    }, {
      path: '/event-tours/edit/:id',
      element: <EventFrom />
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
          path: '/location/country',
          element: <Country />,
        }
      ]

    },
    {
      path: '/',
      children: [
        {
          path: '/location/state',
          element: <State />,
        }
      ]

    },
    {
      path: '/',
      children: [
        {
          path: '/location/city',
          element: <City />,
        }
      ]
    },
    {
      path: '/',
      children: [
        {
          path: '/hotel/hotels',
          element: <Hotel />,
        }
      ]
    },
    {
      path: '/',
      children: [
        {
          path: '/hotel/hotels/create',
          element: <HotelFrom />,
        }
      ]
    },
    {
      path: '/',
      children: [
        {
          path: '/hotel/hotels/edit/:id',
          element: <HotelFrom />,
        }
      ]
    },

    {
      path: '/',
      children: [
        {
          path: '/hotel/roomcategory',
          element: <RoomCategory />,
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
          path: '/hotel/properties',
          element: <Properties />,
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
    {
      path: '/',
      children: [
        {
          path: '/hotel/food-and-dining',
          element: <FoodAndDining />,
        }
      ]
    },

  ]
};

export default MainRoutes;
