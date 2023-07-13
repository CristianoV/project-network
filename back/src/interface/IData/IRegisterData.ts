import { z } from 'zod';

export const registerSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .nonempty({
      message: 'A senha é obrigatória',
    })
    .min(8, {
      message: 'A senha deve ter no mínimo 8 caracteres',
    })
    .regex(/[A-Z]/, {
      message: 'A senha deve ter no mínimo 1 letra maiúscula',
    })
    .regex(/[a-z]/, {
      message: 'A senha deve ter no mínimo 1 letra minúscula',
    })
    .regex(/[0-9]/, {
      message: 'A senha deve ter no mínimo 1 número',
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
