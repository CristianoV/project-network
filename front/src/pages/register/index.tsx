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

export default function Register() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [checked, setChecked] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (password !== passwordConfirmation || !checked) {
        setError('As senhas não conferem ou você não aceitou os termos de uso');
        return;
      }
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
    } catch (error) {
      console.error(error);
    } finally {
      if (password !== passwordConfirmation || !checked) {
        setPassword('');
        setPasswordConfirmation('');
      }
      setChecked(false);
    }
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
          <form onSubmit={handleSubmit}>
            <h3>
              Informações necessárias para o cadastro de uma nova conta no site
            </h3>
            <label htmlFor='firstName'>
              Nome:
              <input
                type='text'
                placeholder='Nome'
                id='firstName'
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </label>
            <label htmlFor='lastName'>
              Sobrenome:
              <input
                type='text'
                placeholder='Sobrenome'
                id='lastName'
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </label>
            <label htmlFor='email'>
              O seu endereço de email atual:
              <input
                type='text'
                placeholder='Email'
                id='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </label>
            <label htmlFor='password'>
              Escolha uma senha:
              <input
                type='password'
                placeholder='Senha'
                id='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </label>
            <ValidatePassword password={password} />
            <label htmlFor='passwordConfirmation'>
              Digite a senha novamente:
              <input
                type='password'
                placeholder='Senha'
                id='passwordConfirmation'
                value={passwordConfirmation}
                onChange={(e) => setPasswordConfirmation(e.target.value)}
                required
              />
            </label>
            <ValidatePassword password={passwordConfirmation} />
            <hr />
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
              <input
                type='checkbox'
                id='privacy'
                onChange={() => setChecked(!checked)}
                checked={checked}
                required
              />
              <p>
                Eu li e concordo com os termos de uso e a política de
                privacidade
              </p>
            </label>
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
