import Head from 'next/head';
import Header from '../../../components/header';
import CreateCommunity from '../../../components/createCommunity';
import styles from './styles.module.scss';
import Footer from '../../../components/footer';
import { GetServerSideProps } from 'next';

interface ICreateCommunityProps {
  token: string;
}

export default function createCommunity({ token }: ICreateCommunityProps) {
  return (
    <>
      <Head>
        <title>Rede Social</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Header />
      <main className={styles.container}>
        <div>
          <CreateCommunity token={token} />
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
