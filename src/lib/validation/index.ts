import { z } from "zod";

export const SignupValidation = z.object({
    email: z.string().email(),
    name: z.string().min(2, {message: 'Too short'}),
    username: z.string().min(2, {message: 'Too short'}),
    password: z.string().min(8, {message: 'Password must be at least 8 characters'})
})