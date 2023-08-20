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
import { useRouter } from 'next/router';
import InputStatus from '../inputStatus';

interface WelcomeProps {
  token: string;
}

export default function Profile({ token }: WelcomeProps) {
  const redux = useSelector((state: any) => state.profile);
  const [messages, setMessages] = useState(0);
  const { info, loading } = redux;
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (loading === 'failed') {
      router.push('/');
    }
  }, [loading, router]);

  useEffect(() => {
    try {
      const getPosts = async () => {
        const response = await fetchFromApi.get(`/countmessages?to=${id}`, {
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
  }, [id, token]);

  return (
    <div className={styles.container}>
      <h1>
        {info?.firstName} {info?.lastName}
      </h1>
      {info?.phrase && (
        <div className={styles.bio}>
          <p>{info?.phrase}</p>
        </div>
      )}
      <hr />
      <div className={styles.inputs}>
        <InputProfile
          text='recados'
          icon={<BiMessageSquareEdit />}
          number={messages}
          link={`/profile/${id}/messages`}
        />
        <InputProfile text='fotos' icon={<AiOutlineCamera />} number={0} />
        <InputProfile
          text='vídeos'
          icon={<AiOutlineVideoCamera />}
          number={0}
        />
        <InputProfile text='fãs' icon={<AiFillStar />} number={0} />
        <InputStatus text='confiável' icon={<BiHappyAlt />} number={75} color='yellow'/>
        <InputStatus text='legal' icon={<RxCube />} number={75} color='blue'/>
        <InputStatus text='sexy' icon={<AiFillHeart />} number={75} color='red'/>
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
