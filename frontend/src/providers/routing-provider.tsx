import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router';
import { AppLayout } from '../components/app-layout';
import { Projects, Project } from '../views';
import { APP_ROUTES } from '../enums';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<AppLayout />}>
      <Route index element={<Projects />} />
      <Route path={APP_ROUTES.PROJECT(':id')} element={<Project />} />
      <Route
        path={APP_ROUTES.CREATE}
        element={<div>Create Project Form</div>}
      />
      <Route
        path={APP_ROUTES.EDIT(':id')}
        element={<div>Edit Project Form</div>}
      />
      <Route path="*" element={<div>Not Found Page</div>} />
    </Route>,
  ),
);

export const RoutingProvider = () => <RouterProvider router={router} />;
