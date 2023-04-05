import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8)
    .regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z$*&@#]{8,}$/, {
      message: 'model must be alphanumeric',
    }),
});

export type ILoginData = z.infer<typeof loginSchema>;
