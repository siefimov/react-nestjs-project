import { useMutation, useQueryClient } from '@tanstack/react-query';
import { type Task, TaskSchema, type TaskUpdateDto } from '../../schemas';
import { http } from '../http';
import { taskQueryKeys } from './task-query-key';

export function useEditTask() {
  const queryClient = useQueryClient();

  const editTaskFn = async (updatedTask: TaskUpdateDto) => {
    const response = await http.put<Task>(
      `/tasks/${updatedTask.id}`,
      updatedTask,
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
