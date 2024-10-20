// assets
import { LiaHotelSolid } from "react-icons/lia";


// constant
const icons = { LiaHotelSolid };


const booking = {

    id: 'bookings',
    type: 'group',
    children: [
        {
            id: 'authentication',
            title: 'Bookings',
            type: 'collapse',
            icon: icons.LiaHotelSolid,
            children: [
                {
                    id: 'booking-properties',
                    title: 'Properties Booking',
                    type: 'item',
                    url: '/booking',
                    target: false,
                    breadcrumbs: false
                },
                {
                    id: 'guidBooking',
                    title: 'Guid Booking',
                    type: 'item',
                    url: '/guid-booking',
                    target: false,
                    breadcrumbs: false
                }
            ]
        }
    ]
};

export default booking;
