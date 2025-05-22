import type { Project } from './project.type';

export type CreateProjectRequestDto = Partial<
  Pick<Project, 'title' | 'description' | 'ownerId'>
>;
