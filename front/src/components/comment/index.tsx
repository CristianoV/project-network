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

interface CometProps {
  id: number;
  content: string;
  user_id: number;
  post_id: number;
  created_at: string;
  updated_at: string;
  user: UserProps;
}

interface UserProps {
  id: number;
  firstName: string;
  lastName: string;
  profile_picture: string;
}

interface PostProps {
  id: number;
  text: string;
  image: string;
  created_at: string;
  updated_at: string;
  user: UserProps;
  comments: CometProps[];
}

interface FeedProps {
  post: PostProps;
  token: string;
}

export default function Comment({ post, token }: FeedProps) {
  const user = useSelector((state: any) => state.user.info);
  const [numberComments, setNumberComments] = useState(3);
  const [comment, setComment] = useState('');
  const [text, setText] = useState('');
  const [commentStates, setCommentStates] = useState(false);
  const [editStates, setEditStates] = useState(false);
  const [deleted, setDeleted] = useState(false);

  const handleDeletePost = async (postId: number) => {
    try {
      await fetchFromApi.delete(`/comment/${postId}`, {
        headers: {
          Authorization: token,
        },
      });

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
          text,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );

      post.text = text;
      post.updated_at = new Date().toISOString();

      setText('');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.container}>
      {post.comments.length > 0 &&
        post.comments
          .slice()
          .sort(
            (a: CometProps, b: CometProps) =>
              new Date(b.created_at).getTime() -
              new Date(a.created_at).getTime()
          )
          .map((comment: CometProps, index) => {
            if (index < numberComments) {
              return (
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
                      {user.id === comment.user.id && (
                        <>
                          <FiEdit
                            className={styles.svg}
                            style={{ marginLeft: 0.5 + 'rem' }}
                            onClick={() => {
                              setText(post.text);
                              setEditStates(!editStates);
                            }}
                          />
                          <AiOutlineClose
                            className={styles.svg}
                            style={{ fontSize: 1.2 + 'rem' }}
                            onClick={() => handleDeletePost(post.id)}
                          />
                        </>
                      )}
                    </p>
                  </div>
                  <div className={styles.commentContent}>
                    {editStates && post.user.id === user.id ? (
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
                              handleEditPost(post.id);
                              setEditStates(!editStates);
                            }}
                          >
                            Salvar
                          </button>
                        </div>
                        <span className={styles.postEditText}>{post.text}</span>
                      </>
                    ) : (
                      <p className={styles.commentText}>{comment.content}</p>
                    )}
                  </div>
                </div>
              );
            }
          })}
      <div className={styles.showComments}>
        {post.comments.length > 3 && numberComments < post.comments.length && (
          <button
            onClick={() => setNumberComments(numberComments + 3)}
            className={styles.showMore}
          >
            <AiOutlineArrowDown className={styles.icon} />
            Carregar mais comentários
          </button>
        )}
        {numberComments > 3 && (
          <button
            onClick={() => setNumberComments(3)}
            className={styles.showMore}
          >
            <AiOutlineArrowUp className={styles.icon} />
            Carregar menos comentários
          </button>
        )}
      </div>
    </div>
  );
}
