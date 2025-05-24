import { useMutation, useQueryClient } from '@tanstack/react-query';
import { http } from '../http';
import { projectQueryKeys } from './project-query-keys';
import {
  type ProjectUpdateDto,
  type ProjectResponseDto,
  ProjectUpdateSchema,
  type ProjectWithOwnerDto,
} from '../../schemas';

export function useEditProject() {
  const queryClient = useQueryClient();

  const editProjectFn = async (updatedProject: ProjectUpdateDto) => {
    const response = await http.put<ProjectResponseDto>(
      `/projects/${updatedProject.id}`,
      updatedProject,
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
