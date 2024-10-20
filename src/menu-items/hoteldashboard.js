// assets
import { IconDashboard } from '@tabler/icons-react';

// constant
const icons = { IconDashboard };

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const hoteldashboard = {
    id: 'hotelDashboard',
    title: 'Dashboard',
    type: 'group',
    children: [
        {
            id: 'hotelDashboard',
            title: 'Dashboard',
            type: 'item',
            url: '/dashboard/hotel-admin',
            icon: icons.IconDashboard,
            breadcrumbs: false
        }
    ]
};



export default hoteldashboard;
