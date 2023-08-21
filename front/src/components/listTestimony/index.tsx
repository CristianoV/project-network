import styles from './styles.module.scss';
import Card from './card';
import { fetchFromApi } from '../../utils/axios';
import { useEffect, useState } from 'react';
import InputText from '../inputText';
import { useRouter } from 'next/router';

interface NewFriendsProps {
  token: string;
  to?: string;
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

export default function ListFriends({ token, to }: NewFriendsProps) {
  const [requests, setRequests] = useState<RootObject>({
    messages: [],
    total: 0,
  });
  const [quantity, setQuantity] = useState(3);
  const router = useRouter();

  const handleSubmit = async ({ text, id }: { text: string; id: string }) => {
    try {
      const headers = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
      };
      await fetchFromApi.post(
        '/testimony',
        {
          message: text,
          to: id,
        },
        headers
      );

      router.reload();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    try {
      const result = async () => {
        const result = await fetchFromApi.get(
          `/testimony/approved${to ? `?to=${to}` : ''}`,
          {
            headers: {
              Authorization: token,
            },
          }
        );
        setRequests(result.data);
      };
      result();
    } catch (error) {
      console.error(error);
    }
  }, [to, token]);

  if (requests.total > 0) {
    return (
      <div className={styles.container}>
        {to && (
          <InputText
            handleSubmit={handleSubmit}
            placeholder='Escreva um depoimento'
          />
        )}
        <p>Depoimentos ({requests.total})</p>
        {requests.messages.map((messages, index) => {
          if (index < quantity) {
            return (
              <Card
                key={index}
                obj={messages}
                token={token}
                requestId={messages.id}
              />
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
    <div className={styles.container}>
      <p>Depoimentos ({requests.total})</p>
      {to && (
          <InputText
            handleSubmit={handleSubmit}
            placeholder='Escreva o primeiro depoimento'
          />
        )}
      Não há depoimentos
    </div>
  );
}
