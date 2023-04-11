import styles from '../../styles/Home.module.scss';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import Header from '../../components/header';
import LeftSideBar from '../../components/leftSideBar';
import Profile from '../../components/profile';
import Friends from '../../components/friends';
import Community from '../../components/community';
import Footer from '../../components/footer';
import store from '../../redux/store';
import { fetchUserById } from '../../redux/slices/user';
import { fetchFriendsById } from '../../redux/slices/friends';
import { fetchGroupsById } from '../../redux/slices/groups';
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
        <title>Perfil - Rede Social</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Header />
      <main className={styles.container}>
        <LeftSideBar />
        <div>
          <Profile token={token} />
        </div>
        <div>
          <Friends />
          <Community />
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
