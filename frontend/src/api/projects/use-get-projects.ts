import type { Project } from '../../types';
import { http } from '../http';
import { useQuery } from '@tanstack/react-query';
import { projectQueryKeys } from './project-query-keys';

const getProjectsFn = async () => {
  return http.get<Project[]>('/projects');
};

export const useProjects = () => {
  return useQuery<Project[], Error>({
    queryKey: projectQueryKeys.all,
    queryFn: getProjectsFn,
  });
};
