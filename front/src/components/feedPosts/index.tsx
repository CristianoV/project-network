import Image from 'next/image';
import avatar from '../../../public/avatar.jpg';
import { fetchFromApi } from '../../utils/axios';
import styles from './styles.module.scss';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import moment from 'moment';
import { BiCommentDetail } from 'react-icons/bi';
import { AiOutlineDislike, AiOutlineLike } from 'react-icons/ai';

interface PostComment {
  [key: number]: boolean;
}

export default function FeedPosts({ token }: { token: string }) {
  const [posts, setPosts] = useState<any[]>([]);
  const [commentStates, setCommentStates] = useState<PostComment>({});
  const [page, setPage] = useState(0);

  useEffect(() => {
    try {
      const getPosts = async () => {
        const response = await fetchFromApi.get(
          `/post?page=${page}&pageSize=3`,
          {
            headers: {
              Authorization: token,
            },
          }
        );
        if (response.data.length === 0) {
          return;
        }
        setPosts((prevState) => [...prevState, ...response.data]);
      };
      getPosts();
    } catch (error) {
      console.error(error);
    }
  }, [page, token]);

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

  const toggleComment = (postId: number) => {
    setCommentStates((prevState) => ({
      ...prevState,
      [postId]: !prevState[postId],
    }));
  };

  return (
    <div className={styles.container}>
      {posts.length === 0 && (
        <p className={styles.noPosts}>
          Você ainda não tem nenhum post. Clique em {'Publicar'} para criar o
          seu primeiro post.
        </p>
      )}
      {posts.map(
        (post: {
          id: number;
          text: string;
          image: string;
          created_at: string;
          updated_at: string;
          user: {
            id: number;
            firstName: string;
            lastName: string;
            profile_picture: string;
          };
        }) => (
          <div className={styles.post} key={post.id}>
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
                    alt='user image'
                    width={50}
                    height={50}
                    className={styles.userImage}
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
              <p>
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
              </p>
            </div>
            <p>
              <span className={styles.postText}>{post.text}</span>
            </p>
            {post.image && (
              <Image
                src={post.image}
                alt='post image'
                width={500}
                height={500}
                className={styles.postImage}
              />
            )}
            <div className={styles.icons}>
              <div className={styles.likeDislike}>
                <AiOutlineLike className={styles.icon} />
                <AiOutlineDislike className={styles.icon} />
              </div>
              <BiCommentDetail
                className={styles.icon}
                onClick={() => toggleComment(post.id)}
              />
            </div>
            {commentStates[post.id] && (
              <div className={styles.newComment}>
                <input type='text' placeholder='Escreva um comentário...' />
                <button>Publicar</button>
              </div>
            )}
            <hr />
          </div>
        )
      )}
      <div className={styles.loading} id='sentinelScroll'>
        <div className={styles.spinner}></div>
        <p className={styles.loadingText}>Carregando...</p>
      </div>
    </div>
  );
}
