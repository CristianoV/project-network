import styles from './styles.module.scss';
import { BiMessageSquareEdit } from 'react-icons/bi';
import {
  AiOutlineCamera,
  AiOutlineVideoCamera,
  AiFillStar,
  AiFillHeart,
} from 'react-icons/ai';
import { RxCube } from 'react-icons/rx';
import { BiHappyAlt } from 'react-icons/bi';
import InputProfile from '../inputProfile';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import moment from 'moment';
import 'moment/locale/pt-br';
import { fetchFromApi } from '../../utils/axios';
import InputStatus from '../inputStatus';

interface WelcomeProps {
  token: string;
}

export default function Profile({ token }: WelcomeProps) {
  const [edit, setEdit] = useState(false);
  const [phrase, setPhrase] = useState('');
  const redux = useSelector((state: any) => state.user);
  const [messages, setMessages] = useState(0);
  const [status, setStatus] = useState({
    sexy: 0,
    cool: 0,
    reliable: 0,
  });

  const { info } = redux;

  useEffect(() => {
    setPhrase(redux.info?.phrase);
  }, [redux.info?.phrase]);

  const handleEdit = async () => {
    await fetchFromApi.patch(
      '/user/phrase',
      { phrase },
      {
        headers: {
          Authorization: token,
        },
      }
    );
    setEdit(!edit);
  };

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

        if (!!info?.id) {
          const response2 = await fetchFromApi.get(
            `/avaliation_status/${info.id}`,
            {
              headers: {
                Authorization: token,
              },
            }
          );

          setStatus(response2.data);
        }
      };

      getPosts();
    } catch (error) {
      console.error(error);
    }
  }, [info.id, token]);

  const avaliationProfile = async ({
    avaliation,
    type_avaliation,
  }: {
    avaliation: string;
    type_avaliation: string;
  }) => {
    return
  };

  return (
    <div className={styles.container}>
      <h1>
        {info?.firstName} {info?.lastName}
      </h1>
      <p>
        <Link href='/'>Ínicio</Link> {'>'} Meu perfil
      </p>
      <div className={styles.bio}>
        {!edit ? (
          <>
            {phrase ? (
              <p>{phrase}</p>
            ) : (
              <p className={styles.phrase}>Adicione uma frase de efeito</p>
            )}
            <button
              onClick={() => {
                setEdit(!edit);
              }}
            >
              editar
            </button>
          </>
        ) : (
          <>
            <input
              type='text'
              value={phrase}
              onChange={(e) => setPhrase(e.target.value)}
            />
            <button
              onClick={() => {
                setEdit(!edit);
              }}
            >
              cancelar
            </button>
            <button
              onClick={() => {
                handleEdit();
              }}
            >
              salvar
            </button>
          </>
        )}
      </div>

      <hr />
      <div className={styles.inputs}>
        <InputProfile
          text='recados'
          icon={<BiMessageSquareEdit />}
          number={messages}
          link='/messages'
        />
        <InputProfile text='fotos' icon={<AiOutlineCamera />} number={0} />
        <InputProfile
          text='vídeos'
          icon={<AiOutlineVideoCamera />}
          number={0}
        />
        <InputProfile text='fãs' icon={<AiFillStar />} number={0} />
        <InputStatus
          text='confiável'
          icon={<BiHappyAlt />}
          number={status.reliable}
          color='yellow'
          avaliationProfile={avaliationProfile}
        />
        <InputStatus
          text='legal'
          icon={<RxCube />}
          number={status.cool}
          color='blue'
          avaliationProfile={avaliationProfile}
        />
        <InputStatus
          text='sexy'
          icon={<AiFillHeart />}
          number={status.sexy}
          color='red'
          avaliationProfile={avaliationProfile}
        />
      </div>
      <hr />
      <div className={styles.social}>
        <h2>social</h2>
        <hr />
        <main>
          <div className={styles.text}>
            <p>aniversario:</p>
            <span>
              {info?.birthday &&
                moment(info?.birthday).format('DD [de] MMMM [de] YYYY')}
            </span>
          </div>
          <div className={styles.text}>
            <p>relacionamento:</p>
            <span>{info?.relationship}</span>
          </div>
          <div className={styles.text}>
            <p>quem sou eu:</p>
            <span>{info?.bio}</span>
          </div>
          <div className={styles.text}>
            <p>país:</p>
            <span>{info?.country}</span>
          </div>
        </main>
      </div>
    </div>
  );
}
