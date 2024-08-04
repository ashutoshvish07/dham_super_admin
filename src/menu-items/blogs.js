// assets
import { FaPenAlt } from "react-icons/fa";

// constant
const icons = { FaPenAlt };


const blogs = {
    id: 'blogs',
    // title: 'Guid',
    type: 'group',
    children: [
        {
            id: 'blogs',
            title: 'Blogs',
            type: 'item',
            url: '/blogs',
            icon: icons.FaPenAlt,
            breadcrumbs: false
        }
    ]
};

export default blogs;
