import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router';
import { AppLayout, PrivateLayout, PrivateRoute } from '../../components';
import { Projects, Project, CreateProject, Login, Register } from '../../views';
import { APP_ROUTES } from '../../constants';

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<AppLayout />}>
      <Route path={APP_ROUTES.LOGIN} element={<Login />} />
      <Route path={APP_ROUTES.REGISTER} element={<Register />} />

      <Route element={<PrivateRoute />}>
        <Route element={<PrivateLayout />}>
          <Route index element={<Projects />} />
          <Route path={APP_ROUTES.PROJECT(':id')} element={<Project />} />
          <Route path={APP_ROUTES.PROJECT_CREATE} element={<CreateProject />} />
          <Route
            path={APP_ROUTES.EDIT(':id')}
            element={<div>Edit Project</div>}
          />
          <Route path="*" element={<div>Not Found Page</div>} />
        </Route>
      </Route>
    </Route>,
  ),
);
