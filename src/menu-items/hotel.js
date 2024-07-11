// assets
import { FaHotel } from "react-icons/fa";


// constant
const icons = {
    FaHotel
};

// ==============================|| EXTRA HOTEL MENU ITEMS ||============================== //

const hotel = {
    id: 'hotel',
    type: 'group',
    children: [
        {
            id: 'authentication',
            title: 'Hotel Management',
            type: 'collapse',
            icon: icons.FaHotel,

            children: [
                {
                    id: 'hotel',
                    title: 'Hotels',
                    type: 'item',
                    url: '/pages/hotel/hotels',
                    target: false,
                    breadcrumbs: false
                },
                {
                    id: 'roomscategories',
                    title: 'Room Categories',
                    type: 'item',
                    url: 'pages/hotel/roomcategory',
                    target: false,
                    breadcrumbs: false
                },
                {
                    id: 'aminities',
                    title: 'Aminities',
                    type: 'item',
                    url: 'pages/hotel/aminities',
                    target: false,
                    breadcrumbs: false
                },
                {
                    id: 'rooms',
                    title: 'Hotel Rooms',
                    type: 'item',
                    url: 'pages/hotel/rooms',
                    target: false,
                    breadcrumbs: false
                },
            ]
        }
    ]
};

export default hotel;