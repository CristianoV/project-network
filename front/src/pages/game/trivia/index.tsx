import Footer from '../../../components/footer';
import Header from '../../../components/header';
import styles from './styles.module.scss';
import store from '../../../redux/store';
import Head from 'next/head';
import { fetchUserData } from '../../../redux/slices/user';
import { GetServerSideProps } from 'next';
import { useEffect } from 'react';

interface TriviaProps {
  token: string;
}

export default function Trivia({ token }: TriviaProps) {
  const { dispatch } = store;

  useEffect(() => {
    dispatch(fetchUserData(token));
  }, [dispatch, token]);

  return (
    <>
      <Head>
        <title>
          Trivia | Rede Social
        </title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <div className={styles.container}>
        <Header />
        <div className={styles.gameContainer}>
          <iframe src='https://game-trivia-gules.vercel.app/' />
        </div>
        <Footer />
      </div>
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
