import {
  useMutation,
  useQueryClient,
  type UseMutationOptions,
} from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { type Task, TaskSchema, type TaskUpdateDto } from '../../schemas';
import { http } from '../http';
import { taskQueryKeys } from './task-query-key';
import { API_ROUTES } from '../../constants';

export function useEditTask(
  options?: UseMutationOptions<
    Task,
    unknown,
    TaskUpdateDto,
    { previousTask?: Task }
  >,
) {
  const queryClient = useQueryClient();

  const editTaskFn = async (updatedTask: TaskUpdateDto) => {
    const response = await http.put<Task>(
      API_ROUTES.TASK(updatedTask.id),
      updatedTask,
      { withAuth: true },
    );

    return TaskSchema.parse(response);
  };

  return useMutation({
    mutationFn: editTaskFn,

    onMutate: async updatedTask => {
      await queryClient.cancelQueries({
        queryKey: taskQueryKeys.detail(updatedTask.id),
      });

      const previousTask = queryClient.getQueryData<Task>(
        taskQueryKeys.detail(updatedTask.id),
      );

      queryClient.setQueryData<Task>(
        taskQueryKeys.detail(updatedTask.id),
        previous => (previous ? { ...previous, ...updatedTask } : previous),
      );

      return { previousTask };
    },

    onSuccess: (...args) => {
      options?.onSuccess?.(...args);
      toast.success('Task updated!');
    },

    onError: (_error, updatedTask, context) => {
      queryClient.setQueryData(
        taskQueryKeys.detail(updatedTask.id),
        context?.previousTask,
      );
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: taskQueryKeys.all });
    },
  });
}
