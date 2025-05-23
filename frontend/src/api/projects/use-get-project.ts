import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router';
import { http } from '../http';
// import type { Project } from '../../types';
import { projectQueryKeys } from './project-query-keys';
import type { ProjectWithOwner } from '../../schemas';

export const useProject = () => {
  const { id } = useParams();

  const getProjectFn = async () => {
    const response = await http.get<ProjectWithOwner>(`/projects/${id}`);
    return response;
  };

  return useQuery({
    queryKey: projectQueryKeys.detail(Number(id)),
    queryFn: getProjectFn,
  });
};
