import type { Project } from './project.type';

export type UpdateProjectRequestDto = {
  id: Project['id'];
} & Partial<Pick<Project, 'title' | 'description'>>;
