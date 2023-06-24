import styles from './styles.module.scss';
import { useSelector } from 'react-redux';
import Card from './cards';
import Link from 'next/link';

export default function Friends() {
  const redux = useSelector((state: any) => state.user);
  const { groups } = redux;

  return (
    <div className={styles.container}>
      <h2>
        minhas comunidades <span>({groups.length})</span>
      </h2>
      <div className={styles.cards}>
        {groups.length > 0 &&
          groups.map(({ group }: any, index: number) => {
            if (index < 6) {
              return <Card key={group.id} group={group} />;
            }
          })}
      </div>
      <hr />
      <Link href='/community' className={styles.link}>
        ver todos
      </Link>
    </div>
  );
}
