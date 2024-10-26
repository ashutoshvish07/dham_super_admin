
// assets
import { FaMapLocationDot } from "react-icons/fa6";

// constant
const icons = { FaMapLocationDot };


const hotelBookings = {
    id: 'hotelBookings',
    // title: 'Guid',
    type: 'group',
    children: [
        {
            id: 'hotelBookings',
            title: 'Hotel Bookings',
            type: 'item',
            url: '/hotel-rooms-bookings',
            icon: icons.FaMapLocationDot,
            breadcrumbs: false
        }
    ]
};

export default hotelBookings;
