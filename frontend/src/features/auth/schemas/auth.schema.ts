import { z } from 'zod';

export const AuthRegisterSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(6),
});

export const AuthLoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const AuthUserSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string().email(),
});

export const AuthResponseSchema = z.object({
  access_token: z.string(),
  user: AuthUserSchema,
});

export type AuthRegisterDto = z.infer<typeof AuthRegisterSchema>;
export type AuthLoginDto = z.infer<typeof AuthLoginSchema>;
export type AuthUserDto = z.infer<typeof AuthUserSchema>;
export type AuthResponseDto = z.infer<typeof AuthResponseSchema>;
