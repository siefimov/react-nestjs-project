import { z } from 'zod';

export const UserSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string().email(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const UserCreateSchema = UserSchema.pick({
  name: true,
  email: true,
});

export type User = z.infer<typeof UserSchema>;
export type UserCreateDto = z.infer<typeof UserCreateSchema>;
