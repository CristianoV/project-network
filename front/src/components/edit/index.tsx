import { useRouter } from 'next/router';
import styles from './styles.module.scss';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import moment from 'moment';
import { fetchFromApi } from '../../utils/axios';

interface EditProps {
  token: string;
}

export default function Edit({ token }: EditProps) {
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
      const date = moment(info.birthday).format('DD-MM-YYYY').split('-');

      setYear(date[2]);
      setMonth(date[1]);
      setDay(date[0]);

      setFirstName(info.firstName);
      setLastName(info.lastName);
      setSex(info.sex);
      setRelationship(info.relationship);
      setCep(info.cep);
      setState(info.state);
      setCountry(info.country);
      setLanguage(info.language);
      setBio(info.bio);
    }
  }, [info]);

  const handleClick = async () => {
    const date = moment(`${year}-${month}-${day}`).format('YYYY-MM-DD');
    try {
      await fetchFromApi.put(
        '/user/profile',
        {
          firstName,
          lastName,
          bio,
          birthday: date,
          relationship,
          country,
          sex,
          cep,
          state,
          language,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      router.push('/profile');
    } catch (error) {
      console.error(error);
    }
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
            <input
              type='radio'
              name='sex'
              id='fem'
              checked={sex == 'Feminino' ? true : false}
              onClick={() => setSex('Feminino')}
            />
            feminino
          </label>
          <label htmlFor='masc'>
            <input
              type='radio'
              name='sex'
              id='masc'
              checked={sex == 'Masculino' ? true : false}
              onClick={() => setSex('Masculino')}
            />
            masculino
          </label>
        </div>
        <div className={styles.text}>
          <p>relacionamento:</p>
          <label htmlFor='solteiro'>
            <select
              name=''
              id=''
              onChange={(e) => setRelationship(e.target.value)}
            >
              <option
                value='selecione'
                selected={relationship === null ? true : false}
                disabled
              >
                selecione
              </option>
              <option
                value='Namorando'
                selected={relationship === 'Namorando' ? true : false}
              >
                namorando
              </option>
              <option
                value='Solteiro'
                selected={relationship === 'Solteiro' ? true : false}
              >
                solteiro
              </option>
              <option
                value='Casado'
                selected={relationship === 'Casado' ? true : false}
              >
                casado
              </option>
              <option
                value='Divorciado'
                selected={relationship === 'Divorciado' ? true : false}
              >
                divorciado
              </option>
              <option
                value='Viuvo'
                selected={relationship === 'Viuvo' ? true : false}
              >
                viuvo
              </option>
            </select>
          </label>
        </div>
        <div className={styles.text}>
          <p>data de nascimento:</p>
          <label htmlFor='solteiro'>
            <select name='' id='' onChange={(e) => setDay(e.target.value)}>
              <option
                value='selecione'
                selected={country === null ? true : false}
                disabled
              >
                selecione
              </option>
              {Array.from({ length: 31 }, (_, index) => (
                <option
                  key={index}
                  value={1 + index}
                  selected={Number(day) == 1 + index ? true : false}
                >
                  {1 + index}
                </option>
              ))}
            </select>
          </label>
          <label htmlFor='solteiro'>
            <select name='' id='' onChange={(e) => setMonth(e.target.value)}>
              <option
                value='selecione'
                selected={country === null ? true : false}
                disabled
              >
                selecione
              </option>
              {Array.from({ length: 12 }, (_, index) => (
                <option
                  key={index + 1}
                  value={index + 1}
                  selected={Number(month) == index + 1 ? true : false}
                >
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
            <select
              name='ano-nascimento'
              id='ano-nascimento'
              onChange={(e) => setYear(e.target.value)}
            >
              <option
                value='selecione'
                selected={country === null ? true : false}
                disabled
              >
                selecione
              </option>
              {Array.from({ length: 100 }, (_, index) => (
                <option
                  key={index}
                  value={2023 - index}
                  selected={Number(year) == 2023 - index ? true : false}
                >
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
            <select
              name='pais'
              id='pais'
              onChange={(e) => setCountry(e.target.value)}
            >
              <option
                value='selecione'
                selected={country === null ? true : false}
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
          <p>idioma que falo:</p>
          <label htmlFor=''>
            <select
              name='pais'
              id='pais'
              onChange={(e) => setLanguage(e.target.value)}
            >
              <option
                value='selecione'
                selected={country === null ? true : false}
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
