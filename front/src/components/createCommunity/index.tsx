import Link from 'next/link';
import styles from './styles.module.scss';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { fetchFromApi } from '../../utils/axios';

interface CreateCommunityProps {
  token: string;
}

export default function CreateCommunity({ token }: CreateCommunityProps) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [language, setLanguage] = useState('');
  const [category, setCategory] = useState('');
  const [type, setType] = useState('Público');
  const [country, setCountry] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const router = useRouter();

  const handleFileInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      setSelectedFile(files[0]);
    }
  };

  const handleSubmmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const headers = {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: token,
        },
      };
      const { data } = await fetchFromApi.post(
        '/groups',
        {
          name,
          description,
          language,
          category,
          type,
          country,
          foto: selectedFile,
        },
        headers
      );
      router.push(`/community/${data.id}`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.container}>
      <div>
        <h1>Criar comunidade</h1>
        <nav>
          <Link href='/'>Inicio</Link>
          {'>'}
          <Link href='/community'>comunidades</Link>
          {'>'}
          <p>criar comunidades</p>
        </nav>

        <form onSubmit={handleSubmmit}>
          <div className={styles.text}>
            <p>nome:</p>
            <input
              type='text'
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className={styles.text}>
            <p>categoria:</p>
            <label htmlFor='categoria'>
              <select
                name=''
                id=''
                onChange={(e) => setCategory(e.target.value)}
              >
                <option
                  value='selecione'
                  disabled
                  selected={category === '' ? true : false}
                >
                  selecione
                </option>
                <option value='Amigos'>amigos</option>
                <option value='Esportes'>esportes</option>
                <option value='Música'>música</option>
                <option value='Filmes'>filmes</option>
                <option value='Livros'>livros</option>
                <option value='Jogos'>jogos</option>
                <option value='Animais de estimação'>
                  animais de estimação
                </option>
                <option value='Política'>política</option>
                <option value='Religião'>religião</option>
                <option value='Tecnologia'>tecnologia</option>
                <option value='Viagens'>viagens</option>
                <option value='Educação'>educação</option>
                <option value='Trabalho'>trabalho</option>
                <option value='Outra categoria'>outra categoria</option>
              </select>
            </label>
          </div>
          <div className={styles.text}>
            <p>tipo:</p>
            <label htmlFor='type-public'>
              <input
                type='radio'
                name='type'
                id='type-public'
                value='Público'
                onChange={(e) => setType(e.target.value)}
                checked
              />
              publica
            </label>
            <label htmlFor='masc-moderate'>
              <input
                type='radio'
                name='type'
                id='masc-moderate'
                value='Moderada'
                onChange={(e) => setType(e.target.value)}
              />
              moderada
            </label>
          </div>

          <div className={styles.text}>
            <p>envio de mensagems:</p>
            <label htmlFor='message-yes'>
              <input type='radio' name='message' id='message-yes' checked />
              ativado
            </label>
            <label htmlFor='message-no'>
              <input type='radio' name='message' id='message-no' disabled />
              desativado
            </label>
          </div>
          <div className={styles.text}>
            <p>idioma:</p>
            <label htmlFor=''>
              <select
                name='pais'
                id='pais'
                onChange={(e) => setLanguage(e.target.value)}
              >
                <option
                  value='selecione'
                  selected={language === '' ? true : false}
                  disabled
                >
                  selecione
                </option>
                <option
                  value='Inglês'
                  selected={language === 'Inglês' ? true : false}
                >
                  Inglês
                </option>
                <option
                  value='Mandarim'
                  selected={language === 'Mandarim' ? true : false}
                >
                  Mandarim
                </option>
                <option
                  value='Espanhol'
                  selected={language === 'Espanhol' ? true : false}
                >
                  Espanhol
                </option>
                <option
                  value='Hindi'
                  selected={language === 'Hindi' ? true : false}
                >
                  Hindi
                </option>
                <option
                  value='Árabe'
                  selected={language === 'Árabe' ? true : false}
                >
                  Árabe
                </option>
                <option
                  value='Português'
                  selected={language === 'Português' ? true : false}
                >
                  Português
                </option>
                <option
                  value='Bengali'
                  selected={language === 'Bengali' ? true : false}
                >
                  Bengali
                </option>
                <option
                  value='Russo'
                  selected={language === 'Russo' ? true : false}
                >
                  Russo
                </option>
                <option
                  value='Japonês'
                  selected={language === 'Japonês' ? true : false}
                >
                  Japonês
                </option>
                <option
                  value='Punjabi'
                  selected={language === 'Punjabi' ? true : false}
                >
                  Punjabi
                </option>
                <option
                  value='Alemão'
                  selected={language === 'Alemão' ? true : false}
                >
                  Alemão
                </option>
                <option
                  value='Javanês'
                  selected={language === 'Javanês' ? true : false}
                >
                  Javanês
                </option>
                <option
                  value='Francês'
                  selected={language === 'Francês' ? true : false}
                >
                  Francês
                </option>
                <option
                  value='Telugu'
                  selected={language === 'Telugu' ? true : false}
                >
                  Telugu
                </option>
                <option
                  value='Vietnamita'
                  selected={language === 'Vietnamita' ? true : false}
                >
                  Vietnamita
                </option>
                <option
                  value='Coreano'
                  selected={language === 'Coreano' ? true : false}
                >
                  Coreano
                </option>
                <option
                  value='Tâmil'
                  selected={language === 'Tâmil' ? true : false}
                >
                  Tâmil
                </option>
                <option
                  value='Italiano'
                  selected={language === 'Italiano' ? true : false}
                >
                  Italiano
                </option>
                <option
                  value='Turco'
                  selected={language === 'Turco' ? true : false}
                >
                  Turco
                </option>
                <option
                  value='Urdu'
                  selected={language === 'Urdu' ? true : false}
                >
                  Urdu
                </option>
                <option
                  value='Polonês'
                  selected={language === 'Polonês' ? true : false}
                >
                  Polonês
                </option>
                <option
                  value='Ucraniano'
                  selected={language === 'Ucraniano' ? true : false}
                >
                  Ucraniano
                </option>
                <option
                  value='Persa'
                  selected={language === 'Persa' ? true : false}
                >
                  Persa
                </option>
                <option
                  value='Malaiala'
                  selected={language === 'Malaiala' ? true : false}
                >
                  Malaiala
                </option>
                <option
                  value='Xhosa'
                  selected={language === 'Xhosa' ? true : false}
                >
                  Xhosa
                </option>
                <option
                  value='Suaíli'
                  selected={language === 'Suaíli' ? true : false}
                >
                  Suaíli
                </option>
              </select>
            </label>
          </div>
          <div className={styles.text}>
            <p>local:</p>
            <label htmlFor=''>
              <select
                name='pais'
                id='pais'
                onChange={(e) => setCountry(e.target.value)}
              >
                <option
                  value='selecione'
                  selected={country === '' ? true : false}
                  disabled
                >
                  selecione
                </option>
                <option
                  value='Brasil'
                  selected={country === 'Brasil' ? true : false}
                >
                  Brasil
                </option>
                <option
                  value='Estados Unidos'
                  selected={country === 'Estados Unidos' ? true : false}
                >
                  Estados Unidos
                </option>
                <option
                  value='Canadá'
                  selected={country === 'Canadá' ? true : false}
                >
                  Canadá
                </option>
                <option
                  value='Reino Unido'
                  selected={country === 'Reino Unido' ? true : false}
                >
                  Reino Unido
                </option>
                <option
                  value='França'
                  selected={country === 'França' ? true : false}
                >
                  França
                </option>
                <option
                  value='Alemanha'
                  selected={country === 'Alemanha' ? true : false}
                >
                  Alemanha
                </option>
                <option
                  value='Japão'
                  selected={country === 'Japão' ? true : false}
                >
                  Japão
                </option>
                <option
                  value='China'
                  selected={country === 'China' ? true : false}
                >
                  China
                </option>
                <option
                  value='Índia'
                  selected={country === 'Índia' ? true : false}
                >
                  Índia
                </option>
                <option
                  value='Austrália'
                  selected={country === 'Austrália' ? true : false}
                >
                  Austrália
                </option>
              </select>
            </label>
          </div>
          <div className={styles.text}>
            <p>imagem:</p>
            <input
              type='file'
              onChange={handleFileInputChange}
              accept='image/*'
            />
          </div>
          <div className={styles.text}>
            <p>descrição:</p>
            <label htmlFor=''>
              <textarea
                name=''
                id=''
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              ></textarea>
            </label>
          </div>
          <button type='submit'>criar comunidade</button>
          <button
            type='button'
            onClick={() => {
              router.push('/community');
            }}
          >
            cancelar
          </button>
        </form>
      </div>
    </div>
  );
}
