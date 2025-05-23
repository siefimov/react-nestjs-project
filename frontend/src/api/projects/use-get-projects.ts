// import type { Project } from '../../types';
import { http } from '../http';
import { useQuery } from '@tanstack/react-query';
import { projectQueryKeys } from './project-query-keys';
import type { ProjectWithOwner } from '../../schemas';

const getProjectsFn = async () => {
  return http.get<ProjectWithOwner[]>('/projects');
};

export const useProjects = () => {
  return useQuery<ProjectWithOwner[], Error>({
    queryKey: projectQueryKeys.all,
    queryFn: getProjectsFn,
  });
};
