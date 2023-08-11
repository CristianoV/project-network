import Link from 'next/link';
import styles from './styles.module.scss';
import logo from '../../../public/orkutLogo.png';
import Image from 'next/image';
import { FaSearch, FaUserFriends } from 'react-icons/fa';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { FormEvent, useCallback, useEffect, useState } from 'react';
import {
  AiOutlineHome,
  AiOutlineMessage,
  AiOutlineProfile,
} from 'react-icons/ai';
import { RiCommunityLine } from 'react-icons/ri';
import { LiaUserFriendsSolid } from 'react-icons/lia';

export default function Header() {
  const [search, setSearch] = useState('');
  const searchPath = '/search';
  const router = useRouter();

  const redux = useSelector((state: any) => state.user);
  const { info, loading } = redux;

  const logout = useCallback(async () => {
    await fetch('/api/logout', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({}),
    });
    router.push('/');
  }, [router]);

  const handleSearch = async (e: FormEvent) => {
    e.preventDefault();
    router.push(`/search?q=${search}`);
  };

  useEffect(() => {
    if (loading === 'failed') {
      logout();
    }
  }, [loading, logout]);

  return (
    <>
      <header className={styles.headerContainer}>
        <div>
          <nav className={styles.profile}>
            <Image src={logo} alt='logo' />
            <ul>
              <li>
                <Link href='/'>Ínicio</Link>
              </li>
              <li>
                <Link href='/profile'>Perfil</Link>
              </li>
              <li>
                <Link href='/messages'>Página de recados</Link>
              </li>
              <li>
                <Link href='/friends'>Amigos</Link>
              </li>
              <li>
                <Link href='/community'>Comunidades</Link>
              </li>
            </ul>
          </nav>
          <article className={styles.profile}>
            <p className={styles.mail}>{info.email}</p>
            <button onClick={() => logout()}>Sair</button>
            {!router.pathname.startsWith(searchPath) && (
              <form onSubmit={handleSearch}>
                <input
                  type='text'
                  placeholder='Pesquisar no Orkut'
                  value={search}
                  required
                  onChange={(e) => setSearch(e.target.value)}
                />
                <button type='submit'>
                  <FaSearch size={20} />
                </button>
              </form>
            )}
          </article>
        </div>
      </header>
      <div className={styles.header_mobile}>
        <nav className={styles.profile}>
          <ul>
            <li>
              <Link href='/'>
                <AiOutlineHome size={20} />
                Ínicio
              </Link>
            </li>
            <li>
              <Link href='/profile'>
                <AiOutlineProfile size={20} />
                Perfil
              </Link>
            </li>
            <li>
              <Link href='/messages'>
                <AiOutlineMessage size={20} />
                recados
              </Link>
            </li>
            <li>
              <Link href='/friends'>
                <LiaUserFriendsSolid size={20} />
                Amigos
              </Link>
            </li>
            <li>
              <Link href='/community'>
                <RiCommunityLine size={20} />
                Comunidades
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}
