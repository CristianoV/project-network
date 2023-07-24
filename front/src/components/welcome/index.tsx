import styles from './styles.module.scss';
import { BiMessageSquareEdit } from 'react-icons/bi';
import {
  AiOutlineCamera,
  AiOutlineVideoCamera,
  AiFillStar,
} from 'react-icons/ai';
import Inputs from './inputs';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { fetchFromApi } from '../../utils/axios';

export default function Welcome({ token }: { token: string }) {
  const [messages, setMessages] = useState(0);
  const redux = useSelector((state: any) => state.user);

  const { info } = redux;

  useEffect(() => {
    try {
      const getPosts = async () => {
        const response = await fetchFromApi.get('/countmessages', {
          headers: {
            Authorization: token,
          },
        });
        if (response.data.length === 0) {
          return;
        }
        setMessages(response.data);
      };
      getPosts();
    } catch (error) {
      console.error(error);
    }
  }, [token]);

  return (
    <div className={styles.container}>
      <h1>Bem-vindo(a), {info?.firstName}</h1>
      <hr />
      <div className={styles.inputs}>
        <Inputs text='recados' icon={<BiMessageSquareEdit />} number={messages} link='/messages' />
        <Inputs text='fotos' icon={<AiOutlineCamera />} number={0} />
        <Inputs text='vídeos' icon={<AiOutlineVideoCamera />} number={0} />
        <Inputs text='fãs' icon={<AiFillStar />} number={0} />
      </div>
      <hr />
      <p>
        Sorte de hoje: <span>A sorte vem ao seu encontro</span>
      </p>
      <p>
        Você tem <span>3</span> tarefas para hoje
      </p>
      <hr />
    </div>
  );
}
