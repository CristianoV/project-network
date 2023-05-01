import styles from './style.module.scss';
import avatar from '../../../public/avatar.jpg';
import Image from 'next/image';
import Link from 'next/link';
import { CgProfile } from 'react-icons/cg';
import { AiOutlineCamera, AiOutlineVideoCamera } from 'react-icons/ai';
import { BiMessageSquareEdit } from 'react-icons/bi';
import { fetchFromApi } from '../../utils/axios';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function LeftSideBar({ token }: { token?: string }) {
  const redux = useSelector((state: any) => state.community);
  const [isParticipating, setIsParticipating] = useState(false);
  const { info, members } = redux;
  const router = useRouter();

  const handleParticipate = async () => {
    try {
      await fetchFromApi.post(
        '/partner',
        {
          groupId: info.id,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );

      router.reload();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    try {
      const result = async () => {
        const response = await fetchFromApi.get(`/partner/is/${info.id}`, {
          headers: {
            Authorization: token,
          },
        });

        setIsParticipating(response.data);
      };

      if (info.id) {
        result();
      }
    } catch (error) {
      console.error(error);
    }
  }, [info, token]);

  return (
    <div className={styles.container}>
      <Image
        src={info?.profile_picture || avatar}
        alt='avatar'
        width={500}
        height={500}
      />
      <hr />
      <div>
        <h2>{info?.name}</h2>
        <p>
          (<span>{members.length}</span>) membros
        </p>
      </div>
      <hr />
      {!isParticipating && (
        <button onClick={handleParticipate}>
          <CgProfile /> participar
        </button>
      )}
      {isParticipating && <button>participando</button>}
      <hr />
      <div>
        <Link href='/profile'>
          <CgProfile /> fórum
        </Link>
        <Link href='/'>
          <BiMessageSquareEdit /> enquetes
        </Link>
        <Link href='/'>
          <AiOutlineCamera /> eventos
        </Link>
        <Link href='/'>
          <AiOutlineVideoCamera /> membros
        </Link>
      </div>
      <hr />
    </div>
  );
}
