import Header from '../../components/header';
import styles from '../../styles/Home.module.scss';
import LeftSideBar from '../../components/leftSideBar';
import Footer from '../../components/footer';
import store from '../../redux/store';
import { fetchUserData } from '../../redux/slices/user';
import { useEffect } from 'react';
import Head from 'next/head';
import { GetServerSideProps } from 'next';

export default function Community({ token }: any) {
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
        <LeftSideBar />
        <div></div>
        <div></div>
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
