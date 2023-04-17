import styles from './styles.module.scss';
import avatar from '../../../../public/avatar.jpg';
import Image from 'next/image';
import { fetchFromApi } from '../../../utils/axios';
import { useRouter } from 'next/router';

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
          requestId
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
        <Image
          src={profile_picture || avatar}
          alt='Avatar'
          width={500}
          height={500}
        />
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
