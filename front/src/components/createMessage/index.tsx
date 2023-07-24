import styles from './styles.module.scss';
import Image from 'next/image';
import { useState } from 'react';
import { GrClose } from 'react-icons/gr';
import { fetchFromApi } from '../../utils/axios';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

export default function CreateMessage({ token }: { token: string }) {
  const redux = useSelector((state: any) => state.user);
  const { info } = redux;
  const [text, setText] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const headers = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
      };
      await fetchFromApi.post(
        '/message',
        {
          message: text,
          to: info.id,
        },
        headers
      );

      setText('');

      router.reload();
    } catch (error) {
      console.error(error);
    }
  };

  const handleCancel = () => {
    setText('');
  };
  return (
    <div className={styles.container}>
      <textarea
        name=''
        id=''
        cols={30}
        rows={10}
        placeholder='Escreva uma mensagem...'
        value={text}
        onChange={(e) => setText(e.target.value)}
      ></textarea>
      <div className={styles.buttons}>
        <input
          type='file'
          style={{ display: 'none' }}
          id='uploadBtn'
          accept='image/png, image/jpg, image/jpeg'
          capture='user'
          maxLength={1048576}
        />
        <button
          className={styles.cancel}
          onClick={handleCancel}
          disabled={!text}
          style={
            !text
              ? {
                  opacity: 0,
                  cursor: 'default',
                }
              : undefined
          }
        >
          Cancelar
        </button>
        <div className={styles.submitContainer}>
          <button
            className={styles.submit}
            onClick={handleSubmit}
            disabled={!text}
          >
            Publicar
          </button>
        </div>
      </div>
    </div>
  );
}
