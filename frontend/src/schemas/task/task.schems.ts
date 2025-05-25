import { z } from 'zod';

export const TaskStatusEnum = z.enum(['todo', 'in_progress', 'done']);

export const TaskSchema = z.object({
  id: z.number(),
  title: z.string().min(1).max(100),
  description: z.string().nullable(),
  projectId: z.number(),
  assignedUserId: z.number().nullable(),
  status: TaskStatusEnum,
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export const TaskCreateSchema = z.object({
  title: z.string().min(1).max(100),
  description: z.string().nullable().optional(),
  projectId: z.number().optional(),
  assignedUserId: z.number().nullable().optional(),
  status: TaskStatusEnum,
});

export const TaskUpdateSchema = TaskCreateSchema.omit({
  projectId: true,
})
  .partial()
  .extend({
    id: z.number().int().min(1, 'ID is required'),
  });

export type Task = z.infer<typeof TaskSchema>;
export type TaskUpdateDto = z.infer<typeof TaskUpdateSchema>;
export type TaskCreateDto = z.infer<typeof TaskCreateSchema>;
