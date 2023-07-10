import styles from './style.module.scss';
import avatar from '../../../public/avatar.jpg';
import Image from 'next/image';
import Link from 'next/link';
import { CgProfile } from 'react-icons/cg';
import { AiOutlineCamera, AiOutlineVideoCamera } from 'react-icons/ai';
import {
  AiOutlineUsergroupAdd,
  AiOutlineUsergroupDelete,
} from 'react-icons/ai';
import { AiOutlineDelete } from 'react-icons/ai';
import { BiMessageSquareEdit } from 'react-icons/bi';
import { fetchFromApi } from '../../utils/axios';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function LeftSideBar({ token }: { token?: string }) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [showLeaveGroupModal, setShowLeaveGroupModal] = useState(false);
  const [showDeleteGroupModal, setShowDeleteGroupModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const redux = useSelector((state: any) => state.community);
  const user = useSelector((state: any) => state.user);
  const [isParticipating, setIsParticipating] = useState(false);
  const { info, members } = redux;
  const { info: userInfo } = user;
  const router = useRouter();

  const handleParticipate = async () => {
    try {
      setIsParticipating(true);
      await fetchFromApi.post(
        '/partner',
        {
          groupId: info.id,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );

      router.reload();
    } catch (error) {
      setIsParticipating(false);
      console.error(error);
    }
  };

  const handleDeleteParticipate = async () => {
    try {
      setIsParticipating(true);
      await fetchFromApi.delete(`/partner/${info.id}`, {
        headers: {
          Authorization: token,
        },
      });

      router.reload();
    } catch (error) {
      setIsParticipating(false);
      console.error(error);
    }
  };

  const handleDeleteGroup = async () => {
    try {
      setIsParticipating(true);
      await fetchFromApi.delete(`/groups/${info.id}`, {
        headers: {
          Authorization: token,
        },
      });

      router.push('/');
    } catch (error) {
      setIsParticipating(false);
      console.error(error);
    }
  };

  useEffect(() => {
    try {
      const result = async () => {
        const response = await fetchFromApi.get(`/partner/is/${info.id}`, {
          headers: {
            Authorization: token,
          },
        });

        setIsParticipating(response.data);
      };

      if (info.id) {
        result();
      }
    } catch (error) {
      console.error(error);
      router.push('/');
    }
  }, [info, token]);

  const handleFileInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      setSelectedFile(files[0]);
    }
  };

  const chooseFile = () => {
    document.getElementById('uploadBtn')?.click();
  };

  const handleUploadClick = async () => {
    setLoading(true);

    try {
      const headers = {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: token,
        },

        onUploadProgress: (progressEvent: any) => {
          const { loaded, total } = progressEvent;
          let percent = Math.floor((loaded * 100) / total);

          setProgress(percent);
        },
      };
      await fetchFromApi.patch(
        `/group/image/${info?.id}`,
        { foto: selectedFile },
        headers
      );

      router.reload();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      setProgress(0);
    }
  };

  return (
    <div className={styles.container}>
      <Image
        src={
          (selectedFile
            ? URL.createObjectURL(selectedFile)
            : info?.profile_picture) || avatar
        }
        alt='avatar'
        width={500}
        height={500}
        quality={70}
        placeholder='blur'
        blurDataURL='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mN0vQgAAWEBGHsgcxcAAAAASUVORK5CYII='
      />
      {userInfo?.id === info?.owner_id && (
        <div className={styles.updateImage}>
          <p className={styles.title}>
            {info?.profile_picture !== null
              ? ' Alterar imagem de comunidade'
              : 'Adicionar imagem de comunidade'}
          </p>
          <input
            type='file'
            onChange={handleFileInputChange}
            style={{ display: 'none' }}
            id='uploadBtn'
            accept='image/png, image/jpg, image/jpeg'
            capture='user'
            maxLength={1048576}
          />
          <div className={styles.buttons}>
            <button onClick={chooseFile}>
              {info?.profile_picture !== null
                ? 'Alterar foto'
                : 'Adicionar foto'}
            </button>
            <button onClick={handleUploadClick} disabled={!selectedFile}>
              Enviar
            </button>
          </div>
          {loading && (
            <div className={styles['loading-bar']}>
              <div
                className={styles.bar}
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          )}
        </div>
      )}
      <hr />
      <div>
        <h2>{info?.name}</h2>
        <p>
          (<span>{members.length}</span>) membros
        </p>
        {isParticipating && (
          <p>
            <span>Participando</span>
          </p>
        )}
      </div>
      <hr />
      {!isParticipating && (
        <button onClick={handleParticipate} disabled={isParticipating}>
          <AiOutlineUsergroupAdd /> participar
        </button>
      )}
      {isParticipating &&
        (userInfo?.id === info?.owner_id ? (
          <button
            onClick={() => setShowDeleteGroupModal(!showDeleteGroupModal)}
          >
            <AiOutlineDelete /> excluir
          </button>
        ) : (
          <button onClick={() => setShowLeaveGroupModal(!showLeaveGroupModal)}>
            <AiOutlineUsergroupDelete /> sair
          </button>
        ))}
      {showLeaveGroupModal && (
        <div className={styles.confirm}>
          <hr />
          <p>Você tem certeza que deseja sair da comunidade?</p>
          <button onClick={handleDeleteParticipate}>Sim</button>
          <button onClick={() => setShowLeaveGroupModal(false)}>Não</button>
        </div>
      )}
      {showDeleteGroupModal && (
        <div className={styles.confirm}>
          <hr />
          <p>Você tem certeza que deseja excluir a comunidade?</p>
          <button onClick={handleDeleteGroup}>Sim</button>
          <button onClick={() => setShowDeleteGroupModal(false)}>Não</button>
        </div>
      )}
      <hr />
      <div>
        <Link href='/profile'>
          <CgProfile /> fórum
        </Link>
        <Link href='/'>
          <BiMessageSquareEdit /> enquetes
        </Link>
        <Link href='/'>
          <AiOutlineCamera /> eventos
        </Link>
        <Link href='/'>
          <AiOutlineVideoCamera /> membros
        </Link>
      </div>
      <hr />
    </div>
  );
}
