import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router';
import { AppLayout, PrivateLayout, PrivateRoute } from '@/shared/components';
import {
  CreateProjectPage,
  LoginPage,
  ProjectDetailPage,
  ProjectListPage,
  RegisterPage,
} from '@/features';
import { APP_ROUTES } from '@/shared/constants';

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<AppLayout />}>
      <Route path={APP_ROUTES.LOGIN} element={<LoginPage />} />
      <Route path={APP_ROUTES.REGISTER} element={<RegisterPage />} />

      <Route element={<PrivateRoute />}>
        <Route element={<PrivateLayout />}>
          <Route index element={<ProjectListPage />} />
          <Route
            path={APP_ROUTES.PROJECT(':id')}
            element={<ProjectDetailPage />}
          />
          <Route
            path={APP_ROUTES.PROJECT_CREATE}
            element={<CreateProjectPage />}
          />
          {/* <Route
            path={APP_ROUTES.EDIT(':id')}
            element={<div>Edit Project</div>}
          /> */}
          <Route path="*" element={<div>Not Found Page</div>} />
        </Route>
      </Route>
    </Route>,
  ),
);
