import type { Project } from './project.type';

export type CreateProjectResponseDto = Omit<Project, 'owner'>;
