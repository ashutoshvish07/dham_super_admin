// assets
import { FaHotel } from "react-icons/fa";


// constant
const icons = {
    FaHotel
};


const ManageHotel = {
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
                    id: 'hotels',
                    title: 'Hotels',
                    type: 'item',
                    url: 'hotel/hotels',
                    target: false,
                    breadcrumbs: false,
                },
                {
                    id: 'rooms',
                    title: 'Hotel Rooms',
                    type: 'item',
                    url: 'hotel/rooms',
                    target: false,
                    breadcrumbs: false
                },
                {
                    id: 'roomscategories',
                    title: 'Room Categories',
                    type: 'item',
                    url: 'hotel/roomcategory',
                    target: false,
                    breadcrumbs: false
                },
                {
                    id: 'aminities',
                    title: 'Aminities',
                    type: 'item',
                    url: 'hotel/aminities',
                    target: false,
                    breadcrumbs: false
                },
                {
                    id: 'properties',
                    title: 'Properties',
                    type: 'item',
                    url: 'hotel/properties',
                    target: false,
                    breadcrumbs: false
                },
                {
                    id: 'foodanddining',
                    title: 'Food and Dining',
                    type: 'item',
                    url: 'hotel/food-and-dining',
                    target: false,
                    breadcrumbs: false
                },
            ]
        }
    ]
};

export default ManageHotel;
