import styles from './style.module.scss';
import avatar from '../../../public/avatar.jpg';
import Image from 'next/image';
import Link from 'next/link';
import { CgProfile } from 'react-icons/cg';
import { AiOutlineCamera, AiOutlineVideoCamera } from 'react-icons/ai';
import { BiMessageSquareEdit } from 'react-icons/bi';
import { MdRssFeed } from 'react-icons/md';
import { IoIosList } from 'react-icons/io';
import { BsEnvelope } from 'react-icons/bs';
import { CiSettings } from 'react-icons/ci';
import { GiSunglasses } from 'react-icons/gi';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { fetchFromApi } from '../../utils/axios';

interface LeftSideBarProps {
  token?: string;
}

export default function LeftSideBar({ token }: LeftSideBarProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const router = useRouter();
  const redux = useSelector((state: any) => state.user);
  const { info } = redux;

  const handleFileInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      setSelectedFile(files[0]);
    }
  };

  const handleUploadClick = async () => {
    try {
      const headers = {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: token,
        },
      };
      await fetchFromApi.patch(`/user/image`, { foto: selectedFile }, headers);

      router.push('/profile');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.container}>
      <Image
        src={
          (selectedFile
            ? URL.createObjectURL(selectedFile)
            : info?.profile_picture) || avatar
        }
        alt='avatar'
        width={500}
        height={500}
      />
      {router.pathname === '/profile/edit' && (
        <div className={styles.updateImage}>
          <p>Alterar foto de perfil</p>
          <input type='file' onChange={handleFileInputChange} />
          <button onClick={handleUploadClick} disabled={!selectedFile}>
            Enviar
          </button>
        </div>
      )}
      <hr />
      <div>
        <h2>
          {info?.firstName} {info?.lastName}
        </h2>
        {info?.sex && <p>{info?.sex}</p>}
        {info?.relationship && <p>{info?.relationship}</p>}
        {info?.country && <p>{info?.country}</p>}
      </div>
      <hr />
      <div>
        <Link href='/profile/edit'>
          <CgProfile /> editar perfil
        </Link>
      </div>
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
      </div>
      <hr />
      <div>
        <Link href='/'>
          <MdRssFeed /> feeds
        </Link>
        <Link href='/'>
          <IoIosList /> listas
        </Link>
        <Link href='/'>
          <BsEnvelope /> mensagens
        </Link>
        <Link href='/'>
          <GiSunglasses /> depoimentos
        </Link>
        <Link href='/'>
          <CiSettings /> configurações
        </Link>
      </div>
      <hr />
    </div>
  );
}
