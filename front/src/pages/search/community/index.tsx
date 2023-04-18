import styles from '../styles.module.scss';
import Head from 'next/head';
import Header from '../../../components/header';
import Footer from '../../../components/footer';
import SearchComponent from '../../../components/search';
import { GetServerSideProps } from 'next';
import store from '../../../redux/store';
import { fetchUserData } from '../../../redux/slices/user';
import { useEffect } from 'react';

interface SearchProps {
  token: string;
}

export default function Search({ token }: SearchProps) {
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
        <div>
          <SearchComponent />
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
