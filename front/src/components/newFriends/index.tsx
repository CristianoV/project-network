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
  const [quantity, setQuantity] = useState(3);

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
      console.error(error);
    }
  }, [token]);

  if (requests.length > 0) {
    return (
      <div className={styles.container}>
        <p>Novos pedidos de amizades ({requests.length})</p>
        {requests.map(({ friend, id }, index) => {
          if (index < quantity) {
            return (
              <Card key={index} obj={friend} token={token} requestId={id} />
            );
          }
        })}
        {requests.length <= 3 ? null : quantity < requests.length ? (
          <button
            onClick={() => setQuantity(quantity + 2)}
            className={styles.button}
          >
            Ver mais
          </button>
        ) : (
          <button className={styles.button} onClick={() => setQuantity(3)}>
            Ver menos
          </button>
        )}
      </div>
    );
  }
  return (
    <div className={styles.container}>Não há novos pedidos de amizade</div>
  );
}
