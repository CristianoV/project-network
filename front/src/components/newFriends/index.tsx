import styles from './styles.module.scss';
import Card from './card';
import { fetchFromApi } from '../../utils/axios';
import { useEffect, useState } from 'react';
import Link from 'next/link';

interface NewFriendsProps {
  token: string;
}

export default function NewFriends({ token }: NewFriendsProps) {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    try {
      const result = async () => {
        const result = await fetchFromApi.get('/friend/requests', {
          headers: {
            Authorization: token,
          },
        });
        setRequests(result.data);
      };
      result();
    } catch (error) {
      console.log(error);
    }
  }, [token]);

  if (requests.length > 0) {
    return (
      <div className={styles.container}>
        <p>Novos pedidos de amizades ({requests.length})</p>
        {requests.map(({ friend }, index) => {
          if (index < 3) {
            return <Card key={index} obj={friend} token={token} />;
          }
        })}
        {requests.length > 3 && <Link href='/friends'>Ver todos</Link>}
      </div>
    );
  }
  return (
    <div className={styles.container}>Não há novos pedidos de amizade</div>
  );
}
