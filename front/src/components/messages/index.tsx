import { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import avatar from '../../../public/avatar.jpg';
import Image from 'next/image';
import Link from 'next/link';
import {
  AiOutlineArrowLeft,
  AiOutlineArrowRight,
  AiOutlineDoubleLeft,
  AiOutlineDoubleRight,
} from 'react-icons/ai';
import { fetchFromApi } from '../../utils/axios';
import moment from 'moment';

interface IMessage {
  token: string;
}

interface Message {
  id: number;
  from: number;
  to: number;
  message: string;
  image: string | null;
  created_at: string;
  updated_at: string;
  fromUser: {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    bio: string;
    profile_picture: string | null;
    birthday: string;
    relationship: string;
    country: string;
    phrase: string | null;
    sex: string;
    cep: string;
    state: string;
    language: string;
  };
  toUser: {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    bio: string;
    profile_picture: string | null;
    birthday: string;
    relationship: string;
    country: string;
    phrase: string | null;
    sex: string;
    cep: string;
    state: string;
    language: string;
  };
}

export default function Messages({ token }: IMessage) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [page, setPage] = useState(1);
  const [take, setTake] = useState(5);
  const [totalPages, setTotalPages] = useState(1);
  const [totalMessages, setTotalMessages] = useState(0);

  useEffect(() => {
    try {
      const getPosts = async () => {
        const response = await fetchFromApi.get(
          `/message?take=${take}&page=${page}`,
          {
            headers: {
              Authorization: token,
            },
          }
        );
        if (response.data.length === 0) {
          return;
        }
        setMessages(response.data.messages);
        setTotalMessages(response.data.totalComments);
        setTotalPages(response.data.totalPage);
      };
      getPosts();
    } catch (error) {
      console.error(error);
    }
  }, [page, take, token]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Minha página de recados ({totalMessages})</h1>
        <span>
          todos podem enviar recados -
          <Link href='/messages/send'>alterar configurações</Link>
        </span>
      </div>
      <nav>
        <Link href='/'>Inicio</Link>
        {'>'}
        <p>Minha página de recados</p>
      </nav>
      <div className={styles.content}>
        <div className={styles.messages}>
          {messages.length === 0 ? (
            <p style={{ textAlign: 'center', marginTop: '1rem' }}>
              Você não tem recados
            </p>
          ) : (
            messages.map((message) => (
              <div key={message.id} className={styles.message}>
                <Link href={`/profile/${message.from}`} key={message.id}>
                  <Image
                    src={message.fromUser.profile_picture || avatar}
                    alt='avatar'
                    height={50}
                    width={50}
                  />
                </Link>
                <div style={{ width: '100%' }}>
                  <div className={styles.messageContent}>
                    <Link href={`/profile/${message.from}`} key={message.id}>
                      <span>
                        {message.fromUser.firstName} {message.fromUser.lastName}
                      </span>
                    </Link>
                    <span className={styles.date}>
                      {moment(message.created_at).format('DD/MM/YYYY')} às{' '}
                      {moment(message.created_at).format('HH:mm')}
                      {message.created_at !== message.updated_at && (
                        <span>
                          {' '}
                          (editado em{' '}
                          {moment(message.updated_at).format(
                            'DD/MM/YYYY'
                          )} às {moment(message.updated_at).format('HH:mm')})
                        </span>
                      )}
                    </span>
                  </div>
                  <p>{message.message}</p>
                </div>
              </div>
            ))
          )}
        </div>

        <div className={styles.pagination}>
          <AiOutlineDoubleLeft onClick={() => setPage(1)} />
          <AiOutlineArrowLeft
            onClick={() =>
              setPage((oldPage) => (oldPage === 1 ? oldPage : oldPage - 1))
            }
          />
          <span>
            {page} de {totalPages}
          </span>
          <AiOutlineArrowRight
            onClick={() =>
              setPage((oldPage) =>
                oldPage === totalPages ? oldPage : oldPage + 1
              )
            }
          />
          <AiOutlineDoubleRight onClick={() => setPage(totalPages)} />
        </div>
      </div>
    </div>
  );
}
