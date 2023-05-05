import styles from './styles.module.scss';
import Link from 'next/link';
import { useSelector } from 'react-redux';

export default function DescriptionCommunity() {
  const redux = useSelector((state: any) => state.user);
  const { groups } = redux;

  return (
    <div className={styles.container}>
      <h2>Comunidades</h2>
      <nav>
        <Link href='/'>Ínicio</Link>
        <p>{'>'} Comunidades</p>
      </nav>
      {groups.length === 0 && (
        <div className={styles.text}>
          <p>
            Compartilhe suas paixões. Conheça pessoas que tem interesses em
            comum. Troque idéias, Planeje eventos...
          </p>
          <p>
            Você pode pesquisar comunidades ou criar a sua própria comunidade.
          </p>
        </div>
      )}
      {groups.length > 0 && (
        <div className={styles.groups}>
          <nav>
            <h2 className={styles.selected}>Todos ({groups.length})</h2>
            <h2>Comunidades que sou dono</h2>
            <h2>Pendentes</h2>
          </nav>
          <hr />
          <div>
            {groups.map(({ group }: any, index: number) => {
              return (
                <Link
                  href={`/community/${group.id}`}
                  key={index}
                  className={styles.cards}
                >
                  <div key={group.id}>
                    <p>{group.name}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
