import { useMutation, useQueryClient } from '@tanstack/react-query';
import { http } from '../http';
import { API_ROUTES } from '../../constants';
import { taskQueryKeys } from './task-query-key';

export const useDeleteTask = () => {
  const queryClient = useQueryClient();

  const deteleFn = async (id: number) => {
    const response = await http.delete<void>(API_ROUTES.TASK(id));
    return response;
  };

  return useMutation({
    mutationFn: deteleFn,
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: taskQueryKeys.all });
    },
    onSuccess: () => {}, // add tostify
    onError: () => {
      queryClient.invalidateQueries({ queryKey: taskQueryKeys.all });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: taskQueryKeys.all });
    },
  });
};
