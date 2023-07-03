import styles from '../styles/Home.module.scss';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import Header from '../components/header';
import LeftSideBar from '../components/leftSideBar';
import Welcome from '../components/welcome';
import Friends from '../components/friends';
import Community from '../components/community';
import NewFriends from '../components/newFriends';
import Footer from '../components/footer';
import store from '../redux/store';
import {fetchUserData} from '../redux/slices/user';
import { useEffect } from 'react';
import CreatePost from '../components/createPost';
import FeedPosts from '../components/feedPosts';

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
        <title>Rede Social</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Header />
      <main className={styles.container}>
        <LeftSideBar />
        <div>
          <Welcome />
          <NewFriends token={token} />
          <CreatePost token={token} />
          <FeedPosts />
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
