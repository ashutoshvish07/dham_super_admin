// assets
import { FaMapLocationDot } from "react-icons/fa6";

// constant
const icons = { FaMapLocationDot };


const eventTour = {
    id: 'eventTour',
    // title: 'Guid',
    type: 'group',
    children: [
        {
            id: 'eventTour',
            title: 'Event Tours',
            type: 'item',
            url: '/event-tours',
            icon: icons.FaMapLocationDot,
            breadcrumbs: false
        }
    ]
};

export default eventTour;
