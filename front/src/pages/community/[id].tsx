import Head from 'next/head';
import Header from '../../components/header';
import styles from '../../styles/Home.module.scss';
import CommunityLeftSideBar from '../../components/communityLeftSideBar';
import CommunityDescription from '../../components/communityDescription';
import CommunityMembers from '../../components/communityMembers';
import {
  fetchProfileUserData,
  cleanUserData,
} from '../../redux/slices/community';
import { fetchUserData } from '../../redux/slices/user';
import store from '../../redux/store';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { GetServerSideProps } from 'next';
import { useSelector } from 'react-redux';

interface CommunityPageProps {
  token: string;
}

export default function CommunityPage({ token }: CommunityPageProps) {
  const redux = useSelector((state: any) => state.community);
  const { info, members } = redux;
  const router = useRouter();
  const { id } = router.query;

  const { dispatch } = store;

  useEffect(() => {
    if (id) {
      dispatch(fetchUserData(token));
      dispatch(fetchProfileUserData(String(id)));
    }

    return () => {
      dispatch(cleanUserData());
    };
  }, [dispatch, id, token]);

  return (
    <>
      <Head>
        <title>
          {info?.name ? info?.name + ' - Rede Social' : 'Rede Social'}
        </title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Header />
      <main className={styles.container}>
        <CommunityLeftSideBar token={token} />
        <div>
          <CommunityDescription />
        </div>
        <div>
          <CommunityMembers />
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
