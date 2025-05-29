import { useQuery } from '@tanstack/react-query';
import { type ProjectWithOwnerDto } from '@/features/projects';
import { http } from '@/shared/lib/api';
import { API_ROUTES } from '@/shared/constants';
import { projectQueryKeys } from './project-query-keys';

const getProjectsFn = async () => {
  return http.get<ProjectWithOwnerDto[]>(API_ROUTES.PROJECTS, {
    withAuth: true,
  });
};

export const useProjects = () => {
  return useQuery<ProjectWithOwnerDto[], Error>({
    queryKey: projectQueryKeys.all,
    queryFn: getProjectsFn,
  });
};
