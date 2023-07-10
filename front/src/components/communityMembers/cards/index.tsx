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
        <Image
          src={friend?.profile_picture || avatar}
          alt='avatar de usuário'
          width={500}
          height={500}
          quality={70}
          placeholder='blur'
          blurDataURL='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mN0vQgAAWEBGHsgcxcAAAAASUVORK5CYII='
        />
        <p>{friend.firstName}</p>
      </Link>
    </div>
  );
}
