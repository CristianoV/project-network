import styles from './styles.module.scss';

export default function ValidatePassword({ password }: { password: string }) {
  return (
    <div className={
      styles.container
      }>
      <h1 className={password.length >= 8 ? styles.textGreen : styles.textBlack}>
        8 caracteres
      </h1>
      <h1 className={password.match(/[A-Z]/) ? styles.textGreen : styles.textBlack}>
        1 letra maiúscula
      </h1>
      <h1 className={password.match(/[a-z]/) ? styles.textGreen : styles.textBlack}>
        1 letra minúscula
      </h1>
      <h1 className={password.match(/[0-9]/) ? styles.textGreen : styles.textBlack}>
        1 número
      </h1>
    </div>
  );
}
