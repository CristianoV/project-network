import styles from './styles.module.scss';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import 'moment/locale/pt-br';

export default function Profile() {
  const redux = useSelector((state: any) => state.community);
  const { info, members, loading } = redux;

  return (
    <div className={styles.container}>
      <h1>{info?.name}</h1>
      <nav>
        <Link href='/'>Inicio</Link>
        {'>'}
        <Link href='/community'>comunidades</Link>
        {'>'}
        <p>{info?.name}</p>
      </nav>
      <div className={styles.social}>
        <main>
          <div className={styles.text}>
            <p>descrição:</p>
            <span>{info?.description}</span>
          </div>
          <div className={styles.text}>
            <p>idioma:</p>
            <span>{info?.language}</span>
          </div>
          <div className={styles.text}>
            <p>categoria:</p>
            <span>{info?.category}</span>
          </div>
          <div className={styles.text}>
            <p>dono:</p>
            <span>
              <Link href={`/profile/${info?.user?.id}`}>
                {info?.user?.firstName} {info?.user?.lastName}
              </Link>
            </span>
          </div>
          <div className={styles.text}>
            <p>tipo:</p>
            <span>{info?.type}</span>
          </div>
          <div className={styles.text}>
            <p>local:</p>
            <span>{info?.country}</span>
          </div>
          <div className={styles.text}>
            <p>criado em:</p>
            <span></span>
          </div>
          <div className={styles.text}>
            <p>membros:</p>
            <span>{members.length}</span>
          </div>
        </main>
      </div>
    </div>
  );
}
