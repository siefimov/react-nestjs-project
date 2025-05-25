export const API_ROUTES = {
  PROJECTS: '/projects',
  PROJECT: (id: number) => `/projects/${id}`,
  TASKS: '/tasks',
  TASK: (id: number) => `/tasks/${id}`,
  TASKS_BY_PROJECT: (projectId: number) => `/projects/${projectId}/tasks`,
  USERS: '/users',
  USER: (id: number) => `/users/${id}`,
};