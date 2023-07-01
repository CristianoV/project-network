import { useSelector } from 'react-redux';
import Card from '../friendCard';
import styles from './styles.module.scss';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function AllFriends() {
  const [search, setSearch] = useState('');
  const [filteredFriends, setFilteredFriends] = useState([]);
  const redux = useSelector((state: any) => state.user);
  const { friends } = redux;

  useEffect(() => {
    const filtered = friends.filter(({ friend }: any) => {
      return friend.firstName.toLowerCase().includes(search.toLowerCase());
    });

    setFilteredFriends(filtered);
  }, [search, friends]);

  return (
    <div className={styles.container}>
      <h2>Amigos</h2>
      <nav>
        <Link href='/'>Ínicio</Link>
        <p>{'>'} Amigos</p>
      </nav>

      <input
        type='text'
        placeholder='Pesquisar'
        onChange={(e) => setSearch(e.target.value)}
      />
      <section>
        <div className={styles.cards}>
          {filteredFriends.map(({ friend }: any) => (
            <Card key={friend.id} friend={friend} />
          ))}
          {friends.length === 0 && (
            <p className={styles.notFound}>
              Você ainda não adicionou nenhum amigo
            </p>
          )}
        </div>
      </section>
    </div>
  );
}
