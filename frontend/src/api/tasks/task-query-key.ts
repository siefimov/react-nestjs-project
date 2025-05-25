export const taskQueryKeys = {
  all: ['tasks'] as const,
  details: () => [...taskQueryKeys.all, 'task'] as const,
  detail: (id: number) => [...taskQueryKeys.details(), id] as const,
  byProject: (projectId: number) =>
    [...taskQueryKeys.all, 'project', projectId] as const,
};
