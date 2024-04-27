import type { FC, ReactElement } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import { HomePage } from '@/pages/home/HomePage.ui';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
]);

export const ReactRouterProvider: FC = (): ReactElement => <RouterProvider router={router} />;
