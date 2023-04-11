import { z } from 'zod';

export const registerSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters' })
    .regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z$*&@#]{8,}$/, {
      message: 'model must be alphanumeric',
    }),
  firstName: z
    .string()
    .min(3, { message: 'firstName must be at least 3 characters' })
    .max(20, { message: 'First name is too long' }),
  lastName: z
    .string()
    .min(3, { message: 'lastName must be at least 3 characters' })
    .max(20, { message: 'Last name is too long' }),
});

export type IRegisterrData = z.infer<typeof registerSchema>;
