import type { TaskStatus } from '../../shared/types';

export const taskQueryKeys = {
  all: ['tasks'] as const,
  list: (params: {
    projectId?: number;
    status?: TaskStatus;
    page?: number;
    limit?: number;
  }) => ['tasks', params] as const,
  details: () => [...taskQueryKeys.all, 'task'] as const,
  detail: (id: number) => [...taskQueryKeys.details(), id] as const,
  byProject: (projectId: number) =>
    [...taskQueryKeys.all, 'project', projectId] as const,
};
