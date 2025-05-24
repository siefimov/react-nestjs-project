import { useQuery } from '@tanstack/react-query';
import { TaskSchema, type Task } from '../../schemas';
import { http } from '../http';
import { taskQueryKeys } from './task-query-key';

const getTasksFn = async (projectId: number) => {
  const data = await http.get<Task[]>(`/tasks?projectId=${projectId}`);
  return TaskSchema.array().parse(data);
};

export const useTasks = (projectId: number) => {
  return useQuery<Task[]>({
    queryKey: taskQueryKeys.byProject(projectId),
    queryFn: () => getTasksFn(projectId),
  });
};
