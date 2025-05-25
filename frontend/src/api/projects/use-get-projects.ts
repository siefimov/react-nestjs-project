import { http } from '../http';
import { useQuery } from '@tanstack/react-query';
import { projectQueryKeys } from './project-query-keys';
import { type ProjectWithOwnerDto } from '../../schemas';
import { API_ROUTES } from '../../constants';

const getProjectsFn = async () => {
  return http.get<ProjectWithOwnerDto[]>(API_ROUTES.PROJECTS);
};

export const useProjects = () => {
  return useQuery<ProjectWithOwnerDto[], Error>({
    queryKey: projectQueryKeys.all,
    queryFn: getProjectsFn,
  });
};
