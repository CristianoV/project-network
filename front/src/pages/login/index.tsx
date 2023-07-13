import logo from '../../../public/orkutLogo.png';
import styles from './styles.module.scss';
import Image from 'next/image';
import Head from 'next/head';
import Link from 'next/link';
import { fetchFromApi } from '../../utils/axios';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import { set, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const loginUserSchema = z.object({
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
});

type LoginUserData = z.infer<typeof loginUserSchema>;

export default function Login() {
  const [errorLogin, setErrorLogin] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<LoginUserData>({
    resolver: zodResolver(loginUserSchema),
  });
  const router = useRouter();

  async function createUser({ email, password }: LoginUserData) {
    try {
      setErrorLogin(false);
      const { data } = await fetchFromApi.post('/login', {
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
    } catch (error) {
      console.error(error);
      reset();
      setErrorLogin(true);
    }
  }

  return (
    <>
      <Head>
        <title>Login - Rede Social</title>
      </Head>
      <div>
        <div className={styles.header}>
          <span>Aviso:</span>o site não tem vínculo com o Google e é apenas um
          clone para fins de estudo.
        </div>
        <div className={styles.container}>
          <div className={styles.contentContainer}>
            <Image src={logo} alt='logo' />
            <div>
              <p>
                <span>Conecte-se</span> aos seus amigos e familiares usando
                recados e mensagens instantâneas
              </p>
              <p>
                <span>Conheça</span> novas pessoas através de amigos de seus
                amigos e comunidades
              </p>
              <p>
                <span>Compartilhe</span> seus vídeos, fotos e paixões em um só
                lugar
              </p>
            </div>
          </div>
          <div className={styles.userContainer}>
            <div className={styles.loginBox}>
              <p>
                Acesse o <strong>Orkut.br</strong> com a sua conta
              </p>
              <form onSubmit={handleSubmit(createUser)}>
                <label htmlFor=''>
                  E-mail:
                  <input type='email' id='email' {...register('email')} />
                </label>
                {errors.email && (
                  <span className={styles.error}>{errors.email.message}</span>
                )}
                <label htmlFor=''>
                  Senha:
                  <input
                    type='password'
                    id='password'
                    {...register('password')}
                  />
                </label>
                {errors.password && (
                  <span className={styles.error}>
                    {errors.password.message}
                  </span>
                )}
                {errorLogin && (
                  <span className={styles.error}>
                    email ou senha inválidos. Tente novamente.
                  </span>
                )}
                <label htmlFor='save' id={styles.check}>
                  <input type='checkbox' name='' id='save' />
                  Salvar as minhas informações neste computador
                </label>
                <p id={styles.check}>Não use em computadores públicos [?]</p>
                <button type='submit'>Entrar</button>
              </form>
              <p>
                <a href='#'>Não consegue acessar a sua conta?</a>
              </p>
            </div>
            <div className={styles.registerBox}>
              <p>Ainda não é membro?</p>
              <Link href='/register'>Entrar já</Link>
            </div>
          </div>
        </div>
        <div className={styles.footer}>
          <p>@ 2023 Orkut.br</p>-<a href='#'>Sobre o Orkut.br</a>-
          <a href='#'>Centro de segurança</a>-<a href='#'>Privacidade</a>-
          <a href='#'>Termos - Contatos</a>
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
