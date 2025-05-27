import { useQuery } from '@tanstack/react-query';
import { TaskSchema, type Task } from '../../schemas';
import { http } from '../http';
import { taskQueryKeys } from './task-query-key';
import { API_ROUTES } from '../../constants';

const getTasksFn = async (projectId: number) => {
  const data = await http.get<Task[]>(API_ROUTES.TASKS_BY_PROJECT(projectId), {
    withAuth: true,
  });
  return TaskSchema.array().parse(data);
};

export const useTasks = (projectId: number) => {
  return useQuery<Task[]>({
    queryKey: taskQueryKeys.byProject(projectId),
    queryFn: () => getTasksFn(projectId),
  });
};
