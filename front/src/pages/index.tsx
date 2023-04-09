import styles from '../styles/Home.module.scss';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import Header from '../components/header';
import LeftSideBar from '../components/leftSideBar';
import Welcome from '../components/welcome';
import Friends from '../components/friends';
import Community from '../components/community';
import store from '../redux/store';
import { fetchUserById } from '../redux/slices/user';
import { fetchFriendsById } from '../redux/slices/friends';
import { fetchGroupsById } from '../redux/slices/groups';
import { useEffect } from 'react';

interface HomeProps {
  token: string;
}

export default function Home({ token }: HomeProps) {
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
        <LeftSideBar />
        <div>
          <Welcome />
        </div>
        <div>
          <Friends />
          <Community />
        </div>
      </main>
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
