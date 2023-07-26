import styles from './styles.module.scss';
import Link from 'next/link';

interface InputsProps {
  text: string;
  icon: React.ReactNode;
  number: number;
  link?: string;
}

export default function InputProfile({
  text,
  icon,
  number,
  link,
}: InputsProps) {
  return (
    <div className={styles.container}>
      <p className={styles.title}>{text}</p>
      {link ? (
        <Link href={link}>
          <div className={styles.icons_input}>
            <span>{icon}</span>
            <span>{number <= 99 ? number : '99+'}</span>
          </div>
        </Link>
      ) : (
        <div className={styles.icons_input}>
          <span>{icon}</span>
          <span>{number <= 99 ? number : '99+'}</span>
        </div>
      )}
    </div>
  );
}
