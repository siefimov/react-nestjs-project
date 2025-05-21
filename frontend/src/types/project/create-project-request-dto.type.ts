import type { Project } from './project.type';

export type CreateProjectRequestDto = Pick<
  Project,
  'title' | 'description' | 'ownerId'
>;
