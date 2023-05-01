import styles from './styles.module.scss';
import avatar from '../../../../public/avatar.jpg';
import Image from 'next/image';
import Link from 'next/link';

interface FriendCardProps {
  user: User;
}

interface User {
  id: number;
  firstName?: string; // User
  lastName?: string; // User
  name?: string; // Community
  profile_picture: string;
  state?: string; // User
  country?: string; // User
  description?: string; // Community
}

export default function FriendCard({ user }: FriendCardProps) {
  return (
    <div className={styles.container}>
      <Link href={user.name ? `/community/${user.id}` : `/profile/${user.id}`}>
        <Image
          src={user.profile_picture || avatar}
          alt='avatar'
          width={500}
          height={500}
        />
        <div className={styles.info}>
          {user.firstName ? (
            <div>
              <p className={styles.tittle}>
                {user?.firstName} {user?.lastName}
              </p>
              <p>{user?.state}</p>
              <p>{user?.country}</p>
            </div>
          ) : (
            <div>
              <p className={styles.tittle}>{user?.name}</p>
              <p>{user?.description}</p>
            </div>
          )}
          {user.name ? <p>Comunidade</p> : <p>Usuário</p>}
        </div>
      </Link>
    </div>
  );
}
