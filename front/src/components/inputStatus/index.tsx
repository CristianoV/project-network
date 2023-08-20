import styles from './styles.module.scss';
import Link from 'next/link';

interface InputsProps {
  text: string;
  icon: React.ReactNode;
  number: number;
  color: string;
  link?: string;
  avaliationProfile: ({
    avaliation,
    type_avaliation,
  }: {
    avaliation: string;
    type_avaliation: any;
  }) => void;
}

enum TypeAvaliation {
  confiável = 'reliable',
  legal = 'Cool',
  sexy = 'sexy',
}

export default function InputStatus({
  text,
  icon,
  link,
  number,
  color,
  avaliationProfile,
}: InputsProps) {
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
            onClick={() =>
              avaliationProfile({
                avaliation: '33',
                type_avaliation: TypeAvaliation[text as keyof typeof TypeAvaliation],
              })
            }
          >
            {icon}
          </span>
          <span
            className={number >= 50 ? styles[color] : ''}
            onClick={() =>
              avaliationProfile({
                avaliation: '66',
                type_avaliation: TypeAvaliation[text as keyof typeof TypeAvaliation],
              })
            }
          >
            {icon}
          </span>
          <span
            className={number >= 75 ? styles[color] : ''}
            onClick={() =>
              avaliationProfile({
                avaliation: '99',
                type_avaliation: TypeAvaliation[text as keyof typeof TypeAvaliation],
              })
            }
          >
            {icon}
          </span>
        </div>
      )}
    </div>
  );
}
