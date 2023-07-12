import styles from './styles.module.scss';
import Image from 'next/image';
import { useState } from 'react';
import { GrClose } from 'react-icons/gr';
import { fetchFromApi } from '../../utils/axios';
import { useRouter } from 'next/router';

export default function CreatePost({ token }: { token: string }) {
  const [text, setText] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await fetchFromApi.post(
        '/post',
        {
          text,
          foto: image,
        },
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: token,
          },
        }
      );

      setText('');
      setImage(null);

      router.reload();
    } catch (error) {
      console.error(error);
    }
  };

  function chooseFile() {
    const uploadBtn = document.getElementById('uploadBtn');
    uploadBtn?.click();

    uploadBtn?.addEventListener(
      'change',
      (e) => {
        const target = e.target as HTMLInputElement;
        const file: File = (target.files as FileList)[0];
        setImage(file);
      },
      false
    );
  }

  const handleCancel = () => {
    setText('');
    setImage(null);
  };
  return (
    <div className={styles.container}>
      <textarea
        name=''
        id=''
        cols={30}
        rows={10}
        placeholder='O que você está pensando?'
        value={text}
        onChange={(e) => setText(e.target.value)}
      ></textarea>

      {image && (
        <div className={styles.imageContainer}>
          <div className={styles.exclude} onClick={() => setImage(null)}>
            <GrClose />
          </div>
          <Image
            src={URL.createObjectURL(image)}
            alt='Imagem selecionada'
            width={200}
            height={200}
            quality={70}
            placeholder='blur'
            blurDataURL='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mN0vQgAAWEBGHsgcxcAAAAASUVORK5CYII='
          />
        </div>
      )}
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
          disabled={!text && !image}
          style={!text && !image ? { 
            opacity: 0, 
            cursor: 'default',
          } : undefined}
        >
          Cancelar
        </button>
        <div className={styles.submitContainer}>
          <button className={styles.addPhoto} onClick={chooseFile}>
            Adicionar foto
          </button>
          <button
            className={styles.submit}
            onClick={handleSubmit}
            disabled={!text && !image}
          >
            Publicar
          </button>
        </div>
      </div>
    </div>
  );
}
