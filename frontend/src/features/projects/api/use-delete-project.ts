import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { projectQueryKeys } from './project-query-keys';
import { http } from '@/shared/lib/api';
import { API_ROUTES } from '@/shared/constants';
import { AxiosError } from 'axios';

type Props = {
  closeModal: () => void;
};

export const useDeleteProject = ({ closeModal }: Props) => {
  const queryClient = useQueryClient();

  const deteleFn = async (id: number) => {
    const response = await http.delete<void>(API_ROUTES.PROJECT(id), {
      withAuth: true,
    });
    return response;
  };

  return useMutation({
    mutationFn: deteleFn,
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: projectQueryKeys.all });
    },
    onSuccess: () => {
      toast.success('Delete user successfuly');
    },
    onError: (error: AxiosError) => {
      const message =
        typeof error?.response?.data === 'object' &&
        error?.response?.data !== null &&
        'message' in error.response.data
          ? (error.response.data as { message: string }).message
          : 'Unknown error';
      toast.error(message);
      queryClient.invalidateQueries({ queryKey: projectQueryKeys.all });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: projectQueryKeys.all });
      closeModal();
    },
  });
};
