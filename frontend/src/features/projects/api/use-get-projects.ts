import { http } from '../../shared/lib/api/http';
import { useQuery } from '@tanstack/react-query';
import { projectQueryKeys } from './project-query-keys';
import { type ProjectWithOwnerDto } from '../../schemas';
import { API_ROUTES } from '../../shared/constants';

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
