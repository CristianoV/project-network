import styles from './styles.module.scss';
import avatar from '../../../../public/avatar.jpg';
import Image from 'next/image';
import { fetchFromApi } from '../../../utils/axios';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function Card({ obj, token, requestId }: any) {
  const { firstName, lastName, profile_picture, id } = obj;
  const router = useRouter();

  const handleFriend = async (status: boolean) => {
    try {
      await fetchFromApi.post(
        '/friend/requests',
        {
          friendId: id,
          status: status === true ? 'accepted' : 'rejected',
          requestId,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      router.reload();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card__img}>
        <Link href={`/profile/${id}`}>
          <Image
            src={profile_picture || avatar}
            alt='avatar de usuário'
            width={500}
            height={500}
            quality={70}
            placeholder='blur'
            blurDataURL='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mN0vQgAAWEBGHsgcxcAAAAASUVORK5CYII='
          />
        </Link>
      </div>
      <div className={styles.card__content}>
        <div className={styles.card__text}>
          <p>
            {firstName} {lastName}
          </p>
          <span>{firstName} é seu(sua) amigo(a)?</span>
        </div>
        <div className={styles.card__buttons}>
          <button
            onClick={() => {
              handleFriend(true);
            }}
          >
            sim
          </button>
          <button
            onClick={() => {
              handleFriend(false);
            }}
          >
            não
          </button>
        </div>
      </div>
    </div>
  );
}
