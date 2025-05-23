import { z } from 'zod';
import { createProjectSchema } from './project.schema';

export type NewProjectFormValues = z.infer<typeof createProjectSchema>;
