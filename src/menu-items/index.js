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

// ==============================|| MENU ITEMS ||============================== //
// utilities, other

// Export menu based on the role of the user


let role = ''

const persistedState = JSON.parse(localStorage.getItem('persist:root'));

if (persistedState && persistedState.auth) {
  const authState = JSON.parse(persistedState.auth); // Parse the auth state
  console.log(authState); // Now you can access the actual auth state
  role = authState?.user?.role;
}


const menuItems = {
  items: role !== "Hotel" ? [dashboard, booking, pages, ManageHotel, guid, nearby, advertisement, blogs, eventTour] : [hoteldashboard, ManageHotel],
};



export default menuItems;
