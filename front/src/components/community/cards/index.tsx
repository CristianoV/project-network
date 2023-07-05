import styles from './styles.module.scss';
import avatar from '../../../../public/avatar.jpg';
import Image from 'next/image';
import Link from 'next/link';

interface GroupCardProps {
  group: any;
}

export default function GroupCard({ group }: GroupCardProps) {
  return (
    <div className={styles.container}>
      <Link href={`/community/${group.id}`}>
        <Image
          src={group?.profile_picture || avatar}
          alt='avatar'
          width={500}
          height={500}
          quality={70}
          placeholder='blur'
          blurDataURL='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mN0vQgAAWEBGHsgcxcAAAAASUVORK5CYII='
        />
        <p>{group.name}</p>
      </Link>
    </div>
  );
}
