import { useMutation, useQueryClient } from '@tanstack/react-query';
import { API_ROUTES } from '../../constants';
import { TaskCreateSchema, type Task, type TaskCreateDto } from '../../schemas';
import { http } from '../http';
import { taskQueryKeys } from './task-query-key';

const createTasktFn = async (newtask: TaskCreateDto) => {
  const response = await http.post<Task>(API_ROUTES.TASKS, newtask);
  return TaskCreateSchema.parse(response);
};

export const useCreateTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createTasktFn,

    onMutate: async newTask => {
      const previousTasks = queryClient.getQueryData(taskQueryKeys.all);

      queryClient.setQueryData(taskQueryKeys.all, (old: Task[] = []) => [
        ...old,
        {
          id: Date.now(),
          ...newTask,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      ]);

      return { previousTasks };
    },

    onError: (_error, _variables, context) => {
      if (context?.previousTasks) {
        queryClient.setQueryData(taskQueryKeys.all, context.previousTasks);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: taskQueryKeys.all });
    },
  });
};
