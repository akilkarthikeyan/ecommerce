import { z } from 'zod';

export const cartItemSchema = z.object({
  id: z.number(),
  quantity: z.number().int().positive(),
});

export type CartItem = z.infer<typeof cartItemSchema>;