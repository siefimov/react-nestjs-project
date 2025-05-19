import { useMutation, useQueryClient } from '@tanstack/react-query';
import { http } from '../http';
import { projectQueryKeys } from './project-query-keys';

type Props = {
  closeModal: () => void;
};

export const useDeleteProject = ({ closeModal }: Props) => {
  const queryClient = useQueryClient();

  const deteleFn = async (id: number) => {
    const response = await http.delete<void>(`/projects/${id}`);
    return response;
  };

  return useMutation({
    mutationFn: deteleFn,
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: projectQueryKeys.all });
    },
    onSuccess: () => {
      console.log('Delete user successfuly');
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
