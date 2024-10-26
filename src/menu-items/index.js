import dashboard from './dashboard';
import pages from './pages';
import guid from './guid';
import nearby from './nearby';
import advertisement from './advertisement';
import ManageHotel from './hotel';
import blogs from './blogs';
import eventTour from './eventTour';
import hoteldashboard from './hoteldashboard';
import booking from './bookings';
import { useEffect, useState } from 'react';
import hotelRooms from './hotelRooms';
import hotelBookings from './hotelBookings';


// Hook to fetch role from persisted state
const useUserRole = () => {
  const [role, setRole] = useState('');

  useEffect(() => {
    const persistedState = JSON.parse(localStorage.getItem('persist:root'));

    if (persistedState && persistedState.auth) {
      const authState = JSON.parse(persistedState.auth); // Parse the auth state
      setRole(authState?.user?.role || ''); // Set the role dynamically
    }
  }, []);

  return role;
};


// Hook to generate menu items based on the role
const useMenuItems = () => {
  const role = useUserRole();

  // Dynamically generate menu items based on the role
  const menuItems = {
    items: role !== 'Hotel'
      ? [dashboard, booking, pages, ManageHotel, guid, nearby, advertisement, blogs, eventTour]
      : [hoteldashboard, hotelBookings, hotelRooms],
  };

  return menuItems;
};

export default useMenuItems;

