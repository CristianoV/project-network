import { MarioGame } from '../../../components/MarioGame';
import Footer from '../../../components/footer';
import Header from '../../../components/header';
import styles from './styles.module.scss';
import store from '../../../redux/store';
import { fetchUserData } from '../../../redux/slices/user';
import { IoChevronBackCircleOutline } from 'react-icons/io5';
import { GetServerSideProps } from 'next';
import { useEffect } from 'react';
import Link from 'next/link';
import Head from 'next/head';

interface MarioProps {
  token: string;
}

export default function Mario({ token }: MarioProps) {
  const { dispatch } = store;

  useEffect(() => {
    dispatch(fetchUserData(token));
  }, [dispatch, token]);

  return (
    <>
      <Head>
        <title>Mario | Rede Social</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <div className={styles.container}>
        <Header />
        <Link href='/game' className={styles.backButton}>
          <IoChevronBackCircleOutline size={40} /> Voltar
        </Link>
        <div className={styles.gameContainer}>
          <MarioGame />
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
