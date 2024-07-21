// assets
import { FcAdvertising } from "react-icons/fc";



// constant
const icons = { FcAdvertising };


const advertisement = {
    id: 'advertisement',
    // title: 'Guid',
    type: 'group',
    children: [
        {
            id: 'advertisement',
            title: 'Advertisement',
            type: 'item',
            url: '/advertisement',
            icon: icons.FcAdvertising,
            breadcrumbs: false
        }
    ]
};

export default advertisement;
