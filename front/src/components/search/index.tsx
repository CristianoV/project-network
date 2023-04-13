import { useState, useEffect, FormEvent } from 'react';
import { useRouter } from 'next/router';
import SearchSideBar from './searchSideBar';
import { fetchFromApi } from '../../utils/axios';
import Card from './cards';
import styles from './styles.module.scss';

interface User {
  bio: string;
  birthday: string;
  cep: string;
  country: string;
  email: string;
  firstName: string;
  id: number;
  language: string;
  lastName: string;
  phrase: string;
  profile_picture: string;
  relationship: string;
  sex: string;
  state: string;
}

export default function Search(): JSX.Element {
  const router = useRouter();
  const { q } = router.query;

  const [search, setSearch] = useState<string>((q as string) ?? '');
  const [users, setUsers] = useState<User[]>([]);

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (search !== '') {
      if (router.pathname === '/search/users') {
        router.push(`/search/users?q=${search}`);
      } else if (router.pathname === '/search/community') {
        router.push(`/search/community?q=${search}`);
      } else {
        router.push(`/search?q=${search}`);
      }
    }
  };

  const handleSubmit = async () => {
    try {
      if (q !== undefined) {
        if (router.pathname === '/search/users') {
          const { data } = await fetchFromApi.get(`/search/users/${search}`);
          setUsers(data);
        } else if (router.pathname === '/search/community') {
          const { data } = await fetchFromApi.get(`/search/comunities/${search}`);
          setUsers(data);
        } else {
          const response = await fetchFromApi.get(`/search/${search}`);
          setUsers(response.data);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (q) {
      handleSubmit();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q]);

  return (
    <div className={styles.container}>
      <div className={styles.tittle}>
        <p>
          {`
          Resultado da busca para: "${q}" - Total: ${users.length}
          `}
        </p>
      </div>

      <div className={styles.content}>
        <SearchSideBar />
        <div className={styles.search}>
          <form onSubmit={handleSearch}>
            <input
              type='text'
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button type='submit'>buscar</button>
          </form>
          <div>
            {users.length !== 0 ? (
              users.map((user: User) => (
                <div key={user.id}>
                  <Card user={user} />
                  <hr />
                </div>
              ))
            ) : (
              <p>Nenhum resultado encontrado</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
