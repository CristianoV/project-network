import Image from 'next/image';
import avatar from '../../../public/avatar.jpg';
import { fetchFromApi } from '../../utils/axios';
import styles from './styles.module.scss';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import moment from 'moment';
import Comment from '../comment';
import { BiCommentDetail } from 'react-icons/bi';
import { AiOutlineDislike, AiOutlineLike } from 'react-icons/ai';
import { AiOutlineArrowDown, AiOutlineArrowUp } from 'react-icons/ai';
import { RiMore2Fill } from 'react-icons/ri';
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

export default function Feed({ post, token }: FeedProps) {
  const user = useSelector((state: any) => state.user.info);
  const [commentStates, setCommentStates] = useState(false);
  const [editStates, setEditStates] = useState(false);
  const [page, setPage] = useState(0);
  const [text, setText] = useState('');
  const [comment, setComment] = useState('');
  const [deleted, setDeleted] = useState(false);
  const [numberComments, setNumberComments] = useState(3);
  const [plusEdit, setPlusEdit] = useState(false);

  const handleDeletePost = async (postId: number) => {
    try {
      await fetchFromApi.delete(`/post/${postId}`, {
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
      if (text === post.text) {
        return;
      }
      await fetchFromApi.put(
        `/post/${postId}`,
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

  const handleNewComment = async (postId: number) => {
    try {
      await fetchFromApi.post(
        '/comment',
        {
          content: comment,
          post_id: postId,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );

      post.comments.push({
        id: 0,
        content: comment,
        user_id: user.id,
        post_id: postId,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        user: {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          profile_picture: user.profile_picture,
        },
      });

      setComment('');
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const intersectionObserver = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        setPage((prevState) => prevState + 1);
      }
    });

    const sentinelScroll = document.getElementById(
      'sentinelScroll'
    ) as HTMLLIElement;

    intersectionObserver.observe(sentinelScroll);

    return () => {
      intersectionObserver.disconnect();
    };
  }, []);

  if (deleted) {
    return null;
  }

  return (
    <div className={styles.container} key={post.id}>
      <div className={styles.post}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingBottom: 10,
          }}
        >
          <div className={styles.userInfo}>
            <Link
              className={styles.postAuthor}
              href={`/profile/${post.user.id}`}
              passHref
            >
              <Image
                src={post.user.profile_picture || avatar}
                alt='avatar de usuário'
                width={50}
                height={50}
                className={styles.userImage}
                quality={70}
                placeholder='blur'
                blurDataURL='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mN0vQgAAWEBGHsgcxcAAAAASUVORK5CYII='
              />
            </Link>
            <Link
              className={styles.postAuthor}
              href={`/profile/${post.user.id}`}
              passHref
            >
              {post.user.firstName} {post.user.lastName}
            </Link>
          </div>
          <p className={styles.alignCenter}>
            {moment(post.created_at).format('DD/MM/YYYY')} às{' '}
            {moment(post.created_at).format('HH:mm')}
            {post.created_at !== post.updated_at && (
              <span>
                {' '}
                (editado em {moment(post.updated_at).format(
                  'DD/MM/YYYY'
                )} às {moment(post.updated_at).format('HH:mm')})
              </span>
            )}
            {post.user.id === user.id && (
              <>
                {plusEdit && (
                  <div style={{ display: 'flex', alignItems: 'center' }}>
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
                      style={{ fontSize: 1.3 + 'rem' }}
                      onClick={() => handleDeletePost(post.id)}
                    />
                  </div>
                )}
                <RiMore2Fill
                  className={styles.svg}
                  style={{ fontSize: 1.3 + 'rem' }}
                  onClick={() => setPlusEdit(!plusEdit)}
                />
              </>
            )}
          </p>
        </div>
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
          <p>
            <span className={styles.postText}>{post.text}</span>
          </p>
        )}
        {post.image && (
          <Image
            src={post.image}
            alt='imagem do post'
            width={500}
            height={500}
            className={styles.postImage}
            quality={70}
            placeholder='blur'
            blurDataURL='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mN0vQgAAWEBGHsgcxcAAAAASUVORK5CYII='
          />
        )}
        <div className={styles.icons}>
          <div className={styles.likeDislike}>
            <AiOutlineLike className={styles.icon} /> 0
            <AiOutlineDislike className={styles.icon} />
          </div>
          <BiCommentDetail
            className={styles.icon}
            onClick={() => setCommentStates(!commentStates)}
          />
        </div>
        {commentStates && (
          <div className={styles.newComment}>
            <input
              type='text'
              onChange={(e) => setComment(e.target.value)}
              value={comment}
              placeholder='Escreva um comentário...'
            />
            <button
              onClick={() => {
                handleNewComment(post.id);
              }}
            >
              Publicar
            </button>
          </div>
        )}
        {post.comments.length > 0 ? (
          <>
            {post.comments
              .slice()
              .sort(
                (a: CometProps, b: CometProps) =>
                  new Date(b.created_at).getTime() -
                  new Date(a.created_at).getTime()
              )
              .map((comment: CometProps, index) => {
                if (index < numberComments) {
                  return (
                    <Comment key={comment.id} comment={comment} token={token} />
                  );
                }
              })}
            <div className={styles.showComments}>
              {post.comments.length > 3 &&
                numberComments < post.comments.length && (
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
          </>
        ) : (
          commentStates && (
            <div className={styles.notComments}>
              <p>Nenhum comentário</p>
            </div>
          )
        )}
        <hr />
      </div>
    </div>
  );
}
