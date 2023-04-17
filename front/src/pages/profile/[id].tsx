import styles from '../../styles/Home.module.scss';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import Header from '../../components/header';
import FriendLeftSideBar from '../../components/friendLeftSideBar';
import FriendProfile from '../../components/friendProfile';
import FriendFriends from '../../components/friendFriends';
import FriendCommunity from '../../components/friendCommunity';
import store from '../../redux/store';
import { fetchProfileUserData } from '../../redux/slices/profile';
import { fetchUserData } from '../../redux/slices/user';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Footer from '../../components/footer';

interface HomeProps {
  token: string;
}

export default function Home({ token }: HomeProps) {
  const router = useRouter();
  const { id } = router.query;
  const { dispatch } = store;

  useEffect(() => {
    dispatch(fetchUserData(token));
    dispatch(fetchProfileUserData(String(id)));
  }, [dispatch, id, token]);

  return (
    <>
      <Head>
        <title>Rede Social</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Header />
      <main className={styles.container}>
        <FriendLeftSideBar token={token} />
        <div>
          <FriendProfile token={token} />
        </div>
        <div>
          <FriendFriends />
          <FriendCommunity />
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
