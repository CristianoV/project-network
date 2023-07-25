import styles from './styles.module.scss';
import Link from 'next/link';

interface InputsProps {
  text: string;
  icon: React.ReactNode;
  number: number;
  link?: string;
}

export default function InputProfile({ text, icon, number, link }: InputsProps) {
  return (
    <div className={styles.container}>
      <p>{text}</p>
      <p>
        {link ? (
          <Link href={link}>
            <span>{icon}</span>
            <span>{number <= 99 ? number : '99+'}</span>
          </Link>
        ) : (
          <>
            <span>{icon}</span>
            <span>{number <= 99 ? number : '99+'}</span>
          </>
        )}
      </p>
    </div>
  );
}
