import type { Project } from './project.type';

export type UpdateProjectResponseDto = Omit<Project, 'owner'>;
