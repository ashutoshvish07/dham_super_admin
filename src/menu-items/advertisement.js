// assets
import { GrUserManager } from "react-icons/gr";
import { IoMan } from "react-icons/io5";

// constant
const icons = { IoMan };


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
            icon: icons.IoMan,
            breadcrumbs: false
        }
    ]
};

export default advertisement;
