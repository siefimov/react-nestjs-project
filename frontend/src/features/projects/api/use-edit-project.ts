import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { projectQueryKeys } from './project-query-keys';
import {
  type ProjectUpdateDto,
  type ProjectResponseDto,
  ProjectUpdateSchema,
  type ProjectWithOwnerDto,
} from '@/features/projects';
import { http } from '@/shared/lib/api';
import { API_ROUTES } from '@/shared/constants';

export function useEditProject() {
  const queryClient = useQueryClient();

  const editProjectFn = async (updatedProject: ProjectUpdateDto) => {
    const response = await http.put<ProjectResponseDto>(
      API_ROUTES.PROJECT(updatedProject.id),
      updatedProject,
      { withAuth: true },
    );

    return ProjectUpdateSchema.parse(response);
  };

  return useMutation({
    mutationFn: editProjectFn,

    onMutate: async updatedProject => {
      await queryClient.cancelQueries({
        queryKey: projectQueryKeys.detail(updatedProject.id),
      });

      const previousProject = queryClient.getQueryData<ProjectWithOwnerDto>(
        projectQueryKeys.detail(updatedProject.id),
      );

      queryClient.setQueryData<ProjectWithOwnerDto>(
        projectQueryKeys.detail(updatedProject.id),
        previous => {
          if (!previous) return previous;
          return {
            ...previous,
            ...updatedProject,
            owner: previous.owner,
          };
        },
      );

      return { previousProject };
    },
    onSuccess: () => {
      toast.success('Project updated');
    },
    onError: (_error, updatedProject, context) => {
      queryClient.setQueryData(
        projectQueryKeys.detail(updatedProject.id),
        context?.previousProject,
      );
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: projectQueryKeys.all });
    },
  });
}
