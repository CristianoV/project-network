import styles from './styles.module.scss';
import { useState } from 'react';

export default function FeedPosts() {
  return (
    <div className={styles.container}>
      <p className={styles.noPosts}>
        Você ainda não tem nenhum post. Clique em {'Publicar'} para criar o seu
        primeiro post.
      </p>
    </div>
  );
}
