import { useRouter } from 'next/router';
import styles from './styles.module.scss';
import { useState } from 'react';

export default function SearchCommunity() {
  const [search, setSearch] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push(`/search/community?q=${search}`);
  };
  return (
    <div className={styles.container}>
      <h2>todas as comunidades</h2>
      <div className={styles.search}>
        <p>Pesquisar por nome:</p>
        <form onSubmit={handleSearch}>
          <input
            type='text'
            name='search'
            id='search'
            onChange={(e) => setSearch(e.target.value)}
            value={search}
          />
          <button type='submit'>pesquisar</button>
        </form>
      </div>
      <div>Procurar por categorias:</div>
    </div>
  );
}
