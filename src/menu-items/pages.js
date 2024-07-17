// assets
import { IconKey } from '@tabler/icons-react';

// constant
const icons = {
  IconKey
};


const pages = {
  id: 'pages',
  type: 'group',
  children: [
    {
      id: 'authentication',
      title: 'Location Settings',
      type: 'collapse',
      icon: icons.IconKey,

      children: [
        {
          id: 'country',
          title: 'Country',
          type: 'item',
          url: '/pages/location/country',
          target: false,
          breadcrumbs: false
        },
        {
          id: 'state',
          title: 'State',
          type: 'item',
          url: '/pages/location/state',
          target: false,
          breadcrumbs: false
        },
        {
          id: 'city',
          title: 'City',
          type: 'item',
          url: '/pages/location/city',
          target: false,
          breadcrumbs: false
        },
      ]
    }
  ]
};

export default pages;
