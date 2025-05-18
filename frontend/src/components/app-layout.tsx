import { Outlet } from "react-router";

export const AppLayout = () => {
  return (
    <>
      <h1>Mini Project Management App</h1>
      <Outlet />
    </>
  );
};
