import styles from './style.module.scss';
import avatar from '../../../public/avatar.jpg';
import Image from 'next/image';
import Link from 'next/link';
import { CgProfile } from 'react-icons/cg';
import { AiOutlineCamera, AiOutlineVideoCamera } from 'react-icons/ai';
import { BiMessageSquareEdit } from 'react-icons/bi';
import { fetchFromApi } from '../../utils/axios';
import { GiSunglasses } from 'react-icons/gi';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';

export default function LeftSideBar({ token }: { token?: string }) {
  const redux = useSelector((state: any) => state.profile);
  const [isFriend, setIsFriend] = useState(false);
  const [isRequest, setIsRequest] = useState(false);
  const { info } = redux;

  const handleAddFriend = async () => {
    try {
      await fetchFromApi.post(
        '/friends',
        {
          friendId: info.id,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      setIsRequest(true);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    try {
      const result = async () => {
        const response = await fetchFromApi.get(`/friend/status/${info.id}`, {
          headers: {
            Authorization: token,
          },
        });

        if (response.data.status === 'not friends' || response.data.status === 'rejected') {
          setIsRequest(false);
          setIsFriend(false);
        } else if (response.data.status === 'pending') {
          setIsFriend(false);
          setIsRequest(true);
        } else {
          setIsFriend(true);
          setIsRequest(false);
        }
      };

      if (info.id) {
        result();
      }
    } catch (error) {
      console.log(error);
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
        <h2>
          {info?.firstName} {info?.lastName}
        </h2>
        {info?.birthday && <p>{info?.sex}</p>}
        {info?.relationship && <p>{info?.relationship}</p>}
        {info?.country && <p>{info?.country}</p>}
      </div>
      <hr />
      {!isFriend && !isRequest && (
        <button onClick={handleAddFriend}>
          <CgProfile /> Adicionar amigo
        </button>
      )}
      {isRequest && <button>Solicitação enviada</button>}
      {isFriend && <button>Amigo</button>}
      <hr />
      <div>
        <Link href='/profile'>
          <CgProfile /> perfil
        </Link>
        <Link href='/'>
          <BiMessageSquareEdit /> recados
        </Link>
        <Link href='/'>
          <AiOutlineCamera /> álbuns
        </Link>
        <Link href='/'>
          <AiOutlineVideoCamera /> vídeos
        </Link>
        <Link href='/'>
          <GiSunglasses /> depoimentos
        </Link>
      </div>
      <hr />
    </div>
  );
}
