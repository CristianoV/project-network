import { z } from 'zod';

export const registerSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8)
    .regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z$*&@#]{8,}$/, {
      message: 'model must be alphanumeric',
    }),
    firstName: z.string().min(3).max(20),
    lastName: z.string().min(3).max(20),
});

export type IRegisterrData = z.infer<typeof registerSchema>;
