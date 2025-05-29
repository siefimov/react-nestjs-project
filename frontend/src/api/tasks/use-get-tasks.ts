import { useQuery } from '@tanstack/react-query';
import {
  TaskSchema,
  type GetTasksParams,
  type GetTasksResponse,
} from '../../schemas';
import { http } from '../http';
import { taskQueryKeys } from './task-query-key';
import { API_ROUTES } from '../../constants';

const getTasksFn = async (params: GetTasksParams) => {
  const data = await http.get<GetTasksResponse>(
    API_ROUTES.TASKS,
    {
      withAuth: true,
      params,
    },
  );
  return {
    tasks: TaskSchema.array().parse(data.tasks),
    total: data.total,
  };
};

export const useTasks = (params: GetTasksParams) => {
  return useQuery<GetTasksResponse>({
    queryKey: taskQueryKeys.list(params),
    queryFn: () => getTasksFn(params),
  });
};
