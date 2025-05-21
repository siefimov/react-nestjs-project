import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router';
import { AppLayout } from '../components/app-layout';
import { Projects, Project, CreateProject } from '../views';
import { APP_ROUTES } from '../constants';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<AppLayout />}>
      <Route index element={<Projects />} />
      <Route path={APP_ROUTES.PROJECT(':id')} element={<Project />} />
      <Route path={APP_ROUTES.CREATE} element={<CreateProject />} />
      <Route path={APP_ROUTES.EDIT(':id')} element={<div>Edit Project</div>} />
      <Route path="*" element={<div>Not Found Page</div>} />
    </Route>,
  ),
);

export const RoutingProvider = () => <RouterProvider router={router} />;
