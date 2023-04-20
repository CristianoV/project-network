import styles from './styles.module.scss';
import avatar from '../../../../public/avatar.jpg';
import Image from 'next/image';
import Link from 'next/link';

interface GroupCardProps {
  friend: any;
}

export default function GroupCard({ friend }: GroupCardProps) {
  return (
    <div className={styles.container}>
      <Link href={`/profile/${friend.id}`}>
      <Image src={friend?.profile_picture || avatar} alt='avatar' width={500} height={500} />
        <p>{friend.firstName}</p>
      </Link>
    </div>
  );
}
