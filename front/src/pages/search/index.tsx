import { useRouter } from 'next/router';
import styles from '../../styles/Home.module.scss';
import Head from 'next/head';
import Header from '../../components/header';
import Footer from '../../components/footer';

export default function Search() {
  const router = useRouter();
  const { search } = router.query;

  return (
    <>
      <Head>
        <title>Rede Social</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Header />
      <main className={styles.container}>
        <div>
          <h1>Search</h1>
          <p>Search query: {search}</p>
        </div>
      </main>
      <Footer />
    </>
  );
}
