import styles from './styles.module.scss';
import Head from 'next/head';
import Header from '../../components/header';
import Footer from '../../components/footer';
import SearchComponent from '../../components/search';
import { GetServerSideProps } from 'next';
import store from '../../redux/store';
import { fetchUserById } from '../../redux/slices/user';
import { fetchFriendsById } from '../../redux/slices/friends';
import { fetchGroupsById } from '../../redux/slices/groups';
import { useEffect } from 'react';

interface SearchProps {
  token: string;
}

export default function Search({ token }: SearchProps) {
  const { dispatch } = store;

  useEffect(() => {
    dispatch(fetchUserById(token));
    dispatch(fetchFriendsById(token));
    dispatch(fetchGroupsById(token));
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
