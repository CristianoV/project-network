import styles from './styles.module.scss';
import Image from 'next/image';
import avatar from '../../../public/avatar.jpg';
import { fetchFromApi } from '../../utils/axios';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import moment from 'moment';
import { BiCommentDetail } from 'react-icons/bi';
import { AiOutlineDislike, AiOutlineLike } from 'react-icons/ai';
import { AiOutlineArrowDown, AiOutlineArrowUp } from 'react-icons/ai';
import { FiEdit } from 'react-icons/fi';
import { AiOutlineClose } from 'react-icons/ai';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';

interface UserProps {
  id: number;
  firstName: string;
  lastName: string;
  profile_picture: string;
}

interface Comment {
  id: number;
  content: string;
  user_id: number;
  post_id: number;
  created_at: string;
  updated_at: string;
  user: UserProps;
}

interface CommentProps {
  comment: Comment;
  token: string;
  key: number;
}

export default function Comment({ comment, key, token }: CommentProps) {
  const user = useSelector((state: any) => state.user.info);
  const [text, setText] = useState('');
  const [editStates, setEditStates] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const router = useRouter();

  const handleDeletePost = async (postId: number) => {
    try {
      await fetchFromApi.delete(`/comment/${postId}`, {
        headers: {
          Authorization: token,
        },
      });

      router.reload();

      setDeleted(true);
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditPost = async (postId: number) => {
    try {
      await fetchFromApi.put(
        `/comment/${postId}`,
        {
          content: text,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );

      comment.content = text;
      comment.updated_at = new Date().toISOString();

      setText('');
    } catch (error) {
      console.error(error);
    }
  };

  if (deleted) {
    return <></>;
  }

  return (
    <div className={styles.container} key={key}>
      <div className={styles.comments} key={comment.id}>
        <div className={styles.commentHeader}>
          <Link href={`/profile/${comment.user.id}`} passHref>
            <div className={styles.commentContact}>
              <Image
                src={comment.user.profile_picture || avatar}
                alt='imagem do post'
                width={500}
                height={500}
                quality={70}
                placeholder='blur'
                blurDataURL='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mN0vQgAAWEBGHsgcxcAAAAASUVORK5CYII='
              />
              <p>
                {comment.user.firstName} {comment.user.lastName}
              </p>
            </div>
          </Link>
          <p className={styles.alignCenter}>
            {moment(comment.created_at).format('DD/MM/YYYY')} às{' '}
            {moment(comment.created_at).format('HH:mm')}
            {comment.created_at !== comment.updated_at && (
              <span>
                {' '}
                (editado em {moment(comment.updated_at).format(
                  'DD/MM/YYYY'
                )} às {moment(comment.updated_at).format('HH:mm')})
              </span>
            )}
            {user.id === comment.user.id && (
              <>
                <FiEdit
                  className={styles.svg}
                  style={{ marginLeft: 0.5 + 'rem' }}
                  onClick={() => {
                    setText(comment.content);
                    setEditStates(!editStates);
                  }}
                />
                <AiOutlineClose
                  className={styles.svg}
                  style={{ fontSize: 1.2 + 'rem' }}
                  onClick={() => handleDeletePost(comment.id)}
                />
              </>
            )}
          </p>
        </div>
        <div className={styles.commentContent}>
          {editStates && comment.user.id === user.id ? (
            <>
              <p>
                <textarea
                  name=''
                  id=''
                  cols={30}
                  rows={10}
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                ></textarea>
              </p>
              <div className={styles.editButtons}>
                <button
                  className={styles.cancelButton}
                  onClick={() => setEditStates(!editStates)}
                >
                  Cancelar
                </button>
                <button
                  className={styles.saveButton}
                  onClick={() => {
                    handleEditPost(comment.id);
                    setEditStates(!editStates);
                  }}
                >
                  Salvar
                </button>
              </div>
              <span className={styles.commentText}>{comment.content}</span>
            </>
          ) : (
            <p className={styles.commentText}>{comment.content}</p>
          )}
        </div>
      </div>
    </div>
  );
}
