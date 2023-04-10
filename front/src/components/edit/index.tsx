import { useRouter } from 'next/router';
import styles from './styles.module.scss';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

export default function Edit() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [sex, setSex] = useState('');
  const [relationship, setRelationship] = useState('');
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [state, setState] = useState('');
  const [cep, setCep] = useState('');
  const [country, setCountry] = useState('');
  const [language, setLanguage] = useState('');
  const [bio, setBio] = useState('');

  const router = useRouter();
  const redux = useSelector((state: any) => state.user);
  const info = redux.info;

  useEffect(() => {
    if (info) {
      setFirstName(info.firstName);
      setLastName(info.lastName);
      setSex(info.sex);
      setRelationship(info.relationship);
      setCep(info.cep);
      setCountry(info.country);
      setLanguage(info.language);
      setBio(info.bio);
    }
  }, [info]);

  const handleClick = () => {
    router.push('/profile');
  };

  return (
    <div className={styles.container}>
      <h1>Editar perfil</h1>
      <form>
        <div className={styles.text}>
          <p>nome:</p>
          <input
            type='text'
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div className={styles.text}>
          <p>sobrenome:</p>
          <input
            type='text'
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div className={styles.text}>
          <p>sexo:</p>
          <label htmlFor='fem'>
            <input type='radio' name='sex' id='fem' />
            feminino
          </label>
          <label htmlFor='masc'>
            <input type='radio' name='sex' id='masc' />
            masculino
          </label>
        </div>
        <div className={styles.text}>
          <p>relacionamento:</p>
          <label htmlFor='solteiro'>
            <select name='' id=''>
              <option value='selecione' selected disabled>
                selecione
              </option>
              <option value='solteiro'>namorando</option>
              <option value='solteiro'>solteiro</option>
              <option value='casado'>casado</option>
              <option value='divorciado'>divorciado</option>
              <option value='viuvo'>viuvo</option>
            </select>
          </label>
        </div>
        <div className={styles.text}>
          <p>data de nascimento:</p>
          <label htmlFor='solteiro'>
            <select name='' id=''>
              <option value='selecione' selected disabled>
                selecione
              </option>
              {Array.from({ length: 31 }, (_, index) => (
                <option key={index} value={1 + index}>
                  {1 + index}
                </option>
              ))}
            </select>
          </label>
          <label htmlFor='solteiro'>
            <select name='' id=''>
              <option value='selecione' selected disabled>
                selecione
              </option>
              {Array.from({ length: 12 }, (_, index) => (
                <option key={index + 1} value={index + 1}>
                  {new Date(0, index).toLocaleString('pt-BR', {
                    month: 'long',
                  })}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div className={styles.text}>
          <p>ano de nascimento:</p>
          <label htmlFor=''>
            <select name='ano-nascimento' id='ano-nascimento'>
              <option value='selecione' selected disabled>
                selecione
              </option>
              {Array.from({ length: 100 }, (_, index) => (
                <option key={index} value={2023 - index}>
                  {2023 - index}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div className={styles.text}>
          <p>estado:</p>
          <input
            type='text'
            value={state}
            onChange={(e) => setState(e.target.value)}
          />
        </div>
        <div className={styles.text}>
          <p>CEP:</p>
          <input
            type='text'
            value={cep}
            onChange={(e) => setCep(e.target.value)}
          />
        </div>
        <div className={styles.text}>
          <p>país:</p>
          <label htmlFor=''>
            <select name='pais' id='pais'>
              <option value='selecione' selected disabled>
                selecione
              </option>
              <option value='Brasil'>Brasil</option>
              <option value='Estados Unidos'>Estados Unidos</option>
              <option value='Canadá'>Canadá</option>
              <option value='Reino Unido'>Reino Unido</option>
              <option value='França'>França</option>
              <option value='Alemanha'>Alemanha</option>
              <option value='Japão'>Japão</option>
              <option value='China'>China</option>
              <option value='Índia'>Índia</option>
              <option value='Austrália'>Austrália</option>
            </select>
          </label>
        </div>
        <div className={styles.text}>
          <p>idioma que falo:</p>
          <label htmlFor=''>
            <select name='pais' id='pais'>
              <option value='selecione' selected disabled>
                selecione
              </option>
              <option value='Inglês'>Inglês</option>
              <option value='Mandarim'>Mandarim</option>
              <option value='Espanhol'>Espanhol</option>
              <option value='Hindi'>Hindi</option>
              <option value='Árabe'>Árabe</option>
              <option value='Português'>Português</option>
              <option value='Bengali'>Bengali</option>
              <option value='Russo'>Russo</option>
              <option value='Japonês'>Japonês</option>
              <option value='Punjabi'>Punjabi</option>
              <option value='Alemão'>Alemão</option>
              <option value='Javanês'>Javanês</option>
              <option value='Francês'>Francês</option>
              <option value='Telugu'>Telugu</option>
              <option value='Vietnamita'>Vietnamita</option>
              <option value='Coreano'>Coreano</option>
              <option value='Tâmil'>Tâmil</option>
              <option value='Italiano'>Italiano</option>
              <option value='Turco'>Turco</option>
              <option value='Urdu'>Urdu</option>
              <option value='Polonês'>Polonês</option>
              <option value='Ucraniano'>Ucraniano</option>
              <option value='Persa'>Persa</option>
              <option value='Malaiala'>Malaiala</option>
              <option value='Xhosa'>Xhosa</option>
              <option value='Suaíli'>Suaíli</option>
            </select>
          </label>
        </div>
        <div className={styles.text}>
          <p>quem sou eu:</p>
          <label htmlFor=''>
            <textarea
              name=''
              id=''
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            ></textarea>
          </label>
        </div>
      </form>
      <button onClick={handleClick}>salvar</button>
    </div>
  );
}
