import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
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
    onSuccess: () => {
      toast.success('Task deleted!');
    },
    onError: () => {
      queryClient.invalidateQueries({ queryKey: taskQueryKeys.all });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: taskQueryKeys.all });
    },
  });
};
