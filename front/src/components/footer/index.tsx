import Image from 'next/image';
import Link from 'next/link';
import logo from '../../../public/orkutLogo.png';
import styles from './styles.module.scss';

export default function Footer() {
  return (
    <footer className={styles.container}>
      <Image src={logo} alt='logo' />
      <div>
        <hr />
        <Link href='/'>Sobre o Orkut</Link>
        <hr />
        <Link href='/'>Novidades</Link>
        <hr />
        <Link href='/'>Centro de segurança</Link>
        <hr />
        <Link href='/'>Privacidades</Link>
        <hr />
        <Link href='/'>Termos de uso</Link>
        <hr />
        <Link href='/'>Ajuda</Link>
      </div>
    </footer>
  );
}
