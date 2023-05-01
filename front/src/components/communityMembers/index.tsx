import styles from './styles.module.scss';
import { useSelector } from 'react-redux';
import Card from './cards';
import Link from 'next/link';

export default function Friends() {
  const redux = useSelector((state: any) => state.community);
  const { info, members } = redux;

  return (
    <div className={styles.container}>
      <h2>
        membros <span>({members.length})</span>
      </h2>
      <div className={styles.cards}>
        {members.length > 0 &&
          members.map(({ user }: any, index: number) => {
            if (index < 6) {
              return <Card key={user.id} friend={user} />;
            }
          })}
      </div>
      <hr />
      <Link href='/communities' className={styles.link}>
        ver todos
      </Link>
    </div>
  );
}
