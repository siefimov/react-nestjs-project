import { z } from 'zod';

export const TaskStatusEnum = z.enum(['todo', 'in_progress', 'done']);

export const TaskSchema = z.object({
  id: z.number(),
  title: z.string().max(100),
  description: z.string().nullable(),
  projectId: z.number(),
  assignedUserId: z.number().nullable(),
  status: TaskStatusEnum,
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export const TaskCreateSchema = z.object({
  title: z.string().max(100),
  description: z.string().nullable().optional(),
  projectId: z.number().optional(),
  assignedUserId: z.number().nullable().optional(),
  status: TaskStatusEnum,
});

export const TaskUpdateSchema = TaskCreateSchema.partial();

export type Task = z.infer<typeof TaskSchema>;
