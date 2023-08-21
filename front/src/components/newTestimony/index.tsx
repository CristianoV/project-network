import styles from './styles.module.scss';
import Card from './card';
import { fetchFromApi } from '../../utils/axios';
import { useEffect, useState } from 'react';

interface NewFriendsProps {
  token: string;
}

export interface RootObject {
  messages: Message[];
  total: number;
}

export interface Message {
  id: number;
  from: number;
  to: number;
  message: string;
  status: string;
  created_at: string;
  updated_at: string;
  fromUser: FromUser;
  toUser: FromUser;
}

export interface FromUser {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  bio: string;
  profile_picture?: any;
  birthday: string;
  relationship: string;
  country: string;
  phrase?: any;
  sex: string;
  cep: string;
  state: string;
  language: string;
}

export default function NewFriends({ token }: NewFriendsProps) {
  const [requests, setRequests] = useState<RootObject>({ messages: [], total: 0 });
  const [quantity, setQuantity] = useState(3);

  useEffect(() => {
    try {
      const result = async () => {
        const result = await fetchFromApi.get('/testimony/pending', {
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

  if (requests.total > 0) {
    return (
      <div className={styles.container}>
        <p>Novos depoimentos ({requests.total})</p>
        {requests.messages.map((messages, index) => {
          if (index < quantity) {
            return (
              <Card key={index} obj={messages} token={token} requestId={messages.id} />
            );
          }
        })}
        {requests.total <= 3 ? null : quantity < requests.total ? (
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
    <div className={styles.container}>Não há novos depoimentos</div>
  );
}
