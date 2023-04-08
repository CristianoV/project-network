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

export default function LeftSideBar() {
  const redux = useSelector((state: any) => state.user);

  const { info } = redux;
  return (
    <div className={styles.container}>
      <Image src={avatar} alt='avatar' width={500} height={500} />
      <hr />
      <div>
        <h2>{info.firstName} {info.lastName}</h2>
        <p>Masculino</p>
        <p>Namorando</p>
        <p>Brasil</p>
      </div>
      <hr />
      <div>
        <Link href='/'>
          <CgProfile /> editar perfil
        </Link>
      </div>
      <hr />
      <div>
        <Link href='/'>
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
