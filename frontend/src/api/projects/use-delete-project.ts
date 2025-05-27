import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { http } from '../http';
import { projectQueryKeys } from './project-query-keys';
import { API_ROUTES } from '../../constants';

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
    onError: () => {
      queryClient.invalidateQueries({ queryKey: projectQueryKeys.all });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: projectQueryKeys.all });
      closeModal();
    },
  });
};
