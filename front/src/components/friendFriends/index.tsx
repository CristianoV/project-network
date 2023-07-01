import styles from './styles.module.scss';
import { useSelector } from 'react-redux';
import Card from './cards';
import Link from 'next/link';

export default function Friends() {
  const redux = useSelector((state: any) => state.profile);
  const friends = redux.friends;

  return (
    <div className={styles.container}>
      <h2>
        meus amigos <span>({friends.length})</span>
      </h2>
      <div className={styles.cards}>
        {friends.length > 0 ? (
          friends.map(({ friend }: any, index: number) => {
            if (index < 6) {
              return <Card key={friend.id} friend={friend} />;
            }
          })
        ) : (
          <p className={styles.notFound}>
            Esta pessoa ainda não tem amigos :(
          </p>
        )}
      </div>
      <hr />
    </div>
  );
}
