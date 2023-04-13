import Link from 'next/link';
import styles from './styles.module.scss';
import logo from '../../../public/orkutLogo.png';
import Image from 'next/image';
import { FaSearch } from 'react-icons/fa';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { FormEvent, useState } from 'react';

export default function Header() {
  const [search, setSearch] = useState('');
  const searchPath = '/search';
  const router = useRouter();

  const redux = useSelector((state: any) => state.user);
  const user = redux.info;

  const logout = async (e: React.FormEvent) => {
    e.preventDefault();

    await fetch('/api/logout', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({}),
    });
    router.push('/');
  };

  const handleSearch = async (e: FormEvent) => {
    e.preventDefault();
    router.push(`/search?q=${search}`);
  };

  return (
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
              <Link href='/'>Página de recados</Link>
            </li>
            <li>
              <Link href='/'>Amigos</Link>
            </li>
            <li>
              <Link href='/'>Comunidades</Link>
            </li>
          </ul>
        </nav>
        <article className={styles.profile}>
          <p>{user.email}</p>
          <button onClick={(e) => logout(e)}>Sair</button>
          {!router.pathname.startsWith(searchPath) && (
            <form onSubmit={handleSearch}>
              <input
                type='text'
                placeholder='Pesquisar no Orkut'
                value={search}
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
  );
}
