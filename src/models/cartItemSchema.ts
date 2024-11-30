import { z } from 'zod';

export const cartItemSchema = z.object({
  id: z.number(),
  quantity: z.number().int().positive(),
  name: z.string().optional(),
  price: z.number().optional(),
  category: z.string().optional(),
  description: z.string().optional(),
  total_price: z.number().optional(),
});

export type CartItem = z.infer<typeof cartItemSchema>;