// assets
import { FaMapLocationDot } from "react-icons/fa6";

// constant
const icons = { FaMapLocationDot };


const hotelRooms = {
    id: 'hotelrooms',
    // title: 'Guid',
    type: 'group',
    children: [
        {
            id: 'hotelrooms',
            title: 'Rooms',
            type: 'item',
            url: '/rooms',
            icon: icons.FaMapLocationDot,
            breadcrumbs: false
        }
    ]
};

export default hotelRooms;
