import styles from './styles.module.scss';
import Link from 'next/link';

interface InputsProps {
  text: string;
  icon: React.ReactNode;
  number: number;
  color: string;
  link?: string;
}

export default function InputStatus({
  text,
  icon,
  link,
  number,
  color,
}: InputsProps) {
  const sendAvaliationStatus = (status: number) => {
    console.log(status);
  };

  return (
    <div className={styles.container}>
      <p className={styles.title}>{text}</p>
      {link ? (
        <Link href={link}>
          <div className={styles.icons_input}>
            <span>{number <= 99 ? number : '99+'}</span>
          </div>
        </Link>
      ) : (
        <div className={styles.icons_input}>
          <span
            className={number >= 25 ? styles[color] : ''}
            onClick={() => sendAvaliationStatus(1)}
          >
            {icon}
          </span>
          <span
            className={number >= 50 ? styles[color] : ''}
            onClick={() => sendAvaliationStatus(2)}
          >
            {icon}
          </span>
          <span
            className={number >= 75 ? styles[color] : ''}
            onClick={() => sendAvaliationStatus(3)}
          >
            {icon}
          </span>
        </div>
      )}
    </div>
  );
}
