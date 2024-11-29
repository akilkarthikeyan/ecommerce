import { z } from 'zod';

export const productSchema = z.object({
    id: z.number().optional(),
    name: z.string(),
    description: z.string().optional(),
    category: z.string(),
    price: z.number(),
    stock: z.number().positive(),
    created_at: z.string().optional(),
    updated_at: z.string().optional()
});

export type Product = z.infer<typeof productSchema>;

