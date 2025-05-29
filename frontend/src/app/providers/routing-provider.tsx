import { RouterProvider } from 'react-router';
import { router } from '../routing/router';

export const RoutingProvider = () => <RouterProvider router={router} />;
