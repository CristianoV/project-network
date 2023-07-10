import styles from './styles.module.scss';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import Header from '../../components/header';
import Footer from '../../components/footer';
import store from '../../redux/store';
import { fetchUserData } from '../../redux/slices/user';
import { useEffect } from 'react';
import mario from '../../../public/Imagens/Mario/mario_thumbnail.jpeg';
import trivia from '../../../public/Imagens/Trivia/trivia_thumbnail.png';
import Image from 'next/image';
import Link from 'next/link';

interface GameProps {
  token: string;
}

export default function Game({ token }: GameProps) {
  const { dispatch } = store;

  useEffect(() => {
    dispatch(fetchUserData(token));
  }, [dispatch, token]);

  return (
    <>
      <Head>
        <title>Rede Social</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Header />
      <main className={styles.container}>
        <h1 className={styles.title}>
          <strong>Jogos</strong>
        </h1>
        <p className={styles.breadcrumb}>
          <Link href='/'>Ínicio</Link> {'>'} <strong>Jogos</strong>
        </p>
        <div className={styles.gamesContainer}>
          <div className={styles.gameImage}>
            <Link href='/game/mario'>
              <Image src={mario} alt='imagem do jogo do Mario' />
              <h1>
                <strong>Mario</strong>
              </h1>
              <p>
                <strong>Plataforma</strong>
              </p>
            </Link>
          </div>
          <div className={styles.gameImage}>
            <Link href='/game/trivia'>
              <Image src={trivia} alt='imagem de um jogo de Trivia' />
              <h1>
                <strong>Trivia</strong>
              </h1>
              <p>
                <strong>Quiz</strong>
              </p>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const token = req.cookies.token || '';

  if (!token) {
    return {
      redirect: {
        destination: '/login',
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
