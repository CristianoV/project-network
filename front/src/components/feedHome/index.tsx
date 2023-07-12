import { fetchFromApi } from '../../utils/axios';
import styles from './styles.module.scss';
import { useEffect, useState } from 'react';
import Feed from '../feed';

export default function FeedPosts({ token }: { token: string }) {
  const [posts, setPosts] = useState<any[]>([]);
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

  return (
    <div className={styles.container}>
      {posts.length === 0 && (
        <p className={styles.noPosts}>
          Você ainda não tem nenhum post. Clique em {'Publicar'} para criar o
          seu primeiro post.
        </p>
      )}
      {posts.map((post) => (
        <Feed key={post.id} post={post} token={token} />
      ))}
      <li id='sentinelScroll' />
    </div>
  );
}

//<div className={styles.loading} id='sentinelScroll'>
//<div className={styles.spinner}></div>
//<p className={styles.loadingText}>Carregando...</p>
//</div>
