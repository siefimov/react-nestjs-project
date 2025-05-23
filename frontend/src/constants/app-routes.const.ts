export const APP_ROUTES = {
  PROJECTS: '/',
  CREATE: '/project/create',
  PROJECT: (id: number | string) => `/project/${id}`,
  EDIT: (id: number | string) => `/project/edit/${id}`,
};
