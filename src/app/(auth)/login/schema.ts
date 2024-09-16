import { z } from 'zod';

export const signinFormSchema = z.object({
  name: z.string().min(3).max(20),
  password: z.string().min(8),
});
