export const API_ROUTES = {
  PROJECTS: '/projects',
  PROJECT: (id: number) => `/projects/${id}`,
  TASKS: '/tasks',
  TASK: (id: number) => `/tasks/${id}`,
  TASKS_BY_PROJECT: (projectId: number) => `/tasks?projectId=${projectId}`,
  USERS: '/users',
  USER: (id: number) => `/users/${id}`,
  REGISTER: '/auth/register',
  LOGIN: '/auth/login',
  PROFILE: '/auth/me',
};
