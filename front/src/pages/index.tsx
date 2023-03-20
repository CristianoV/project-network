import { GetServerSideProps } from 'next';
import Head from 'next/head';

export default function Home() {
  return (
    <>
      <Head>
        <title>Rede Social</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main></main>
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
