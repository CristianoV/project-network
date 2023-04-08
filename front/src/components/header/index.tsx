import Link from 'next/link';
import styles from './styles.module.scss';
import logo from '../../../public/orkutLogo.png';
import Image from 'next/image';
import { FaSearch } from 'react-icons/fa';
import { useRouter } from 'next/router';

export default function Header() {
  const router = useRouter();

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
              <Link href='/'>Perfil</Link>
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
          <button onClick={(e) => logout(e)}>Sair</button>
          <form action=''>
            <input type='text' placeholder='Pesquisar no Orkut' />
            <button type='submit'>
              <FaSearch size={20} />
            </button>
          </form>
        </article>
      </div>
    </header>
  );
}
