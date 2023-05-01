import styles from './styles.module.scss';
import Link from 'next/link';

export default function DescriptionCommunity() {
  return (
    <div className={styles.container}>
      <h2>Comunidades</h2>
      <nav>
        <Link href='/'>Ínicio</Link>
        <p>{'>'} Comunidades</p>
      </nav>
      <div className={styles.text}>
        <p>
          Compartilhe suas paixões. Conheça pessoas que tem interesses em comum.
          Troque idéias, Planeje eventos...
        </p>
        <p>
          Você pode pesquisar comunidades ou criar a sua própria comunidade.
        </p>
      </div>
    </div>
  );
}
