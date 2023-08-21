import styles from './styles.module.scss';
import avatar from '../../../../public/avatar.jpg';
import Image from 'next/image';
import { fetchFromApi } from '../../../utils/axios';
import { useRouter } from 'next/router';
import Link from 'next/link';

export interface Message {
  id: number;
  from: number;
  to: number;
  message: string;
  status: string;
  created_at: string;
  updated_at: string;
  fromUser: FromUser;
  toUser: FromUser;
}

export interface FromUser {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  bio: string;
  profile_picture?: any;
  birthday: string;
  relationship: string;
  country: string;
  phrase?: any;
  sex: string;
  cep: string;
  state: string;
  language: string;
}

export default function Card({
  obj,
  token,
  requestId,
}: {
  obj: Message;
  token: string;
  requestId: number;
}) {
  const router = useRouter();

  const handleFriend = async (status: boolean) => {
    try {
      await fetchFromApi.put(
        `/testimony/${obj.id}`,
        {
          status: status === true ? 'approved' : 'rejected',
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
        <Link href={`/profile/${obj.id}`}>
          <Image
            src={obj.fromUser.profile_picture || avatar}
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
            {obj.fromUser.firstName} {obj.fromUser.lastName}
          </p>
          <span  style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
            <strong>
              Depoimento:
            </strong>
            <br /> {obj.message}
          </span>
          <span>
            Deseja publicar o depoimento de {obj.fromUser.firstName} em seu
            perfil?
          </span>
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
