import styles from './styles.module.scss';
import Head from 'next/head';
import { GetServerSideProps } from 'next';
import LeftSideBar from '../../../components/leftSideBar';
import Header from '../../../components/header';
import Footer from '../../../components/footer';
import Edit from '../../../components/edit';
import { useEffect } from 'react';
import { fetchUserById } from '../../../redux/slices/user';
import store from '../../../redux/store';

interface EditProfileProps {
  token: string;
}

export default function EditProfile({ token }: EditProfileProps) {
  const { dispatch } = store;

  useEffect(() => {
    dispatch(fetchUserById(token));
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
          <Edit />
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
