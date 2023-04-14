import styles from './styles.module.scss';

interface InputsProps {
  text: string;
  icon: React.ReactNode;
  number: number;
}

export default function Inputs({ text, icon, number }: InputsProps) {
  return (
    <div className={styles.container}>
      <p>{text}</p>
      <p>
        <span>{icon}</span>
        <span>{number}</span>
      </p>
    </div>
  );
}
