import Image from 'next/image';
import avatar from '../../../public/avatar.jpg';
import { fetchFromApi } from '../../utils/axios';
import styles from './styles.module.scss';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import moment from 'moment';

export default function FeedPosts() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    try {
      const getPosts = async () => {
        const response = await fetchFromApi.get('/post');
        setPosts(response.data);
      };
      getPosts();
    } catch (error) {
      console.log(error);
    }
  }, []);

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
          id: string;
          text: string;
          image: string;
          createdAt: string;
          updatedAt: string;
          user: {
            id: string;
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
                <Image
                  src={post.user.profile_picture || avatar}
                  alt='user image'
                  width={50}
                  height={50}
                  className={styles.userImage}
                />
                <Link className={styles.postAuthor} href={`/profile/${post.user.id}`} passHref>
                  {post.user.firstName} {post.user.lastName}
                </Link>
              </div>
              <p>
                {moment(post.createdAt).format('DD/MM/YYYY')} às{' '}
                {moment(post.createdAt).format('HH:mm')}
                {post.createdAt !== post.updatedAt && (
                  <span>
                    {' '}
                    (editado em {moment(post.updatedAt).format(
                      'DD/MM/YYYY'
                    )} às {moment(post.updatedAt).format('HH:mm')})
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
            <hr />
          </div>
        )
      )}
    </div>
  );
}
