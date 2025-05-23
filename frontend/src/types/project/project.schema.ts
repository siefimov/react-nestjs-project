import { z } from 'zod';

export const createProjectSchema = z.object({
  title: z.string().min(1, 'Title is required').max(100, 'Max 100 chars'),
  description: z.string().nullable().optional(),
  ownerId: z.number().min(1, 'Owner ID is required'),
});

