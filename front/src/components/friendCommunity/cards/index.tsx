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
        <Image src={avatar} alt='avatar' width={500} height={500} />
        <p>{group.name}</p>
      </Link>
    </div>
  );
}
