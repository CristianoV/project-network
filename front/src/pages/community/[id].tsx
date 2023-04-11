import { useRouter } from 'next/router';

export default function CommunityPage() {
  const router = useRouter();
  const { id } = router.query;

  return (
    <div>
      <h1>Community: {id}</h1>
    </div>
  );
}
