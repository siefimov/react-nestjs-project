import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router';
import { http } from '../../shared/lib/api/http';
import { projectQueryKeys } from './project-query-keys';
import { ProjectResponseSchema, type ProjectResponseDto } from '../../schemas';
import { API_ROUTES } from '../../shared/constants';

export const useProject = () => {
  const { id } = useParams();

  const getProjectFn = async () => {
    const response = await http.get<ProjectResponseDto>(
      API_ROUTES.PROJECT(Number(id)),
      { withAuth: true },
    );
    return ProjectResponseSchema.parse(response);
  };

  return useQuery({
    queryKey: projectQueryKeys.detail(Number(id)),
    queryFn: getProjectFn,
  });
};
