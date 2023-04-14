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
import Inputs from './inputs';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import moment from 'moment';
import 'moment/locale/pt-br';
import { fetchFromApi } from '../../utils/axios';

interface WelcomeProps {
  token: string;
}

export default function Profile({ token }: WelcomeProps) {
  const [edit, setEdit] = useState(false);
  const [phrase, setPhrase] = useState('');
  const redux = useSelector((state: any) => state.user);

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

  const { info } = redux;

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
        <Inputs text='recados' icon={<BiMessageSquareEdit />} number={0} />
        <Inputs text='fotos' icon={<AiOutlineCamera />} number={0} />
        <Inputs text='vídeos' icon={<AiOutlineVideoCamera />} number={0} />
        <Inputs text='fãs' icon={<AiFillStar />} number={0} />
        <Inputs text='confiável' icon={<BiHappyAlt />} number={0} />
        <Inputs text='legal' icon={<RxCube />} number={0} />
        <Inputs text='sexy' icon={<AiFillHeart />} number={0} />
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
