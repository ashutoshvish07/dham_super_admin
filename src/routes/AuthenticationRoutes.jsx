import { lazy } from 'react';
import { useRoutes } from 'react-router-dom';

// project imports
import Loadable from 'ui-component/Loadable';
import MinimalLayout from 'layout/MinimalLayout';

// login option 3 routing
const AuthLogin3 = Loadable(lazy(() => import('views/pages/authentication3/Login3')));
const OTPWraper = Loadable(lazy(() => import('views/pages/authentication3/OTPWraper')))
const AuthRegister3 = Loadable(lazy(() => import('views/pages/authentication3/Register3')));


const AuthenticationRoutes = {
  path: '/',
  element: <MinimalLayout />,
  children: [
    {
      path: '/login',
      element: <AuthLogin3 />
    },
    {
      path: '/otp-verification',
      element: <OTPWraper />
    }
  ]
};

export default AuthenticationRoutes;
