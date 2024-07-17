// assets
import { GrUserManager } from "react-icons/gr";
import { IoMan } from "react-icons/io5";

// constant
const icons = { IoMan };


const guid = {
    id: 'guid',
    // title: 'Guid',
    type: 'group',
    children: [
        {
            id: 'guid',
            title: 'Guid',
            type: 'item',
            url: '/guid',
            icon: icons.IoMan,
            breadcrumbs: false
        }
    ]
};

export default guid;
