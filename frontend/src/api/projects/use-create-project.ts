import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  type ProjectCreateDto,
  type ProjectResponseDto,
  type ProjectWithOwnerDto,
  ProjectCreateSchema,
} from '../../schemas';
import { http } from '../http';
import { projectQueryKeys } from './project-query-keys';

const createProjectFn = async (newPropect: ProjectCreateDto) => {
  const response = await http.post<ProjectResponseDto>('/projects', newPropect);
  return ProjectCreateSchema.parse(response);
};

export const useCreateProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createProjectFn,
    onMutate: async newProject => {
      await queryClient.cancelQueries({ queryKey: projectQueryKeys.all });
      const previousProjects = queryClient.getQueryData(projectQueryKeys.all);

      queryClient.setQueryData(
        projectQueryKeys.all,
        (old: ProjectWithOwnerDto[] = []) => [
          ...old,
          {
            id: Date.now(),
            ...newProject,
            owner: null,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
        ],
      );

      return { previousProjects };
    },
    onSuccess: () => {}, // todo: add toastify
    onError: (_error, _variables, context) => {
      if (context?.previousProjects) {
        queryClient.setQueryData(
          projectQueryKeys.all,
          context.previousProjects,
        );
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: projectQueryKeys.all });
    },
  });
};
