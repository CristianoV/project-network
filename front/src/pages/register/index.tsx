import styles from './styles.module.scss';
import logo from '../../../public/orkutLogo.png';
import { fetchFromApi } from '../../utils/axios';
import Image from 'next/image';
import Link from 'next/link';
import Head from 'next/head';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import ValidatePassword from '../../components/validatePassword';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const registerUserSchema = z
  .object({
    firstName: z
      .string()
      .min(3, { message: 'O primeiro nome deve ter no mínimo 3 caracteres' })
      .max(20, { message: 'O primeiro nome deve ter no máximo 20 caracteres' }),
    lastName: z
      .string()
      .min(3, { message: 'O último nome deve ter no mínimo 3 caracteres' })
      .max(20, { message: 'O último nome deve ter no máximo 20 caracteres' }),
    email: z
      .string()
      .nonempty({
        message: 'O e-mail é obrigatório',
      })
      .email({
        message: 'Formato de e-mail inválido',
      }),
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
    passwordConfirmation: z
      .string()
      .nonempty({
        message: 'A confirmação de senha é obrigatória',
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
    checked: z.boolean().refine((data) => data === true, {
      message: 'Você deve aceitar os termos de uso',
    }),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: 'As senhas devem ser iguais',
    path: ['passwordConfirmation'],
  });

type RegisterUserData = z.infer<typeof registerUserSchema>;

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    getValues,
    control,
    getFieldState,
  } = useForm<RegisterUserData>({
    resolver: zodResolver(registerUserSchema),
  });

  const router = useRouter();

  const createUser = async ({
    email,
    firstName,
    lastName,
    password,
    passwordConfirmation,
    checked,
  }: RegisterUserData) => {
    try {
      const { data } = await fetchFromApi.post('/register', {
        firstName,
        lastName,
        email,
        password,
      });

      if (data.token) {
        await fetch('/api/login', {
          method: 'post',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });

        router.push('/');
      }
    } catch (error) {}
  };
  return (
    <>
      <Head>
        <title>Cadastro - Rede Social</title>
      </Head>
      <div className={styles.container}>
        <div>
          <div>
            <Link href='/'>
              <Image src={logo} alt='logo' />
            </Link>
            <h2>
              Criar uma nova conta no <span>Orkut</span>
            </h2>
          </div>
          <form onSubmit={handleSubmit(createUser)}>
            <h3>
              Informações necessárias para o cadastro de uma nova conta no site
            </h3>
            <label htmlFor='firstName'>
              Nome:
              <input
                type='text'
                placeholder='Nome'
                id='firstName'
                {...register('firstName')}
                required
              />
            </label>
            {errors.firstName && (
              <span className={styles.error}>{errors.firstName.message}</span>
            )}
            <label htmlFor='lastName'>
              Sobrenome:
              <input
                type='text'
                placeholder='Sobrenome'
                id='lastName'
                {...register('lastName')}
                required
              />
            </label>
            {errors.lastName && (
              <span className={styles.error}>{errors.lastName.message}</span>
            )}
            <label htmlFor='email'>
              O seu endereço de email atual:
              <input
                type='text'
                placeholder='Email'
                id='email'
                {...register('email')}
                required
              />
            </label>
            {errors.email && (
              <span className={styles.error}>{errors.email.message}</span>
            )}
            <label htmlFor='password'>
              Escolha uma senha:
              <input
                type='password'
                placeholder='Senha'
                id='password'
                {...register('password')}
                required
              />
            </label>
            {errors.password && (
              <span className={styles.error}>{errors.password.message}</span>
            )}
            <ValidatePassword password={''} />
            <label htmlFor='passwordConfirmation'>
              Digite a senha novamente:
              <input
                type='password'
                placeholder='Senha'
                id='passwordConfirmation'
                {...register('passwordConfirmation')}
                required
              />
            </label>
            {errors.passwordConfirmation && (
              <span className={styles.error}>
                {errors.passwordConfirmation.message}
              </span>
            )}
            <ValidatePassword password={''} />
            <h3>Termos de uso e política de privacidade do site Orkut</h3>
            <h2>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Similique quibusdam optio tempore, dignissimos provident quae et
              magnam. Dolore explicabo ducimus ut reiciendis, aliquid, error
              totam, maxime excepturi natus deserunt nesciunt? Debitis unde
              perferendis nostrum neque voluptas natus! Fugit deleniti laborum
              fugiat sint recusandae, accusantium unde odit amet, libero soluta
              consequatur quasi, autem explicabo. Error rerum sed et nam,
              voluptatem vitae. In quasi vitae illum facilis veniam ex deleniti
              repellat voluptatum? Enim, voluptate error? Quis quas inventore
              minima, odio ab sed, nisi laborum ut eum incidunt, fugit
              voluptates expedita. Accusantium, asperiores? Alias nulla
              molestias est minima odio maiores eaque excepturi reiciendis
              repellendus esse. Repellendus saepe fuga itaque ut. Consequatur
              sunt doloribus sequi nisi cum adipisci accusamus voluptatem
              exercitationem qui in. Animi? Facere eius aut officiis accusantium
              reiciendis totam animi corporis dolorum omnis porro, expedita,
              praesentium doloribus quidem vel nihil sequi, explicabo quos
              beatae voluptatum. Repellat, molestiae iusto accusamus aliquam
              voluptate ipsum.
            </h2>
            <hr />
            <label htmlFor='privacy' id={styles.privacy}>
              <input type='checkbox' id='privacy' {...register('checked')} />
              <p>
                Eu li e concordo com os termos de uso e a política de
                privacidade
              </p>
            </label>
            {errors.checked && (
              <span className={styles.error}>{errors.checked.message}</span>
            )}
            <button type='submit'>Registrar</button>
          </form>
        </div>
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const token = req.cookies.token || '';

  if (token) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: {
      token,
    },
  };
};
