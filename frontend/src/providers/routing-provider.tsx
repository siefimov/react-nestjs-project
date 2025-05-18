import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router";
import { AppLayout } from "../components/app-layout";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<AppLayout />}>
      <Route path="/" element={<div>Home</div>} />
      <Route path="/projects" element={<div>ProjectsList Page</div>} />
      <Route path="/projects/:id" element={<div>Project details Page</div>} />
      <Route path="/projects/create" element={<div>Create Project Form</div>} />
      <Route path="*" element={<div>Not Found Page</div>} />
    </Route>
  )
);

export const RoutingProvider = () => <RouterProvider router={router} />;
