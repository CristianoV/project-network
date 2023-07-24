import styles from './styles.module.scss';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import Header from '../../../../components/header';
import FriendLeftSideBar from '../../../../components/friendLeftSideBar';
import Footer from '../../../../components/footer';
import store from '../../../../redux/store';
import { fetchUserData } from '../../../../redux/slices/user';
import {
  fetchProfileUserData,
  cleanUserData,
} from '../../../../redux/slices/profile';
import { useEffect } from 'react';
import FriendMessages from '../../../../components/friendMessages';
import FriendCreateMessage from '../../../../components/friendCreateMessage';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

interface HomeProps {
  token: string;
}

export default function Home({ token }: HomeProps) {
  const redux = useSelector((state: any) => state.profile);
  const { info, loading } = redux;
  const router = useRouter();
  const { id } = router.query;
  const { dispatch } = store;

  useEffect(() => {
    dispatch(fetchUserData(token));
    dispatch(fetchProfileUserData(String(id)));

    return () => {
      dispatch(cleanUserData());
    };
  }, [dispatch, id, token]);

  return (
    <>
      <Head>
        <title>
          {loading === 'succeeded'
            ? `${info?.firstName} ${info?.lastName} - Mensagem | Rede Social`
            : 'Rede Social'}
        </title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Header />
      <main className={styles.container}>
        <FriendLeftSideBar token={token} />
        <div className={styles.content}>
          <FriendCreateMessage token={token} />
          <FriendMessages token={token} />
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
