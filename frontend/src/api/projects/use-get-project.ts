import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router';
import { http } from '../http';
import { projectQueryKeys } from './project-query-keys';
import { ProjectResponseSchema, type ProjectResponseDto } from '../../schemas';

export const useProject = () => {
  const { id } = useParams();

  const getProjectFn = async () => {
    const response = await http.get<ProjectResponseDto>(`/projects/${id}`);
    return ProjectResponseSchema.parse(response);
  };

  return useQuery({
    queryKey: projectQueryKeys.detail(Number(id)),
    queryFn: getProjectFn,
  });
};
