import { z } from 'zod';

export const userSignUpSchema = z.object({
    username: z.string(),
    email: z.string().email(),
    password: z.string().min(8, "Password should be at least 8 characters"),
});

export const userLoginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8, "Password should be at least 8 characters"),
});

export type UserSignUp = z.infer<typeof userSignUpSchema>;
export type UserLogin = z.infer<typeof userLoginSchema>;
