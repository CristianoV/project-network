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
import NewTestimony from '../../components/newTestimony';
import NewFriends from '../../components/newFriends';
import ListTestimony from '../../components/listTestimony';
import { fetchUserData } from '../../redux/slices/user';
import { useEffect } from 'react';

interface HomeProps {
  token: string;
}

export default function Home({ token }: HomeProps) {
  const { dispatch } = store;

  useEffect(() => {
    dispatch(fetchUserData(token));
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
          <NewFriends token={token} />
          <NewTestimony token={token} />
          <ListTestimony token={token} />
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
