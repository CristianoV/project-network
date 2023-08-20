import styles from './styles.module.scss';
import gif from '../../../public/Imagens/404 Error (2).gif';
import Image from 'next/image';
import { useEffect } from 'react';
import Head from 'next/head';

export default function Custom404() {
  useEffect(() => {
    setTimeout(() => {
      window.location.href = '/';
    }, 5000);
  }, []);

  return (
    <>
      <Head>
        <title>404 - Página não encontrada</title>
      </Head>
      <div className={styles.container}>
        <Image src={gif} alt='imagem de um foguete com o numero 404' />
        <h1>Página não encontrada</h1>
        <p>
          A página que você está procurando pode ter sido removida ou o nome
          dela pode ter sido alterado ou ela pode estar temporariamente
          indisponível
        </p>
      </div>
    </>
  );
}
