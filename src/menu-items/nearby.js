
import { GrMapLocation } from "react-icons/gr";
import { ImLocation2 } from "react-icons/im";

// constant
const icons = { ImLocation2 };


const nearby = {
    id: 'nearby',
    // title: 'Guid',
    type: 'group',
    children: [
        {
            id: 'nearby',
            title: 'Near By',
            type: 'item',
            url: '/nearby',
            icon: icons.ImLocation2,
            breadcrumbs: false
        }
    ]
};

export default nearby;