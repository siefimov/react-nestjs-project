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

export const UserRegisterSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(6),
});

export const UserLoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export type User = z.infer<typeof UserSchema>;
export type UserCreateDto = z.infer<typeof UserCreateSchema>;
export type UserRegisterDto = z.infer<typeof UserRegisterSchema>;
export type UserLoginDto = z.infer<typeof UserLoginSchema>;
