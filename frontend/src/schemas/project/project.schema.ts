import { z } from 'zod';
import { UserSchema } from '../user';

export const ProjectCreateSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
  ownerId: z.number().int().min(1, 'Owner is required'),
});

export const ProjectUpdateSchema = ProjectCreateSchema.partial().extend({
  id: z.number().int().min(1, 'Title is required'),
});

export const ProjectResponseSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string().nullable(),
  ownerId: z.number(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const ProjectWithOwnerSchema = ProjectResponseSchema.extend({
  owner: UserSchema,
});

export type ProjectCreateDto = z.infer<typeof ProjectCreateSchema>;
export type ProjectUpdateDto = z.infer<typeof ProjectUpdateSchema>;
export type ProjectResponseDto = z.infer<typeof ProjectResponseSchema>;
export type ProjectWithOwner = z.infer<typeof ProjectWithOwnerSchema>;
