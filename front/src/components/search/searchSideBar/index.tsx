import styles from './styles.module.scss';
import Link from 'next/link';
import { HiOutlineUsers } from 'react-icons/hi';
import { TiWorld } from 'react-icons/ti';
import Logo from '../../../../public/favicon.ico';
import Image from 'next/image';
import { useRouter } from 'next/router';

export default function SearchSideBar() {
  const router = useRouter();
  const { q } = router.query;

  return (
    <div className={styles.container}>
      <nav>
        <Link href={`/search?q=${q}`}>
          <Image src={Logo} alt='logo' width={100} height={100} /> tudo
        </Link>
        <Link href={`/search/users?q=${q}`}>
          <HiOutlineUsers /> usuarios
        </Link>
        <Link href={`/search/community?q=${q}`}>
          <TiWorld /> comunidades
        </Link>
      </nav>

      <hr />
    </div>
  );
}
