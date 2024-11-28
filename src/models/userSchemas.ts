import { z } from 'zod';

export const userSignUpSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(8, "Password should be at least 8 characters"),
});

export const userLoginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8, "Password should be at least 8 characters"),
});

export const userSchema = z.object({
    id: z.string(),
    name: z.string(),
    email: z.string().email(),
    role: z.string(),
    password_hash: z.string(),
    created_at: z.string(),
    updated_at: z.string(),
});

export type UserSignUp = z.infer<typeof userSignUpSchema>;
export type UserLogin = z.infer<typeof userLoginSchema>;
export type User = z.infer<typeof userSchema>;
