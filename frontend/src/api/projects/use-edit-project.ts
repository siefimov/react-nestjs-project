import { useMutation, useQueryClient } from '@tanstack/react-query';
import type {
  Project,
  UpdateProjectRequestDto,
  UpdateProjectResponseDto,
} from '../../types';
import { http } from '../http';
import { projectQueryKeys } from './project-query-keys';

export function useEditProject() {
  const queryClient = useQueryClient();

  const editProjectFn = async (updatedProject: UpdateProjectRequestDto) => {
    const response = await http.put<UpdateProjectResponseDto>(
      `/projects/${updatedProject.id}`,
      updatedProject,
    );

    return response;
  };

  return useMutation({
    mutationFn: editProjectFn,

    onMutate: async updatedProject => {
      await queryClient.cancelQueries({
        queryKey: projectQueryKeys.detail(updatedProject.id),
      });

      const previousProject = queryClient.getQueryData<Project>(
        projectQueryKeys.detail(updatedProject.id),
      );

      queryClient.setQueryData<Project>(
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
